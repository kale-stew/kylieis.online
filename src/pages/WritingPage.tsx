import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { PostMeta } from '../content'

export function WritingPage({ posts }: { posts: PostMeta[] }) {
  return Layout({
    title: 'Writing',
    description: 'Kylie is writing about Javascript, AI, and more.',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title">
            <h1>Writing</h1>
            <p>Thoughts on code, tools, and building things</p>
          </div>
          <div class="card-grid">
            ${posts.map((post) => html`
              <article class="card">
                <h3><a href="/writing/${post.id}">${post.title}</a></h3>
                <p>${post.description ?? ''}</p>
                <div class="meta">
                  <span class="tag">${post.category}</span>
                  ${post.date}
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
