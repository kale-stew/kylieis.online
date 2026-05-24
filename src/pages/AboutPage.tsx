import { html, raw } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import { METADATA, SOCIAL_LINKS, SOCIAL_ICONS, PERSONAL_TIMELINE, TimelineEntry } from '../content'

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
    <div class="timeline-job mb-lg">
      <h3>${entry.jobTitle} @ ${entry.company}</h3>
      <p class="text-muted">${entry.location} · ${entry.startDate}${entry.endDate ? ` — ${entry.endDate}` : ''}</p>
      <p>${entry.description}</p>
    </div>
  `
}

export function AboutPage() {
  return Layout({
    title: 'About',
    description: `${METADATA.fullName} — Web developer and public speaker.`,
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="content">
            <div class="page-title">
              <h1>About</h1>
            </div>
            <p class="text-center">
              ${METADATA.firstName} is a web developer and public speaker based in San Francisco, California.
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
          </div>
        </div>
      </main>
      ${Footer()}
    `,
  })
}
