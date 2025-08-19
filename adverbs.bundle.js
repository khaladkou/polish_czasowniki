const CARDS = [
  { front: "dopiero", back: "только, лишь\nPrzykład: Przyszedłem dopiero wczoraj.", hint: "" },
  { front: "nadal", back: "всё ещё\nPrzykład: On nadal mieszka w Warszawie.", hint: "" },
  { front: "przynajmniej", back: "по крайней мере\nPrzykład: Spróbuj przynajmniej trochę.", hint: "" },
  { front: "właśnie", back: "как раз, именно\nPrzykład: To jest właśnie то, czego potrzebuję.", hint: "" },
  { front: "czasami", back: "иногда\nPrzykład: Czasami oglądam telewizję.", hint: "" },
  { front: "rzadko", back: "редко\nPrzykład: On rzadko się uśmiecha.", hint: "" },
  { front: "prawie", back: "почти\nPrzykład: Prawie skończyłem pracę.", hint: "" },
  { front: "od razu", back: "сразу\nPrzykład: Zrozumiałem od razu.", hint: "" },
  { front: "wkrótce", back: "вскоре\nPrzykład: Spotkamy się wkrótce.", hint: "" },
  { front: "doprawdy", back: "действительно\nPrzykład: To jest doprawdy dziwne.", hint: "" },
  { front: "chyba", back: "наверное\nPrzykład: Chyba pada deszcz.", hint: "" },
  { front: "pewnie", back: "конечно, наверное\nPrzykład: Pewnie masz rację.", hint: "" },
  { front: "raczej", back: "скорее, пожалуй\nPrzykład: To raczej не jest dobry pomysł.", hint: "" },
  { front: "właściwie", back: "вообще-то, собственно\nPrzykład: Właściwie то не wiem.", hint: "" },
  { front: "dokładnie", back: "точно, именно так\nPrzykład: Dokładnie o to mi chodzi.", hint: "" },
  { front: "zupełnie", back: "совершенно\nPrzykład: To zupełnie nowa sytuacja.", hint: "" },
  { front: "naprawdę", back: "действительно, правда\nPrzykład: To naprawdę piękne miejsce.", hint: "" },
  { front: "po prostu", back: "просто\nPrzykład: To jest po prostu łatwe.", hint: "" },
  { front: "akurat", back: "как раз, именно\nPrzykład: Akurat wtedy byłem w domu.", hint: "" },
  { front: "jednak", back: "однако\nPrzykład: Chciałem iść, jednak zostałem.", hint: "" },
  { front: "mimo to", back: "несмотря на это\nPrzykład: Było ciężко, mimo to udało się.", hint: "" },
  { front: "zatem", back: "итак, следовательно\nPrzykład: Zatem zaczynajmy.", hint: "" },
  { front: "więc", back: "значит, итак\nPrzykład: Było późно, więc poszedłem spać.", hint: "" },
  { front: "potem", back: "потом\nPrzykład: Najpierw obiad, potem spacer.", hint: "" },
  { front: "następnie", back: "затем\nPrzykład: Najpierw spotkanie, następnie kolacja.", hint: "" },
  { front: "obecnie", back: "в настоящее время\nPrzykład: Obecnie pracuję zdalnie.", hint: "" },
  { front: "dopóki co", back: "пока что\nPrzykład: Jest dobrze, dopóki co.", hint: "" },
  { front: "ciągle", back: "постоянно, всё время\nPrzykład: On ciągle o tym mówi.", hint: "" },
  { front: "stale", back: "непрерывно\nPrzykład: Stale rośnie liczba użytkowników.", hint: "" },
  { front: "wciąż", back: "всё ещё\nPrzykład: Wciąż czekam на odpowiedź.", hint: "" },
  { front: "natomiast", back: "зато, а вот\nPrzykład: Nie lubię kawy, natomiast herbatę uwielbiam.", hint: "" },
  { front: "tymczasem", back: "тем временем\nPrzykład: Tymczasem w domu panował spokój.", hint: "" },
  { front: "przede wszystkim", back: "прежде всего\nPrzykład: Przede wszystkim musimy быть spokojni.", hint: "" },
  { front: "co najmniej", back: "как минимум\nPrzykład: Potrzebuję co najmniej godziny.", hint: "" },
  { front: "zupełnie inaczej", back: "совсем иначе\nPrzykład: Wygląda to zupełnie inaczej niż wcześniej.", hint: "" },
  { front: "nigdy", back: "никогда\nPrzykład: Nigdy tego не widziałem.", hint: "" },
  { front: "wszędzie", back: "везде\nPrzykład: Szukaliśmy wszędzie.", hint: "" },
  { front: "gdzieś", back: "где-то\nPrzykład: Musiałem to zostawić gdzieś w biurze.", hint: "" },
  { front: "ani trochę", back: "ни капли\nPrzykład: Nie jestem ani trochę zmęczony.", hint: "" },
  { front: "od dawna", back: "давно\nPrzykład: Znamy się od dawna.", hint: "" },
  { front: "wreszcie", back: "наконец\nPrzykład: Wreszcie się udało.", hint: "" },
  { front: "na pewno", back: "наверняка, точно\nPrzykład: To się na pewno wydarzy.", hint: "" },
  { front: "przypadkiem", back: "случайно\nPrzykład: Spotkaliśmy się przypadkiem.", hint: "" },
  { front: "dopóki", back: "пока (не)\nPrzykład: Poczekaj tutaj, dopóki не wrócę.", hint: "" },
  { front: "ledwo", back: "едва\nPrzykład: Ledwo mogę oddychać.", hint: "" },
  { front: "najwyraźniej", back: "очевидно\nPrzykład: Najwyraźniej się pomyliłem.", hint: "" },
  { front: "без wątpienia", back: "без сомнения\nPrzykład: To jest без wątpienia ważne.", hint: "" },
  { front: "znowu", back: "снова, опять\nPrzykład: On znowu się spóźnił.", hint: "" },
  { front: "od niedawna", back: "недавно\nPrzykład: Mieszkam tu od niedawna.", hint: "" },
  { front: "w dodatku", back: "вдобавок, к тому же\nPrzykład: Było zimno, a w dodatku padał deszcz.", hint: "" },
];
function initFlashcards(cards){
  const CARDS = cards;
/** ========================
 *  СОСТОЯНИЕ
 *  ======================== */
let order = CARDS.map((_, i) => i);
let idx = 0;
let side = "front";
const verdict = new Array(CARDS.length).fill(null);

/** ========================
 *  ШРИФТ — управление и сохранение
 *  ======================== */
const FONT_KEY = "flashcards_font_scale_v1";
const FONT_STEPS = Array.from({length: 12}, (_, i) => ({
  front: `${28 + i*4}px`,
  back: `${18 + i*2}px`
}));
let fontIndex = 1;
function applyFontStep(i){
  fontIndex = Math.max(0, Math.min(FONT_STEPS.length-1, i));
  const step = FONT_STEPS[fontIndex];
  document.documentElement.style.setProperty("--fs-front", step.front);
  document.documentElement.style.setProperty("--fs-back", step.back);
  localStorage.setItem(FONT_KEY, String(fontIndex));
}
function loadFontStep(){
  const saved = localStorage.getItem(FONT_KEY);
  if(saved !== null){
    const i = parseInt(saved, 10);
    if(!Number.isNaN(i)) applyFontStep(i); else applyFontStep(fontIndex);
  } else applyFontStep(fontIndex);
}

/** ========================
 *  УТИЛИТЫ И ОТРИСОВКА
 *  ======================== */
function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }
function recountStats(){
  const known = verdict.filter(v => v === "known").length;
  const unknown = verdict.filter(v => v === "unknown").length;
  document.getElementById("statKnown").textContent = known;
  document.getElementById("statUnknown").textContent = unknown;
  document.getElementById("statIndex").textContent = (order.length ? (idx+1) : 0);
  document.getElementById("statTotal").textContent = order.length;
}
function render(){
  const frontText = document.getElementById("frontText");
  const backText = document.getElementById("backText");
  const hintText = document.getElementById("hintText");
  const modeText = document.getElementById("modeText");
  const browse = document.getElementById("toggleBrowse").checked;
  modeText.textContent = browse ? "Пролистывание" : "Обычный";

  if(order.length === 0){
    frontText.textContent = "Нет карточек";
    backText.style.display = "none";
    hintText.style.display = "none";
    recountStats();
    return;
  }
  const card = CARDS[ order[idx] ];
  // Всегда показываем фронт при входе в карточку
  side = "front";
  frontText.textContent = card.front;
  backText.textContent = card.back;
  hintText.textContent = card.hint || "";

  if(browse){
    backText.style.display = "none";
    hintText.style.display = "none";
  } else {
    backText.style.display = (side === "back") ? "block" : "none";
    hintText.style.display = "none";
  }
  recountStats();
}
function flip(){
  if(document.getElementById("toggleBrowse").checked) return;
  side = (side === "front") ? "back" : "front";
  const backText = document.getElementById("backText");
  const hintText = document.getElementById("hintText");
  const card = CARDS[ order[idx] ];
  if(side === "back"){ 
    backText.style.display = "block";
    if(card.hint) hintText.style.display = "block"; else hintText.style.display = "none";
  }
  else { backText.style.display = "none"; hintText.style.display = "none"; }
}
function go(delta){
  idx = clamp(idx + delta, 0, order.length - 1);
  side = "front";
  render();
}
function setVerdict(kind){
  const i = order[idx];
  const current = verdict[i];
  verdict[i] = (current === kind) ? null : kind;
  recountStats();
}
function resetStats(){
  for(let i=0;i<verdict.length;i++) verdict[i] = null;
  recountStats();
}
function shuffle(){
  for(let i = order.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  idx = 0; side = "front";
  render();
}

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 2000);
}

