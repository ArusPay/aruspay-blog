import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { safeContent } from './src/lib/remark-safe-content.mjs';

export default defineConfig({
  site: 'https://aruspay.com.my',
  base: '/blog',
  trailingSlash: 'always',
  // Files land in dist/blog/ so the assets-only Worker serves /blog/... as-is.
  outDir: './dist/blog',
  build: { format: 'directory' },
  // Astro 7's default markdown processor is Sätteri (remarkPlugins is ignored), so the guard is an mdast plugin.
  markdown: { processor: satteri({ mdastPlugins: [safeContent] }) },
  integrations: [sitemap()],
});
