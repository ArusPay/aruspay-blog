// Verifies built HTML in dist/blog. Run after `npm run build:<env>`.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'dist/blog';
const env = readFileSync('dist/.blog-env', 'utf8').trim(); // written by write-headers.mjs
const errors = [];
const fail = (f, m) => errors.push(`${f}: ${m}`);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

if (!existsSync(join(ROOT, 'index.html'))) fail(ROOT, 'missing index.html');

for (const file of htmlFiles(ROOT)) {
  if (file.endsWith('404.html')) continue;
  const html = readFileSync(file, 'utf8');
  if (!/<link rel="canonical" href="https:\/\/aruspay\.com\.my\/blog\//.test(html)) fail(file, 'canonical missing or not on aruspay.com.my/blog');
  for (const h of ['en', 'ms', 'x-default']) {
    if (!html.includes(`hreflang="${h}"`)) fail(file, `hreflang ${h} missing`);
  }
  const stagingNoindex = /<meta name="robots" content="noindex, nofollow"\s*\/?>/.test(html);
  const anyNoindex = /<meta name="robots"[^>]*noindex/.test(html);
  if (env === 'staging' && !stagingNoindex) fail(file, 'staging page without noindex');
  if (env === 'production' && anyNoindex) fail(file, 'production page with noindex');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(file, 'invalid JSON-LD'); }
  }
  const isArticle = /\/blog\/(en|ms)\/(?!tags\/)[^/]+\/index\.html$/.test(file);
  if (isArticle && !html.includes('"@type":"Article"')) fail(file, 'article without Article JSON-LD');
}

const draftBuilt = existsSync(join(ROOT, 'en/contoh-artikel/index.html'));
if (env === 'production' && draftBuilt) fail('contoh-artikel', 'draft built in production');
if (env === 'staging' && !draftBuilt) fail('contoh-artikel', 'draft missing on staging');

const headers = readFileSync('dist/_headers', 'utf8');
if (env === 'staging' && !headers.includes('X-Robots-Tag: noindex')) fail('dist/_headers', 'staging without X-Robots-Tag');
if (env === 'production' && headers.includes('noindex')) fail('dist/_headers', 'production has noindex');

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`check-build OK (${env})`);
