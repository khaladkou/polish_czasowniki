const decks = {
  injury_rehab: {
    title: 'Травмы и восстановление руки',
    src: 'cards/injury_rehab.js'
  },
  basic_words: {
    title: 'Базовые слова',
    src: 'cards/basic_words.js'
  },
  common_phrases: {
    title: 'Повседневные фразы',
    src: 'cards/common_phrases.js'
  },
  time_phrases: {
    title: 'Про дни и время фразы',
    src: 'cards/times.js'
  },
  business_idioms: {
    title: 'Бизнес-идиомы',
    src: 'cards/business_idioms.js'
  },
  lem_1: {
    title: 'Lem 1',
    src: 'cards/lem_1.js'
  }
};

const params = new URLSearchParams(location.search);
const key = params.get('set') || 'injury_rehab';
const deck = decks[key] || decks.basic_words;

const script = document.createElement('script');
script.src = deck.src;
script.onload = () => {
  document.title = `Словарный тренажёр — ${deck.title}`;
  initWordTrainer({ title: deck.title, words: CARDS });
};
document.head.appendChild(script);

