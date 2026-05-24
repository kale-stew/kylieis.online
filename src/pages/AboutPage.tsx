import { html, raw } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { METADATA, SOCIAL_LINKS, SOCIAL_ICONS, PERSONAL_TIMELINE, PHOTOS, TimelineEntry, Photo } from '../content'

function renderTimelineEntry(entry: TimelineEntry) {
  if (entry.type === 'milestone') {
    return html`
      <div class="timeline-milestone">
        <img src="${entry.image}" alt="${entry.title}" />
        <div class="timeline-milestone-content">
          <h3>${entry.title}</h3>
          <p class="text-muted">${entry.location ? `${entry.location} · ` : ''}${entry.date}</p>
        </div>
      </div>
    `
  }
  return html`
    <div class="timeline-job">
      <h3>${entry.jobTitle} @ ${entry.company}</h3>
      <p class="text-muted">${entry.location} · ${entry.startDate}${entry.endDate ? ` — ${entry.endDate}` : ''}</p>
      <p>${entry.description}</p>
    </div>
  `
}

export function AboutPage() {
  const allPhotos: Photo[] = [...PERSONAL_TIMELINE.filter((e): e is typeof e & { image: string } => e.type === 'milestone').map((e) => ({ src: e.image, alt: e.title, location: e.location ?? '' })), ...PHOTOS]

  return Layout({
    title: 'About',
    description: `${METADATA.fullName} — Engineering Manager, public speaker, and mountaineer.`,
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title">
              <h1>About</h1>
            </div>
            <p class="text-center">
              ${METADATA.firstName} leads the Agent Experience team at Cloudflare, building the developer experience for AI agents on the Workers platform. Outside of work, she's a mountaineer who has climbed over 109 peaks above 4,267 meters (14,000 feet).
            </p>
            <div class="social-icons">
              ${SOCIAL_LINKS.map((link) => html`
                <a href="${link.url}" target="_blank" rel="noopener" title="${link.label}">
                  ${raw(SOCIAL_ICONS[link.icon])}
                </a>
              `)}
            </div>
            <hr class="divider" />
            <h2 class="text-center">Timeline</h2>
            ${PERSONAL_TIMELINE.map((entry) => renderTimelineEntry(entry))}
            <hr class="divider" />
            <h2 class="text-center">Photos</h2>
            <div class="photo-grid">
              ${allPhotos.map((photo, i) => html`
                <div>
                  <img src="${photo.src}" alt="${photo.alt}" loading="lazy" onclick="openPhotoModal(${i})" style="cursor: pointer;" />
                  <p class="photo-label">${photo.location}</p>
                </div>
              `)}
            </div>
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
        var aboutPhotos = ${JSON.stringify(allPhotos)};
        var currentPhotoIndex = 0;

        function openPhotoModal(index) {
          currentPhotoIndex = index;
          updatePhotoModal();
          const modal = document.getElementById('photo-modal');
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        function updatePhotoModal() {
          const photo = aboutPhotos[currentPhotoIndex];
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
          currentPhotoIndex = (currentPhotoIndex - 1 + aboutPhotos.length) % aboutPhotos.length;
          updatePhotoModal();
        }
        function nextPhoto(e) {
          e.stopPropagation();
          currentPhotoIndex = (currentPhotoIndex + 1) % aboutPhotos.length;
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
