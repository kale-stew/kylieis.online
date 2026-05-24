import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'

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
    description: 'Search posts on kylieis.online',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title">
              <h1>Search</h1>
            </div>
            <form action="/search" method="get" style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-xl)">
              <input
                type="search"
                name="q"
                value="${query ?? ''}"
                placeholder="Search posts..."
                style="flex:1;padding:var(--space-sm) var(--space-md);font-size:1rem;border:1px solid var(--color-text-muted);border-radius:var(--radius-md)"
              />
              <button type="submit" style="padding:var(--space-sm) var(--space-md);background:var(--color-accent);color:white;border:none;border-radius:var(--radius-md);cursor:pointer">
                Search
              </button>
            </form>
            ${results && results.length > 0
              ? html`
                <div class="card-grid">
                  ${results.map((r) => html`
                    <article class="card">
                      <h3><a href="/${r.type === 'blog' ? 'writing' : 'speaking'}/${r.id}">${r.title}</a></h3>
                      <p>${r.description ?? ''}</p>
                      <div class="meta">
                        <span class="tag">${r.category}</span>
                        ${r.date}
                      </div>
                    </article>
                  `)}
                </div>
              `
              : query
                ? html`<p class="text-center text-muted">No results found for "${query}"</p>`
                : ''
            }
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
