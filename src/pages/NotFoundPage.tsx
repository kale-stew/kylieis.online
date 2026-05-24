import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'

export function NotFoundPage() {
  return Layout({
    title: '404',
    description: 'Page not found',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content text-center">
            <div class="page-title page-title--section" style="margin-top:var(--space-3xl)">
              <h1>404</h1>
              <p>Page not found</p>
            </div>
            <p>
              <a href="/" class="link-accent">← Go home</a>
            </p>
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
