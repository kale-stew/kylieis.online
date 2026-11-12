/**
 * Pure helpers for turning Notion page properties into blog post frontmatter.
 * No node/network imports here so these stay trivially unit-testable.
 */

/** Slugify a title into a filesystem- and URL-safe slug. */
export function slugify(input) {
  return String(input ?? '')
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** YAML single-quote a scalar, escaping internal quotes per the YAML spec ('' ). */
export function yamlSingleQuote(value) {
  return `'${String(value ?? '').replace(/'/g, "''")}'`
}

/** Flatten a Notion rich_text array to plain text. */
export function plainText(richText) {
  if (!Array.isArray(richText)) return ''
  return richText.map((t) => t?.plain_text ?? t?.text?.content ?? '').join('')
}

/** Join a Notion multi_select property's option names with ", ". */
export function multiSelectToString(prop) {
  if (!prop || prop.type !== 'multi_select' || !Array.isArray(prop.multi_select)) return ''
  return prop.multi_select.map((o) => o.name).join(', ')
}

function findByType(props, type) {
  return Object.values(props ?? {}).find((p) => p?.type === type)
}

function getProp(props, name) {
  const key = Object.keys(props ?? {}).find((k) => k.toLowerCase() === name.toLowerCase())
  return key ? props[key] : undefined
}

/**
 * Map a Notion page to blog frontmatter fields.
 * Returns { title, slug, description, date, category, tags }.
 */
export function extractMeta(page) {
  const props = page?.properties ?? {}
  const titleProp = findByType(props, 'title')
  const title = titleProp ? plainText(titleProp.title) : ''

  const slugProp = getProp(props, 'slug')
  const slugValue = slugProp ? plainText(slugProp.rich_text) : ''
  const slug = slugValue ? slugify(slugValue) : slugify(title)

  const descProp = getProp(props, 'description')
  const description = descProp ? plainText(descProp.rich_text) : ''

  const dateProp = getProp(props, 'date')
  const date = dateProp?.date?.start ?? ''

  const category = multiSelectToString(getProp(props, 'category'))
  const tags = multiSelectToString(getProp(props, 'tags'))

  return { title, slug, description, date, category, tags }
}

/**
 * Build a frontmatter block matching the house style (single-quoted YAML,
 * key order: title, date, category, description, tags, draft).
 */
export function buildFrontmatter(meta) {
  const lines = ['---']
  lines.push(`title: ${yamlSingleQuote(meta.title)}`)
  if (meta.date) lines.push(`date: ${yamlSingleQuote(meta.date)}`)
  if (meta.category) lines.push(`category: ${yamlSingleQuote(meta.category)}`)
  if (meta.description) lines.push(`description: ${yamlSingleQuote(meta.description)}`)
  if (meta.tags) lines.push(`tags: ${yamlSingleQuote(meta.tags)}`)
  if (meta.draft) lines.push('draft: true')
  lines.push('---')
  return lines.join('\n')
}
