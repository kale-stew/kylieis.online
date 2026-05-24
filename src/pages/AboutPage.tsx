import { html, raw } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { METADATA, SOCIAL_LINKS, SOCIAL_ICONS, PERSONAL_TIMELINE, PHOTOS, TimelineEntry, TimelineMilestone, Photo } from '../content'
import { getPhotoUrl, getPhotoSrcset, type Photo as ApiPhoto } from '../lib/photos-api'

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

interface AboutPageProps {
  photos?: ApiPhoto[]
}

export function AboutPage({ photos: apiPhotos }: AboutPageProps = {}) {
  // Convert API photos to the Photo format used by the modal
  const photosFromApi: Photo[] = (apiPhotos ?? []).map((p) => ({
    src: getPhotoUrl(p.id, 800),
    srcset: getPhotoSrcset(p.id),
    alt: p.title ?? '',
    location: p.location ?? '',
    date: p.date ?? '',
    blurhash: p.blurhash ?? undefined,
  }))

  // Use API photos for the photo grid (fallback to hardcoded PHOTOS if API fails)
  // Timeline milestones have their own photos shown inline, so we don't duplicate them here
  const allPhotos: Photo[] = (photosFromApi.length > 0 ? photosFromApi : PHOTOS)
    .sort((a, b) => b.date.localeCompare(a.date))

  return Layout({
    title: 'About',
    description: `${METADATA.fullName} — Engineering Manager at Cloudflare, public speaker, and mountaineer who has climbed over 109 peaks above 14,000 feet.`,
    ogImage: 'https://kylieis.online/og/about.jpg',
    canonicalUrl: 'https://kylieis.online/about',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title page-title--section">
              <h1>About</h1>
            </div>
            <div class="profile-photo">
              <img src="${METADATA.profilePhoto}" alt="${METADATA.fullName}" />
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
            <h2 class="text-center">timeline</h2>
            ${PERSONAL_TIMELINE.map((entry) => renderTimelineEntry(entry))}
            <hr class="divider" />
            <h2 class="text-center" id="photos">photos</h2>
            <div class="photo-grid">
              ${allPhotos.map((photo) => html`
                <div>
                  <img 
                    src="${photo.src}" 
                    ${raw(photo.srcset ? `srcset="${photo.srcset}"` : '')}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
                    alt="${photo.alt}" 
                    loading="lazy" 
                    onclick="openPhotoModalFromEl(this)" 
                    style="cursor: pointer;" 
                    data-photo-src="${photo.src}" 
                    data-photo-alt="${photo.alt}" 
                    data-photo-location="${photo.location}" 
                    data-photo-date="${photo.date.split('-')[0]}"
                    ${raw(photo.blurhash ? `data-blurhash="${photo.blurhash}"` : '')}
                  />
                  <p class="photo-label">${photo.location}${photo.location && photo.date ? ' · ' : ''}${photo.date.split('-')[0]}</p>
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
