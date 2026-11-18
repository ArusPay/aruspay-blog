// Verifies built HTML in dist/blog. Run after `npm run build:<env>`.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

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

// Exact serialisation Astro emits for the beacon tag (attributes after `<script`).
const BEACON = /^ defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js" data-cf-beacon="\{&quot;token&quot;:&quot;[a-f0-9]{32}&quot;\}"$/;

const SITE = 'https://aruspay.com.my';

// dist/blog/en/x/index.html -> https://aruspay.com.my/blog/en/x/
function urlForFile(file) {
  const rel = relative('dist', file).split(sep).join('/'); // blog/en/x/index.html
  return `${SITE}/${rel.replace(/index\.html$/, '')}`;
}
function fileForUrl(url) {
  if (!url.startsWith(`${SITE}/`)) return null;
  const path = url.slice(SITE.length + 1);
  return join('dist', path.endsWith('/') ? `${path}index.html` : path);
}

for (const file of htmlFiles(ROOT)) {
  const html = readFileSync(file, 'utf8');

  // Backstop against active content, whatever the source (markdown, frontmatter, templates).
  // Production may carry exactly one script besides JSON-LD: the Cloudflare Web Analytics beacon.
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    if (/type\s*=\s*["']?application\/ld\+json/i.test(m[1])) continue;
    if (env === 'production' && BEACON.test(m[1])) continue;
    fail(file, `unexpected <script> (${m[0].slice(0, 80)})`);
  }
  for (const m of html.matchAll(/<[a-z][^>]*>/gi)) {
    if (/\son[a-z]+\s*=/i.test(m[0])) fail(file, `inline event handler in ${m[0].slice(0, 60)}`);
  }
  if (/javascript:/i.test(html)) fail(file, 'javascript: URL present');
  if (/<(iframe|object|embed|form)\b/i.test(html)) fail(file, 'iframe/object/embed/form element present');

  if (file.endsWith('404.html')) continue;
  if (!/<link rel="canonical" href="https:\/\/aruspay\.com\.my\/blog\//.test(html)) fail(file, 'canonical missing or not on aruspay.com.my/blog');
  for (const h of ['en', 'ms', 'x-default']) {
    if (!html.includes(`hreflang="${h}"`)) fail(file, `hreflang ${h} missing`);
  }
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  if (canonical && canonical !== urlForFile(file)) fail(file, `canonical ${canonical} != ${urlForFile(file)}`);
  for (const m of html.matchAll(/<link rel="alternate" hreflang="[^"]*" href="([^"]*)"/g)) {
    const target = fileForUrl(m[1]);
    if (!target || !existsSync(target)) fail(file, `hreflang href ${m[1]} has no built file`);
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

const postsDir = 'src/content/posts';
for (const slug of readdirSync(postsDir)) {
  const src = join(postsDir, slug, 'en.md');
  if (!existsSync(src)) continue;
  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(readFileSync(src, 'utf8'))?.[1] ?? '';
  const isDraft = /^draft:\s*true\b/m.test(frontmatter);
  const built = existsSync(join(ROOT, 'en', slug, 'index.html'));
  if (isDraft && env === 'production' && built) fail(slug, 'draft built in production');
  if (isDraft && env === 'staging' && !built) fail(slug, 'draft missing on staging');
  if (!isDraft && !built) fail(slug, 'published post not built');
}

const headers = readFileSync('dist/_headers', 'utf8');
if (env === 'staging' && !headers.includes('X-Robots-Tag: noindex')) fail('dist/_headers', 'staging without X-Robots-Tag');
if (env === 'production' && headers.includes('noindex')) fail('dist/_headers', 'production has noindex');
if (!headers.includes('Content-Security-Policy:') || !headers.includes('X-Content-Type-Options: nosniff')) fail('dist/_headers', 'CSP / nosniff missing');
if (!existsSync('dist/.assetsignore') || !readFileSync('dist/.assetsignore', 'utf8').includes('.blog-env')) fail('dist/.assetsignore', 'missing or does not ignore .blog-env');

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`check-build OK (${env})`);
