/**
 * Wraps notion-to-md with custom transformers for the bits that matter to this
 * blog: images (migrated to Cloudflare Images via the uploader) and image alt
 * warnings. Code blocks, headings, lists, quotes, and callouts use notion-to-md
 * defaults (fenced code with language, blockquotes, etc.).
 */
import { NotionToMarkdown } from 'notion-to-md'

export function buildConverter({ notion, uploader, onImage = () => {} }) {
  const n2m = new NotionToMarkdown({
    notionClient: notion,
    config: { parseChildPages: false },
  })

  n2m.setCustomTransformer('image', async (block) => {
    const image = block.image
    if (!image) return ''
    const url = image.type === 'external' ? image.external?.url : image.file?.url
    if (!url) return ''

    const alt = (image.caption ?? [])
      .map((c) => c.plain_text ?? '')
      .join('')
      .trim()

    onImage({ blockId: block.id, alt, sourceUrl: url })

    let finalUrl = url
    if (uploader) {
      try {
        finalUrl = await uploader.upload(block.id, url)
      } catch (err) {
        // keep the original URL but surface the failure
        onImage({ blockId: block.id, alt, sourceUrl: url, error: String(err?.message ?? err) })
        finalUrl = url
      }
    }

    return `![${alt}](${finalUrl})`
  })

  return n2m
}

export async function pageToMarkdownBody(n2m, pageId) {
  const blocks = await n2m.pageToMarkdown(pageId)
  return n2m.toMarkdownString(blocks).parent ?? ''
}
