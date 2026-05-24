import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'

interface NowEntry {
  date: string
  location: string | null
  celebrate: string | null
  read: string | null
  travel: string | null
  learn: string | null
  watch: string | null
  listen: string | null
  work: string | null
}

const LABELS: Record<string, string> = {
  location: '📍 Location',
  celebrate: '🎉 Celebrating',
  read: '📖 Reading',
  travel: '✈️ Travel',
  learn: '📚 Learning',
  watch: '📺 Watching',
  listen: '🎧 Listening',
  work: '💻 Working On',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function NowPage({ entry, allEntries }: { entry: NowEntry; allEntries: Pick<NowEntry, 'date'>[] }) {
  const items = Object.entries(entry)
    .filter(([key]) => key !== 'date')
    .filter(([, value]) => value != null)

  return Layout({
    title: 'Now',
    description: "What Kylie is reading, watching, learning, and celebrating right now.",
    ogImage: 'https://kylieis.online/og/now.jpg',
    canonicalUrl: 'https://kylieis.online/now',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title page-title--section">
              <h1>Now</h1>
              <p>${formatDate(entry.date)}</p>
            </div>
            <ul class="now-list">
              ${items.map(([key, value]) => html`
                <li>
                  <b>${LABELS[key] ?? key}</b>
                  ${value}
                </li>
              `)}
            </ul>
            <hr class="divider" />
            <h2 class="text-center">Past Entries</h2>
            <ul class="now-list text-center">
              ${allEntries.map((e) => html`
                <li>${formatDate(e.date)}</li>
              `)}
            </ul>
            <p class="text-center mt-xl">
              <a href="https://nownownow.com/about" target="_blank" rel="noopener" class="link-accent">What is this page?</a>
            </p>
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
