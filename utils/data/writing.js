import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { CONTENT_DIRECTORY } from '../constants'

export const WRITINGS_DIR = path.join(process.cwd(), CONTENT_DIRECTORY)

// Get data for a single post
export async function getBlogPostData(category, id) {
  const fullPath = path.join(WRITINGS_DIR, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id,
    content,
    category,
    ...data,
  }
}
