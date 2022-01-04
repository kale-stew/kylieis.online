import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { CONTENT_DIRECTORY } from './constants'
import { sortByDateDesc } from './helpers'
import { getAllTalkEvents } from './talks'

const postsDirectory = path.join(process.cwd(), CONTENT_DIRECTORY)

// Get all the post IDs
export function getAllPostIds() {
  const allFileNames = fs.readdirSync(postsDirectory)

  let categoryNames = []
  allFileNames.forEach(function (file) {
    const fullPath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    const category = data.category
    categoryNames.push(category)
  })

  const postParams = categoryNames.map(function (e, i) {
    return { categoryName: e, id: allFileNames[i] }
  })

  return postParams.map((postParam) => {
    return {
      params: {
        category: postParam.categoryName,
        id: postParam.id.replace(/\.md$/, ''),
      },
    }
  })
}

// Get all post data except content, sorted by desc date
export function getSortedPostsData() {
  const allFileNames = fs.readdirSync(postsDirectory)
  const allFileData = allFileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const category = data.category

    return {
      id,
      category,
      preview: `${content.substring(0, 225)}...`,
      ...data,
    }
  })

  return sortByDateDesc(allFileData)
}

// Get data for an single post
export async function getPostData(category, id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id,
    content,
    category,
    ...data,
  }
}

// Get a short arr of recent blogs and talks for the home page
export async function getMostRecentPosts() {
  const allEvents = await getAllTalkEvents()
  const featuredTalks = sortByDateDesc(allEvents).splice(0, 3)
  const recentBlogs = getSortedPostsData().splice(0, 2)
  const featuredBlogs = recentBlogs.map((post) => {
    return {
      ...post,
    }
  })

  return [...featuredBlogs, ...featuredTalks]
}
