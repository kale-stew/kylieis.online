import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { PostMeta } from '../content'

export function WritingPage({ posts, activeCategory }: { posts: PostMeta[], activeCategory?: string }) {
  const categories = [...new Set(posts.map(p => p.category))].sort()

  return Layout({
    title: activeCategory && activeCategory !== 'all' ? `Writing · #${activeCategory}` : 'Writing',
    description: 'Kylie is writing about Javascript, AI, and more.',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title">
            <h1>Writing</h1>
            <p>Thoughts on code, tools, and building things</p>
          </div>
          <div class="category-filters" id="category-filters">
            <button class="category-filter ${!activeCategory || activeCategory === 'all' ? 'active' : ''}" data-category="all">#all</button>
            ${categories.map((cat) => html`
              <button class="category-filter ${activeCategory === cat ? 'active' : ''}" data-category="${cat}">#${cat}</button>
            `)}
          </div>
          <div class="card-grid" id="post-grid">
            ${posts.map((post) => html`
              <article class="card" data-category="${post.category}">
                <h3><a href="/${post.type === 'talk' ? 'speaking' : 'writing'}/${post.id}">${post.title}</a></h3>
                <p>${post.description ?? ''}</p>
                <div class="meta">
                  ${post.type === 'talk' ? html`<span class="tag">#${post.category}</span><span class="tag tag-type">talk</span>` : html`<span class="tag">#${post.category}</span>`}
                  ${post.date}
                </div>
              </article>
            `)}
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

          document.querySelectorAll('#post-grid .card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none'
          })

          const url = category === 'all' ? '/writing' : '/writing?category=' + category
          history.pushState({ category }, '', url)
        })

        const params = new URLSearchParams(location.search)
        const cat = params.get('category')
        if (cat) {
          const btn = document.querySelector('.category-filter[data-category="' + cat + '"]')
          if (btn) btn.click()
        }
      </script>
    `,
  })
}
