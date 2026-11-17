import { describe, it, expect } from 'vitest';
import { parsePostId, isVisible, pairPosts } from '../src/lib/posts';

describe('parsePostId', () => {
  it('splits slug and language', () => {
    expect(parsePostId('aruspay-vs-stripe/en')).toEqual({ slug: 'aruspay-vs-stripe', lang: 'en' });
    expect(parsePostId('aruspay-vs-stripe/ms')).toEqual({ slug: 'aruspay-vs-stripe', lang: 'ms' });
  });
  it('rejects unknown languages and bad slugs', () => {
    expect(() => parsePostId('aruspay-vs-stripe/fr')).toThrow(/Invalid post id/);
    expect(() => parsePostId('Bad_Slug/en')).toThrow(/Invalid post id/);
    expect(() => parsePostId('ab/en')).toThrow(/Invalid post id/);
  });
});

describe('isVisible', () => {
  it('hides drafts only in production', () => {
    expect(isVisible(true, 'production')).toBe(false);
    expect(isVisible(true, 'staging')).toBe(true);
    expect(isVisible(false, 'production')).toBe(true);
  });
});

describe('pairPosts', () => {
  it('groups en and ms by slug', () => {
    const pairs = pairPosts([{ id: 'a-post/en' }, { id: 'a-post/ms' }]);
    expect(pairs.get('a-post')).toEqual({ en: { id: 'a-post/en' }, ms: { id: 'a-post/ms' } });
  });
  it('throws when a translation is missing', () => {
    expect(() => pairPosts([{ id: 'a-post/en' }])).toThrow(/a-post.*ms/);
  });
});
