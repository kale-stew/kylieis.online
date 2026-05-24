import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { BlogPost } from '../content'
import { marked } from 'marked'

export function BlogPostPage({ post }: { post: BlogPost }) {
  const htmlContent = marked.parse(post.content, { async: false }) as string

  return Layout({
    title: post.title,
    description: post.description ?? '',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <article class="prose">
              <header class="page-title">
                <h1>${post.title}</h1>
                <p>
                  <span class="tag">${post.category}</span>
                  ${post.date}
                </p>
              </header>
              ${html([htmlContent])}
            </article>
            <hr class="divider" />
            <p class="text-center">
              <a href="/writing" class="link-accent">← Back to Writing</a>
            </p>
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
