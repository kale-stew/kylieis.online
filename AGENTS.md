# project context

## commit conventions

- all commit messages must use lowercase syntax only
- ex: "add search route with d1 query" not "Add search route..."
- ex: "fix: correct date formatting on now page" not "Fix:..."

## project goal

rewrite kylieis.online from vercel/next.js to cloudflare workers + static assets + d1.

key decisions:
- rendering: hybrid static + ssr
- content: markdown blog posts as files, structured data in d1
- deployment: cloudflare workers + static assets via wrangler
- frontend: hono + jsx/html templating (no client framework)
- search: workers-based search with d1 (like query)
- og images: pre-generate at build time
- styles: port emotion/css modules to plain css, keep globals.css and theme vars as-is
- now entries: local cli script for creation

## testing

- unit: vitest (pure functions, helpers)
- integration: vitest-pool-workers (worker routes, d1 queries)
- e2e: playwright against wrangler dev
- ci visual diff: browser rendering api in github actions

## branches

- `main` — production, auto-deploys to kylieis.online
- `rewrite/workers` — major refactor work
- `blog/*` or `post/*` — draft blog posts, auto-deploys to preview environment

## draft preview workflow

for writing new blog posts without affecting production:

1. create branch with `blog/` or `post/` prefix (e.g., `blog/photos-api-post`)
2. add markdown file to `content/`
3. push to remote — github actions will:
   - build static assets
   - seed preview d1 (not production)
   - deploy to `https://post-{slug}.kylieski.workers.dev`
4. review at the preview url
5. when ready, open pr to main for final review and production deploy

note: draft branches use the preview d1 database (`kylieis-online-db-preview`), so draft posts won't appear on the live site until merged to main.

## draft access protection

all draft previews are protected by cloudflare access. to customize the login page (logo, organization name, colors):

1. cloudflare dashboard → **zero trust → reusable components → custom pages**
2. select **access login page → manage**
3. update organization name, logo, header/footer, and background color
4. save — changes apply to all access applications in the account

this controls the branding users see when accessing any draft preview url.
