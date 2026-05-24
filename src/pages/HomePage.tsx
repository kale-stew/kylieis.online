import { html, raw } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { PHOTOS, TAGLINES, PROJECTS, type Photo } from '../content'
import { getPhotoUrl, getPhotoSrcset, type Photo as ApiPhoto } from '../lib/photos-api'

interface HomePagePost {
  id: string
  title: string
  description: string | null
  category: string
  date: string
  type?: 'blog' | 'talk'
}

interface HomePageProject {
  title: string
  description: string
  url: string
}

type ContentCard = { type: 'content'; title: string; href: string; description: string; date?: string; tag: string }
type PhotoCard = { type: 'photo'; src: string; srcset?: string; alt: string; location: string; date: string; blurhash?: string }
type CardItem = ContentCard | PhotoCard

interface HomePageProps {
  recentPosts: HomePagePost[]
  featuredProjects: HomePageProject[]
  photos?: ApiPhoto[]
}

export function HomePage({ recentPosts, featuredProjects, photos: apiPhotos }: HomePageProps) {
  // Convert API photos to the Photo format, or fall back to hardcoded PHOTOS
  const photoSource: Photo[] = apiPhotos && apiPhotos.length > 0
    ? apiPhotos.map((p) => ({
        src: getPhotoUrl(p.id, 800),
        srcset: getPhotoSrcset(p.id),
        alt: p.title ?? '',
        location: p.location ?? '',
        date: p.date ?? '',
        blurhash: p.blurhash ?? undefined,
      }))
    : PHOTOS
  const contentCards: ContentCard[] = [
    ...recentPosts.slice(0, 3).map((p) => ({
      type: 'content' as const,
      title: p.title,
      href: p.type === 'talk' ? `/speaking/${p.id}` : `/writing/${p.id}`,
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

  const shuffled = [...photoSource].sort(() => Math.random() - 0.5)
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
    return { 
      type: 'photo', 
      src: photo.src, 
      srcset: photo.srcset,
      alt: photo.alt, 
      location: photo.location, 
      date: photo.date,
      blurhash: photo.blurhash,
    }
  })

  const tagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
  const fontClasses = ['home-h1-monoton', 'home-h1-glitch', 'home-h1-nabla', 'home-h1-silkscreen', 'home-h1-bitcount', 'home-h1-megrim', 'home-h1-atomic', 'home-h1-fira', 'home-h1-jersey']
  const h1FontClass = fontClasses[Math.floor(Math.random() * fontClasses.length)]

  return Layout({
    title: 'kylieis.online',
    description: 'Kylie Czajkowski — Engineering Manager at Cloudflare, public speaker, mountaineer. Writing about JavaScript, AI, and building things.',
    canonicalUrl: 'https://kylieis.online/',
    content: html`
      ${Nav()}
      <main class="home-main">
        <div class="container">
          <div class="page-title home-hero">
            <h1 class="${h1FontClass}">kylieis.online</h1>
            <div class="tagline-row">
              <p class="tagline">${tagline}</p>
              <button class="refresh-btn" onclick="location.reload()" title="Refresh content">↻</button>
            </div>
          </div>
          <div class="card-grid">
            ${items.map((item) => {
              if (item.type === 'photo') {
                return html`
                  <div class="card card-photo" onclick="openPhotoModalFromEl(this.querySelector('img'))" style="cursor: pointer;">
                    <img 
                      src="${item.src}" 
                      ${raw(item.srcset ? `srcset="${item.srcset}"` : '')}
                      sizes="(max-width: 600px) 100vw, 400px"
                      alt="${item.alt}" 
                      data-photo-src="${item.src}" 
                      data-photo-alt="${item.alt}" 
                      data-photo-location="${item.location}" 
                      data-photo-date="${item.date.split('-')[0]}"
                      ${raw(item.blurhash ? `data-blurhash="${item.blurhash}"` : '')}
                    />
                    <span class="photo-location">${item.location}${item.location && item.date ? ' · ' : ''}${item.date.split('-')[0]}</span>
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
      <script>
        window.photoModalPhotos = ${JSON.stringify(items.filter((item): item is PhotoCard => item.type === 'photo').map((item) => ({ src: item.src, alt: item.alt, location: item.location, date: item.date })))};
      </script>
      ${Footer()}
    `,
  })
}
