const ruleSets = {
  adjectives_comparison: {
    title: 'Степени сравнения прилагательных',
    src: 'cards/rules_adjectives.js'
  }
};

const params = new URLSearchParams(location.search);
const key = params.get('set') || 'adjectives_comparison';
const chosen = ruleSets[key] || ruleSets.adjectives_comparison;

const script = document.createElement('script');
script.src = chosen.src;
script.onload = () => {
  const payload = window.RULES_PAYLOAD || {};
  const title = payload.title || chosen.title;
  const words = payload.words || [];
  const rules = payload.rules || '';
  document.title = `Правила — ${title}`;
  initWordTrainer({ title, words, rules, showRulesFirst: true });
  window.RULES_PAYLOAD = undefined;
};
document.head.appendChild(script);
