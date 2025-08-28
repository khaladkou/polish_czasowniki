import rawSets from './sets/index.js';

function expandForms(forms) {
  const res = {};
  for (const time of Object.keys(forms)) {
    const t = forms[time];
    const newT = {};
    for (const person of Object.keys(t)) {
      const f = t[person];
      if (["ja", "ty", "my", "wy"].includes(person)) {
        const plParts = f.pl.split('/').map(s => s.trim());
        const ruParts = f.ru.split('/').map(s => s.trim());
        const hasTwo = plParts.length > 1;

        const ruMale = ruParts.length > 1 ? ruParts[0] : f.ru.replace('муж./жен.', 'муж.') + (ruParts.length === 1 && !f.ru.includes('муж./жен.') ? ' (муж.)' : '');
        const ruFem  = ruParts.length > 1 ? ruParts[1] : f.ru.replace('муж./жен.', 'жен.') + (ruParts.length === 1 && !f.ru.includes('муж./жен.') ? ' (жен.)' : '');

        const plMale = hasTwo ? plParts[0] : plParts[0];
        const plFem  = hasTwo ? plParts[1] : plParts[0];
        newT[person + '_m'] = { pl: plMale, ru: ruMale };
        newT[person + '_f'] = { pl: plFem,  ru: ruFem };
      } else {
        newT[person] = f;
      }
    }
    res[time] = newT;
  }
  return res;
}

const sets = rawSets.map(set => ({
  ...set,
  verbs: set.verbs.map(v => ({
    ...v,
    forms: expandForms(v.forms)
  }))
}));

const TIMES = ['present', 'past', 'future'];
const PERSONS = [
  'ja_m','ja_f','ty_m','ty_f','on','ona','ono','my_m','my_f','wy_m','wy_f','oni','one'
];

const timeLabels = { present: 'Настоящее', past: 'Прошедшее', future: 'Будущее' };
const personLabels = { ja_m:'я (муж.)', ja_f:'я (жен.)', ty_m:'ты (муж.)', ty_f:'ты (жен.)', on:'он', ona:'она', ono:'оно', my_m:'мы (муж.)', my_f:'мы (жен.)', wy_m:'вы (муж.)', wy_f:'вы (жен.)', oni:'они (муж.)', one:'они (жен.)' };
const pronounPlLabels = { ja_m:'ja', ja_f:'ja', ty_m:'ty', ty_f:'ty', on:'on', ona:'ona', ono:'ono', my_m:'my', my_f:'my', wy_m:'wy', wy_f:'wy', oni:'oni', one:'one' };
const pronounGenderLabels = { ja_m:'męski', ja_f:'żeński', ty_m:'męski', ty_f:'żeński', my_m:'męski', my_f:'żeński', wy_m:'męski', wy_f:'żeński', oni:'męski', one:'żeński' };

function isValidForm(form){
  if (!form) return false;
  const val = v => typeof v === 'string' ? v.trim() : '';
  const invalid = ['-', '—', ''];
  return !invalid.includes(val(form.pl)) && !invalid.includes(val(form.ru));
}

const app = document.getElementById('app');

let state = {
  screen: 'menu', // menu | set | practice
  currentSet: null,
  practiceQueue: [],
  practiceIndex: 0,
  showAnswer: false,
  lastResult: null,
  stats: [],
  lastUserAnswer: null
};

function render(){
  if (state.screen === 'menu') return renderMenu();
  if (state.screen === 'set') return renderSet();
  if (state.screen === 'practice') return renderPractice();
}

// ---------------- MENU ----------------
function renderMenu(){
  app.innerHTML = `
    <h1>Польские глаголы: тренажёр</h1>
    <section>
      <h2>Глаголы во всех временах и местоимениях</h2>
      <p>Каждый набор включает таблицы и тренажёр со всеми временами и местоимениями.</p>
      <ul>
        ${sets.map((set, i) => `
          <li>
            <a href="#" data-set="${i}" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">${set.title}</a>
          </li>
        `).join('')}
      </ul>
    </section>
    <section>
      <h2>Карточки</h2>
      <ul>
        <li><a href="adverbs.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Польские наречия</a></li>
        <li><a href="adverbs_opinion.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Польские разговорные наречия</a></li>
        <li><a href="pronouns.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Польские местоимения</a></li>
        <li><a href="kitchen.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Польские термины кухни</a></li>
        <li><a href="construction.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Польские строительные термины</a></li>
      </ul>
    </section>
    <section>
      <h2>Словарный тренажёр</h2>
      <ul>
        <li><a href="words.html" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Базовые слова</a></li>
        <li><a href="words.html?set=common_phrases" style="font-weight:700; font-size:1.15rem; text-decoration:none; color:inherit;">Повседневные фразы</a></li>
      </ul>
    </section>
  `;

  app.querySelectorAll('a[data-set]').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      state.currentSet = sets[link.dataset.set];
      state.screen = 'set';
      render();
    };
  });
}

