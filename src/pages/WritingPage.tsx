import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { splitCategories } from '../components/PostMeta'
import type { PostMeta } from '../content'

export function WritingPage({ posts }: { posts: PostMeta[] }) {
  // Extract unique categories from all posts (splitting comma-separated values)
  const categories = [...new Set(posts.flatMap((p) => splitCategories(p.category)))].sort()

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
              ${posts.map((post) => {
                const postCategories = splitCategories(post.category)
                return html`
                <li class="post-list-item" data-categories="${postCategories.join(' ')}">
                  <a href="/${post.type === 'talk' ? 'speaking' : 'writing'}/${post.id}" class="post-list-link">
                    <span class="post-list-title">${post.title}</span>
                    <span class="post-list-meta">
                      ${postCategories.map((cat) => html`<span class="tag">#${cat}</span>`)}
                      ${post.type === 'talk' ? html`<span class="tag tag-type">talk</span>` : ''}
                      <span class="post-list-date">${post.date}</span>
                    </span>
                  </a>
                </li>
              `})}
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

          const items = document.querySelectorAll('#post-grid .post-list-item')
          let lastVisible = null
          items.forEach(item => {
            const categories = (item.dataset.categories || '').split(' ')
            const visible = category === 'all' || categories.includes(category)
            item.style.display = visible ? '' : 'none'
            item.classList.remove('last-visible')
            if (visible) lastVisible = item
          })
          if (lastVisible) lastVisible.classList.add('last-visible')

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
