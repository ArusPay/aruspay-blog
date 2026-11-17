// Writes dist/_headers (Workers static assets), dist/.blog-env (read by check-build.mjs)
// and dist/.assetsignore (keeps .blog-env out of the uploaded assets).
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function headersFor(env) {
  const csp = [
    "default-src 'self'", "script-src 'none'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data:",
    "font-src 'self'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'",
  ].join('; ');
  const rules = [`/blog/*\n  Content-Security-Policy: ${csp}\n  X-Content-Type-Options: nosniff`, '/blog/_astro/*\n  Cache-Control: public, max-age=31536000, immutable'];
  if (env === 'staging') rules.unshift('/*\n  X-Robots-Tag: noindex, nofollow');
  return rules.join('\n\n') + '\n';
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const env = process.env.BLOG_ENV === 'production' ? 'production' : 'staging';
  writeFileSync('dist/_headers', headersFor(env));
  writeFileSync('dist/.blog-env', env);
  writeFileSync('dist/.assetsignore', '.blog-env\n');
  console.log(`wrote dist/_headers for ${env}`);
}
