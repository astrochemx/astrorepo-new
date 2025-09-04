import fs from 'node:fs';

const file = 'dist/pagefind/pagefind.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\?ts=\$\{Date\.now\(\)\}/g, '');

fs.writeFileSync(file, content, 'utf8');

console.log('✅ Pagefind Fix successfully applied!');
