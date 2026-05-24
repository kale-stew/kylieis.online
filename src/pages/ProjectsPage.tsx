import { html } from 'hono/html'
import { Layout, Nav, Footer } from '../components/Layout'
import type { Project } from '../content'

export function ProjectsPage({ projects }: { projects: Project[] }) {
  return Layout({
    title: 'Projects',
    description: 'A selection of open source work and side projects by Kylie Czajkowski.',
    ogImage: 'https://kylieis.online/og/projects.jpg',
    canonicalUrl: 'https://kylieis.online/projects',
    content: html`
      ${Nav()}
      <main>
        <div class="container">
          <div class="page-title page-title--section">
            <h1>Projects</h1>
            <p>Things I've built and maintained</p>
          </div>
          <div class="card-grid">
            ${projects.map((project) => html`
              <article class="card with-image">
                <img src="${project.previewImgUrl}" alt="${project.title}" />
                <h3>
                  ${project.url.startsWith('/')
                    ? html`<a href="${project.url}">${project.title}</a>`
                    : html`<a href="${project.url}" target="_blank" rel="noopener">${project.title}</a>`
                  }
                </h3>
                <p>${project.description}</p>
                <div class="meta">
                  ${project.tech?.map((t) => html`<span class="tag">${t}</span>`)}
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
