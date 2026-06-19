---
title: 'Rewriting kylieis.online with Cloudflare Workers'
date: '2026-05-24'
category: 'typescript,workers'
description: 'Migrating from Next.js on Vercel to a hybrid static + edge-rendered site on Cloudflare Workers with D1 and Hono.'
---

My site has been running on Next.js and Vercel since 2021. It was a fine setup - ISR for blog pages, Notion as a headless CMS, static generation for everything else. But I've been working at Cloudflare for over a year now, and I wanted to eat my own dogfood. More importantly, I wanted something simpler.

## My old setup

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

## My new stack

The rewrite is built on:

- **Hono** - the routing and JSX templating layer
- **[Cloudflare Workers](https://workers.cloudflare.com)** - the runtime
- **[D1](https://developers.cloudflare.com/d1/)** - structured data for now entries and search
- **[Static assets](https://developers.cloudflare.com/workers/static-assets/)** - pre-built HTML pages served from Workers directly
- **Plain CSS** - no framework, just `styles/globals.css`
- **Playwright** - headless browser for OG image generation at build time
- **hono-og** - runtime JSX-to-image for dynamic OG images on the edge

### Hybrid rendering

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

Four routes stay dynamic and run on the edge:

- **`/`** - the home page queries D1 for the 3 most recent posts and featured projects
- **`/now`** - fetches the latest now entry from D1
- **`/search`** - runs a LIKE query against post titles and descriptions
- **`/og`** - generates OG images on-the-fly via `hono-og`

The rest - writing index, individual blog posts, speaking index, talk pages, projects, about, and 404 - are all static HTML.

### D1 for structured data

Instead of Next.js data files, structured content lives in D1:

```sql
create table if not exists posts (
  id text primary key,
  title text not null,
  description text,
  category text not null,
  date text not null,
  type text not null default 'blog',
  tags text,
  content text,
  presented_at text
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

The `content` column stores the full markdown body, which makes the `LIKE` search work across titles, descriptions, and content without any external search service. The `presented_at` column is JSON for talk presentation metadata (event name, type, location, date, recording URL).

The dynamic routes query D1 directly from the Worker:

```ts
app.get('/', async (c) => {
  const { results: posts } = await c.env.DB.prepare(
    "SELECT id, title, description, category, date, type FROM posts ORDER BY date DESC LIMIT 3"
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
category: 'typescript'
description: 'Migrating from Next.js on Vercel to a hybrid static + edge-rendered site on Cloudflare Workers with D1 and Hono.'
---
```

A seed script reads these files, parses the frontmatter, and populates D1. No more Notion block rendering, no more image URL expiry, no more rate limits.

Talks live in `content/talks/` with the same frontmatter plus a `presentedAt` array:

```yaml
---
title: 'MCP Beyond Task Execution'
date: '2025-05-01'
category: 'ai'
presentedAt:
  - eventName: 'React Miami'
    eventType: 'conference'
    eventDate: '2025-04-15'
    location: 'Miami, FL'
    eventUrl: 'https://reactmiami.com'
    recordedPresentationUrl: 'https://youtube.com/...'
---
```

The build script generates both the speaking index and individual talk pages from the same markdown files.

### OG images: build time vs runtime

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

But I also added a runtime OG endpoint using `hono-og` for on-the-fly generation. The projects page uses this for its preview image, and it's handy for any page that needs an OG image without a pre-built asset:

```ts
app.get('/', async (c) => {
  const title = c.req.query('title') || 'kylieis.online'
  const subtitle = c.req.query('subtitle') || ''

  return new ImageResponse(
    <div style={{ display: 'flex', ... }}>
      <h1>{title.toLowerCase()}</h1>
      {subtitle && <p>{subtitle.toLowerCase()}</p>}
    </div>,
    { width: 1200, height: 630 }
  )
})
```

Build time for known pages, runtime for anything dynamic. Best of both worlds.

### Search: Cmd+K + D1

There's no Algolia, no Meilisearch, no Elasticsearch. Just a D1 `LIKE` query and a client-side overlay.

Hit `Cmd+K` from anywhere on the site and a search modal opens:

```ts
// Client-side debounced fetch
fetch('/api/search?q=' + encodeURIComponent(q))
  .then(r => r.json())
  .then(data => {
    // Render results with escapeHtml, no framework needed
  })
```

The API route is the same query the `/search` page uses:

```ts
const stmt = c.env.DB.prepare(
  "SELECT id, title, description, category, date, type FROM posts WHERE title LIKE ? OR description LIKE ? OR content LIKE ? ORDER BY date DESC LIMIT 20"
).bind(`%${query}%`, `%${query}%`, `%${query}%`)
```

It's not fuzzy search, but for a personal blog with a few dozen posts, `LIKE` is fast enough and requires zero infrastructure. The key insight: don't over-engineer search until you actually need to.

### Talks & speaking

I wanted a proper speaking section, not just a list of links. Each talk gets its own markdown file with full presentation metadata - where it was presented, event type (conference vs meetup), location, date, and recording URL if one exists.

The build script generates both the speaking index (`/speaking`) and individual talk pages (`/speaking/:id`). The talk pages render the markdown content plus a structured "Presented at" section with links to event pages and recordings.

This is one of those content types that doesn't fit a standard blog post model. Keeping it in markdown with a structured frontmatter schema let me avoid a CMS entirely.

### Draft previews with Cloudflare Access

Every PR gets its own preview deployment. But I also wanted a way to write and preview blog posts without opening a PR.

Branches with a `blog/` or `post/` prefix trigger a separate workflow:

1. Extract a slug from the branch name
2. Apply D1 migrations to the preview database
3. Seed the preview database with the new post
4. Generate a temporary wrangler config pointing at the preview DB
5. Deploy to a unique `post-{slug}.kylieski.workers.dev` URL
6. Post the URL in the GitHub Actions summary

These draft previews are protected by [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/), so only I can see them. The preview database is completely separate from production, so draft posts never leak to the live site.

### UI details

The site has a few interactive touches that I wasn't sure would work without a client-side framework. Turns out vanilla JS is fine for this.

**Dark/light theme toggle** — A button in the nav toggles a `data-theme` attribute on the body. The theme is persisted to `localStorage`, and the initial value respects `prefers-color-scheme`:

```html
<script>
  document.body.dataset.theme = localStorage.getItem('theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
</script>
```

**Photo gallery & lightbox** — The homepage and about page have photo grids powered by a [self-hosted photo API](/writing/from-flickr-to-r2). Clicking a photo opens a modal with the full image, caption, and location. Arrow keys navigate between photos, escape closes the modal. All vanilla JS, no framework.

**Mobile nav** — A hamburger menu with proper `aria-expanded` toggling. Clicking a link closes the menu automatically.

**Dynamic homepage** — The hero title uses a random display font on every load (Monoton, Glitch, Nabla, Silkscreen, etc.), pulled from Google Fonts. There's a rotating tagline and a refresh button that reloads the page to reshuffle everything. The card grid mixes recent posts, featured projects, and random photos in a fixed slot pattern.

### AI code review

I added a GitHub Actions workflow that runs on every PR, sends the diff to OpenAI or Anthropic, and posts the review as a PR comment. It checks for bugs, security issues, and adherence to conventions.

```yaml
- name: review
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  run: |
    DIFF=$(head -c 16000 /tmp/diff.txt)
    jq -n --arg diff "$DIFF" '{
      model: "gpt-4o",
      messages: [
        {role: "system", content: "Review this pull request diff. Check for bugs, security issues, and adherence to conventions. Be concise. Output as bullet points."},
        {role: "user", content: $diff}
      ]
    }' | curl -s https://api.openai.com/v1/chat/completions ...
```

It's not a replacement for human review, but it's caught a few issues I missed. The tricky part is keeping the diff under the token limit — I cap it at 16KB and truncate if needed.

## What I'd do differently

**D1 schema design early.** I initially had posts, now entries, talks, and projects all planned out. I should have committed to the migration orders sooner - adding `projects` as a hardcoded TypeScript array was a shortcut I'll need to revisit.

**Static build + worker routing overlap.** The static asset setup with `run_worker_first` is a bit fiddly. Pages like `/now` and `/search` need to hit the worker, but the rest should serve from assets. Getting the [`wrangler.jsonc`](https://developers.cloudflare.com/workers/wrangler/configuration/) config right took a few iterations.

**JSX without a framework is fine.** Hono's JSX renderer is minimal and fast. I was worried about losing the DX of a framework, but for a site this size, it's liberating. No bundler config, no SSR vs SSG decision, just functions that return strings.

**I should have put projects in D1 from day one.** The hardcoded `PROJECTS` array in `content.ts` works, but it means I can't update projects without a deploy. D1 would have been the right call.

## tl;dr

The site is simpler now. A Hono app that builds static HTML at deploy time, serves dynamic routes from the edge via D1, and doesn't depend on any external CMS or framework. Deployment is a single [`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/deploy/) command. Would recommend.

## What I used

If you're building something similar, here's the full inventory:

- **Hono** for routing and JSX templating
- **[Cloudflare Workers](https://workers.cloudflare.com)** as the runtime
- **[D1](https://developers.cloudflare.com/d1/)** for structured data (posts, now entries, full-text search)
- **Hybrid static + edge rendering** — build-time HTML for most pages, worker routes for `/`, `/now`, `/search`, `/og`
- **Markdown blog posts** with YAML frontmatter, stored as flat files in `content/`
- **Markdown talks** with structured `presentedAt` metadata in `content/talks/`
- **Playwright** for OG image generation at build time
- **hono-og** for runtime OG image generation at `/og`
- **Client-side search overlay** with `Cmd+K` shortcut, debounced fetch to `/api/search`
- **D1 `LIKE` search** across titles, descriptions, and content
- **Category filtering** on the writing page with URL state (`/writing?category=`)
- **Dark/light theme toggle** with `localStorage` persistence and `prefers-color-scheme` detection
- **Photo gallery & lightbox** with keyboard navigation (arrow keys, escape)
- **Dynamic homepage** — random display fonts, rotating taglines, content/photo card grid
- **Mobile navigation** with `aria-expanded` and automatic close on link click
- **Full SEO meta tags** — Open Graph, Twitter Cards, canonical URLs
- **Syntax highlighting** via `highlight.js` + `marked-highlight`
- **Inline SVG icons** — no CDN dependencies for icons
- **Health API endpoint** at `/api/health`
- **Custom 404 page**
- **Custom domain** (`kylieis.online`) with `www` redirect
- **[Workers observability](https://developers.cloudflare.com/workers/observability/)** with 10% head sampling
- **PR preview deployments** with unique `workers.dev` URLs and D1 preview database
- **Draft preview deployments** for `blog/*` and `post/*` branches, protected by [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/)
- **AI code review** via OpenAI/Anthropic on every PR
- **D1 migrations** applied in CI for both production and preview databases
- **[vitest-pool-workers](https://developers.cloudflare.com/workers/testing/vitest-integration/)** for integration testing of worker routes and D1 queries
- **Playwright** for e2e smoke tests
