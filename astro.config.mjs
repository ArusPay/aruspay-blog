import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aruspay.com.my',
  base: '/blog',
  trailingSlash: 'always',
  // Files land in dist/blog/ so the assets-only Worker serves /blog/... as-is.
  outDir: './dist/blog',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
