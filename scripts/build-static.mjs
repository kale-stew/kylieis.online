import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { WritingPage } from '../src/pages/WritingPage.js'
import { SpeakingPage } from '../src/pages/SpeakingPage.js'
import { TalkPage } from '../src/pages/TalkPage.js'
import { AboutPage } from '../src/pages/AboutPage.js'
import { BlogPostPage } from '../src/pages/BlogPostPage.js'
import { NotFoundPage } from '../src/pages/NotFoundPage.js'
import { ProjectsPage } from '../src/pages/ProjectsPage.js'
import { PROJECTS, PHOTOS } from '../src/content.js'
import { generateOgImages } from './generate-og-images.mjs'
import { getPhotos } from '../src/lib/photos-api.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const TALKS_DIR = path.join(CONTENT_DIR, 'talks')
const OUT_DIR = path.join(ROOT, 'static')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

async function main() {
  console.log('Building static site...')
  fs.mkdirSync(OUT_DIR, { recursive: true })

  // Write HTML helper
  function writeHtml(name, html) {
    const subdirs = name.split('/')
    const dir = path.join(OUT_DIR, ...subdirs.slice(0, -1))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(OUT_DIR, name), html.toString())
    console.log(`  wrote ${name}`)
  }

  // Copy public assets (favicon, og images, etc.)
  copyDir(path.join(ROOT, 'public'), OUT_DIR)
  console.log('  copied public/ -> static/')

  // Copy styles
  copyDir(path.join(ROOT, 'styles'), path.join(OUT_DIR, 'styles'))
  console.log('  copied styles/ -> static/styles/')

  // Fetch kylieis-online photos from photos-api (the curated personal photos)
  console.log('  fetching kylieis-online photos from photos-api...')
  const { photos: apiPhotos } = await getPhotos({ site: 'kylieis-online', limit: 50 })
  console.log(`  fetched ${apiPhotos.length} photos`)

  // Merge API photos with hardcoded featured photos from content.ts
  // This ensures climb-log featured photos are included
  // Get IDs from API photos
  const apiPhotoIds = new Set(apiPhotos.map((p) => p.id))
  // Add hardcoded photos that aren't already in the API results
  const hardcodedExtras = PHOTOS.filter((p) => {
    // Skip imagedelivery photos (already in API)
    if (p.src.startsWith('https://imagedelivery.net')) return false
    // Skip climb-log photos (different domain, always include)
    if (p.src.startsWith('https://climb-log.kylieski.workers.dev')) return true
    // Extract ID from photos-api URL
    const match = p.src.match(/\/img\/([^?]+)/)
    const id = match ? match[1] : null
    // Only include if not already in API results
    return id && !apiPhotoIds.has(id)
  })
  const mergedPhotos = [...apiPhotos, ...hardcodedExtras]
  console.log(`  merged ${mergedPhotos.length} total photos (${apiPhotos.length} API + ${hardcodedExtras.length} hardcoded) for about page`)

  // About
  writeHtml('about/index.html', AboutPage({ photos: mergedPhotos }))

  // Read all content (blog posts + talks)
  const blogFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
  const blogPosts = blogFiles.map((fileName) => {
    const fileContents = fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8')
    const { data, content } = matter(fileContents)
    return {
      id: fileName.replace(/\.md$/, ''),
      title: data.title || fileName.replace(/\.md$/, ''),
      description: data.description || content.substring(0, 175) + '...',
      category: data.category || 'uncategorized',
      date: data.date || '',
      type: 'blog',
      content,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const talks = []
  if (fs.existsSync(TALKS_DIR)) {
    const talkFiles = fs.readdirSync(TALKS_DIR).filter((f) => f.endsWith('.md'))
    for (const fileName of talkFiles) {
      const fileContents = fs.readFileSync(path.join(TALKS_DIR, fileName), 'utf8')
      const { data, content } = matter(fileContents)
      talks.push({
        id: fileName.replace(/\.md$/, ''),
        title: data.title || fileName.replace(/\.md$/, ''),
        description: data.description || null,
        category: data.category || 'general',
        date: data.date || '',
        presentedAt: data.presentedAt || [],
        blogPost: data.blogPost || null,
        content,
      })
    }
    talks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // Writing index — combine blog posts and talks, sorted by date
  const postsWithoutContent = blogPosts.map(({ content, ...post }) => post)
  const talkMetas = talks.map(({ content, presentedAt, blogPost, ...talk }) => ({
    ...talk,
    type: 'talk',
  }))
  const allContent = [...postsWithoutContent, ...talkMetas].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  writeHtml('writing/index.html', WritingPage({ posts: allContent }))

  // Blog posts
  for (const post of blogPosts) {
    writeHtml(`writing/${post.id}/index.html`, BlogPostPage({ post }))
  }

  // Speaking
  writeHtml('speaking/index.html', SpeakingPage({ talks }))

  // Individual talk pages
  for (const talk of talks) {
    writeHtml(`speaking/${talk.id}/index.html`, TalkPage({ talk }))
  }

  // Projects
  writeHtml('projects/index.html', ProjectsPage({ projects: PROJECTS }))

  // 404
  writeHtml('404.html', NotFoundPage())

  try {
    await generateOgImages(blogPosts)
  } catch (e) {
    console.log('  warning: could not generate og images:', e.message)
  }

  console.log('Build complete')
}

main().catch(console.error)
