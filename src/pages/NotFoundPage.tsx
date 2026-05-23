import { html } from 'hono/html'
import { Layout, PageHeader } from '../components/Layout'

export function NotFoundPage() {
  return Layout({
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper" style="text-align:center;padding:4rem 0">
          <h1 class="heading-2xl">404</h1>
          <p>This page doesn't exist.</p>
          <a href="/" class="styled-link">Go home</a>
        </main>
      </div>
    `,
  })
}
