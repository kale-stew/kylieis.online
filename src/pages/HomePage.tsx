import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { PHOTOS, TAGLINES, PROJECTS } from '../content'

interface HomePagePost {
  id: string
  title: string
  description: string | null
  category: string
  date: string
}

interface HomePageProject {
  title: string
  description: string
  url: string
}

type ContentCard = { type: 'content'; title: string; href: string; description: string; date?: string; tag: string }
type PhotoCard = { type: 'photo'; src: string; alt: string; location: string }
type CardItem = ContentCard | PhotoCard

export function HomePage({ recentPosts, featuredProjects }: { recentPosts: HomePagePost[], featuredProjects: HomePageProject[] }) {
  const contentCards: ContentCard[] = [
    ...recentPosts.slice(0, 3).map((p) => ({
      type: 'content' as const,
      title: p.title,
      href: `/writing/${p.id}`,
      description: p.description ?? '',
      date: p.date,
      tag: p.category,
    })),
    ...featuredProjects.slice(0, 1).map((p) => ({
      type: 'content' as const,
      title: p.title,
      href: p.url,
      description: p.description,
      tag: 'project',
    })),
  ]

  const fallbackProjects = PROJECTS.filter((p) => !p.featured).map((p) => ({
    type: 'content' as const,
    title: p.title,
    href: p.url,
    description: p.description,
    tag: 'project',
  }))

  while (contentCards.length < 3 && fallbackProjects.length > 0) {
    contentCards.push(fallbackProjects.shift()!)
  }

  const shuffled = [...PHOTOS].sort(() => Math.random() - 0.5)
  const totalContent = Math.min(contentCards.length, 4)
  const slots: ('content' | 'photo')[] = [
    'content', 'content', 'photo',
    'content', 'content', 'photo',
  ]
  let ci = 0
  let pi = 0
  const items: CardItem[] = slots.map((slot) => {
    if (slot === 'content' && ci < totalContent) {
      return contentCards[ci++]
    }
    const photo = shuffled[pi++ % shuffled.length]
    return { type: 'photo', src: photo.src, alt: photo.alt, location: photo.location }
  })

  const tagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]

  return Layout({
    title: 'Home',
    description: 'Kylie Czajkowski — Web developer and public speaker.',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title" style="margin-top:var(--space-xl)">
            <h1>kylieis.online</h1>
            <p class="tagline">${tagline}</p>
          </div>
          <div class="card-grid">
            ${items.map((item) => {
              if (item.type === 'photo') {
                return html`
                  <div class="card card-photo">
                    <img src="${item.src}" alt="${item.alt}" />
                    <span class="photo-location">${item.location}</span>
                  </div>
                `
              }
              return html`
                <article class="card">
                  <h3><a href="${item.href}">${item.title}</a></h3>
                  <p>${item.description}</p>
                  <div class="meta">
                    <span class="tag">${item.tag}</span>
                    ${item.date ?? ''}
                  </div>
                </article>
              `
            })}
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
