---
title: 'Rewriting kylieis.online with Cloudflare Workers'
date: '2026-05-23'
category: 'cloudflare'
description: 'Migrating from Next.js on Vercel to a hybrid static + edge-rendered site on Cloudflare Workers with D1 and Hono.'
---

My site has been running on Next.js and Vercel since 2021. It was a fine setup - ISR for blog pages, Notion as a headless CMS, static generation for everything else. But I've been working at Cloudflare for over a year now, and I wanted to eat my own dogfood. More importantly, I wanted something simpler.

## The Old Setup

The previous version was a relatively standard Next.js app:

- **ISR pages** for blog posts, fetched from the Notion API at build time with revalidation
- **resoc templates** for OG image generation, run during the build
- **CSS modules** for component styling
- **A handful of static pages** - about, projects, speaking, writing

It worked. But there were things that bugged me:

- The Notion API rate limits and block rendering complexity were overhead I didn't need for a personal blog
- ISR was overkill - I publish posts manually, I don't need incremental regeneration
- CSS modules added unnecessary abstraction for a mostly-static site
- I wanted to move the stack entirely to Cloudflare

## The New Stack

The rewrite is built on:

- **Hono** - the routing and JSX templating layer
- **Cloudflare Workers** - the runtime
- **D1** - structured data for now entries and search
- **Static assets** - pre-built HTML pages served from Workers directly
- **Plain CSS** - no framework, just `styles/globals.css`
- **Playwright** - headless browser for OG image generation at build time

### Hybrid Rendering

The site uses a hybrid approach. Most pages are built at deploy time by a build script, which renders each page via the same Hono JSX components and writes the HTML to a `static/` directory. These are served as static assets by Cloudflare Workers with no runtime overhead.

```ts
// scripts/build-static.mjs
function writeHtml(name, html) {
  fs.mkdirSync(path.join(OUT_DIR, name.split('/').slice(0, -1).join('/')), { recursive: true })
  fs.writeFileSync(path.join(OUT_DIR, name), html.toString())
}

// Blog posts read from .md files, rendered at build time
for (const post of blogPosts) {
  writeHtml(`writing/${post.id}/index.html`, BlogPostPage({ post }))
}
```

Three routes stay dynamic and run on the edge:

- **`/`** - the home page queries D1 for the 3 most recent posts
- **`/now`** - fetches the latest now entry from D1
- **`/search`** - runs a LIKE query against post titles and descriptions

### D1 for Structured Data

Instead of Next.js data files, structured content lives in D1:

```sql
create table if not exists posts (
  id text primary key,
  title text not null,
  description text,
  category text not null,
  date text not null,
  type text not null default 'blog',
  tags text
);

create table if not exists now_entries (
  id integer primary key autoincrement,
  date text not null,
  location text,
  celebrate text,
  read text,
  travel text,
  learn text,
  watch text,
  listen text,
  work text
);
```

The dynamic routes query D1 directly from the Worker:

```ts
app.get('/', async (c) => {
  const { results: posts } = await c.env.DB.prepare(
    "SELECT id, title, description, category, date FROM posts WHERE type = 'blog' ORDER BY date DESC LIMIT 3"
  ).all()
  return c.html(HomePage({ recentPosts: posts ?? [] }).toString(), 200)
})
```

### Markdown over Notion

I moved blog content from the Notion API to flat markdown files. Each post is a `.md` file in `content/` with YAML frontmatter:

```yaml
---
title: 'Rewriting kylieis.online with Cloudflare Workers'
date: '2026-05-23'
category: 'cloudflare'
description: 'Migrating from Next.js on Vercel to a hybrid static + edge-rendered site on Cloudflare Workers with D1 and Hono.'
---
```

A seed script reads these files, parses the frontmatter, and populates D1. No more Notion block rendering, no more image URL expiry, no more rate limits.

### OG Images at Build Time

The old setup used resoc templates. The new one uses Playwright to render HTML screenshots during the build:

```ts
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

for (const [name, { title, description }] of Object.entries(entries)) {
  const html = OG_TEMPLATE.replace('TITLE', title).replace('DESCRIPTION', description)
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.screenshot({ path: path.join(OUT_DIR, `${name}.jpg`), type: 'jpeg', quality: 85 })
}
```

It generates OG images for every page and blog post in about 3 seconds total. The gradient background and Fraunces font give a consistent look across the site.

### Preview Deployments

Every PR gets its own preview deployment. The workflow extracts a short slug from the PR title, applies D1 migrations, seeds the database, generates a temporary wrangler config, and deploys to a unique workers.dev URL. A comment on the PR gives you the link.

## What I'd Do Differently

**D1 schema design early.** I initially had posts, now entries, talks, and projects all planned out. I should have committed to the migration orders sooner - adding `projects` as a hardcoded TypeScript array was a shortcut I'll need to revisit.

**Static build + worker routing overlap.** The static asset setup with `run_worker_first` is a bit fiddly. Pages like `/now` and `/search` need to hit the worker, but the rest should serve from assets. Getting the `wrangler.jsonc` config right took a few iterations.

**JSX without a framework is fine.** Hono's JSX renderer is minimal and fast. I was worried about losing the DX of a framework, but for a site this size, it's liberating. No bundler config, no SSR vs SSG decision, just functions that return strings.

## TL;DR

The site is simpler now. A Hono app that builds static HTML at deploy time, serves dynamic routes from the edge via D1, and doesn't depend on any external CMS or framework. Deployment is a single `wrangler deploy` command. Would recommend.
