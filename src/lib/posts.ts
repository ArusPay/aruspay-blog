export type Lang = 'en' | 'ms';
export const LANGS: readonly Lang[] = ['en', 'ms'] as const;

export const BLOG_ENV: 'staging' | 'production' =
  process.env.BLOG_ENV === 'production' ? 'production' : 'staging';

const ID_RE = /^([a-z0-9-]{3,80})\/(en|ms)$/;

export function parsePostId(id: string): { slug: string; lang: Lang } {
  const m = ID_RE.exec(id);
  if (!m) throw new Error(`Invalid post id "${id}": expected <slug>/<en|ms>, slug ^[a-z0-9-]{3,80}$`);
  return { slug: m[1], lang: m[2] as Lang };
}

export function isVisible(draft: boolean, env: string): boolean {
  return !draft || env !== 'production';
}

export function pairPosts<T extends { id: string }>(entries: T[]): Map<string, Record<Lang, T>> {
  const partial = new Map<string, Partial<Record<Lang, T>>>();
  for (const entry of entries) {
    const { slug, lang } = parsePostId(entry.id);
    partial.set(slug, { ...partial.get(slug), [lang]: entry });
  }
  const pairs = new Map<string, Record<Lang, T>>();
  for (const [slug, p] of partial) {
    for (const lang of LANGS) {
      if (!p[lang]) throw new Error(`Post "${slug}" is missing its ${lang} version (${slug}/${lang}.md)`);
    }
    pairs.set(slug, p as Record<Lang, T>);
  }
  return pairs;
}
