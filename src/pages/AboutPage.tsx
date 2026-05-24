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
                  <img src="${photo.src}" alt="${photo.alt}" loading="lazy" onclick="openPhotoModalFromEl(this)" style="cursor: pointer;" data-photo-src="${photo.src}" data-photo-alt="${photo.alt}" data-photo-location="${photo.location}" />
                  <p class="photo-label">${photo.location}</p>
                </div>
              `)}
            </div>
          </div>
        </div>
      </main>
      <script>
        window.photoModalPhotos = ${JSON.stringify(allPhotos)};
      </script>
      ${Footer()}
    `,
  })
}
