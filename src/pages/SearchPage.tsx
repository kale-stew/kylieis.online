import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'

interface SearchResult {
  id: string
  title: string
  description: string | null
  category: string
  date: string
  type: string
}

export function SearchPage({ query, results }: { query?: string; results?: SearchResult[] }) {
  return Layout({
    title: 'Search',
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl">Search</h1>
          <form action="/search" method="get" style="display:flex;gap:0.5rem;justify-content:center;margin:2rem 0">
            <input
              type="search"
              name="q"
              value="${query ?? ''}"
              placeholder="Search posts..."
              style="padding:0.5rem;font-size:1rem;flex:1;max-width:400px"
            />
            <button type="submit" style="padding:0.5rem 1rem;font-size:1rem">Search</button>
          </form>
          ${query
            ? html`
              <p class="center-text" style="margin-bottom:1.5rem">
                ${results && results.length > 0
                  ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
                  : `No results found for "${query}"`}
              </p>
            `
            : ''}
          ${results && results.length > 0
            ? html`
              <ul style="list-style:none;padding:0">
                ${results.map((r) => html`
                  <li style="margin-bottom:1.5rem">
                    <a href="/${r.type === 'talk' ? 'speaking' : 'writing'}/${r.id}" class="styled-link" style="font-size:1.2rem">
                      ${r.title}
                    </a>
                    <p style="margin:0.25rem 0">${r.description ?? ''}</p>
                    <small style="opacity:0.7">${r.category} · ${r.date}</small>
                  </li>
                `)}
              </ul>
            `
            : ''}
        </main>
      </div>
      ${Footer()}
    `,
  })
}
