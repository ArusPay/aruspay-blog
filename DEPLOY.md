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
