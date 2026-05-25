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
- `blog/*` or `post/*` — draft blog posts, auto-deploys to isolated **draft** workers (protected by cloudflare access)

## deployment targets — critical

this project has **two separate deployment targets**. using the wrong one will expose unpublished content on a shared, potentially discoverable url.

### 1. preview deployment (`npm run deploy:preview`) — never use for drafts
- **target**: `kylieis-online-preview.kylieski.workers.dev`
- **purpose**: testing production-like builds before going live
- **warning**: this is a **shared worker**. deploying here overwrites the previous preview. any draft blog posts will be publicly accessible at this url without access protection.
- **when to use**: final sanity check before production deploy. **never for drafts.**

### 2. draft deployment (`npm run deploy:draft`) — use for all blog post drafts
- **target**: isolated worker per branch (e.g., `post-photos-api.kylieski.workers.dev`)
- **purpose**: sharing specific blog posts for review without affecting preview or production
- **safe**: each draft gets its own url. drafts are protected by cloudflare access and are **not** indexed or linked from the main site.
- **when to use**: reviewing blog post drafts, sharing with editors, getting feedback before publishing.

## draft workflow

for writing new blog posts without affecting production:

```bash
# for blog post drafts:
git checkout -b blog/my-post        # create branch
git add content/my-post.md
git commit -m "blog: add my post"
npm run deploy:draft                # isolated, access-protected url for review only
# → https://post-my-post.kylieski.workers.dev

# never do this for drafts:
npm run deploy:preview              # ❌ exposes draft on shared, unprotected preview url

# for production:
git checkout main
npm run deploy                      # deploy to kylieis.online
```

### why this matters
- preview urls may be cached, bookmarked, or scraped
- draft content could leak before you're ready
- the draft pipeline exists specifically to avoid this risk

## draft access protection

all draft previews are protected by cloudflare access. to customize the login page (logo, organization name, colors):

1. cloudflare dashboard → **zero trust → reusable components → custom pages**
2. select **access login page → manage**
3. update organization name, logo, header/footer, and background color
4. save — changes apply to all access applications in the account

this controls the branding users see when accessing any draft preview url.
