import { html } from 'hono/html'

interface PostMetaProps {
  category: string
  date: string
}

/** Splits comma-separated category string into trimmed array */
export function splitCategories(category: string): string[] {
  return category.split(',').map((c) => c.trim())
}

/**
 * Renders post metadata with clickable category pills and date.
 * Splits comma-separated categories into individual pills.
 * Category links always go to /writing?category=X for filtering.
 */
export function PostMeta({ category, date }: PostMetaProps) {
  const categories = splitCategories(category)

  return html`
    <p class="post-meta">
      ${categories.map((cat) => html`<a href="/writing?category=${cat}" class="post-tag">#${cat}</a>`)}
      <span class="meta-sep">·</span>
      <span class="post-date">${date}</span>
    </p>
  `
}
