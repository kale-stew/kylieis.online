import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'
import type { PostMeta } from '../content'

export function WritingPage({ posts }: { posts: PostMeta[] }) {
  return Layout({
    title: 'Writing',
    description: "Kylie is writing about Javascript, AI, and more.",
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl">Written Thoughts</h1>
          <div class="white-bg">
            <ul style="display:flex;flex-direction:column;gap:2;padding:0;margin:0 auto;list-style:none">
              ${posts.map((post) => html`
                <li style="margin-bottom:1.5rem">
                  <a href="/writing/${post.id}" class="styled-link heading-md">${post.title}</a>
                  <p style="margin:0.25rem 0">${post.description ?? ''}</p>
                  <small style="opacity:0.7">#${post.category} · ${post.date}</small>
                </li>
              `)}
            </ul>
          </div>
        </main>
      </div>
      ${Footer()}
    `,
  })
}
