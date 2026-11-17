import { describe, it, expect } from 'vitest';
import { postPath, listPath, tagPath, absolute, alternates, tagAlternates, jsonLdScript, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '../src/lib/seo';

describe('paths', () => {
  it('builds trailing-slash paths under /blog', () => {
    expect(postPath('en', 'aruspay-vs-stripe')).toBe('/blog/en/aruspay-vs-stripe/');
    expect(listPath('ms')).toBe('/blog/ms/');
    expect(tagPath('en', 'payments')).toBe('/blog/en/tags/payments/');
    expect(absolute('/blog/en/')).toBe('https://aruspay.com.my/blog/en/');
  });
});

describe('alternates', () => {
  it('links both languages plus EN as x-default for a post', () => {
    expect(alternates('aruspay-vs-stripe')).toEqual([
      { hreflang: 'en', href: 'https://aruspay.com.my/blog/en/aruspay-vs-stripe/' },
      { hreflang: 'ms', href: 'https://aruspay.com.my/blog/ms/aruspay-vs-stripe/' },
      { hreflang: 'x-default', href: 'https://aruspay.com.my/blog/en/aruspay-vs-stripe/' },
    ]);
  });
  it('links list pages when slug is null', () => {
    expect(alternates(null).map((a) => a.href)).toEqual([
      'https://aruspay.com.my/blog/en/',
      'https://aruspay.com.my/blog/ms/',
      'https://aruspay.com.my/blog/',
    ]);
  });
});

describe('json-ld', () => {
  it('builds an Article', () => {
    const ld = articleJsonLd({
      title: 'T', description: 'D', url: 'https://aruspay.com.my/blog/en/x/', image: 'https://aruspay.com.my/blog/_astro/h.webp',
      datePublished: new Date('2026-11-17T00:00:00Z'), dateModified: new Date('2026-11-18T00:00:00Z'), lang: 'ms',
    }) as Record<string, unknown>;
    expect(ld['@type']).toBe('Article');
    expect(ld.inLanguage).toBe('ms');
    expect(ld.datePublished).toBe('2026-11-17T00:00:00.000Z');
    expect((ld.publisher as Record<string, unknown>).name).toBe('ArusPay');
  });
  it('builds a BreadcrumbList with positions', () => {
    const ld = breadcrumbJsonLd([{ name: 'Blog', url: 'u1' }, { name: 'Post', url: 'u2' }]) as { itemListElement: { position: number }[] };
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });
  it('returns null FAQ when empty', () => {
    expect(faqJsonLd([])).toBeNull();
    const ld = faqJsonLd([{ q: 'Q?', a: 'A.' }]) as { mainEntity: unknown[] };
    expect(ld.mainEntity).toHaveLength(1);
  });
});

describe('tagAlternates', () => {
  it('links per-language tag pages plus the EN tag page as x-default', () => {
    expect(tagAlternates('payments')).toEqual([
      { hreflang: 'en', href: 'https://aruspay.com.my/blog/en/tags/payments/' },
      { hreflang: 'ms', href: 'https://aruspay.com.my/blog/ms/tags/payments/' },
      { hreflang: 'x-default', href: 'https://aruspay.com.my/blog/en/tags/payments/' },
    ]);
  });
});

describe('jsonLdScript', () => {
  it('escapes < so frontmatter cannot close the script tag', () => {
    const ld = { headline: 'x </script><script>alert(1)</script>' };
    const out = jsonLdScript(ld);
    expect(out).not.toContain('</script>');
    expect(out).not.toContain('<');
    expect(JSON.parse(out)).toEqual(ld);
  });
});
