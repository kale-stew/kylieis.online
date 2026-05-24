import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { PostMeta } from '../content'

export function WritingPage({ posts }: { posts: PostMeta[] }) {
  const categories = [...new Set(posts.map(p => p.category))].sort()

  return Layout({
    title: 'Writing',
    description: 'Blog posts and articles by Kylie Czajkowski about JavaScript, AI, TypeScript, and building on the web.',
    ogImage: 'https://kylieis.online/open-graph/writing.jpg',
    canonicalUrl: 'https://kylieis.online/writing',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title page-title--section">
              <h1>Writing</h1>
              <p>Thoughts on code, tools, and building things</p>
            </div>
            <div class="category-filters" id="category-filters">
              <button class="category-filter active" data-category="all">#all</button>
              ${categories.map((cat) => html`
                <button class="category-filter" data-category="${cat}">#${cat}</button>
              `)}
            </div>
            <ul class="post-list" id="post-grid">
              ${posts.map((post) => html`
                <li class="post-list-item" data-category="${post.category}">
                  <a href="/${post.type === 'talk' ? 'speaking' : 'writing'}/${post.id}" class="post-list-link">
                    <span class="post-list-title">${post.title}</span>
                    <span class="post-list-meta">
                      <span class="tag">#${post.category}</span>
                      ${post.type === 'talk' ? html`<span class="tag tag-type">talk</span>` : ''}
                      <span class="post-list-date">${post.date}</span>
                    </span>
                  </a>
                </li>
              `)}
            </ul>
          </div>
        </div>
      </main>
      ${Footer()}
      <script>
        document.getElementById('category-filters')?.addEventListener('click', (e) => {
          const btn = e.target.closest('.category-filter')
          if (!btn) return
          const category = btn.dataset.category

          document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'))
          btn.classList.add('active')

          document.querySelectorAll('#post-grid .post-list-item').forEach(item => {
            item.style.display = (category === 'all' || item.dataset.category === category) ? '' : 'none'
          })

          const url = category === 'all' ? '/writing' : '/writing?category=' + category
          history.pushState({ category }, '', url)
        })

        window.addEventListener('popstate', () => {
          const params = new URLSearchParams(location.search)
          const cat = params.get('category')
          document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'))
          if (cat) {
            const btn = Array.from(document.querySelectorAll('.category-filter'))
              .find(el => el.dataset.category === cat)
            if (btn) btn.click()
          }
        })

        const params = new URLSearchParams(location.search)
        const cat = params.get('category')
        if (cat) {
          const btn = Array.from(document.querySelectorAll('.category-filter'))
            .find(el => el.dataset.category === cat)
          if (btn) btn.click()
        }
      </script>
    `,
  })
}
