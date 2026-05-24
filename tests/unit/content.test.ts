import { describe, it, expect } from 'vitest'
import matter from 'gray-matter'
import { METADATA, SOCIAL_LINKS } from '../../src/content'

function splitCategories(category: string): string[] {
  return category.split(',').map((c) => c.trim())
}

describe('content constants', () => {
  it('has correct metadata', () => {
    expect(METADATA.firstName).toBe('Kylie')
    expect(METADATA.fullName).toBe('Kylie Czajkowski')
    expect(METADATA.siteName).toBe('kylieis.online')
  })

  it('has social links', () => {
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0)
    expect(SOCIAL_LINKS.find((l) => l.label === 'Github')).toBeDefined()
  })
})

describe('blog post frontmatter', () => {
  it('rewrite post has expected categories', async () => {
    const raw = await import('../../content/rewriting-my-site-with-cloudflare-workers.md?raw')
    const { data } = matter(raw.default)
    const categories = splitCategories(data.category)

    expect(categories).toContain('typescript')
    expect(categories).toContain('workers')
  })
})
