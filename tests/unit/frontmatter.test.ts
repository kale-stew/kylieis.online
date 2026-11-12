import { describe, it, expect } from 'vitest'
import {
  slugify,
  yamlSingleQuote,
  multiSelectToString,
  extractMeta,
  buildFrontmatter,
} from '../../scripts/lib/frontmatter.mjs'

describe('slugify', () => {
  it('lowercases and dashes', () => {
    expect(slugify('From Flickr to R2: Building a Self-Hosted Photo API')).toBe(
      'from-flickr-to-r2-building-a-self-hosted-photo-api'
    )
  })
  it('strips quotes and trailing punctuation', () => {
    expect(slugify("Kylie's Big Idea!")).toBe('kylies-big-idea')
  })
})

describe('yamlSingleQuote', () => {
  it('wraps in single quotes', () => {
    expect(yamlSingleQuote('typescript, workers')).toBe("'typescript, workers'")
  })
  it('escapes internal single quotes by doubling', () => {
    expect(yamlSingleQuote("don't")).toBe("'don''t'")
  })
})

describe('multiSelectToString', () => {
  it('joins option names with comma-space', () => {
    const prop = { type: 'multi_select', multi_select: [{ name: 'typescript' }, { name: 'workers' }] }
    expect(multiSelectToString(prop)).toBe('typescript, workers')
  })
  it('returns empty string for empty or wrong-typed props', () => {
    expect(multiSelectToString({ type: 'multi_select', multi_select: [] })).toBe('')
    expect(multiSelectToString({ type: 'select' })).toBe('')
    expect(multiSelectToString(undefined)).toBe('')
  })
})

const mockPage = {
  properties: {
    Name: { type: 'title', title: [{ plain_text: 'From Flickr to R2: Building a Self-Hosted Photo API' }] },
    slug: { type: 'rich_text', rich_text: [{ plain_text: 'from-flickr-to-r2' }] },
    Description: { type: 'rich_text', rich_text: [{ plain_text: 'Consolidating photo storage.' }] },
    date: { type: 'date', date: { start: '2026-05-24' } },
    category: { type: 'multi_select', multi_select: [{ name: 'typescript' }, { name: 'workers' }] },
    tags: { type: 'multi_select', multi_select: [] },
    'ready to export': { type: 'checkbox', checkbox: true },
  },
}

describe('extractMeta', () => {
  it('maps Notion properties to frontmatter fields', () => {
    const meta = extractMeta(mockPage)
    expect(meta.title).toBe('From Flickr to R2: Building a Self-Hosted Photo API')
    expect(meta.slug).toBe('from-flickr-to-r2')
    expect(meta.description).toBe('Consolidating photo storage.')
    expect(meta.date).toBe('2026-05-24')
    expect(meta.category).toBe('typescript, workers')
    expect(meta.tags).toBe('')
  })

  it('falls back to a slug derived from the title when slug is empty', () => {
    const page = { properties: { Name: { type: 'title', title: [{ plain_text: 'Hello World' }] } } }
    expect(extractMeta(page).slug).toBe('hello-world')
  })
})

describe('buildFrontmatter', () => {
  it('emits house-style single-quoted yaml in the expected order', () => {
    const fm = buildFrontmatter(extractMeta(mockPage))
    expect(fm).toBe(
      [
        '---',
        "title: 'From Flickr to R2: Building a Self-Hosted Photo API'",
        "date: '2026-05-24'",
        "category: 'typescript, workers'",
        "description: 'Consolidating photo storage.'",
        '---',
      ].join('\n')
    )
  })

  it('omits empty tags and includes draft flag when set', () => {
    const fm = buildFrontmatter({ title: 'T', draft: true })
    expect(fm).toContain('draft: true')
    expect(fm).not.toContain('tags:')
  })
})
