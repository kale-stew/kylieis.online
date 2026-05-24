---
title: 'Building a Notion-Powered CMS for My Blog'
date: '2022-01-15'
category: 'notion'
description: 'How I used the Notion API to turn my personal database into a headless CMS for my Next.js blog.'
---

When Notion released their public API in May 2021, I immediately saw an opportunity. I already tracked all my blog ideas in a Notion database. Why not use that database as the actual CMS?

## The Setup

My blog ideas database has a simple structure:

- **Title** - the post title
- **Status** - Idea, In Progress, Proofreading, Published
- **Category** - tags like #typescript, #notion, #react
- **Pub Date** - when to publish
- **Slug** - the URL path
- **Description** - meta description for SEO

The content itself lives in the page body as Notion blocks.

## Fetching from the API

The Notion API returns pages as a tree of blocks. Each block has a `type` (paragraph, heading_1, code, etc.) and type-specific content:

```ts
const notion = new Client({ auth: process.env.NOTION_TOKEN })

async function getPost(pageId: string) {
  const blocks = await notion.blocks.children.list({ block_id: pageId })
  return blocks.results
}
```

## Rendering Blocks to HTML

The tricky part is converting Notion's block format to HTML. Each block type needs its own renderer:

```ts
function renderBlock(block: BlockObjectResponse): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${renderRichText(block.paragraph.rich_text)}</p>`
    case 'heading_1':
      return `<h1>${renderRichText(block.heading_1.rich_text)}</h1>`
    case 'code':
      return `<pre><code class="language-${block.code.language}">${block.code.rich_text[0]?.plain_text}</code></pre>`
    // ... more block types
  }
}
```

Rich text is its own beast. Each text span can have annotations (bold, italic, code, links) that need to be converted to HTML tags.

## The Caching Problem

Notion's API has rate limits, and fetching blocks for every page view would be slow. I solved this with ISR (Incremental Static Regeneration) in Next.js:

```ts
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)
  return {
    props: { post },
    revalidate: 3600 // regenerate every hour
  }
}
```

For development, I cache responses locally so I'm not constantly hitting the API.

## What I'd Do Differently

**Block rendering is tedious.** I ended up handling 15+ block types, each with edge cases. Libraries like `notion-to-md` or the `@notionhq/client` helpers would have saved time.

**Images expire.** Notion-hosted images have temporary URLs that expire after an hour. I now download images to my own storage during build.

**Nested blocks are recursive.** Toggle lists, callouts, and columns can contain child blocks. My initial flat rendering didn't handle this. Had to refactor to recursive descent.

## Was It Worth It?

Absolutely. Writing in Notion is frictionless - I already have it open all day. The API is well-designed, and the database properties give me exactly the metadata I need. The main downside is the rendering complexity, but that's a one-time cost.

For my next iteration, I'm considering moving the markdown content to flat files and using Notion purely for metadata and scheduling. Best of both worlds.
