/**
 * Full-page screenshots of key routes for the visual diff workflow.
 *
 *   node scripts/screenshot-pages.mjs [baseUrl] [outDir]
 *
 * Defaults to a local `wrangler dev` (http://localhost:8787) and ./screenshots.
 * Exits non-zero if any page fails to load or returns a non-2xx status.
 */
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const BASE_URL = (process.argv[2] || 'http://localhost:8787').replace(/\/$/, '')
const OUT_DIR = process.argv[3] || 'screenshots'

const PAGES = [
  ['/', 'home'],
  ['/writing', 'writing'],
  ['/speaking', 'speaking'],
  ['/projects', 'projects'],
  ['/about', 'about'],
  ['/now', 'now'],
]

const VIEWPORTS = [
  ['desktop', { width: 1280, height: 800 }],
  ['mobile', { width: 390, height: 844 }],
]

mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const failures = []

try {
  for (const [viewportName, viewport] of VIEWPORTS) {
    const page = await browser.newPage({ viewport })
    for (const [path, name] of PAGES) {
      const file = join(OUT_DIR, `${name}-${viewportName}.png`)
      try {
        const res = await page.goto(BASE_URL + path, { waitUntil: 'networkidle', timeout: 30_000 })
        const status = res?.status() ?? 0
        if (status < 200 || status >= 300) throw new Error(`HTTP ${status}`)
        await page.screenshot({ path: file, fullPage: true })
        console.log(`✓ ${path} (${viewportName}) -> ${file}`)
      } catch (err) {
        console.error(`✗ ${path} (${viewportName}): ${err.message}`)
        failures.push(`${path} (${viewportName})`)
      }
    }
    await page.close()
  }
} finally {
  await browser.close()
}

if (failures.length) {
  console.error(`\n${failures.length} screenshot(s) failed: ${failures.join(', ')}`)
  process.exit(1)
}
