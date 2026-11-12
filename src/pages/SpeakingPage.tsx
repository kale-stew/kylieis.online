import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { CategoryTags } from '../components/PostMeta'

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
    description: 'Conference talks and presentations by Kylie Czajkowski on JavaScript, React, GraphQL, open source, and developer tools.',
    ogImage: 'https://kylieis.online/og/speaking.jpg',
    canonicalUrl: 'https://kylieis.online/speaking',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title page-title--section">
            <h1>Speaking</h1>
            <p>Conference talks and presentations</p>
          </div>
          <div class="card-grid">
            ${talks.map((talk) => html`
              <article class="card">
                <h3><a href="/speaking/${talk.id}">${talk.title}</a></h3>
                <p>${talk.description}</p>
                <div class="meta">
                  ${CategoryTags({ category: talk.category })}
                  ${talk.presentedAt.length > 0
                    ? html`<span class="tag tag-type">${talk.presentedAt[0].eventName}</span>`
                    : ''
                  }
                  <span class="meta-date">${talk.date}</span>
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
