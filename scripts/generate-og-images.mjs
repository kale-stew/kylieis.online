import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'static', 'open-graph')

const OG_TEMPLATE = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: linear-gradient(135deg, #e23500 0%, #ffbc2d 100%);
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center; color: white;
    font-family: 'Fraunces', serif; padding: 4rem;
  }
  h1 { font-size: 3.5rem; font-weight: 400; line-height: 1.2; max-width: 900px; margin-bottom: 1rem; }
  p { font-family: 'Inter', sans-serif; font-size: 1.4rem; opacity: 0.9; max-width: 700px; }
  .site { position: absolute; bottom: 2rem; font-family: 'Inter', sans-serif; font-size: 1rem; opacity: 0.7; letter-spacing: 0.05em; }
</style></head>
<body>
  <h1 id="t">TITLE</h1>
  <p id="d">DESCRIPTION</p>
  <div class="site">kylieis.online</div>
</body></html>`

const OG_IMAGES = {
  'home': { title: 'kylieis.online', description: 'Web developer and public speaker.' },
  'writing': { title: 'Written Thoughts', description: 'Kylie is writing about Javascript, AI, and more.' },
  'speaking': { title: 'Conference Talks & Presentations', description: 'Kylie is talking about Javascript, open source, GraphQL, and more.' },
  'projects': { title: 'Projects', description: "A selection of Kylie's open source work." },
  'about': { title: 'About', description: 'Kylie Czajkowski — Web developer and public speaker.' },
}

export async function generateOgImages(posts) {
  console.log('Generating OG images...')
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const entries = { ...OG_IMAGES }
  for (const post of posts) {
    entries[`post-${post.id}`] = { title: post.title, description: post.description ?? '' }
  }

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

  for (const [name, { title, description }] of Object.entries(entries)) {
    const html = OG_TEMPLATE.replace('TITLE', title).replace('DESCRIPTION', description)
    await page.setContent(html, { waitUntil: 'networkidle' })
    await page.screenshot({ path: path.join(OUT_DIR, `${name}.jpg`), type: 'jpeg', quality: 85 })
    console.log(`  og: ${name}.jpg`)
  }

  await browser.close()
  console.log('OG images done')
}
