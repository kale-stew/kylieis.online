import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'
import type { Project } from '../content'

function techPill(str: string) {
  const colors: Record<string, string> = {
    'next.js': '#333333',
    node: '#539e43',
    react: '#61dafb',
  }
  return html`<span style="vertical-align:middle;width:max-content;padding:2px 4px;font-size:10px;font-weight:500;margin-left:8px;border-radius:0.3rem;color:white;background-color:${colors[str] || 'var(--color-red)'}">${str}</span>`
}

export function ProjectsPage({ projects }: { projects: Project[] }) {
  return Layout({
    title: 'Projects',
    description: 'Kylie Czajkowski — Web developer and public speaker.',
    content: html`
      ${PageHeader()}
      <div class="wrapper">
        <main class="content-wrapper">
          <h1 class="center-text heading-2xl" style="margin-top:3rem">Projects</h1>
          <p class="center-text" style="font-family:Arsenal,sans-serif;margin:0.5rem auto;max-width:600px">
            The following is a selection of projects I'm especially excited about.
          </p>
          <p class="center-text" style="font-family:Arsenal,sans-serif;margin:0.5rem auto;max-width:600px">
            Click on a project's title to visit the live website; technologies involved are tagged. See <a href="https://github.com/kale-stew" target="_blank" rel="noopener noreferrer">my Github profile</a> for a longer list.
          </p>
          <div class="white-bg" style="max-height:auto;width:55vw;display:flex;flex-direction:row;overflow-x:auto;padding:1rem;margin:0 auto">
            ${projects.map((item) => html`
              <div style="max-width:30rem;margin:1em;flex-shrink:0">
                <img src="${item.previewImgUrl}" alt="Preview image of '${item.title}'" style="width:25rem;max-height:12rem;object-fit:cover;border-radius:0.5rem" />
                <div style="font-size:24px;display:flex;align-items:center;margin-bottom:10px">
                  ${item.url.startsWith('/')
                    ? html`<a href="${item.url}">${item.title}</a>`
                    : html`<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
                  }
                  ${item.tech?.map((t) => techPill(t))}
                </div>
                <span>${item.description}</span>
              </div>
            `)}
          </div>
        </main>
      </div>
      ${Footer()}
    `,
  })
}