// ---------------- SET VIEW ----------------
function renderSet(){
  const set = state.currentSet;
  let table = '';
  set.verbs.forEach(verb => {
    table += `
      <h3>${verb.ru} (<i>${verb.pl}</i>)</h3>
      ${TIMES.map(time => `
        <b>${timeLabels[time]}</b>
        <table>
          <tr>
            ${PERSONS.map(p => `<th>${capitalize(personLabels[p] || p)}</th>`).join('')}
          </tr>
          <tr>
            ${PERSONS.map(p => {
      const f = verb.forms[time]?.[p];
      return `<td>${isValidForm(f) ? `<b>${f.pl}</b><br><small style="color:#64748b;">${f.ru}</small>` : '-'}</td>`;
    }).join('')}
          </tr>
        </table>
      `).join('')}
    `;
  });

  app.innerHTML = `
    <div class="topbar"><button id="back" class="btn">← К подборкам</button></div>
    <h2>${set.title}</h2>
    <p>${set.description}</p>
    <button id="practice" class="btn-primary">Тренировка</button>
    <div style="margin-top:1rem;">${table}</div>
  `;

  document.getElementById('back').onclick = () => { state.screen = 'menu'; render(); };
  document.getElementById('practice').onclick = () => startPractice(set);
}

function startPractice(set){
  const queue = [];
  set.verbs.forEach((verb, vi) => {
    TIMES.forEach(time => {
      PERSONS.forEach(person => {
        const form = verb.forms[time]?.[person];
        if (isValidForm(form)) queue.push({ vi, time, person });
      });
    });
  });
  shuffle(queue);
  state.practiceQueue = queue;
  state.practiceIndex = 0;
  state.screen = 'practice';
  state.showAnswer = false;
  state.lastResult = null;
  state.stats = queue.map(item => ({ ...item, attempts: 0, lastWrong: null }));
  state.lastUserAnswer = null;
  render();
}

// ---------------- PRACTICE ----------------
function renderPractice(){
  const set = state.currentSet;
  const queue = state.practiceQueue;
  const i = state.practiceIndex;
  const done = i >= queue.length;

  if (done) return renderResults();

  const { vi, time, person } = queue[i];
  const verb = set.verbs[vi];
  const form = verb.forms[time][person];
  let formRuNoPronoun = form.ru.replace(/^(я|ты|он|она|оно|мы|вы|они)(\s|\s*\(.+\)\s*)/i, '').trim();
// убрать повторы рода вне местоимения
formRuNoPronoun = formRuNoPronoun.replace(/\s*\((муж\.|жен\.)\)\s*/gi, ' ').replace(/\s{2,}/g, ' ').trim();
  const pronounRus = capitalize(personLabels[person] || person);
  const pronounPl  = pronounPlLabels[person] || person;
  const pronounGender = pronounGenderLabels[person];

  app.innerHTML = `
    <div class="topbar"><button id="back" class="btn">← К подборке</button></div>
    <h2>Тренировка: ${set.title}</h2>

    <div class="practice-wrap">
      <div id="card" class="card" role="button" aria-pressed="${state.showAnswer}" tabindex="0">
        ${state.showAnswer
      ? `<div>
               <div class="label">Ответ</div>
               <div class="answer">${capitalize(pronounPl)}${pronounGender ? ` (${pronounGender})` : ''} ${form.pl}</div>
               <div class="tap-hint">Отметьте результат:</div>
             </div>`
      : `<div>
               <div class="label">Переведите</div>
               <div class="task">${pronounRus} ${formRuNoPronoun}</div>
               <div class="tap-hint">Нажмите на карточку, чтобы увидеть ответ</div>
             </div>`}
      </div>

      <form id="answer-form" autocomplete="off">
        <div style="margin:.25rem 0 .4rem; color:#64748b"><b>${pronounPl}</b></div>
        <input id="answer" type="text" placeholder="Польский вариант" ${state.lastResult === false ? 'style="border:2px solid #ef4444"' : ''} />
        <div style="display:flex; gap:.5rem; margin-top:.6rem; flex-wrap:wrap;">
          <button class="btn-primary">Проверить</button>
          <button type="button" id="toggle-hint" class="btn-accent">${state.showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</button>
        </div>
      </form>

      ${state.showAnswer
      ? `<div class="choices" style="margin-top:.25rem;">
             <button id="btn-correct" class="btn-ok">👍 Угадал</button>
             <button id="btn-wrong" class="btn-bad">👎 Не угадал</button>
           </div>`
      : ''}

      <div id="feedback" class="feedback ${state.lastResult === true ? 'ok' : state.lastResult === false ? 'bad' : ''}">
        ${state.lastResult === true
          ? 'Верно!'
          : state.lastResult === false && state.showAnswer
            ? `Неправильно. Ваш ответ был: - ${state.lastUserAnswer || ''} Попробуйте ещё или откройте ответ.`
            : ''}
      </div>

      <p style="color:#64748b">Задание ${i+1} из ${queue.length}</p>
    </div>
  `;

  document.getElementById('back').onclick = () => { state.screen = 'set'; render(); };

  const formEl = document.getElementById('answer-form');
  const toggleHintBtn = document.getElementById('toggle-hint');
  if (formEl){
    formEl.onsubmit = e => {
      e.preventDefault();
      const userInput = formEl.answer.value.trim();
      const userAns = userInput.toLowerCase();
      const stat = getCurrentStat();

      if (userAns === ""){
        state.showAnswer = !state.showAnswer;
        state.lastResult = null;
        render();
        return;
      }

      stat.attempts++;
      stat.lastWrong = userInput;
      const right = form.pl.toLowerCase().split('/').map(s=>s.trim());
      const isOk = right.some(r => userAns === r);

      state.lastResult = isOk;
      state.lastUserAnswer = userInput;
      state.showAnswer = !isOk;

      if (isOk) nextCard(); else render();
    };

    toggleHintBtn.onclick = e => { e.preventDefault(); state.showAnswer = !state.showAnswer; render(); };
  }

  const card = document.getElementById('card');
  if (card){
    const toggle = () => { state.showAnswer = !state.showAnswer; vibrate(10); render(); };
    card.onclick = toggle;
    card.onkeypress = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } };
  }

  const btnOk = document.getElementById('btn-correct');
  const btnBad = document.getElementById('btn-wrong');
  if (btnOk){
    btnOk.onclick = () => { state.lastResult = true; vibrate(15); nextCard(); };
  }
  if (btnBad){
    btnBad.onclick = () => {
      const stat = getCurrentStat();
      stat.attempts++;
      stat.lastWrong = '—';
      state.lastResult = false;
      vibrate(15);
      nextCard();
    };
  }

  setTimeout(() => { const ans = document.getElementById('answer'); if (ans) ans.focus(); }, 0);
}

