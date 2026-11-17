// Fails the build on active content in post markdown. Written as a Sätteri mdast
// plugin because Astro 7's default markdown processor is Sätteri, which does not
// run `markdown.remarkPlugins`. Registered in astro.config.mjs via `satteri({ mdastPlugins })`.
import { fileURLToPath } from 'node:url';

const SAFE_URL = /^(https?:|mailto:|\/|\.\/|#)/;

function where(ctx) {
  try {
    return ctx.fileURL ? fileURLToPath(ctx.fileURL) : '(unknown file)';
  } catch {
    return String(ctx.fileURL);
  }
}

function checkUrl(kind) {
  return (node, ctx) => {
    const url = node.url ?? '';
    if (!SAFE_URL.test(url)) {
      throw new Error(`${where(ctx)}: unsafe ${kind} url "${url}" (allowed: http(s):, mailto:, /, ./, #)`);
    }
  };
}

export const safeContent = {
  name: 'aruspay-safe-content',
  html(node, ctx) {
    throw new Error(`${where(ctx)}: raw html is not allowed in posts (found "${String(node.value).slice(0, 40)}")`);
  },
  link: checkUrl('link'),
  image: checkUrl('image'),
  definition: checkUrl('definition'),
};
