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
- now entries: `content/now.json` is the source of truth (newest first), seeded into d1 `now_entries` on every deploy. add one with `npm run now:new`; past entries live at `/now/YYYY-MM-DD`

## testing

- unit: vitest (pure functions, helpers)
- integration: vitest-pool-workers (worker routes, d1 queries)
- e2e: playwright against wrangler dev
- ci visual diff: `.github/workflows/visual-diff.yml` builds the PR, runs it under `wrangler dev` with a locally seeded d1, and screenshots key pages with playwright (`scripts/screenshot-pages.mjs`, desktop + mobile). screenshots are a workflow artifact linked from a sticky PR comment. it never targets deployed previews (those sit behind cloudflare access) and skips `blog/*` and `post/*` branches, since artifacts on this public repo are downloadable by any signed-in github user
- `npm run screenshots` does the same against a local `npm run dev`

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

### preview and draft database seeding

every preview, draft, and the shared preview worker read one d1 database (`kylieis-online-db-preview`). so an unpublished post can never surface on the unprotected shared preview: preview and draft seeds run with `DRAFT=1`, and only posts already published in production (read from `kylieis-online-db` into `PUBLISHED_IDS_FILE`) are seeded as visible. every other post, including one a branch adds, is seeded as draft, so it is left out of `/` and search but its static page still builds. if the production read fails, every post is seeded as draft. draft mode never prunes rows, because the database is shared.

### why this matters
- preview urls may be cached, bookmarked, or scraped
- draft content could leak before you're ready
- the draft pipeline exists specifically to avoid this risk

## photos

all photos are fetched from the central **photos-api** (`photos-api.kylieski.workers.dev`). do not hard-code photo arrays in `src/content.ts` or anywhere else.

- the api is queried with `site='kylieis-online'` which returns photos tagged as either `kylieis-online` or `both`
- both `HomePage` and `AboutPage` receive `photos` from the api and convert them to the local `Photo` format
- `src/routes/dynamic.ts` fetches photos at request time for `/` and `/about`, so photo edits in photos-api go live without a redeploy. `getPhotos` never throws (failures return `[]`), and `/` must still render with zero photos: it drops the photo cards
- **the worker reaches photos-api through the `PHOTOS_API` service binding, never a bare `fetch()`.** previews and drafts live on `kylieski.workers.dev` next to photos-api, and same-zone worker-to-worker fetches fail with **cloudflare error 1042**. `getPhotos` falls back to the public url when the binding is missing or fails (node build, `wrangler dev`, tests); `vitest.config.ts` stubs the binding with a failing worker
- `build-static.mjs` also builds `about/index.html`. `/about` serves that deploy-time copy only when photos-api fails or returns nothing, and the build fails when photos-api returns no photos
- to rebuild production without a new commit, run **deploy production** from the actions tab (`workflow_dispatch`, main only). re-running **check** only typechecks and tests; it never deploys
- timeline milestones that reference photos already use `photos-api.kylieski.workers.dev/img/{id}` urls directly

never add a `PHOTOS` export to `src/content.ts`. if photos are missing from the site, add them to the central photos-api and ensure they are tagged with `site='kylieis-online'` or `site='both'` in the database.

## draft access protection

all draft previews are protected by cloudflare access. to customize the login page (logo, organization name, colors):

1. cloudflare dashboard → **zero trust → reusable components → custom pages**
2. select **access login page → manage**
3. update organization name, logo, header/footer, and background color
4. save — changes apply to all access applications in the account

this controls the branding users see when accessing any draft preview url.
