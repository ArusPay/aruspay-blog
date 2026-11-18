# Deploying aruspay-blog

| Branch | Worker | URL | Indexed |
|---|---|---|---|
| `Staging` | `aruspay-blog-staging` | https://staging.aruspay.com.my/blog/ | no (noindex) |
| `main` | `aruspay-blog` | https://aruspay.com.my/blog/ (routes `aruspay.com.my/blog` and `/blog/*` in `wrangler.jsonc`) | yes |

Workers Builds settings for `aruspay-blog-staging`:
- Production branch: `Staging`
- Build command: `npm run build:staging` (includes the SEO/safety gate `check:build`)
- Deploy command: `npx wrangler deploy --env staging`
- Non-production branch deploy command: `npx wrangler versions upload --env staging`

Workers Builds settings for `aruspay-blog` (connected 2026-11-18, build token "aruspay-blog build token"):
- Production branch: `main`; non-production builds disabled
- Build command: `npm run build:production` (includes the SEO/safety gate `check:build`)
- Deploy command: `npm run deploy:production` (refuses unless `dist` is a production build, then `npx wrangler deploy`)
- Build variable: none. `PUBLIC_CF_BEACON_TOKEN` is intentionally unset: the zone's existing Web Analytics site `aruspay.com.my` (automatic setup) already injects its beacon into every HTML response, including this Worker's, and the production CSP allows it. Setting the token too would count every visit twice. Filter Web Analytics by path `/blog` to see blog traffic. (Staging's CSP blocks the injected beacon.)
- Preview builds: off

Publishing = merging. Article PRs target `Staging`; promotion is a PR `Staging` → `main`.
Only Mutalib merges (ruleset "protect-staging-main").

Required status check `verify` is set in the ruleset (Task 7).

## Launch record (2026-11-18)
- Production live at https://aruspay.com.my/blog/ (release PR #5, `main` @ e8b880c).
- The first production build ran from `Staging` (Cloudflare's default branch at creation); the production branch was switched to `main` right after.
- Google Search Console: Domain property `aruspay.com.my` owned by mutalib@aruspay.com.my, verified by a DNS TXT `google-site-verification=nizRQt11…` at the zone root (a second, older `google-site-verification` TXT belongs to another account; keep both). Sitemap submitted: `https://aruspay.com.my/blog/sitemap-index.xml`. Indexing requested for both EN article URLs.
- Bing Webmaster Tools: not set up yet.
- Hermes cron jobs (VPS `aruspay-ai-vps`): `blog-monday-topics` (Monday proposals), `blog-linkedin-drafts` (daily 10:00 LinkedIn drafts via `blog_published`), `blog-token-expiry-reminder` (8 Feb 2027).

Rollback: `npx wrangler versions list --name <worker>` then
`npx wrangler versions deploy <version-id> --name <worker> -y`, or revert the merge on GitHub.

Never touch `ArusPay/aruspay-landingpage` from this repo.

## Staging deploy record (2026-11-17)

- Worker `aruspay-blog-staging` (Workers Builds, production branch `Staging`, build `npm run build:staging`, deploy `npx wrangler deploy --env staging`). **Preview builds for non-production branches are OFF** on purpose: bot-authored `post/*` branches are never built by Cloudflare; staging (noindex) is the preview after merge.
- Build token: auto-created "aruspay-blog-staging build token" (Cloudflare scope: Workers Scripts edit + Workers Routes edit for all zones; it cannot be narrowed to one Worker). It only runs for commits merged to `Staging`.
- Routes `staging.aruspay.com.my/blog` and `/blog/*` take precedence over the landing page's Pages custom domain on `staging.aruspay.com.my` (verified: `/blog/` 200 + `x-robots-tag: noindex`; staging root unchanged).
- The Cloudflare GitHub app ("Cloudflare Workers and Pages", ArusPay org) must list `aruspay-blog` under *Only select repositories*, otherwise pushes to `Staging` do not trigger builds.
- Merging: `Staging`/`main` accept changes only through PRs merged by a repo admin (`gh pr merge <n> --merge --admin`); required check `verify`.
- Rollback: `npx wrangler versions list --name aruspay-blog-staging` then `npx wrangler versions deploy <version-id> --name aruspay-blog-staging -y`, or revert the merge on GitHub.
