import { html, raw } from 'hono/html'
import { marked } from 'marked'
import { Layout, PageHeader, Footer } from '../components/Layout'

interface BlogPostPageProps {
  post: {
    id: string
    title: string
    description: string | null
    date: string
    category: string
    content: string
  }
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const bodyHtml = marked.parse(post.content, { async: false }) as string

  return Layout({
    title: post.title,
    description: post.description ?? undefined,
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <article class="content-wrapper blog-post">
          <h1 class="heading-2xl">${post.title}</h1>
          <p class="center-text" style="opacity:0.7;font-family:'Arsenal',sans-serif">
            ${post.date} · ${post.category}
          </p>
          <div class="white-bg prose">${raw(bodyHtml)}</div>
        </article>
      </div>
      ${Footer()}
    `,
  })
}
