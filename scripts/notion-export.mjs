/**
 * draft:pull — graduate a Notion draft into a content/<slug>.md file.
 *
 * Reads the "Blog Drafts" Notion database, finds rows with the "ready to export"
 * checkbox set, converts each page to markdown (migrating Notion-hosted images to
 * Cloudflare Images), and writes content/<slug>.md with house-style frontmatter.
 *
 * One-way: once exported, the markdown file is canonical. Re-running overwrites
 * (with --force) after showing that the file would change.
 *
 * Runs LOCALLY ONLY. Secrets come from your shell env (e.g. ~/.localrc):
 *   NOTION_API_KEY            (required)
 *   NOTION_DRAFTS_DB_ID       (optional; defaults to the "all blog ideas" DB)
 *   CF_IMAGES_API_TOKEN       (optional; needed only if a draft has Notion-hosted images)
 *   CLOUDFLARE_ACCOUNT_ID     (optional; defaults to the kylieis.online account)
 *   CF_IMAGES_HASH            (optional; defaults to the account's images hash)
 *
 * Flags:
 *   --page=<id>        export a single page by id (ignores the checkbox gate)
 *   --dry-run          print what would happen; write nothing, upload nothing
 *   --force            overwrite an existing content/<slug>.md that would change
 *   --mark-exported    uncheck "ready to export" on the Notion page after writing
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Client } from '@notionhq/client'
import { buildFrontmatter, extractMeta, slugify } from './lib/frontmatter.mjs'
import { buildConverter, pageToMarkdownBody } from './lib/notion-to-markdown.mjs'
import { createImageUploader, loadImageMap, saveImageMap } from './lib/cf-images.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENT_DIR = join(ROOT, 'content')
const MAP_PATH = join(__dirname, '.notion-image-map.json')

const DEFAULT_DB_ID = '36b01b50-4364-8066-9416-c5fb5d1cc588' // "all blog ideas"
const DEFAULT_ACCOUNT_ID = 'bb52c0e5f3a93fc72779915d7dc6982b'
const DEFAULT_IMAGES_HASH = 'I5sMCdZloThK9NfMgVFKOw'

function parseArgs(argv) {
  const args = { dryRun: false, force: false, markExported: false, page: null }
  for (const a of argv) {
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--force') args.force = true
    else if (a === '--mark-exported') args.markExported = true
    else if (a.startsWith('--page=')) args.page = a.slice('--page='.length)
  }
  return args
}

async function getCandidatePages(notion, dbId, args) {
  if (args.page) {
    const page = await notion.pages.retrieve({ page_id: args.page })
    return [page]
  }
  const res = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'ready to export', checkbox: { equals: true } },
  })
  return res.results
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const token = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN
  if (!token) {
    console.error('error: NOTION_API_KEY is not set (add it to ~/.localrc).')
    process.exit(1)
  }

  const dbId = process.env.NOTION_DRAFTS_DB_ID || DEFAULT_DB_ID
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID
  const imagesHash = process.env.CF_IMAGES_HASH || DEFAULT_IMAGES_HASH
  const imagesToken = process.env.CF_IMAGES_API_TOKEN || ''

  const notion = new Client({ auth: token })

  let pages
  try {
    pages = await getCandidatePages(notion, dbId, args)
  } catch (err) {
    console.error(`error querying Notion: ${err.message ?? err}`)
    console.error('check that NOTION_API_KEY is valid and the database is shared with the integration.')
    process.exit(1)
  }

  if (!pages.length) {
    console.log('nothing to export — no rows with "ready to export" checked.')
    return
  }

  const warnings = []
  const imageMap = loadImageMap(MAP_PATH)
  const uploader = createImageUploader({
    accountId,
    token: imagesToken,
    imagesHash,
    map: imageMap,
    dryRun: args.dryRun,
    onWarn: (m) => warnings.push(m),
  })

  const written = []
  const skipped = []

  for (const page of pages) {
    const meta = extractMeta(page)
    if (!meta.title) {
      warnings.push(`skipping page ${page.id}: no title`)
      continue
    }
    const slug = meta.slug || slugify(meta.title)

    const n2m = buildConverter({
      notion,
      uploader,
      onImage: ({ alt, blockId, error }) => {
        if (error) warnings.push(`image ${blockId}: upload error — ${error}`)
        if (!alt) warnings.push(`image ${blockId} in "${slug}" has no caption (empty alt text)`)
      },
    })

    const body = (await pageToMarkdownBody(n2m, page.id)).trim()
    const frontmatter = buildFrontmatter(meta)
    const fileContent = `${frontmatter}\n\n${body}\n`
    const target = join(CONTENT_DIR, `${slug}.md`)
    const rel = `content/${slug}.md`

    const exists = existsSync(target)
    const current = exists ? readFileSync(target, 'utf8') : null

    if (exists && current === fileContent) {
      skipped.push(`${rel} (unchanged)`)
      continue
    }
    if (exists && !args.force) {
      skipped.push(`${rel} (exists and would change — re-run with --force to overwrite)`)
      continue
    }

    if (args.dryRun) {
      written.push(`${rel} (dry-run — not written)`) 
      console.log(`\n--- ${rel} (dry-run preview) ---\n${frontmatter}\n\n${body.slice(0, 500)}${body.length > 500 ? '\n…(truncated)' : ''}`)
    } else {
      writeFileSync(target, fileContent)
      written.push(rel)
    }

    if (args.markExported && !args.dryRun) {
      try {
        await notion.pages.update({
          page_id: page.id,
          properties: { 'ready to export': { checkbox: false } },
        })
      } catch (err) {
        warnings.push(`could not unset "ready to export" on ${page.id}: ${err.message ?? err}`)
      }
    }
  }

  if (!args.dryRun) saveImageMap(MAP_PATH, imageMap)

  console.log('\n=== draft:pull summary ===')
  if (written.length) console.log(`wrote:\n  ${written.join('\n  ')}`)
  if (skipped.length) console.log(`skipped:\n  ${skipped.join('\n  ')}`)
  if (warnings.length) console.log(`warnings:\n  ${warnings.join('\n  ')}`)
  if (!written.length && !skipped.length) console.log('(no pages processed)')
  if (written.length && !args.dryRun) {
    console.log(
      '\nnext: review the diff, commit on a feat/ branch, open a PR to main when ready to publish.'
    )
  }
}

// Only run when invoked directly (so helpers can be imported in tests).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
