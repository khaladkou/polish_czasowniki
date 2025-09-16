function initWordTrainer(set){
  const words = set.words || [];
  let order = words.map((_, i) => i);
  shuffle(order);
  let index = 0;
  let showAnswer = false;
  let lastResult = null;
  let lastUserAnswer = null;
  let stats = order.map(i => ({ wi: i, attempts: 0, lastWrong: null }));
  const app = document.getElementById('app');
  let startTime = Date.now();

  function calcStats(){
    const total = stats.length;
    const known = stats.filter(s => s.attempts === 1).length;
    const unknown = stats.filter(s => s.attempts > 1).length;
    return { total, known, unknown };
  }

  function formatTime(ms){
    const total = Math.floor(ms/1000);
    const h = Math.floor(total/3600);
    const m = Math.floor((total%3600)/60);
    const s = total%60;
    const parts = [];
    if(h>0) parts.push(String(h).padStart(2,'0'));
    parts.push(String(m).padStart(2,'0'));
    parts.push(String(s).padStart(2,'0'));
    return parts.join(':');
  }

  function render(){
    if(index >= order.length) return renderResults();
    const word = words[ order[index] ];
    const { total, known, unknown } = calcStats();

    app.innerHTML = `
      <div class="topbar"><button id="back" class="btn">← На главную</button></div>
      <h2>${set.title}</h2>
      <div class="practice-wrap">
        <div id="card" class="card" role="button" aria-pressed="${showAnswer}" tabindex="0">
          ${showAnswer
            ? `<div><div class="label">Ответ</div><div class="answer">${word.back}</div><div class="tap-hint">Отметьте результат:</div></div>`
            : `<div><div class="label">Переведите</div><div class="task">${word.front}</div><div class="tap-hint">Нажмите на карточку, чтобы увидеть ответ</div></div>`}
        </div>
        <div style="display:flex; gap:.5rem; margin:.6rem 0; flex-wrap:wrap;">
          <button type="button" id="btnPrev" class="btn" title="Назад">←</button>
          <button type="button" id="btnNext" class="btn" title="Вперёд">→</button>
        </div>
        <form id="answer-form" autocomplete="off">
          <input id="answer" type="text" placeholder="Польский вариант" ${lastResult === false ? 'style="border:2px solid #ef4444"' : ''} />
          <div style="display:flex; gap:.5rem; margin-top:.6rem; flex-wrap:wrap;">
            <button class="btn-primary">Проверить</button>
            <button type="button" id="toggle-hint" class="btn-accent">${showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</button>
          </div>
        </form>
        ${showAnswer ? `<div class="choices" style="margin-top:.25rem;">
            <button id="btn-correct" class="btn-ok">👍 Угадал</button>
            <button id="btn-wrong" class="btn-bad">👎 Не угадал</button>
          </div>` : ''}
        <div id="feedback" class="feedback ${lastResult === true ? 'ok' : lastResult === false ? 'bad' : ''}">
          ${lastResult === true ? 'Верно!' : lastResult === false && showAnswer ? `Неправильно. Ваш ответ был: - ${lastUserAnswer || ''} Попробуйте ещё или откройте ответ.` : ''}
        </div>
        <div style="color:#64748b; display:flex; gap:.5rem; flex-wrap:wrap;">
          <div>Верно: <b>${known}</b></div>
          <div>Неправильно: <b>${unknown}</b></div>
          <div>Всего: <b>${total}</b></div>
        </div>
        <p style="color:#64748b">Задание ${index+1} из ${order.length}</p>
      </div>
    `;

    document.getElementById('back').onclick = () => { window.location.href = 'index.html'; };

    const formEl = document.getElementById('answer-form');
    const toggleHintBtn = document.getElementById('toggle-hint');
    if(formEl){
      formEl.onsubmit = e => {
        e.preventDefault();
        const userInput = formEl.answer.value.trim();
        const userAns = userInput.toLowerCase();
        const stat = stats.find(s => s.wi === order[index]);

        if(userAns === ''){
          showAnswer = !showAnswer;
          lastResult = null;
          render();
          return;
        }

        stat.attempts++;
        stat.lastWrong = userInput;
        const right = word.back.toLowerCase().split('/').map(s => s.trim());
        const isOk = right.some(r => userAns === r);

        lastResult = isOk;
        lastUserAnswer = userInput;
        showAnswer = !isOk;

        if(isOk) nextCard(); else render();
      };
      toggleHintBtn.onclick = e => { e.preventDefault(); showAnswer = !showAnswer; render(); };
    }

    const card = document.getElementById('card');
    if(card){
      const toggle = () => { showAnswer = !showAnswer; vibrate(10); render(); };
      card.onclick = toggle;
      card.onkeypress = (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } };
    }

    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if(btnPrev) btnPrev.onclick = () => { prevCard(); };
    if(btnNext) btnNext.onclick = () => { nextCard(0); };

    const btnOk = document.getElementById('btn-correct');
    const btnBad = document.getElementById('btn-wrong');
    if(btnOk){
      btnOk.onclick = () => { lastResult = true; vibrate(15); nextCard(); };
    }
    if(btnBad){
      btnBad.onclick = () => {
        const stat = stats.find(s => s.wi === order[index]);
        stat.attempts++;
        stat.lastWrong = '—';
        lastResult = false;
        vibrate(15);
        nextCard();
      };
    }

    setTimeout(() => { const ans = document.getElementById('answer'); if(ans) ans.focus(); }, 0);
  }

  function renderResults(){
    const { total, known, unknown } = calcStats();
    const errors = stats.filter(s => s.attempts > 1);
    const rows = [...stats].sort((a,b)=> b.attempts - a.attempts).map(s => {
      const w = words[s.wi];
      return `<tr><td>${w.front} – ${w.back}</td><td>${s.lastWrong ? s.lastWrong : '-'}</td><td style="text-align:center;">${s.attempts}</td></tr>`;
    }).join('');

    const elapsed = Date.now() - startTime;

    app.innerHTML = `
      <div class="topbar"><button id="back" class="btn">← К началу</button></div>
      <h2>Результаты тренировки</h2>
      <p>Всего слов: <b>${total}</b></p>
      <p>Верно: <b>${known}</b></p>
      <p>Неправильно: <b>${unknown}</b></p>
      <p>Время: <b>${formatTime(elapsed)}</b></p>
      <table>
        <tr>
          <th>Слово</th>
          <th>Ваш последний ответ</th>
          <th>Попыток</th>
        </tr>
        ${rows}
      </table>
      <p><b>${errors.length ? `Ошибки были в ${errors.length} словах.` : 'Все слова выполнены с первого раза!'}</b></p>
      <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
        ${errors.length ? '<button id="repeat-errors" class="btn-primary">Повторить только ошибочные</button>' : ''}
        <button id="repeat-all" class="btn-accent">Начать набор заново</button>
        <button id="to-menu" class="btn">К списку тренажёров</button>
      </div>
    `;

    document.getElementById('back').onclick = () => { start(); };
    document.getElementById('repeat-all').onclick = () => { start(); };
    document.getElementById('to-menu').onclick = () => { window.location.href = 'index.html'; };
    const rep = document.getElementById('repeat-errors');
    if(rep){
      rep.onclick = () => {
        order = stats.filter(s => s.attempts > 1).map(e => e.wi);
        stats = order.map(i => ({ wi: i, attempts: 0, lastWrong: null }));
        index = 0;
        showAnswer = false;
        lastResult = null;
        lastUserAnswer = null;
        startTime = Date.now();
        render();
      };
    }
  }

  function nextCard(delay = 250){
    if(index >= order.length) return;
    index++;
    showAnswer = false;
    lastUserAnswer = null;
    setTimeout(() => { lastResult = null; render(); }, delay);
  }

  function prevCard(){
    if(index <= 0) return;
    index--;
    showAnswer = false;
    lastResult = null;
    lastUserAnswer = null;
    render();
  }

  function start(){
    order = words.map((_, i) => i);
    shuffle(order);
    index = 0;
    showAnswer = false;
    lastResult = null;
    lastUserAnswer = null;
    stats = order.map(i => ({ wi: i, attempts: 0, lastWrong: null }));
    startTime = Date.now();
    render();
  }

  function shuffle(arr){
    for(let i = arr.length -1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function vibrate(ms){ if(navigator.vibrate) try{ navigator.vibrate(ms); } catch(e){} }

  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if(tag === 'input' || tag === 'textarea' || e.ctrlKey || e.metaKey || e.altKey) return;
    if(e.key === 'ArrowLeft'){ e.preventDefault(); prevCard(); }
    else if(e.key === 'ArrowRight'){ e.preventDefault(); nextCard(0); }
  });

  start();
}

window.initWordTrainer = initWordTrainer;
