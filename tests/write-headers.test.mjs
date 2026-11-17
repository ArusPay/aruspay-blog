import { describe, it, expect } from 'vitest';
import { headersFor } from '../scripts/write-headers.mjs';

describe('headersFor', () => {
  it('marks every staging response noindex', () => {
    const h = headersFor('staging');
    expect(h).toMatch(/^\/\*\n  X-Robots-Tag: noindex, nofollow$/m);
  });
  it('never marks production noindex', () => {
    expect(headersFor('production')).not.toMatch(/noindex/);
  });
  it('caches hashed assets for a year in both envs', () => {
    for (const env of ['staging', 'production']) {
      expect(headersFor(env)).toContain('/blog/_astro/*\n  Cache-Control: public, max-age=31536000, immutable');
    }
  });
});
