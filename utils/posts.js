import fs from 'fs'
import html from 'remark-html'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'

import { CATEGORY_TYPE, CONTENT_DIRECTORY } from './constants'

const postsDirectory = path.join(process.cwd(), CONTENT_DIRECTORY)
const notionDirectory = path.join(
  process.cwd(),
  `${CONTENT_DIRECTORY}/${CATEGORY_TYPE.NOTION}`
)
const jsDirectory = path.join(
  process.cwd(),
  `${CONTENT_DIRECTORY}/${CATEGORY_TYPE.JAVASCRIPT}`
)
const ossDirectory = path.join(
  process.cwd(),
  `${CONTENT_DIRECTORY}/${CATEGORY_TYPE.OSS}`
)

// Get all the post IDs
export function getAllPostIds() {
  // Get file names under each categories directory
  const notionFileNames = fs.readdirSync(notionDirectory)
  const jsFileNames = fs.readdirSync(jsDirectory)
  const ossFileNames = fs.readdirSync(ossDirectory)

  // Holds all [category] names
  let categoryNames = []

  // Loop through each xxxFileNames array.
  // Add relevant category name to categoryNames array
  notionFileNames.forEach(function (notionFile) {
    categoryNames.push(CATEGORY_TYPE.NOTION)
  })
  jsFileNames.forEach(function (jsFile) {
    categoryNames.push(CATEGORY_TYPE.JAVASCRIPT)
  })
  ossFileNames.forEach(function (ossFile) {
    categoryNames.push(CATEGORY_TYPE.OSS)
  })

  // Concatenate each articles name in one array (id)
  const fileNames = notionFileNames.concat(jsFileNames).concat(ossFileNames)

  // Combine categoryNames & fileNames arrays
  const postParams = categoryNames.map(function (e, i) {
    return { categoryName: e, id: fileNames[i] }
  })

  // Loop through postParams. Output variable params
  return postParams.map((postParam) => {
    return {
      params: {
        category: postParam.categoryName,
        id: postParam.id.replace(/\.md$/, ''),
      },
    }
  })
}

export function getSortedPostsData() {
  // Get file names under each category directory
  const notionFileNames = fs.readdirSync(notionDirectory)
  const jsFileNames = fs.readdirSync(jsDirectory)
  const ossFileNames = fs.readdirSync(ossDirectory)

  // Get data from Notion posts
  const notionFileData = notionFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(notionDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const longPreview = matterResult.content

    // Set the category
    const category = CATEGORY_TYPE.NOTION

    // Combine the data with the id
    return {
      id,
      category,
      preview: longPreview.substring(0, 350),
      ...matterResult.data,
    }
  })

  // Get data from Javascript posts
  const jsFileData = jsFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(jsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const longPreview = matterResult.content

    // Set the category
    const category = CATEGORY_TYPE.JAVASCRIPT

    // Combine the data with the id
    return {
      id,
      category,
      preview: longPreview.substring(0, 350),
      ...matterResult.data,
    }
  })

  // Get data from OSS posts
  const ossFileData = ossFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(ossDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const longPreview = matterResult.content

    // Set the category
    const category = CATEGORY_TYPE.OSS

    // Combine the data with the id
    return {
      id,
      category,
      preview: longPreview.substring(0, 350),
      ...matterResult.data,
    }
  })

  // Concatenate each articles data in one array
  const allPostsData = notionFileData.concat(jsFileData).concat(ossFileData)

  // Sort articles by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Get relevant post data
export async function getPostData(category, id) {
  // Set the relevant /posts file path using category and id in the query params
  const fullPath = path.join(postsDirectory, `${category}`, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    category,
    ...matterResult.data,
  }
}

export async function getMostRecentPosts() {
  const recentBlogs = getSortedPostsData().splice(0, 3)
  const featuredBlogs = recentBlogs.map((post) => {
    return {
      id: post.id,
      date: post.date,
      title: post.title,
      href: `/${post.category}/${post.id}`,
      description: `${post.preview.substring(0, 150)}...`,
    }
  })

  return [...featuredBlogs]

  // const allTalks = await fetchAllTalks()
  // grab eventDates from the presentedAt key on each talk
  // const recentTalks = allTalks.splice(0, 3)
  // const featuredClimbs = recentTalks.map((talk) => {
  //   return {
  //     id: talk.id,
  //     date: talk.date,
  //     title: talk.title,
  //     href: '/talks',
  //     description: talk.description,
  //   }
  // })
}
