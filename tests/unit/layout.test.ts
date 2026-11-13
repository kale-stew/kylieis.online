import { describe, it, expect } from 'vitest'
import { html } from 'hono/html'
import { Layout } from '../../src/components/Layout'

describe('Layout head metadata', () => {
  it('escapes title and description exactly once', async () => {
    const out = String(
      await Layout({
        title: "We don't need more chatbots",
        description: 'Tom & Jerry say "hi" <3',
        content: html`<p>body</p>`,
      }),
    )

    expect(out).toContain('<title>We don&#39;t need more chatbots — kylieis.online</title>')
    expect(out).toContain('content="We don&#39;t need more chatbots — kylieis.online"')
    expect(out).toContain('content="Tom &amp; Jerry say &quot;hi&quot; &lt;3"')
    expect(out).not.toContain('&amp;#39;')
    expect(out).not.toContain('&amp;amp;')
  })
})
