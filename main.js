import sets from './sets/index.js';

const TIMES = ['present', 'past', 'future'];
const PERSONS = [
  'ja', 'ty', 'on', 'ona', 'ono', 'my', 'wy', 'oni', 'one'
];

const timeLabels = {
  present: 'Настоящее',
  past: 'Прошедшее',
  future: 'Будущее'
};

const personLabels = {
  ja: 'я',
  ty: 'ты',
  on: 'он',
  ona: 'она',
  ono: 'оно',
  my: 'мы',
  wy: 'вы',
  oni: 'они (муж.)',
  one: 'они (жен.)'
};

const pronounPlLabels = {
  ja: 'ja',
  ty: 'ty',
  on: 'on',
  ona: 'ona',
  ono: 'ono',
  my: 'my',
  wy: 'wy',
  oni: 'oni',
  one: 'one'
};

const app = document.getElementById('app');

let state = {
  screen: 'menu', // menu | set | practice
  currentSet: null,
  practiceQueue: [],
  practiceIndex: 0,
  showAnswer: false,
  lastResult: null,
  stats: []
};

function render() {
  if (state.screen === 'menu') renderMenu();
  else if (state.screen === 'set') renderSet();
  else if (state.screen === 'practice') renderPractice();
}

// Главное меню — список наборов, название как ссылка
function renderMenu() {
  app.innerHTML = `
    <h1>Польские глаголы: тренажёр</h1>
    <p>Выберите подборку для изучения:</p>
    <ul>
      ${sets.map((set, i) => `
        <li>
          <a href="#" data-set="${i}" style="font-weight:bold; font-size:1.25em;">${set.title}</a>
          <span>: ${set.description}</span>
        </li>
      `).join('')}
    </ul>
    <hr>
    <small>Добавьте свои подборки в папку <code>/sets</code> и зарегистрируйте их в <code>sets/index.js</code></small>
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

// Просмотр набора: таблица глаголов и кнопка на практику
function renderSet() {
  const set = state.currentSet;
  let table = '';
  set.verbs.forEach(verb => {
    table += `
      <h3>${verb.ru} (<i>${verb.pl}</i>)</h3>
      ${TIMES.map(time => `
        <b>${timeLabels[time]}</b>
        <table border="1" style="margin-bottom:10px;">
          <tr>
            ${PERSONS.map(p => `<th>${capitalize(personLabels[p] || p)}</th>`).join('')}
          </tr>
          <tr>
            ${PERSONS.map(p => {
      const f = verb.forms[time]?.[p];
      return `<td>
                ${f ? `<b>${f.pl}</b><br><small>${f.ru}</small>` : '-'}
              </td>`;
    }).join('')}
          </tr>
        </table>
      `).join('')}
    `;
  });

  app.innerHTML = `
    <button id="back">← К подборкам</button>
    <h2>${set.title}</h2>
    <p>${set.description}</p>
    <button id="practice">Тренировка</button>
    <div>${table}</div>
  `;

  document.getElementById('back').onclick = () => {
    state.screen = 'menu';
    render();
  };

  document.getElementById('practice').onclick = () => {
    const queue = [];
    set.verbs.forEach((verb, vi) => {
      TIMES.forEach(time => {
        PERSONS.forEach(person => {
          const form = verb.forms[time]?.[person];
          if (form) queue.push({ vi, time, person });
        });
      });
    });
    shuffle(queue);
    state.practiceQueue = queue;
    state.practiceIndex = 0;
    state.screen = 'practice';
    state.showAnswer = false;
    state.lastResult = null;
    // Сброс статистики для новой тренировки
    state.stats = queue.map(item => ({
      ...item,
      attempts: 0,
      lastWrong: null
    }));
    render();
  };
}

// Тренировка: поочерёдно даём задания, статистика, повтор ошибок
function renderPractice() {
  const set = state.currentSet;
  const queue = state.practiceQueue;
  const i = state.practiceIndex;
  const done = i >= queue.length;

  if (done) {
    // Анализируем stats
    const errors = state.stats.filter(s => s.attempts > 1);
    let resultsTable = `
  <table border="1" style="margin:12px 0;">
    <tr>
      <th>Местоимение</th>
      <th>Время</th>
      <th>Глагол</th>
      <th>Задание</th>
      <th>Ваш последний ответ</th>
      <th>Попыток</th>
    </tr>
    ${[...state.stats].sort((a, b) => b.attempts - a.attempts).map(s => {
      const verb = set.verbs[s.vi];
      const form = verb.forms[s.time][s.person];
      const pronounRus = capitalize(personLabels[s.person] || s.person);
      const pronounPl = pronounPlLabels[s.person] || s.person;
      const formRuNoPronoun = form.ru.replace(/^(я|ты|он|она|оно|мы|вы|они)(\s|\s*\(.+\)\s*)/i, '').trim();
      return `<tr>
        <td>${pronounRus} / ${pronounPl}</td>
        <td>${timeLabels[s.time]}</td>
        <td>${verb.ru} (${verb.pl})</td>
        <td>${formRuNoPronoun}</td>
        <td>${s.lastWrong ? s.lastWrong : '-'}</td>
        <td style="text-align:center;">${s.attempts}</td>
      </tr>`;
    }).join('')}
  </table>
`;
    app.innerHTML = `
      <button id="back">← К подборке</button>
      <h2>Результаты тренировки</h2>
      ${resultsTable}
      <p><b>${errors.length ? `Ошибки были в ${errors.length} словах.` : 'Все слова выполнены с первого раза!'}</b></p>
      <div>
        ${errors.length
      ? `<button id="repeat-errors">Повторить только ошибочные</button>`
      : ''}
        <button id="repeat-all">Начать подборку заново</button>
        <button id="to-menu">К списку подборок</button>
      </div>
    `;
    document.getElementById('back').onclick = () => {
      state.screen = 'set';
      render();
    };
    document.getElementById('repeat-all').onclick = () => {
      state.screen = 'set';
      render();
    };
    document.getElementById('to-menu').onclick = () => {
      state.screen = 'menu';
      render();
    };
    if (errors.length) {
      document.getElementById('repeat-errors').onclick = () => {
        // только ошибочные слова
        state.practiceQueue = errors.map(e => ({
          vi: e.vi,
          time: e.time,
          person: e.person
        }));
        state.stats = state.practiceQueue.map(item => ({
          ...item,
          attempts: 0,
          lastWrong: null
        }));
        state.practiceIndex = 0;
        state.screen = 'practice';
        state.showAnswer = false;
        state.lastResult = null;
        render();
      };
    }
    return;
  }

  // Обычный режим тренировки
  const { vi, time, person } = queue[i];
  const verb = set.verbs[vi];
  const form = verb.forms[time][person];
  const formRuNoPronoun = form.ru.replace(/^(я|ты|он|она|оно|мы|вы|они)(\s|\s*\(.+\)\s*)/i, '').trim();
  const pronounRus = capitalize(personLabels[person] || person);
  const pronounPl = pronounPlLabels[person] || person;

  app.innerHTML = `
    <button id="back">← К подборке</button>
    <h2>Тренировка: ${set.title}</h2>
    <p><b>${pronounRus} / ${pronounPl}</b>: <span>${formRuNoPronoun}</span></p>
    <form id="answer-form" autocomplete="off">
      <input id="answer" placeholder="Польский вариант" autofocus
        ${state.lastResult === false ? 'style="border:2px solid red;"' : ''}>
      <button>Проверить</button>
      <button type="button" id="toggle-hint">${state.showAnswer ? 'Отключить подсказку' : 'Показать ответ'}</button>
    </form>
    <div id="feedback">
      ${state.lastResult === true ? '<span style="color:green;">Верно!</span>' : ''}
      ${state.lastResult === false && !state.showAnswer ? '<span style="color:red;">Неправильно. Попробуйте ещё или откройте ответ.</span>' : ''}
      ${state.showAnswer ? `<div><b>Ответ:</b> ${form.pl}</div>` : ''}
    </div>
    <p>Задание ${i+1} из ${queue.length}</p>
  `;

  document.getElementById('back').onclick = () => {
    state.screen = 'set';
    render();
  };

  // обработка формы
  const formEl = document.getElementById('answer-form');
  const toggleHintBtn = document.getElementById('toggle-hint');
  if (formEl) {
    formEl.onsubmit = e => {
      e.preventDefault();
      const { vi, time, person } = queue[i];
      const verb = set.verbs[vi];
      const form = verb.forms[time][person];
      const userAns = formEl.answer.value.trim().toLowerCase();
      // Найдём элемент в stats
      const stat = state.stats.find(s =>
        s.vi === vi && s.time === time && s.person === person
      );

      if (userAns === "") {
        state.showAnswer = !state.showAnswer;
        state.lastResult = null;
        render();
        return;
      }

      stat.attempts++;
      stat.lastWrong = userAns;

      const right = form.pl.toLowerCase().split('/').map(s=>s.trim());
      const isOk = right.some(r => userAns === r);

      state.lastResult = isOk;
      state.showAnswer = false;

      if (isOk) {
        state.practiceIndex++;
        setTimeout(() => {
          state.lastResult = null;
          render();
        }, 700);
      } else {
        render();
      }
    };

    toggleHintBtn.onclick = (e) => {
      e.preventDefault();
      state.showAnswer = !state.showAnswer;
      render();
    };
  }

  // Автофокус в поле ввода после проверки/перехода
  setTimeout(() => {
    const ans = document.getElementById('answer');
    if (ans) ans.focus();
  }, 0);
}

// Вспомогательные функции
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

render();
