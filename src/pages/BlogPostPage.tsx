import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { PostMeta } from '../components/PostMeta'
import type { BlogPost } from '../content'
import { renderMarkdown } from '../lib/markdown'

export function BlogPostPage({ post }: { post: BlogPost }) {
  const htmlContent = renderMarkdown(post.content)

  return Layout({
    title: post.title,
    description: post.description ?? `A post about ${post.category} by Kylie Czajkowski.`,
    ogImage: `https://kylieis.online/og/post-${post.id}.jpg`,
    canonicalUrl: `https://kylieis.online/writing/${post.id}`,
    ogType: 'article',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <article class="prose">
              <header class="page-title">
                <h1>${post.title}</h1>
                ${PostMeta({ category: post.category, date: post.date })}
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