function renderResults(){
  const set = state.currentSet;
  const errors = state.stats.filter(s => s.attempts > 1);
  const rows = [...state.stats].sort((a,b)=> b.attempts - a.attempts).map(s => {
    const verb = set.verbs[s.vi];
    const form = verb.forms[s.time][s.person];
    const pronounRus = capitalize(personLabels[s.person] || s.person);
    const pronounPl  = pronounPlLabels[s.person] || s.person;
    let formRuNoPronoun = form.ru.replace(/^(я|ты|он|она|оно|мы|вы|они)(\s|\s*\(.+\)\s*)/i, '').trim();
// убрать повторы рода вне местоимения
formRuNoPronoun = formRuNoPronoun.replace(/\s*\((муж\.|жен\.)\)\s*/gi, ' ').replace(/\s{2,}/g, ' ').trim();
    return `<tr>
      <td>${pronounRus} / ${pronounPl}</td>
      <td>${timeLabels[s.time]}</td>
      <td>${verb.ru} (${verb.pl})</td>
      <td>${formRuNoPronoun}</td>
      <td>${s.lastWrong ? s.lastWrong : '-'}</td>
      <td style="text-align:center;">${s.attempts}</td>
    </tr>`;
  }).join('');

  app.innerHTML = `
    <div class="topbar"><button id="back" class="btn">← К подборке</button></div>
    <h2>Результаты тренировки</h2>
    <table>
      <tr>
        <th>Местоимение</th>
        <th>Время</th>
        <th>Глагол</th>
        <th>Задание</th>
        <th>Ваш последний ответ</th>
        <th>Попыток</th>
      </tr>
      ${rows}
    </table>
    <p><b>${errors.length ? `Ошибки были в ${errors.length} словах.` : 'Все слова выполнены с первого раза!'}</b></p>
    <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
      ${errors.length ? '<button id="repeat-errors" class="btn-primary">Повторить только ошибочные</button>' : ''}
      <button id="repeat-all" class="btn-accent">Начать подборку заново</button>
      <button id="to-menu" class="btn">К списку подборок</button>
    </div>
  `;

  document.getElementById('back').onclick = () => { state.screen = 'set'; render(); };
  document.getElementById('repeat-all').onclick = () => { state.screen = 'set'; render(); };
  document.getElementById('to-menu').onclick = () => { state.screen = 'menu'; render(); };
  const rep = document.getElementById('repeat-errors');
  if (rep){
    rep.onclick = () => {
      state.practiceQueue = state.stats.filter(s=> s.attempts > 1).map(e => ({ vi: e.vi, time: e.time, person: e.person }));
      state.stats = state.practiceQueue.map(item => ({ ...item, attempts: 0, lastWrong: null }));
      state.practiceIndex = 0;
      state.screen = 'practice';
      state.showAnswer = false;
      state.lastResult = null;
      state.lastUserAnswer = null;
      render();
    };
  }
}

// ---------------- helpers ----------------
function getCurrentStat(){
  const { vi, time, person } = state.practiceQueue[state.practiceIndex];
  return state.stats.find(s => s.vi === vi && s.time === time && s.person === person);
}

function nextCard(){
  state.practiceIndex++;
  state.showAnswer = false; // всегда начинаем следующую карточку с вопроса
  state.lastUserAnswer = null;
  setTimeout(() => { state.lastResult = null; render(); }, 250);
}

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function capitalize(str){ return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }

function vibrate(ms){ if (navigator.vibrate) try { navigator.vibrate(ms); } catch(e){} }

render();
