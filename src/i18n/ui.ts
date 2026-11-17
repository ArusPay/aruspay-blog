import type { Lang } from '../lib/posts';
export const ui: Record<Lang, Record<string, string>> = {
  en: {
    blogName: 'ArusPay Blog', latest: 'Latest articles', readMore: 'Read article',
    updated: 'Updated', sources: 'Sources', faq: 'Frequently asked questions',
    ctaTitle: 'Collect payments with ArusPay', ctaButton: 'Talk to our team', switchLang: 'Baca dalam Bahasa Melayu',
    tagged: 'Tagged', asOf: 'Data as of', backHome: 'Back to blog',
  },
  ms: {
    blogName: 'Blog ArusPay', latest: 'Artikel terkini', readMore: 'Baca artikel',
    updated: 'Dikemas kini', sources: 'Sumber', faq: 'Soalan lazim',
    ctaTitle: 'Terima bayaran dengan ArusPay', ctaButton: 'Hubungi pasukan kami', switchLang: 'Read in English',
    tagged: 'Tag', asOf: 'Data setakat', backHome: 'Kembali ke blog',
  },
};
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ms' : 'en');
export const dateFmt = (lang: Lang, d: Date) =>
  d.toLocaleDateString(lang === 'en' ? 'en-MY' : 'ms-MY', { year: 'numeric', month: 'long', day: 'numeric' });
