import { describe, it, expect } from 'vitest'

// e2e tests use playwright against wrangler dev
// these are run separately from unit/integration tests
describe.skip('e2e smoke tests', () => {
  it('placeholder for playwright tests', () => {
    expect(true).toBe(true)
  })
})
