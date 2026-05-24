import { html } from 'hono/html'

interface LayoutProps {
  title: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
  content: ReturnType<typeof html>
}

export function Layout({ title, description, ogImage, canonicalUrl, content }: LayoutProps) {
  const ogImageUrl = ogImage ?? 'https://kylieis.online/open-graph/home.jpg'
  const url = canonicalUrl ?? 'https://kylieis.online'
  
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>${title} — kylieis.online</title>
        <meta name="description" content="${description ?? ''}" />
        <link rel="canonical" href="${url}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:title" content="${title} — kylieis.online" />
        <meta property="og:description" content="${description ?? ''}" />
        <meta property="og:image" content="${ogImageUrl}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
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
        <script>
          if (!window.photoModalPhotos) window.photoModalPhotos = [];
          window.photoModalCurrentIndex = 0;

          window.openPhotoModalFromEl = function(el) {
            var src = el.getAttribute('data-photo-src') || el.src;
            var alt = el.getAttribute('data-photo-alt') || el.alt;
            var location = el.getAttribute('data-photo-location') || '';
            var date = el.getAttribute('data-photo-date') || '';
            
            // Build photo array from all images with data-photo-src on the page
            if (!window.photoModalPhotos || window.photoModalPhotos.length === 0) {
              window.photoModalPhotos = [];
              var photoEls = document.querySelectorAll('[data-photo-src]');
              for (var j = 0; j < photoEls.length; j++) {
                window.photoModalPhotos.push({
                  src: photoEls[j].getAttribute('data-photo-src'),
                  alt: photoEls[j].getAttribute('data-photo-alt') || photoEls[j].alt || '',
                  location: photoEls[j].getAttribute('data-photo-location') || '',
                  date: photoEls[j].getAttribute('data-photo-date') || ''
                });
              }
            }
            
            var img = document.getElementById('photo-modal-img');
            var altEl = document.getElementById('photo-modal-alt');
            var locationEl = document.getElementById('photo-modal-location');
            img.src = src;
            img.alt = alt;
            altEl.textContent = alt;
            locationEl.textContent = location + (date ? ' · ' + date : '');
            
            var modal = document.getElementById('photo-modal');
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            window.photoModalCurrentIndex = 0;
            for (var i = 0; i < window.photoModalPhotos.length; i++) {
              if (window.photoModalPhotos[i].src === src) {
                window.photoModalCurrentIndex = i;
                break;
              }
            }
          };
          window.updatePhotoModal = function() {
            var photo = window.photoModalPhotos[window.photoModalCurrentIndex];
            if (!photo) return;
            var img = document.getElementById('photo-modal-img');
            var altEl = document.getElementById('photo-modal-alt');
            var locationEl = document.getElementById('photo-modal-location');
            img.src = photo.src;
            img.alt = photo.alt;
            altEl.textContent = photo.alt;
            locationEl.textContent = photo.location + (photo.date ? ' · ' + photo.date : '');
          };
          window.closePhotoModal = function() {
            var modal = document.getElementById('photo-modal');
            modal.classList.remove('open');
            document.body.style.overflow = '';
          };
          window.closePhotoModalOnBackdrop = function(event) {
            if (event.target === event.currentTarget) {
              window.closePhotoModal();
            }
          };
          window.prevPhoto = function(e) {
            if (e) e.stopPropagation();
            if (!window.photoModalPhotos || window.photoModalPhotos.length === 0) return;
            window.photoModalCurrentIndex = (window.photoModalCurrentIndex - 1 + window.photoModalPhotos.length) % window.photoModalPhotos.length;
            window.updatePhotoModal();
          };
          window.nextPhoto = function(e) {
            if (e) e.stopPropagation();
            if (!window.photoModalPhotos || window.photoModalPhotos.length === 0) return;
            window.photoModalCurrentIndex = (window.photoModalCurrentIndex + 1) % window.photoModalPhotos.length;
            window.updatePhotoModal();
          };
          document.addEventListener('keydown', function(e) {
            var modal = document.getElementById('photo-modal');
            if (!modal || !modal.classList.contains('open')) return;
            if (e.key === 'Escape') {
              window.closePhotoModal();
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              window.prevPhoto(e);
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              window.nextPhoto(e);
            }
          });
        </script>
        <div class="page">
          ${content}
        </div>
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
      </body>
    </html>
  `
}

export function Nav() {
  return html`
    <header>
      <nav>
        <button class="nav-toggle" onclick="toggleMobileNav()" aria-label="Toggle navigation menu" aria-expanded="false">
          <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="nav-links">
          <a href="/">home</a>
          <a href="/writing">writing</a>
          <a href="/speaking">speaking</a>
          <a href="/projects">projects</a>
          <a href="/about">about</a>
        </div>
        <div class="nav-actions">
          <button class="search-toggle" onclick="openSearch()" title="Search (Cmd+K)" aria-label="Open search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode">
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
        </div>
      </nav>
    </header>

    <div id="search-overlay" class="search-overlay" onclick="closeSearch(event)">
      <div class="search-panel" onclick="event.stopPropagation()">
        <div class="search-input-wrap">
          <svg class="search-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="search-input" type="search" class="search-input" placeholder="Search posts and talks..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
          <kbd class="search-hint">ESC</kbd>
        </div>
        <div id="search-results" class="search-results"></div>
      </div>
    </div>

    <script>
      var searchTimeout;
      var searchOverlay = document.getElementById('search-overlay');
      var searchInput = document.getElementById('search-input');
      var searchResults = document.getElementById('search-results');

      function openSearch() {
        searchOverlay.classList.add('open');
        setTimeout(function() { searchInput.focus(); }, 100);
        document.body.style.overflow = 'hidden';
      }

      function closeSearch(e) {
        if (e && e.target !== e.currentTarget) return;
        searchOverlay.classList.remove('open');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '';
        clearTimeout(searchTimeout);
      }

      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        var q = searchInput.value.trim();
        if (q.length === 0) {
          searchResults.innerHTML = '';
          return;
        }
        searchTimeout = setTimeout(function() {
          fetch('/api/search?q=' + encodeURIComponent(q))
            .then(function(r) { return r.json(); })
            .then(function(data) {
              if (!data.results || data.results.length === 0) {
                searchResults.innerHTML = '<div class="search-empty">No results found</div>';
                return;
              }
              searchResults.innerHTML = data.results.map(function(r) {
                var link = '/' + (r.type === 'blog' ? 'writing' : 'speaking') + '/' + r.id;
                return '<a href="' + link + '" class="search-result" onclick="closeSearch()">' +
                  '<span class="search-result-title">' + escapeHtml(r.title) + '</span>' +
                  '<span class="search-result-meta">' +
                    '<span class="tag">#' + escapeHtml(r.category) + '</span>' +
                    (r.date ? ' ' + r.date : '') +
                    (r.type === 'talk' ? ' <span class="tag tag-type">talk</span>' : '') +
                  '</span>' +
                  '</a>';
              }).join('');
            })
            .catch(function() {
              searchResults.innerHTML = '<div class="search-empty">Something went wrong</div>';
            });
        }, 200);
      });

      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeSearch({ target: searchOverlay, currentTarget: searchOverlay });
        }
        if (e.key === 'Enter') {
          var firstResult = searchResults.querySelector('.search-result');
          if (firstResult) firstResult.click();
        }
      });

      document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if (searchOverlay.classList.contains('open')) {
            closeSearch({ target: searchOverlay, currentTarget: searchOverlay });
          } else {
            openSearch();
          }
        }
      });

      function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      }

      function toggleTheme() {
        var current = document.body.dataset.theme;
        var next = current === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        localStorage.setItem('theme', next);
      }

      function toggleMobileNav() {
        var nav = document.querySelector('header nav');
        var toggle = document.querySelector('.nav-toggle');
        var isOpen = nav.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }

      // Close mobile nav when clicking a link
      document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
          var nav = document.querySelector('header nav');
          var toggle = document.querySelector('.nav-toggle');
          if (nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        });
      });
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
