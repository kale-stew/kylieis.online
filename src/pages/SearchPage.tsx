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
              <p>Search posts and talks across the site</p>
            </div>
            <form action="/search" method="get" class="search-form">
              <input
                type="search"
                name="q"
                value="${query ?? ''}"
                placeholder="Search posts..."
                class="search-form-input"
                autofocus
              />
              <button type="submit" class="search-form-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Search
              </button>
            </form>
            ${results && results.length > 0
              ? html`
                <div class="search-results-count">
                  ${results.length} result${results.length > 1 ? 's' : ''} for "${query}"
                </div>
                <div class="card-grid">
                  ${results.map((r) => html`
                    <article class="card">
                      <h3><a href="/${r.type === 'blog' ? 'writing' : 'speaking'}/${r.id}">${r.title}</a></h3>
                      <p>${r.description ?? ''}</p>
                      <div class="meta">
                        <span class="tag">#${r.category}</span>
                        ${r.type === 'talk' ? html`<span class="tag tag-type">talk</span>` : ''}
                        ${r.date}
                      </div>
                    </article>
                  `)}
                </div>
              `
              : query
                ? html`<p class="text-center text-muted">No results found for "${query}"</p>`
                : html`
                  <div class="search-empty-state">
                    <p class="text-center text-muted">Start typing to search posts and talks.</p>
                    <p class="text-center text-muted" style="font-size:0.85rem">Or press <kbd>Cmd+K</kbd> from anywhere on the site.</p>
                  </div>
                `
            }
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
