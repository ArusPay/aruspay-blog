import { readFileSync } from 'node:fs';
const want = process.argv[2];
const got = readFileSync('dist/.blog-env', 'utf8').trim();
if (got !== want) { console.error(`Refusing to deploy: dist was built for "${got}", expected "${want}"`); process.exit(1); }
console.log(`dist is a ${got} build`);
