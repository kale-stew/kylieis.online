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
  const fontClasses = ['home-h1-monoton', 'home-h1-glitch', 'home-h1-nabla', 'home-h1-silkscreen', 'home-h1-bitcount', 'home-h1-megrim', 'home-h1-atomic', 'home-h1-nanum', 'home-h1-jersey']
  const h1FontClass = fontClasses[Math.floor(Math.random() * fontClasses.length)]

  return Layout({
    title: 'Home',
    description: 'Kylie Czajkowski — Web developer and public speaker.',
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
                  <div class="card card-photo" onclick="openPhotoModal('${item.src}', '${item.alt.replace(/'/g, "\\'")}', '${item.location.replace(/'/g, "\\'")}')" style="cursor: pointer;">
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
      <div id="photo-modal" class="photo-modal" onclick="closePhotoModalOnBackdrop(event)">
        <button class="photo-modal-close" onclick="closePhotoModal()" aria-label="Close photo modal" title="Close (ESC)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <button class="photo-modal-nav photo-modal-prev" onclick="prevPhoto(event)" aria-label="Previous photo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="photo-modal-nav photo-modal-next" onclick="nextPhoto(event)" aria-label="Next photo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <div class="photo-modal-content">
          <img id="photo-modal-img" src="" alt="" />
          <div class="photo-modal-caption">
            <p id="photo-modal-alt"></p>
            <p class="photo-modal-location" id="photo-modal-location"></p>
          </div>
        </div>
      </div>
      <script>
        var pagePhotos = ${JSON.stringify(items.filter((item): item is PhotoCard => item.type === 'photo').map((item) => ({ src: item.src, alt: item.alt, location: item.location })))};
        var currentPhotoIndex = 0;

        function openPhotoModal(src, alt, location) {
          currentPhotoIndex = pagePhotos.findIndex(function(p) { return p.src === src; });
          if (currentPhotoIndex === -1) currentPhotoIndex = 0;
          updatePhotoModal();
          const modal = document.getElementById('photo-modal');
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        function updatePhotoModal() {
          const photo = pagePhotos[currentPhotoIndex];
          const img = document.getElementById('photo-modal-img');
          const altEl = document.getElementById('photo-modal-alt');
          const locationEl = document.getElementById('photo-modal-location');
          img.src = photo.src;
          img.alt = photo.alt;
          altEl.textContent = photo.alt;
          locationEl.textContent = photo.location;
        }
        function closePhotoModal() {
          const modal = document.getElementById('photo-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
        function closePhotoModalOnBackdrop(event) {
          if (event.target === event.currentTarget) {
            closePhotoModal();
          }
        }
        function prevPhoto(e) {
          e.stopPropagation();
          currentPhotoIndex = (currentPhotoIndex - 1 + pagePhotos.length) % pagePhotos.length;
          updatePhotoModal();
        }
        function nextPhoto(e) {
          e.stopPropagation();
          currentPhotoIndex = (currentPhotoIndex + 1) % pagePhotos.length;
          updatePhotoModal();
        }
        document.addEventListener('keydown', function(e) {
          const modal = document.getElementById('photo-modal');
          if (!modal.classList.contains('open')) return;
          if (e.key === 'Escape') {
            closePhotoModal();
          } else if (e.key === 'ArrowLeft') {
            prevPhoto(e);
          } else if (e.key === 'ArrowRight') {
            nextPhoto(e);
          }
        });
      </script>
      ${Footer()}
    `,
  })
}
