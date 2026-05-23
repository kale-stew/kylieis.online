import { html } from 'hono/html'

interface LayoutProps {
  title: string
  description?: string
  content: ReturnType<typeof html>
}

export function Layout({ title, description, content }: LayoutProps) {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — kylieis.online</title>
        <meta name="description" content="${description ?? ''}" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="stylesheet" href="/styles/utils.css" />
        <link rel="stylesheet" href="/styles/components.css" />
      </head>
      <body>
        <script>
          document.body.dataset.theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        </script>
        ${content}
      </body>
    </html>
  `
}

export function PageHeader() {
  return html`
    <header>
      <nav style="display:flex;gap:1rem;color:white;justify-content:flex-end;padding:0.75em 1.25em;height:35px">
        <a href="/">home</a>
        <a href="/writing">writing</a>
        <a href="/speaking">speaking</a>
        <a href="/projects">projects</a>
        <a href="/about">about</a>
      </nav>
    </header>
  `
}

export function Footer() {
  return html`
    <footer class="footer">
      <div style="display:flex;justify-content:center;gap:1.5rem;padding:1rem 0">
        <a href="/about">⛷️</a>
      </div>
    </footer>
  `
}
