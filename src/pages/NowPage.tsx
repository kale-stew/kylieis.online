import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'

export interface NowEntry {
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

// Entry dates are calendar dates (YYYY-MM-DD); format in UTC so they never shift a day
function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

interface NowPageProps {
  /** null when there are no entries yet */
  entry: NowEntry | null
  allEntries: Pick<NowEntry, 'date'>[]
}

export function NowPage({ entry, allEntries }: NowPageProps) {
  const latestDate = allEntries[0]?.date
  const isLatest = !entry || entry.date === latestDate
  const items = entry
    ? Object.entries(entry)
        .filter(([key]) => key !== 'date')
        .filter(([, value]) => value != null && value !== '')
    : []

  return Layout({
    title: isLatest ? 'Now' : `Now: ${formatDate(entry!.date)}`,
    description: 'What Kylie is reading, watching, learning, and celebrating right now.',
    ogImage: 'https://kylieis.online/og/now.jpg',
    canonicalUrl: isLatest ? 'https://kylieis.online/now' : `https://kylieis.online/now/${entry!.date}`,
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title page-title--section">
              <h1>Now</h1>
              ${entry ? html`<p>${formatDate(entry.date)}</p>` : ''}
            </div>
            ${entry
              ? html`
                ${isLatest ? '' : html`<p class="now-archive-note text-center">An older entry. <a href="/now" class="link-accent">See what I'm doing now →</a></p>`}
                <ul class="now-list">
                  ${items.map(([key, value]) => html`
                    <li>
                      <b>${LABELS[key] ?? key}</b>
                      ${value}
                    </li>
                  `)}
                </ul>
              `
              : html`<p class="text-center text-muted">No updates yet. This page lists what I'm reading, watching, learning, and working on, once there's something to share.</p>`}
            ${allEntries.length > 1
              ? html`
                <hr class="divider" />
                <h2 class="text-center">all entries</h2>
                <ul class="now-archive">
                  ${allEntries.map((e) => {
                    const current = entry?.date === e.date
                    const href = e.date === latestDate ? '/now' : `/now/${e.date}`
                    return html`<li><a href="${href}"${current ? html` aria-current="page"` : ''}>${formatDate(e.date)}</a></li>`
                  })}
                </ul>
              `
              : ''}
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
