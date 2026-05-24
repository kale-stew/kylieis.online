import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { PostMeta } from '../components/PostMeta'
import { renderMarkdown } from '../lib/markdown'

export interface TalkPost {
  id: string
  title: string
  description: string | null
  category: string
  date: string
  content: string
  presentedAt: {
    eventDate: string
    eventName: string
    eventType: 'meetup' | 'conference'
    eventUrl?: string
    recordedPresentationUrl?: string
    location: string
  }[]
  blogPost?: string
}

export function TalkPage({ talk }: { talk: TalkPost }) {
  const htmlContent = renderMarkdown(talk.content)

  return Layout({
    title: talk.title,
    description: talk.description ?? `A talk by Kylie Czajkowski about ${talk.category}.`,
    ogImage: `https://kylieis.online/og/post-${talk.id}.jpg`,
    canonicalUrl: `https://kylieis.online/speaking/${talk.id}`,
    ogType: 'article',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <article class="prose">
              <header class="page-title">
                <h1>${talk.title}</h1>
                ${PostMeta({ category: talk.category, date: talk.date })}
              </header>

              <div class="talk-presentations">
                <h3>Presented at</h3>
                <ul class="presentation-list">
                  ${talk.presentedAt.map((p) => html`
                    <li>
                      <strong>
                        ${p.eventUrl
                          ? html`<a href="${p.eventUrl}" target="_blank" rel="noopener">${p.eventName}</a>`
                          : p.eventName
                        }
                      </strong>
                      <span class="tag">${p.eventType}</span>
                      <br />
                      <span class="text-muted">${p.location} · ${p.eventDate}</span>
                      ${p.recordedPresentationUrl ? html`
                        <br />
                        <a href="${p.recordedPresentationUrl}" target="_blank" rel="noopener" class="link-accent">Watch recording</a>
                      ` : ''}
                    </li>
                  `)}
                </ul>
              </div>

              ${talk.blogPost ? html`
                <p class="text-muted">
                  Related blog post: <a href="/writing/${talk.blogPost}" class="link-accent">${talk.title}</a>
                </p>
              ` : ''}

              <hr class="divider" />

              ${html([htmlContent])}
            </article>
            <hr class="divider" />
            <p class="text-center">
              <a href="/speaking" class="link-accent">← Back to Speaking</a>
            </p>
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
