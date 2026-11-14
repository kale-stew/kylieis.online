import { defineConfig } from 'vitest/config'
import { cloudflareTest } from '@cloudflare/vitest-pool-workers'

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: './wrangler.jsonc' },
      miniflare: {
        // stand-in for the PHOTOS_API service binding. it always fails, so route
        // tests exercise the public-url fallback that they stub with vi.stubGlobal
        workers: [
          {
            name: 'photos-api',
            modules: true,
            script: 'export default { fetch: () => new Response("stub", { status: 503 }) }',
          },
        ],
      },
    }),
  ],
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
