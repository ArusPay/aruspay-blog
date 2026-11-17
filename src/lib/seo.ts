import type { Lang } from './posts';

export const SITE = 'https://aruspay.com.my';
export const BASE = '/blog';

export const postPath = (lang: Lang, slug: string) => `${BASE}/${lang}/${slug}/`;
export const listPath = (lang: Lang) => `${BASE}/${lang}/`;
export const tagPath = (lang: Lang, tag: string) => `${BASE}/${lang}/tags/${tag}/`;
export const absolute = (path: string) => new URL(path, SITE).toString();

export function alternates(slug: string | null): { hreflang: string; href: string }[] {
  const path = (lang: Lang) => (slug ? postPath(lang, slug) : listPath(lang));
  return [
    { hreflang: 'en', href: absolute(path('en')) },
    { hreflang: 'ms', href: absolute(path('ms')) },
    { hreflang: 'x-default', href: absolute(`${BASE}/`) },
  ];
}

const PUBLISHER = {
  '@type': 'Organization',
  name: 'ArusPay',
  url: SITE,
  logo: { '@type': 'ImageObject', url: absolute(`${BASE}/logo.png`) },
};

export function articleJsonLd(a: {
  title: string; description: string; url: string; image: string;
  datePublished: Date; dateModified: Date; lang: Lang;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: a.url,
    image: [a.image],
    datePublished: a.datePublished.toISOString(),
    dateModified: a.dateModified.toISOString(),
    inLanguage: a.lang,
    author: { '@type': 'Organization', name: 'ArusPay', url: SITE },
    publisher: PUBLISHER,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]): object | null {
  if (faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
