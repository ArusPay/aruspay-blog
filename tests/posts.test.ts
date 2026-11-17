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
  it('reserves the slug "tags"', () => {
    expect(() => parsePostId('tags/en')).toThrow(/reserved/);
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
  const e = (id: string, tags = ['a'], draft = false) => ({ id, data: { tags, draft } });
  it('groups en and ms by slug', () => {
    const en = e('a-post/en');
    const ms = e('a-post/ms');
    expect(pairPosts([en, ms]).get('a-post')).toEqual({ en, ms });
  });
  it('throws when a translation is missing', () => {
    expect(() => pairPosts([e('a-post/en')])).toThrow(/a-post.*ms/);
  });
  it('accepts the same tags in a different order', () => {
    expect(() => pairPosts([e('a-post/en', ['a', 'b']), e('a-post/ms', ['b', 'a'])])).not.toThrow();
  });
  it('throws when en and ms tags differ', () => {
    expect(() => pairPosts([e('a-post/en', ['a']), e('a-post/ms', ['b'])])).toThrow(/a-post.*tags/);
  });
  it('throws when en and ms draft flags differ', () => {
    expect(() => pairPosts([e('a-post/en', ['a'], true), e('a-post/ms', ['a'], false)])).toThrow(/a-post.*draft/);
  });
});
