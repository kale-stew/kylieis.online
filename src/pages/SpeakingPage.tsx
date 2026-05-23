import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'
import type { TalkItem } from '../content'

export function SpeakingPage({ talks }: { talks: TalkItem[] }) {
  return Layout({
    title: 'Speaking',
    description: "Kylie is talking about Javascript, open source, GraphQL, and more.",
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl">Conference Talks & Presentations</h1>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(345px,1fr));grid-gap:2em;margin:2.2em 0">
            ${talks.map((talk) => html`
              <div class="talk-card">
                <h3 class="heading-sm">${talk.title}</h3>
                <p>${talk.description}</p>
                <small style="opacity:0.7">${talk.category} · ${talk.date}</small>
              </div>
            `)}
          </div>
        </main>
      </div>
      ${Footer()}
    `,
  })
}
