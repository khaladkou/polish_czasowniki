function initWordTrainer(set){
  ensureTrainerStyles();

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
  const hasRules = Boolean(set.rules);
  const showRulesFirst = !!set.showRulesFirst && hasRules;
  let stage = showRulesFirst ? 'intro' : 'practice';
  let rulesVisible = false;
  let answerValue = '';

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
    if(stage === 'intro') return renderIntro();
    return renderPractice();
  }

  function renderIntro(){
    app.innerHTML = `
      <div class="topbar"><button id="back" class="btn">← На главную</button></div>
      <h2>${set.title}</h2>
      <div class="rules-intro">
        <div class="rules-scroll">${set.rules}</div>
        <div class="rules-intro-actions">
          <button id="start-learning" class="btn-primary">Обучение</button>
        </div>
      </div>
    `;

    document.getElementById('back').onclick = () => { window.location.href = 'index.html'; };
    const startBtn = document.getElementById('start-learning');
    if(startBtn){
      startBtn.onclick = () => {
        stage = 'practice';
        rulesVisible = false;
        start();
      };
    }
  }

  function renderPractice(){
    if(index >= order.length) return renderResults();

    const word = words[ order[index] ];
    const { total, known, unknown } = calcStats();
    const hasInlineBlank = /_{3,}/.test(word.front || '');
    const taskHtml = hasInlineBlank ? buildInlineTask(word.front) : escapeHtml(word.front);

    app.innerHTML = `
      <div class="topbar"><button id="back" class="btn">← На главную</button></div>
      <h2>${set.title}</h2>
      <div class="practice-wrap">
        <div id="card" class="card" role="button" aria-pressed="${showAnswer}" tabindex="0">
          ${showAnswer
            ? `<div><div class="label">Ответ</div><div class="answer">${escapeHtml(word.back)}</div><div class="tap-hint">Отметьте результат:</div></div>`
            : `<div><div class="label">Переведите</div><div class="task">${taskHtml}</div><div class="tap-hint">Нажмите на карточку, чтобы увидеть ответ</div></div>`}
        </div>
        <div style="display:flex; gap:.5rem; margin:.6rem 0; flex-wrap:wrap;">
          <button type="button" id="btnPrev" class="btn" title="Назад">←</button>
          <button type="button" id="btnNext" class="btn" title="Вперёд">→</button>
        </div>
        <form id="answer-form" autocomplete="off">
          <input id="answer" type="text" placeholder="Польский вариант" value="${escapeAttr(answerValue)}" ${lastResult === false ? 'style="border:2px solid #ef4444"' : ''} ${hasInlineBlank ? 'class="hidden-answer-input"' : ''} />
          <div style="display:flex; gap:.5rem; margin-top:.6rem; flex-wrap:wrap;">
            <button class="btn-primary">Проверить</button>
            <button type="button" id="toggle-hint" class="btn-accent">${showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</button>
            ${hasRules ? '<button type="button" id="view-rules" class="btn">Посмотреть правило</button>' : ''}
          </div>
        </form>
        ${showAnswer ? `<div class="choices" style="margin-top:.25rem;">
            <button id="btn-correct" class="btn-ok">👍 Угадал</button>
            <button id="btn-wrong" class="btn-bad">👎 Не угадал</button>
          </div>` : ''}
        <div id="feedback" class="feedback ${lastResult === true ? 'ok' : lastResult === false ? 'bad' : ''}">
          ${lastResult === true ? 'Верно!' : lastResult === false && showAnswer ? `Неправильно. Ваш ответ был: - ${escapeHtml(lastUserAnswer || '')} Попробуйте ещё или откройте ответ.` : ''}
        </div>
        <div style="color:#64748b; display:flex; gap:.5rem; flex-wrap:wrap;">
          <div>Верно: <b>${known}</b></div>
          <div>Неправильно: <b>${unknown}</b></div>
          <div>Всего: <b>${total}</b></div>
        </div>
        <p style="color:#64748b">Задание ${index+1} из ${order.length}</p>
      </div>
      ${hasRules && rulesVisible ? renderRulesOverlay() : ''}
    `;

    document.getElementById('back').onclick = () => { window.location.href = 'index.html'; };

    const formEl = document.getElementById('answer-form');
    const toggleHintBtn = document.getElementById('toggle-hint');
    const inlineInput = document.getElementById('inline-answer');
    if(formEl){
      formEl.onsubmit = e => {
        e.preventDefault();
        const inputNode = inlineInput ? inlineInput : formEl.answer;
        const userInput = inputNode.value.trim();
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
        answerValue = isOk ? '' : userInput;
        showAnswer = !isOk;

        if(isOk) nextCard(); else render();
      };
      toggleHintBtn.onclick = e => { e.preventDefault(); showAnswer = !showAnswer; render(); };
      if(inlineInput){
        inlineInput.value = answerValue;
        inlineInput.addEventListener('input', () => {
          answerValue = inlineInput.value;
          formEl.answer.value = inlineInput.value;
        });
      } else {
        formEl.answer.addEventListener('input', () => {
          answerValue = formEl.answer.value;
        });
      }
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

    const rulesBtn = document.getElementById('view-rules');
    if(rulesBtn){
      rulesBtn.onclick = e => { e.preventDefault(); rulesVisible = true; render(); };
    }

    if(rulesVisible){
      const overlay = document.getElementById('rules-overlay');
      const closeBtn = document.getElementById('close-rules');
      if(closeBtn){
        closeBtn.onclick = () => { rulesVisible = false; render(); };
      }
      if(overlay){
        overlay.onclick = (event) => {
          if(event.target === overlay){
            rulesVisible = false;
            render();
          }
        };
      }
    }

    setTimeout(() => {
      const inline = document.getElementById('inline-answer');
      if(inline){ inline.focus(); }
      else {
        const ans = document.getElementById('answer');
        if(ans) ans.focus();
      }
    }, 0);
  }

  function renderResults(){
    const { total, known, unknown } = calcStats();
    const errors = stats.filter(s => s.attempts > 1);
    const rows = [...stats].sort((a,b)=> b.attempts - a.attempts).map(s => {
      const w = words[s.wi];
      return `<tr><td>${escapeHtml(w.front)} – ${escapeHtml(w.back)}</td><td>${s.lastWrong ? escapeHtml(s.lastWrong) : '-'}</td><td style="text-align:center;">${s.attempts}</td></tr>`;
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
        ${hasRules ? '<button id="show-rules-again" class="btn">К правилам</button>' : ''}
      </div>
    `;

    document.getElementById('back').onclick = () => { start(); };
    document.getElementById('repeat-all').onclick = () => { start(); };
    document.getElementById('to-menu').onclick = () => { window.location.href = 'index.html'; };
    const rulesBtn = document.getElementById('show-rules-again');
    if(rulesBtn){
      rulesBtn.onclick = () => {
        if(hasRules){
          stage = 'intro';
          render();
        }
      };
    }
    const rep = document.getElementById('repeat-errors');
    if(rep){
      rep.onclick = () => {
        order = stats.filter(s => s.attempts > 1).map(e => e.wi);
        stats = order.map(i => ({ wi: i, attempts: 0, lastWrong: null }));
        index = 0;
        showAnswer = false;
        lastResult = null;
        lastUserAnswer = null;
        answerValue = '';
        rulesVisible = false;
        startTime = Date.now();
        render();
      };
    }
  }

  function renderRulesOverlay(){
    return `
      <div class="rules-overlay" id="rules-overlay">
        <div class="rules-dialog">
          <div class="rules-dialog-header">
            <h3>Правило</h3>
            <button type="button" id="close-rules" aria-label="Закрыть" class="btn">×</button>
          </div>
          <div class="rules-dialog-body">${set.rules}</div>
        </div>
      </div>
    `;
  }

  function nextCard(delay = 250){
    if(index >= order.length) return;
    index++;
    showAnswer = false;
    lastUserAnswer = null;
    answerValue = '';
    setTimeout(() => { lastResult = null; render(); }, delay);
  }

  function prevCard(){
    if(index <= 0) return;
    index--;
    showAnswer = false;
    lastResult = null;
    lastUserAnswer = null;
    answerValue = '';
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
    answerValue = '';
    rulesVisible = false;
    stage = 'practice';
    render();
  }

  function shuffle(arr){
    for(let i = arr.length -1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function vibrate(ms){ if(navigator.vibrate) try{ navigator.vibrate(ms); } catch(e){} }

  function escapeHtml(str){
    if(str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str){
    return escapeHtml(str).replace(/`/g, '&#96;');
  }

  function buildInlineTask(text){
    const safeParts = (text || '').split(/(_{3,})/);
    return safeParts.map(part => {
      if(/_{3,}/.test(part)){
        return '<span class="inline-answer"><input id="inline-answer" type="text" placeholder="Ответ" value="' + escapeAttr(answerValue) + '" /></span>';
      }
      return escapeHtml(part);
    }).join('');
  }

  function ensureTrainerStyles(){
    if(document.getElementById('rules-trainer-styles')) return;
    const style = document.createElement('style');
    style.id = 'rules-trainer-styles';
    style.textContent = `
      .hidden-answer-input{ display:none; }
      .inline-answer input{
        min-width: 140px;
        padding: .25rem .5rem;
        font-size: clamp(1rem, 2.4vw, 1.2rem);
        border-radius: 8px;
        border: 1px solid #cbd5e1;
      }
      .inline-answer input:focus{ border-color: var(--primary); box-shadow: 0 0 0 3px rgba(76,201,240,.2); outline:none; }
      .rules-overlay{
        position: fixed;
        inset: 0;
        background: rgba(15,23,42,.55);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        z-index: 50;
      }
      .rules-dialog{
        max-width: min(960px, 95vw);
        max-height: min(90vh, 720px);
        background: var(--card, #ffffff);
        color: var(--text, #0f172a);
        border-radius: 16px;
        box-shadow: 0 30px 60px rgba(15,23,42,.35);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .rules-dialog-header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:.75rem 1rem;
        border-bottom:1px solid rgba(148,163,184,.35);
      }
      .rules-dialog-header h3{ margin:0; font-size:1.1rem; }
      .rules-dialog-body{
        padding:1rem 1.25rem;
        overflow:auto;
        background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
      }
      .rules-intro{ display:flex; flex-direction:column; gap:1rem; }
      .rules-scroll{
        max-height:min(70vh, 560px);
        overflow:auto;
        padding:1rem 1.25rem;
        border-radius:16px;
        background: linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%);
        border:1px solid rgba(148,163,184,.3);
      }
      .rules-intro-actions{ display:flex; justify-content:flex-end; }
      .rule-container h1{ text-align:center; color:#4c1d95; }
      .rule-container h2{ color:#1d4ed8; border-bottom:2px solid rgba(59,130,246,.35); padding-bottom:.4rem; }
      .rule-container table{ width:100%; border-collapse:collapse; margin:1rem 0; }
      .rule-container th, .rule-container td{ border:1px solid rgba(148,163,184,.35); padding:.5rem .75rem; text-align:left; }
      .rule-container tbody tr:nth-child(odd){ background:rgba(99,102,241,.05); }
      .rule-container .irregular th{ background:#dc2626; color:#fff; }
      .rule-container .irregular tr:nth-child(odd){ background:rgba(220,38,38,.1); }
      .rule-container .highlight{ background:#fde68a; padding:0 .2rem; border-radius:4px; }
      .rule-box{ background:linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%); border-left:4px solid #4f46e5; padding:1rem; border-radius:12px; }
    `;
    document.head.appendChild(style);
  }

  window.addEventListener('keydown', (e) => {
    if(stage !== 'practice' || rulesVisible) return;
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if(tag === 'input' || tag === 'textarea' || e.ctrlKey || e.metaKey || e.altKey) return;
    if(e.key === 'ArrowLeft'){ e.preventDefault(); prevCard(); }
    else if(e.key === 'ArrowRight'){ e.preventDefault(); nextCard(0); }
  });

  if(showRulesFirst){
    render();
  } else {
    start();
  }
}

window.initWordTrainer = initWordTrainer;
