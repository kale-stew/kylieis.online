import { html } from 'hono/html'

interface LayoutProps {
  title: string
  description?: string
  ogImage?: string
  content: ReturnType<typeof html>
}

export function Layout({ title, description, ogImage, content }: LayoutProps) {
  const ogImageUrl = ogImage ?? 'https://kylieis.online/open-graph/home.jpg'
  
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — kylieis.online</title>
        <meta name="description" content="${description ?? ''}" />
        <meta property="og:title" content="${title} — kylieis.online" />
        <meta property="og:description" content="${description ?? ''}" />
        <meta property="og:image" content="${ogImageUrl}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title} — kylieis.online" />
        <meta name="twitter:description" content="${description ?? ''}" />
        <meta name="twitter:image" content="${ogImageUrl}" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Monoton&family=Rubik+Glitch&family=Nabla&family=Silkscreen&family=Bitcount+Prop+Single&family=Megrim&family=Atomic+Age&family=Nanum+Gothic+Coding&family=Jersey+10&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/globals.css" />
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

export function Nav() {
  return html`
    <header>
      <nav>
        <a href="/">home</a>
        <a href="/writing">writing</a>
        <a href="/speaking">speaking</a>
        <a href="/projects">projects</a>
        <a href="/about">about</a>
        <button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
      </nav>
    </header>
    <script>
      function toggleTheme() {
        const current = document.body.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        localStorage.setItem('theme', next);
      }
    </script>
  `
}

export function Footer() {
  return html`
    <footer>
      <a href="/about" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg>
        <span>About Kylie</span>
      </a>
    </footer>
  `
}
