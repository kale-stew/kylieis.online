import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'

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

const NOW_LABELS: Record<string, string> = {
  celebrate: '🎉 Celebrating',
  learn: '📚 Learning',
  listen: '🎧 Listening To',
  location: '📍 Location',
  read: '📖 Reading',
  travel: '🛫 Travel',
  watch: '📺 Watching',
  work: '👩🏼‍💻 Working On',
}

export function NowPage({ entry, allEntries }: { entry: NowEntry; allEntries: Pick<NowEntry, 'date'>[] }) {
  return Layout({
    title: 'Now',
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl">What I'm Doing "Now"</h1>
          <h2 class="center-text heading-md" style="font-style:italic;font-family:'Arsenal',sans-serif">
            ${formatDate(entry.date)}
          </h2>
          <div class="white-bg">
            <ul class="now-items">
              ${Object.entries(entry)
                .filter(([key]) => key !== 'id' && key !== 'date')
                .filter(([, value]) => value)
                .map(([key, value]) => html`
                  <li><b>${NOW_LABELS[key] ?? key}:</b> ${value}</li>
                `)}
            </ul>
          </div>
          <hr class="page-divider" />
          <h2 class="center-text heading-lg">All Entries, Past & Present:</h2>
          <ul class="past-entries">
            ${allEntries.map((e) => html`
              <li>${formatDate(e.date)}</li>
            `)}
          </ul>
          <div class="center-text" style="margin:2rem">
            <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="styled-link">What is this page?</a>
          </div>
        </main>
      </div>
      ${Footer()}
    `,
  })
}

function formatDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
