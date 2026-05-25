---
title: 'From Flickr to R2: Building a Self-Hosted Photo API'
date: '2026-05-24'
category: 'typescript, workers'
description: 'Consolidating photo storage from Flickr into a Workers-powered API with R2, D1, and on-demand image transforms.'
---

I've had photos scattered across [Flickr](https://flickr.com), GitHub, and local files for years. Every page load on [kylies.photos](https://kylies.photos) meant an API call to an image hosting site. Rate limits were a constant concern, and I had no control over image sizing. The metadata lived in a [Notion](https://notion.so) database, but the actual images were external. This became a painful maintenance pattern at scale that meant I didn't update the websites I enjoyed working on the most; it was time to consolidate.

## Old setup

The previous architecture was fragile:

- **Flickr API for images** - every page load fetched image URLs, which could fail or rate limit (since I didn't pay for a Pro subscription)
- **Notion for metadata** - title, location, date, tags all lived in a database I already manually maintained
- **No resizing** - Flickr's `_b.jpg` suffix gave me 1024px max, and I wasn't requesting specific dimensions per use
- **Duplicate logic** - both [kylies.photos](https://kylies.photos) and [kylieis.online](https://kylieis.online) needed the same Flickr/Notion integration

The Notion database was the source of truth for what photos existed and where they belonged, but the actual bytes lived somewhere else, governed by an entirely external API.

## New stack

The rewrite consolidated everything into Workers primitives:

- **D1** - photo metadata (title, location, date, dimensions, tags, blurhash)
- **R2** - image storage (originals + generated variants)
- **Workers** - the API layer and on-demand image transforms
- **Images binding** - resize and convert on the fly

One API now serves both sites. One database holds all the metadata. One bucket stores all the images. The full source is on [GitHub](https://github.com/kale-stew/photos-api) if you want to check it out.

## On-demand image transforms

The key feature is resizing. Original photos from Flickr are often 4000+ pixels wide and several megabytes. For a thumbnail? That's absurd. The `/img/{id}?w=800` endpoint serves a resized variant - first request generates it via the Images binding and caches in R2, subsequent requests serve directly from the bucket:

```ts
const transformed = await env.IMAGES.input(original.body)
  .transform({ width, fit: 'scale-down' })
  .output({ format: 'image/webp', quality: 85 });

await env.PHOTOS_BUCKET.put(targetKey, transformed.body);
```

The size savings are dramatic:

| Variant  | Size   |
| -------- | ------ |
| Original | 9.3 MB |
| w=800    | 72 KB  |
| w=400    | 23 KB  |

That's a 99%+ reduction for the common case. See [src/index.ts](https://github.com/kale-stew/photos-api/blob/main/src/index.ts) for the full implementation.

## Notion as source of truth

The migration script reads from my existing Notion database, same one I've used to track photos for years. Notion already had the canonical list of photos, a brief caption, their locations, dates, and tags. The migration didn't create new data, it consolidated what already existed.

Each Notion page had an `href` field pointing to the Flickr URL. The script parses the Flickr photo ID from that URL, then fetches the original (full resolution) image via the Flickr API instead of the `_b.jpg` variant Notion stored.

The Notion schema validated the D1 schema. When I found properties in Notion I hadn't accounted for (like `accent_color`, used for a long abandoned UX experiment that I might want to now pick up), I added columns to D1. The Notion database was the reference implementation. If a field existed in Notion, it needed a home in D1.

The `notion_id` and `flickr_id` columns in D1 let me trace every photo back to its origin. This was essential during migration for debugging; if something looked wrong in D1, I could check out the Notion page or Flickr photo directly.

## Migration

573 photos. ~26GB of originals. The script runs through each Notion entry:

1. Parse metadata from Notion properties
2. Extract Flickr photo ID from the `href` URL
3. Fetch the original image from Flickr's API
4. Upload to R2 at `photos/{id}/original.{format}`
5. Insert metadata into D1

For photos that already existed in D1 (from previous runs), it skips the download and just updates metadata. The `notion_id` column serves as the deduplication key.

I built this with Claude Opus in opencode. When I asked it to set up a notification for when the migration finished, it wrote a shell script that polls D1 every 60 seconds and uses macOS `say` to literally speak out loud when done, then launched it in the background. An AI agent scheduling its own system notification was both alarming and appropriate on brand for 2026. Agents... right?

The vocalized "photos migration complete" out of my laptop speakers **did** make me jump, even if I was expecting it.

See [scripts/migrate/from-notion.ts](https://github.com/kale-stew/photos-api/blob/main/scripts/migrate/from-notion.ts) for the full script.

## What I'd do differently

**Schema design upfront.** I added `flickr_id`, `accent_color`, and `source_url` columns mid-migration after realizing I needed them. Starting with a comprehensive schema (even if some columns are nullable) helped me avoid the `ALTER TABLE` dance.

**Batch the Flickr downloads.** The current script processes photos sequentially. Parallel downloads with a concurrency limit would have cut migration time significantly.

**Climb links need their own migration.** The Notion database has a relation to climbs, but the D1 `photo_climb_links` table has a foreign key constraint. Without climb data in D1, those links fail. I ended up skipping them initially.

**Peak photos get mapped too.** I have another Notion database tracking Colorado 14ers, and the old Next.js site had a `/peak-list` page using Flickr URLs as cover images. Since photos-api stores `flickr_id`, I wrote a script that maps the 51 peak photos to their new API URLs and will be using photos-api for all future peak tracking moving forward. One less place to source Flickr data.

## The result

The API is live at [photos-api.kylieski.workers.dev](https://photos-api.kylieski.workers.dev). Both [kylies.photos](https://kylies.photos) and [kylieis.online](https://kylieis.online) now fetch from the same endpoint. Images resize on demand. Metadata queries are milliseconds against D1 instead of long roundtrips to Flickr and Notion.

You can see a highlight reel of my favorites on my [about page](/about#photos).

```bash
# Serve a resized variant
curl https://photos-api.kylieski.workers.dev/img/394f4ddc161b?w=800
```

<img src="https://photos-api.kylieski.workers.dev/img/394f4ddc161b?w=800" alt="Example resized photo from the API" />

This all provides an infinitely simpler workflow. One less API to worry about. Do recommend.

If you're curious about the broader site rewrite that this API supports, I wrote about [migrating from Next.js to Cloudflare Workers](/writing/rewriting-my-site-with-cloudflare-workers).
