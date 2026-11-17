// Writes dist/_headers (Workers static assets) and dist/.blog-env (read by check-build.mjs).
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function headersFor(env) {
  const rules = ['/blog/_astro/*\n  Cache-Control: public, max-age=31536000, immutable'];
  if (env === 'staging') rules.unshift('/*\n  X-Robots-Tag: noindex, nofollow');
  return rules.join('\n\n') + '\n';
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const env = process.env.BLOG_ENV === 'production' ? 'production' : 'staging';
  writeFileSync('dist/_headers', headersFor(env));
  writeFileSync('dist/.blog-env', env);
  console.log(`wrote dist/_headers for ${env}`);
}
