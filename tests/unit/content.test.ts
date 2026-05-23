import { describe, it, expect } from 'vitest'
import { METADATA, SOCIAL_LINKS, CATEGORIES } from '../../src/content'

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

  it('has categories', () => {
    expect(CATEGORIES).toContain('all')
    expect(CATEGORIES).toContain('ai')
    expect(CATEGORIES).toContain('react')
  })
})
