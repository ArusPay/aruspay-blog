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
  it('locks down /blog/* with CSP and nosniff in both envs', () => {
    const scripts = {
      staging: "script-src 'none'",
      production: "script-src 'self' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com",
    };
    for (const env of ['staging', 'production']) {
      const h = headersFor(env);
      expect(h).toContain(`Content-Security-Policy: default-src 'self'; ${scripts[env]}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n`);
      expect(h).toMatch(/^\/blog\/\*\n(  .+\n)*  Content-Security-Policy: default-src 'self'; script-src [^\n]*; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'$/m);
      expect(h).toMatch(/^  X-Content-Type-Options: nosniff$/m);
    }
  });
  it('keeps noindex staging-only', () => {
    expect(headersFor('staging')).toContain('/*\n  X-Robots-Tag: noindex, nofollow');
    expect(headersFor('production')).not.toContain('X-Robots-Tag');
  });
  it('production CSP allows only Cloudflare Web Analytics as extra script/connect source', () => {
    const p = headersFor('production');
    expect(p).toContain("script-src 'self' https://static.cloudflareinsights.com");
    expect(p).toContain("connect-src 'self' https://cloudflareinsights.com");
    expect(headersFor('staging')).toContain("script-src 'none'");
    expect(headersFor('staging')).not.toContain('cloudflareinsights');
  });
});
