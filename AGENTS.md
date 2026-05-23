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

## branch

rewrite/workers — all work happens here, separate commits, one logical unit each
