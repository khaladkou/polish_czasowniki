const CARDS = [
  { front: "Ja — я", back: "", hint: "" },
  { front: "mnie — меня", back: "Przykład: Nie ma mnie w domu.", hint: "" },
  { front: "mi — мне", back: "Przykład: Daj mi książkę.", hint: "" },
  { front: "mną — мной", back: "Przykład: Idź ze mną.", hint: "" },

  { front: "Ty — ты", back: "", hint: "" },
  { front: "ciebie/cię — тебя", back: "Przykład: Lubię ciebie.", hint: "" },
  { front: "tobie/ci — тебе", back: "Przykład: Powiem ci prawdę.", hint: "" },
  { front: "tobą — тобой", back: "Przykład: Idę z tobą.", hint: "" },

  { front: "On — он", back: "", hint: "" },
  { front: "jego/go/niego — его", back: "Przykład: Widzę go na ulicy.", hint: "" },
  { front: "jemu/mu — ему", back: "Przykład: Pomogę mu.", hint: "" },
  { front: "nim — им", back: "Przykład: Rozmawiam z nim.", hint: "" },

  { front: "Ona — она", back: "", hint: "" },
  { front: "jej/niej — её", back: "Przykład: Znam jej brata.", hint: "" },
  { front: "jej/niej — ей", back: "Przykład: Pomagam jej.", hint: "" },
  { front: "nią — ею", back: "Przykład: Jestem z nią.", hint: "" },

  { front: "Ono — оно", back: "", hint: "" },
  { front: "je/nie — jego (оно)", back: "Przykład: Widzę je.", hint: "" },
  { front: "mu/niemu — ему (оно)", back: "Przykład: Daj mu zabawkę.", hint: "" },
  { front: "nim — им (оно)", back: "Przykład: Bawi się nim.", hint: "" },

  { front: "My — мы", back: "", hint: "" },
  { front: "nas — нас", back: "Przykład: Oni widzą nas.", hint: "" },
  { front: "nam — нам", back: "Przykład: Powiedz nam historię.", hint: "" },
  { front: "nami — нами", back: "Przykład: Idź z nami.", hint: "" },

  { front: "Wy — вы", back: "", hint: "" },
  { front: "was — вас", back: "Przykład: Słyszę was.", hint: "" },
  { front: "wam — вам", back: "Przykład: Pomogę wam.", hint: "" },
  { front: "wami — вами", back: "Przykład: Rozmawiam z wami.", hint: "" },

  { front: "Oni/One — они", back: "", hint: "" },
  { front: "ich/nie — их", back: "Przykład: Znam ich dobrze.", hint: "" },
  { front: "im/nim — им", back: "Przykład: Pomogę im.", hint: "" },
  { front: "nimi — ими", back: "Przykład: Idę z nimi.", hint: "" },

  { front: "Siebie — себя", back: "", hint: "" },
  { front: "siebie — себя", back: "Przykład: Nie widzę siebie w lustrze.", hint: "" },
  { front: "sobie — себе", back: "Przykład: Kupiłem sobie prezent.", hint: "" },
  { front: "sobą — собой", back: "Przykład: Jestem z sobą szczęśliwy.", hint: "" },

  { front: "Mój — мой", back: "", hint: "" },
  { front: "mój — мой", back: "Przykład: To jest mój dom.", hint: "" },
  { front: "mojego — моего", back: "Przykład: Lubię mojego psa.", hint: "" },
  { front: "mojemu — моему", back: "Przykład: Pomagam mojemu bratu.", hint: "" },
  { front: "moim — моим", back: "Przykład: Idę z moim kolegą.", hint: "" },

  { front: "Twój — твой", back: "", hint: "" },
  { front: "twój — твой", back: "Przykład: To jest twój samochód.", hint: "" },
  { front: "twojego — твоего", back: "Przykład: Widzę twojego ojca.", hint: "" },
  { front: "twojemu — твоему", back: "Przykład: Pomogę twojemu dziecku.", hint: "" },
  { front: "twoim — твоим", back: "Przykład: Idę z twoim bratem.", hint: "" },

  { front: "Jego — jego", back: "", hint: "" },
  { front: "jego — jego (не изменяется)", back: "Przykład: To jest jego książka.", hint: "" },

  { front: "Jej — её", back: "", hint: "" },
  { front: "jej — её (не изменяется)", back: "Przykład: To jest jej kot.", hint: "" },

  { front: "Nasz — наш", back: "", hint: "" },
  { front: "nasz — наш", back: "Przykład: To jest nasz ogród.", hint: "" },
  { front: "naszego — нашего", back: "Przykład: Kocham naszego psa.", hint: "" },
  { front: "naszemu — нашему", back: "Przykład: Pomogę naszemu dziecku.", hint: "" },
  { front: "naszym — нашим", back: "Przykład: Idę z naszym kolegą.", hint: "" },

  { front: "Wasz — ваш", back: "", hint: "" },
  { front: "wasz — ваш", back: "Przykład: To jest wasz pokój.", hint: "" },
  { front: "waszego — вашего", back: "Przykład: Widzę waszego tatę.", hint: "" },
  { front: "waszemu — вашему", back: "Przykład: Pomogę waszemu dzieckу.", hint: "" },
  { front: "waszym — вашим", back: "Przykład: Idę z waszym przyjacielem.", hint: "" },

  { front: "Ich — их", back: "", hint: "" },
  { front: "ich — их (не изменяется)", back: "Przykład: To jest ich dom.", hint: "" },

  { front: "Swój — свой", back: "", hint: "" },
  { front: "swój — свой", back: "Przykład: Każdy kocha swój kraj.", hint: "" },
  { front: "swojego — своего", back: "Przykład: Znalazłem swojego kota.", hint: "" },
  { front: "swojemu — своему", back: "Przykład: Pomogę swojemu dziecku.", hint: "" },
  { front: "swoim — своим", back: "Przykład: Jestem ze swoim przyjacielem.", hint: "" }
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
