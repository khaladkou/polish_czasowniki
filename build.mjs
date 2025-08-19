import fs from 'fs';
import rawSets from './sets/index.js';

// build main bundle
let main = fs.readFileSync('main.js','utf8');
main = main.replace("import rawSets from './sets/index.js';", `const rawSets = ${JSON.stringify(rawSets)};`);
fs.writeFileSync('bundle.js', main);

// build standalone flashcard bundles to avoid module loading issues
function buildFlashcards(name){
  let cards = fs.readFileSync(`cards/${name}.js`, 'utf8');
  cards = cards.replace(/\nexport default CARDS;\s*$/, '');
  let flash = fs.readFileSync('flashcards.js', 'utf8');
  flash = flash.replace('export default ', '');
  const bundle = `${cards}\n${flash}\ninitFlashcards(CARDS);\n`;
  fs.writeFileSync(`${name}.bundle.js`, bundle);
}
['adverbs', 'pronouns'].forEach(buildFlashcards);
