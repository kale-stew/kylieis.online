# [kylieis.online](https://kylieis.online)

personal site of kylie czajkowski. built with hono, running on cloudflare workers, content in markdown.

## stack

- **framework:** hono + jsx
- **platform:** cloudflare workers + d1 + static assets
- **content:** markdown posts, structured data in d1
- **search:** workers-based search with sqlite `like` queries
- **styles:** plain css

## develop

```bash
npm install
npm run dev        # wrangler dev
npm run build      # static assets
npm run deploy     # build + wrangler deploy
```

## test

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```
