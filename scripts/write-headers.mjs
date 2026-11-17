// Temporary version; full implementation arrives in Task 5.
import { writeFileSync } from 'node:fs';
const env = process.env.BLOG_ENV === 'production' ? 'production' : 'staging';
writeFileSync('dist/.blog-env', env);
writeFileSync('dist/_headers', env === 'staging' ? '/*\n  X-Robots-Tag: noindex, nofollow\n' : '');
