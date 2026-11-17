# aruspay-blog

ArusPay's EN + BM blog, served at `/blog` on aruspay.com.my. Articles live in
`src/content/posts/<slug>/{en,ms}.md` with a co-located hero image; the schema in
`src/content.config.ts` lists every required frontmatter field.

- `npm run dev` — local preview at http://localhost:4321/blog/
- `npm run verify` — unit tests + both builds + SEO checks (run before every PR)

See DEPLOY.md for branches and Cloudflare.
