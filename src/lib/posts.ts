export type Lang = 'en' | 'ms';
export const LANGS: readonly Lang[] = ['en', 'ms'] as const;

export const BLOG_ENV: 'staging' | 'production' =
  process.env.BLOG_ENV === 'production' ? 'production' : 'staging';

const ID_RE = /^([a-z0-9-]{3,80})\/(en|ms)$/;

export function parsePostId(id: string): { slug: string; lang: Lang } {
  const m = ID_RE.exec(id);
  if (!m) throw new Error(`Invalid post id "${id}": expected <slug>/<en|ms>, slug ^[a-z0-9-]{3,80}$`);
  if (m[1] === 'tags') throw new Error(`Invalid post id "${id}": slug "tags" is reserved for /blog/<lang>/tags/`);
  return { slug: m[1], lang: m[2] as Lang };
}

export function isVisible(draft: boolean, env: string): boolean {
  return !draft || env !== 'production';
}

type Pairable = { id: string; data: { tags: string[]; draft: boolean } };

export function pairPosts<T extends Pairable>(entries: T[]): Map<string, Record<Lang, T>> {
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
    const { en, ms } = p as Record<Lang, T>;
    if ([...en.data.tags].sort().join(',') !== [...ms.data.tags].sort().join(',')) {
      throw new Error(`Post "${slug}": en and ms must have the same tags (en: ${en.data.tags.join(', ')}; ms: ${ms.data.tags.join(', ')})`);
    }
    if (en.data.draft !== ms.data.draft) {
      throw new Error(`Post "${slug}": en and ms must have the same draft flag (en: ${en.data.draft}; ms: ${ms.data.draft})`);
    }
    pairs.set(slug, { en, ms });
  }
  return pairs;
}
