import { html } from 'hono/html'
import { Layout, PageHeader, Footer } from '../components/Layout'
import type { PostMeta, Project } from '../content'

export function HomePage({ recentPosts, featuredProjects }: { recentPosts: PostMeta[], featuredProjects: Project[] }) {
  return Layout({
    title: 'Home',
    content: html`
      ${PageHeader()}
      <div style="z-index:-50;position:absolute;top:0;left:0;width:100%;height:100%;background-image:var(--linear-gradient)"></div>
      <div style="height:70vh;display:flex;text-align:center;flex-direction:column;align-items:center;justify-content:center">
        <div style="display:flex;flex-direction:column;gap:2rem">
          <h1 style="color:white;font-size:2rem;margin:0">kylieis.online</h1>
          ${recentPosts.map((post) => html`
            <div style="background:var(--color-bg-secondary);color:var(--color-text-primary);border-radius:0.75rem;padding:1rem 2rem;max-width:500px;box-shadow:var(--color-red-1) -5px 5px,var(--color-red-2) -10px 10px,var(--color-red-3) -15px 15px">
              <h2 style="margin:0 0 0.25rem"><a href="/writing/${post.id}" style="color:var(--color-text-primary);text-decoration:none">${post.title}</a></h2>
              <small style="opacity:0.7">${post.date}</small>
              <p style="font-family:Arsenal,sans-serif;margin:0.5rem 0">${post.description}</p>
            </div>
          `)}
          ${featuredProjects.length > 0 && html`
            <div style="margin-top:1rem">
              <h3 style="color:white;margin-bottom:0.5rem">Featured Projects</h3>
              ${featuredProjects.map((p) => html`
                <a href="${p.url}" style="color:var(--color-text-accent);display:block;margin:0.25rem 0">${p.title}</a>
              `)}
            </div>
          `}
        </div>
      </div>
      ${Footer()}
    `,
  })
}
