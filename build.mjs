import fs from 'fs';
import rawSets from './sets/index.js';

// build main bundle
let main = fs.readFileSync('main.js','utf8');
main = main.replace("import rawSets from './sets/index.js';", `const rawSets = ${JSON.stringify(rawSets)};`);
fs.writeFileSync('bundle.js', main);

