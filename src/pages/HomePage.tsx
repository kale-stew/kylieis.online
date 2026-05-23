import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'

export function HomePage() {
  return Layout({
    title: 'Home',
    content: html`
      ${PageHeader()}
      <div style="z-index:-50;position:absolute;top:0;left:0;width:100%;height:100%;background-image:var(--linear-gradient)"></div>
      <div style="height:70vh;display:flex;text-align:center;flex-direction:column;align-items:center;justify-content:center">
        <div style="display:flex;flex-direction:column;gap:2rem">
        </div>
      </div>
      ${Footer()}
    `,
  })
}
