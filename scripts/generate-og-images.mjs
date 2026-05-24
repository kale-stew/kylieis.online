import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'static', 'og')

// Embed Otis as base64 data URI so Playwright can render it
const OTIS_BASE64 = fs.readFileSync(path.join(ROOT, 'public', 'images', 'otis.png')).toString('base64')
const OTIS_DATA_URI = `data:image/png;base64,${OTIS_BASE64}`

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const GRADIENTS = [
  'linear-gradient(135deg, #e23500 0%, #ffbc2d 100%)',
  'linear-gradient(135deg, #c41e00 0%, #ff9500 100%)',
  'linear-gradient(135deg, #ff4e00 0%, #ffb700 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #ffbc2d 100%)',
  'linear-gradient(135deg, #ff3b30 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #e23500 0%, #ff6b35 50%, #ffbc2d 100%)',
  'linear-gradient(135deg, #c41e00 0%, #e23500 50%, #ff9500 100%)',
  'linear-gradient(135deg, #ff4e00 0%, #ff8c42 50%, #ffb700 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #ffbc2d 50%, #ffd700 100%)',
  'linear-gradient(135deg, #e23500 0%, #ff3b30 50%, #ff9500 100%)',
  'linear-gradient(45deg, #ffbc2d 0%, #e23500 100%)',
  'linear-gradient(45deg, #ffb700 0%, #c41e00 100%)',
  'linear-gradient(45deg, #ff8c42 0%, #ff4e00 100%)',
  'linear-gradient(45deg, #ff9500 0%, #e23500 50%, #c41e00 100%)',
  'linear-gradient(90deg, #e23500 0%, #ffbc2d 100%)',
  'linear-gradient(180deg, #ffbc2d 0%, #e23500 100%)',
  'linear-gradient(225deg, #ff6b35 0%, #c41e00 100%)',
  'linear-gradient(225deg, #ff9500 0%, #e23500 50%, #ff4e00 100%)',
  'radial-gradient(circle at top left, #ffbc2d 0%, #e23500 100%)',
  'radial-gradient(circle at bottom right, #e23500 0%, #ffbc2d 100%)',
]

const DISPLAY_FONTS = [
  'Monoton',
  'Rubik Glitch',
  'Nabla',
  'Silkscreen',
  'Bitcount Prop Single',
  'Megrim',
  'Atomic Age',
  'Jersey 10',
]

function getRandomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
}

function getRandomFont() {
  return DISPLAY_FONTS[Math.floor(Math.random() * DISPLAY_FONTS.length)]
}

const OG_TEMPLATE = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Fira+Code:wght@400&family=Monoton&family=Rubik+Glitch&family=Nabla&family=Silkscreen&family=Bitcount+Prop+Single&family=Megrim&family=Atomic+Age&family=Jersey+10&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: GRADIENT;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center; color: white;
    font-family: 'Inter', sans-serif; padding: 2.5rem;
  }
  body.landing h1 { font-size: 7rem; max-width: 1150px; }
  body.landing p { font-size: 2.5rem; max-width: 1050px; }
  body.post h1 { font-size: 5.5rem; max-width: 1050px; }
  body.post p { font-size: 2rem; max-width: 900px; }
  h1 { font-family: 'FONT_FAMILY', sans-serif; font-weight: 400; line-height: 1.05; margin-bottom: 1.5rem; color: #fff; }
  p { font-family: 'Inter', sans-serif; color: #fff; line-height: 1.4; }
  .site { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); font-family: 'Fira Code', monospace; font-size: 1.6rem; opacity: 0.7; letter-spacing: 0.05em; }
  .otis { position: absolute; bottom: 20px; right: 20px; width: 220px; height: auto; }
</style></head>
<body class="PAGE_TYPE">
  <h1 id="t">TITLE</h1>
  <p id="d">DESCRIPTION</p>
  <div class="site">kylieis.online</div>
  <img class="otis" src="OTIS_URI" alt="Otis" />
</body></html>`

const TAGLINES = [
  'web developer public speaker',
  'building on the edge',
  'developing the agent development experience',
  'mountaineer on the weekends',
  'making things fast',
  'working with Workers',
  'shipping from the summit',
  'peak bagger problem solver',
  "building things that don't crash (usually)",
  'chronic early adopter',
  'agent of chaos',
  'hiking the sierras',
  'making the web weirder',
  'trying to make the machines like me',
  'edge case enthusiast',
  'learning in public',
]

function getRandomTagline() {
  return TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
}

const OG_IMAGES = {
  'home': { title: 'kylieis.online', description: 'web developer public speaker' },
  'writing': { title: 'Written Thoughts', description: 'kylie is writing about javascript ai and more' },
  'speaking': { title: 'Conference Talks & Presentations', description: 'kylie is talking about javascript open source graphql and more' },
  'projects': { title: 'Projects', description: 'a selection of kylies open source work' },
  'about': { title: 'About', description: getRandomTagline() },
  'now': { title: 'Now', description: 'what kylie is reading watching learning and celebrating' },
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
    const pageType = name.startsWith('post-') ? 'post' : 'landing'
    const html = OG_TEMPLATE
      .replace('GRADIENT', getRandomGradient())
      .replace('FONT_FAMILY', getRandomFont())
      .replace('PAGE_TYPE', pageType)
      .replace('OTIS_URI', OTIS_DATA_URI)
      .replace('TITLE', escapeHtml(title))
      .replace('DESCRIPTION', escapeHtml(description))
    await page.setContent(html, { waitUntil: 'networkidle' })
    await page.screenshot({ path: path.join(OUT_DIR, `${name}.jpg`), type: 'jpeg', quality: 85 })
    console.log(`  og: ${name}.jpg`)
  }

  await browser.close()
  console.log('OG images done')
}
