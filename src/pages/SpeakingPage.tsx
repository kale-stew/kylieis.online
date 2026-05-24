import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { TalkItem } from '../content'

export function SpeakingPage({ talks }: { talks: TalkItem[] }) {
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
                <h3>${talk.title}</h3>
                <p>${talk.description}</p>
                <div class="meta">
                  <span class="tag">${talk.category}</span>
                  ${talk.date}
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
