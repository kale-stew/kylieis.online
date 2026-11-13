export interface DraftMeta {
  title: string
  slug: string
  description: string
  date: string
  category: string
  tags: string
  draft?: boolean
}

type RichText = Array<{ plain_text?: string; text?: { content?: string } }>

export function slugify(input: unknown): string
export function yamlSingleQuote(value: unknown): string
export function plainText(richText: RichText | unknown): string
export function multiSelectToString(prop: unknown): string
export function extractMeta(page: { properties?: Record<string, unknown> } | null | undefined): DraftMeta
export function buildFrontmatter(meta: Partial<DraftMeta> & { title: string }): string
