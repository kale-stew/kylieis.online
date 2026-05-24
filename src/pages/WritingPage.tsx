import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { PostMeta } from '../content'
import { CATEGORIES } from '../content'

export function WritingPage({ posts, activeCategory }: { posts: PostMeta[], activeCategory?: string }) {
  const categories = CATEGORIES.filter(c => c !== 'all')
  const filteredPosts = activeCategory && activeCategory !== 'all'
    ? posts.filter(p => p.category === activeCategory)
    : posts

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
          <div class="category-filters">
            <a href="/writing" class="category-filter ${!activeCategory || activeCategory === 'all' ? 'active' : ''}">#all</a>
            ${categories.map((cat) => html`
              <a href="/writing/category/${cat}" class="category-filter ${activeCategory === cat ? 'active' : ''}">#${cat}</a>
            `)}
          </div>
          <div class="card-grid">
            ${filteredPosts.map((post) => html`
              <article class="card">
                <h3><a href="/writing/${post.id}">${post.title}</a></h3>
                <p>${post.description ?? ''}</p>
                <div class="meta">
                  <a href="/writing/category/${post.category}" class="tag">#${post.category}</a>
                  ${post.date}
                </div>
              </article>
            `)}
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
