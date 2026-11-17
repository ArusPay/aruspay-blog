import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getVisiblePosts } from '../../lib/content';
import { LANGS, parsePostId, type Lang } from '../../lib/posts';
import { postPath } from '../../lib/seo';
import { ui } from '../../i18n/ui';

export function getStaticPaths() { return LANGS.map((lang) => ({ params: { lang } })); }

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = (await getVisiblePosts()).filter((p) => p.id.endsWith(`/${lang}`));
  return rss({
    title: ui[lang].blogName,
    description: ui[lang].latest,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postPath(lang, parsePostId(p.id).slug),
    })),
  });
}
