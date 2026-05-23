import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { HomePage } from '../src/pages/HomePage.js'
import { WritingPage } from '../src/pages/WritingPage.js'
import { SpeakingPage } from '../src/pages/SpeakingPage.js'
import { AboutPage } from '../src/pages/AboutPage.js'
import { BlogPostPage } from '../src/pages/BlogPostPage.js'
import { NotFoundPage } from '../src/pages/NotFoundPage.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const OUT_DIR = path.join(ROOT, 'static')

const TALK_DATA_URL = 'https://raw.githubusercontent.com/kale-stew/all-talks/main/content/talks.json'

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

  // Home
  writeHtml('index.html', HomePage())

  // About
  writeHtml('about/index.html', AboutPage())

  // Writing list - read blog posts from content/
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

  writeHtml('writing/index.html', WritingPage({
    posts: blogPosts.map(({ content, ...post }) => post),
  }))

  // Blog posts
  for (const post of blogPosts) {
    writeHtml(`writing/${post.id}/index.html`, BlogPostPage({ post }))
  }

  // Speaking - fetch from GitHub
  try {
    const resp = await fetch(TALK_DATA_URL)
    const talks = await resp.json()
    writeHtml('speaking/index.html', SpeakingPage({ talks }))
  } catch {
    console.log('  warning: could not fetch talk data, skipping speaking page')
  }

  // 404
  writeHtml('404.html', NotFoundPage())

  console.log('Build complete')
}

main().catch(console.error)
