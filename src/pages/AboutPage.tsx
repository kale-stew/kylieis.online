import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'
import { METADATA, SOCIAL_LINKS, PERSONAL_TIMELINE } from '../content'

export function AboutPage() {
  return Layout({
    title: 'About',
    description: `${METADATA.fullName} — Web developer and public speaker.`,
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl">About</h1>
          <div class="white-bg" style="text-align:center">
            <p>${METADATA.firstName} is a web developer and public speaker based in Denver, Colorado.</p>
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin:1.5rem 0">
              ${SOCIAL_LINKS.map((link) => html`
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="styled-link">${link.label}</a>
              `)}
            </div>
          </div>
          <hr class="page-divider" />
          <div class="timeline">
            ${PERSONAL_TIMELINE.map((entry) => html`
              <div style="margin-bottom:2rem">
                <h3 class="heading-sm">${entry.jobTitle} @ ${entry.company}</h3>
                <p style="opacity:0.7">${entry.location} · ${entry.startDate} — ${entry.endDate}</p>
                <p>${entry.description}</p>
              </div>
            `)}
          </div>
        </main>
      </div>
      ${Footer()}
    `,
  })
}