function respond(kind){
  setVerdict(kind);
  if(idx >= order.length - 1){
    idx = 0;
    side = "front";
    render();
    showToast("Список закончен");
  } else {
    go(1);
  }
}

/** ========================
 *  СВЯЗЬ С UI
 *  ======================== */
document.getElementById("btnPrev").addEventListener("click", () => go(-1));
document.getElementById("btnNext").addEventListener("click", () => go(1));
document.getElementById("card").addEventListener("click", flip);
document.getElementById("btnKnow").addEventListener("click", () => respond("known"));
document.getElementById("btnDontKnow").addEventListener("click", () => respond("unknown"));
document.getElementById("btnReset").addEventListener("click", resetStats);
document.getElementById("btnShuffle").addEventListener("click", shuffle);
document.getElementById("toggleBrowse").addEventListener("change", render);
document.getElementById("fontInc").addEventListener("click", () => applyFontStep(fontIndex + 1));
document.getElementById("fontDec").addEventListener("click", () => applyFontStep(fontIndex - 1));
document.getElementById("fontReset").addEventListener("click", () => applyFontStep(1));
const btnHome = document.getElementById("btnHome");
if(btnHome) btnHome.addEventListener("click", () => { window.location.href = "index.html"; });

// Горячие клавиши
window.addEventListener("keydown", (e) => {
  const tag = (e.target && e.target.tagName || "").toLowerCase();
  if(tag === "input" || tag === "textarea" || e.ctrlKey || e.metaKey || e.altKey) return;
  if(e.key === "ArrowLeft"){ e.preventDefault(); go(-1); }
  else if(e.key === "ArrowRight"){ e.preventDefault(); go(1); }
  else if(e.key === " "){ e.preventDefault(); flip(); }
  else if(e.key.toLowerCase() === "k"){ e.preventDefault(); respond("known"); }
  else if(e.key.toLowerCase() === "n"){ e.preventDefault(); respond("unknown"); }
  else if(e.key.toLowerCase() === "r"){ e.preventDefault(); resetStats(); }
});

// Первичный рендер
loadFontStep();
render();

}

initFlashcards(CARDS);
