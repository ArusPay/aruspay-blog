# Deploying aruspay-blog

| Branch | Worker | URL | Indexed |
|---|---|---|---|
| `Staging` | `aruspay-blog-staging` | https://staging.aruspay.com.my/blog/ | no (noindex) |
| `main` | `aruspay-blog` | https://aruspay.com.my/blog/ (route added at launch) | yes |

Workers Builds settings for `aruspay-blog-staging`:
- Production branch: `Staging`
- Build command: `npm run build:staging` (includes the SEO/safety gate `check:build`)
- Deploy command: `npx wrangler deploy --env staging`
- Non-production branch deploy command: `npx wrangler versions upload --env staging`

Workers Builds settings for `aruspay-blog` (connected at launch):
- Production branch: `main`; non-production builds disabled
- Build command: `npm run build:production` (includes the SEO/safety gate `check:build`)
- Deploy command: `npx wrangler deploy`

Publishing = merging. Article PRs target `Staging`; promotion is a PR `Staging` → `main`.
Only Mutalib merges (ruleset "protect-staging-main").

Required status check `verify` is set in the ruleset (Task 7).

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
