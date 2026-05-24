---
title: 'From Flickr to R2: Building a Self-Hosted Photo API'
date: '2026-05-24'
category: 'typescript, workers'
description: 'Consolidating photo storage from Flickr into a Workers-powered API with R2, D1, and on-demand image transforms.'
---

I've had photos scattered across [Flickr](https://flickr.com) for years. Every page load on [kylies.photos](https://kylies.photos) meant an API call to Flickr - rate limits were a constant concern, and I had no control over image sizing. The metadata lived in a [Notion](https://notion.so) database, but the actual images were external. Time to consolidate.

## The Old Setup

The previous architecture was fragile:

- **Flickr API for images** - every page load fetched image URLs, which could fail or rate limit
- **Notion for metadata** - title, location, date, tags all lived in a database I already maintained
- **No resizing** - Flickr's `_b.jpg` suffix gave me 1024px max, but I couldn't request specific dimensions
- **Duplicate logic** - both [kylies.photos](https://kylies.photos) and [kylieis.online](https://kylieis.online) needed the same Flickr/Notion integration

The Notion database was the source of truth for what photos existed and where they belonged. But the actual bytes lived somewhere else, governed by someone else's API.

## The New Stack

The rewrite consolidates everything into Workers primitives:

- **D1** - photo metadata (title, location, date, dimensions, tags, blurhash)
- **R2** - image storage (originals + generated variants)
- **Workers** - the API layer and on-demand image transforms
- **Images binding** - resize and convert on the fly

One API serves both sites. One database holds all the metadata. One bucket stores all the images. The full source is on [GitHub](https://github.com/kale-stew/photos-api).

## On-Demand Image Transforms

The key feature is resizing. Original photos from Flickr are often 4000+ pixels wide and several megabytes. For a thumbnail, that's absurd. The `/img/{id}?w=800` endpoint serves a resized variant - first request generates it via the Images binding and caches in R2, subsequent requests serve directly from the bucket:

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

## Notion as the Source of Truth

The migration script reads from my existing Notion database - the same one I've used to track photos for years. Notion already had the canonical list of photos, their titles, locations, dates, and tags. The migration didn't create new data; it consolidated existing data.

Each Notion page had an `href` field pointing to the Flickr URL. The script parses the Flickr photo ID from that URL, then fetches the original (full resolution) image via the Flickr API instead of the `_b.jpg` variant Notion stored.

The Notion schema validated the D1 schema. When I found properties in Notion I hadn't accounted for - like `accent_color` - I added columns to D1. The Notion database was the reference implementation. If a field existed in Notion, it needed a home in D1.

The `notion_id` and `flickr_id` columns in D1 let me trace every photo back to its origin. During migration, this was essential for debugging - if something looked wrong in D1, I could check the Notion page or Flickr photo directly.

## The Migration

573 photos. ~26GB of originals. The script runs through each Notion entry:

1. Parse metadata from Notion properties
2. Extract Flickr photo ID from the `href` URL
3. Fetch the original image from Flickr's API
4. Upload to R2 at `photos/{id}/original.{format}`
5. Insert metadata into D1

For photos that already existed in D1 (from previous runs), it skips the download and just updates metadata. The `notion_id` column serves as the deduplication key.

I built this with Claude Opus in opencode. When I asked it to set up a notification for when the migration finished, it wrote a shell script that polls D1 every 60 seconds and uses macOS `say` to literally speak "Photos migration complete" out loud when done - then launched it in the background. An AI agent scheduling its own system notification felt appropriately on-brand for 2026.

See [scripts/migrate/from-notion.ts](https://github.com/kale-stew/photos-api/blob/main/scripts/migrate/from-notion.ts) for the full script.

## What I'd Do Differently

**Schema design upfront.** I added `flickr_id`, `accent_color`, and `source_url` columns mid-migration after realizing I needed them. Starting with a comprehensive schema - even if some columns are nullable - would have avoided the `ALTER TABLE` dance.

**Batch the Flickr downloads.** The current script processes photos sequentially. Parallel downloads with a concurrency limit would have cut migration time significantly.

**Climb links need their own migration.** The Notion database has a relation to climbs, but the D1 `photo_climb_links` table has a foreign key constraint. Without climb data in D1, those links fail. I ended up skipping them for now.

**Peak photos get mapped too.** I have another Notion database tracking Colorado 14ers, and the old Next.js site had a `/peak-list` page using Flickr URLs as cover images. Since photos-api stores `flickr_id`, I wrote a script that maps the 51 peak photos to their new API URLs. One less place Flickr lives.

## The Result

The API is live at [photos-api.kylieski.workers.dev](https://photos-api.kylieski.workers.dev). Both [kylies.photos](https://kylies.photos) and [kylieis.online](https://kylieis.online) can fetch from the same endpoint. Images resize on demand. Metadata queries are milliseconds against D1 instead of round-trips to Flickr and Notion. You can also see my favorites on my [about page](/about#photos).

```bash
# Serve a resized variant
curl https://photos-api.kylieski.workers.dev/img/394f4ddc161b?w=800
```

<img src="https://photos-api.kylieski.workers.dev/img/394f4ddc161b?w=800" alt="Example resized photo from the API" />

This all provides an infinitiely simpler workflow and I'm really happy I spent the time cleaning it up.
