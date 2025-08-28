const decks = {
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
  }
};

const params = new URLSearchParams(location.search);
const key = params.get('set') || 'basic_words';
const deck = decks[key] || decks.basic_words;

const script = document.createElement('script');
script.src = deck.src;
script.onload = () => {
  document.title = `Словарный тренажёр — ${deck.title}`;
  initWordTrainer({ title: deck.title, words: CARDS });
};
document.head.appendChild(script);

