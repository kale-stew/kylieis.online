import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { CONTENT_DIRECTORY } from '../constants'
import { sortByDateDesc } from '../helpers'

export const WRITINGS_DIR = path.join(process.cwd(), CONTENT_DIRECTORY)

// Get data for a single post
export async function getBlogPostData(category, id) {
  const fullPath = path.join(WRITINGS_DIR, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id,
    ...data,
    content,
    category,
  }
}

// Get all post data except content, sorted by desc date
export function getSortedWritingsData() {
  const allFileNames = fs.readdirSync(WRITINGS_DIR)
  const allFileData = allFileNames.map((fileName) => {
    const fullPath = path.join(WRITINGS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id: fileName.replace(/\.md$/, ''),
      description: data.description
        ? data.description
        : `${content.substring(0, 175)}...`,
      ...data,
    }
  })

  return sortByDateDesc(allFileData)
}
