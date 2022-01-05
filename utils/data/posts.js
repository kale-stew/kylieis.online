import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { BLOG_POSTS_DIR } from './blog.js'
import { sortByDateDesc } from '../helpers'
import { getAllTalkEvents, getTalkIds } from './talks'

// Create post params for any category
const createPostParams = ({ categoryArr, categoryStr, itemNames }) =>
  categoryArr
    ? categoryArr.map((e, i) => {
        return { categoryName: e, id: itemNames[i].replace(/\.md$/, '') }
      })
    : categoryStr
    ? itemNames.map((e) => {
        return { categoryName: categoryStr, id: e }
      })
    : null

// Get all the post IDs
export async function getAllPostIds() {
  const blogFileNames = fs.readdirSync(BLOG_POSTS_DIR)
  const talkItemNames = await getTalkIds()

  let categoryNames = []
  blogFileNames.forEach(function (file) {
    const fullPath = path.join(BLOG_POSTS_DIR, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    const category = data.category
    categoryNames.push(category)
  })

  const blogParams = createPostParams({
    categoryArr: categoryNames,
    itemNames: blogFileNames,
  })
  const talkParams = createPostParams({
    categoryStr: 'talks',
    itemNames: talkItemNames,
  })

  const postParams = [...blogParams, ...talkParams]

  return postParams.map((postParam) => {
    return {
      params: {
        category: postParam.categoryName,
        id: postParam.id,
      },
    }
  })
}

// Get all post data except content, sorted by desc date
export function getSortedPostsData() {
  const allFileNames = fs.readdirSync(BLOG_POSTS_DIR)
  const allFileData = allFileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(BLOG_POSTS_DIR, fileName)
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

// Get a short arr of recent blogs and talks for the home page
export async function getMostRecentPosts() {
  const allEvents = await getAllTalkEvents()
  const featuredTalks = sortByDateDesc(allEvents).splice(0, 4)
  const recentBlogs = getSortedPostsData().splice(0, 2)
  const featuredBlogs = recentBlogs.map((post) => {
    return {
      ...post,
    }
  })

  return [...featuredBlogs, ...featuredTalks]
}