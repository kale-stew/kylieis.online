import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'

export interface TalkListItem {
  id: string
  title: string
  description: string | null
  category: string
  date: string
  presentedAt: {
    eventName: string
    eventType: 'meetup' | 'conference'
    location: string
  }[]
}

export function SpeakingPage({ talks }: { talks: TalkListItem[] }) {
  return Layout({
    title: 'Speaking',
    description: 'Conference talks and presentations by Kylie Czajkowski.',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title">
            <h1>Speaking</h1>
            <p>Conference talks and presentations</p>
          </div>
          <div class="card-grid">
            ${talks.map((talk) => html`
              <article class="card">
                <h3><a href="/speaking/${talk.id}">${talk.title}</a></h3>
                <p>${talk.description}</p>
                <div class="meta">
                  <span class="tag">${talk.category}</span>
                  ${talk.presentedAt.length > 0
                    ? html`<span class="text-muted">${talk.presentedAt[0].eventName}</span>`
                    : talk.date
                  }
                </div>
              </article>
            `)}
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
