import fs from 'fs'
import html from 'remark-html'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import { CONTENT_DIRECTORY, TALK_URL } from './constants'
import { sortByDateDesc } from './helpers'

const postsDirectory = path.join(process.cwd(), CONTENT_DIRECTORY)

// Get all the post IDs
export function getAllPostIds() {
  const allFileNames = fs.readdirSync(postsDirectory)

  // Holds all [category] names
  let categoryNames = []

  // Loop through each xxxFileNames array.
  // Add relevant category name to categoryNames array
  allFileNames.forEach(function (file) {
    const fullPath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const category = matterResult.data.category
    categoryNames.push(category)
  })

  // Combine categoryNames & fileNames arrays
  const postParams = categoryNames.map(function (e, i) {
    return { categoryName: e, id: allFileNames[i] }
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
  const allFileNames = fs.readdirSync(postsDirectory)

  // Get data from Notion posts
  const allFileData = allFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const longPreview = matterResult.content

    // Set the category
    const category = matterResult.data.category

    // Combine the data with the id
    return {
      id,
      category,
      preview: `${longPreview.substring(0, 225)}...`,
      ...matterResult.data,
    }
  })

  // Sort articles by date
  return sortByDateDesc(allFileData)
}

// Get relevant post data
export async function getPostData(category, id) {
  // Set the relevant /posts file path using category and id in the query params
  const fullPath = path.join(postsDirectory, `${id}.md`)
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
  const recentBlogs = getSortedPostsData().splice(0, 4)
  const featuredBlogs = recentBlogs.map((post) => {
    return {
      id: post.id,
      date: post.date,
      preview: post.preview,
      category: post.category,
      id: post.id,
      title: post.title,
    }
  })

  const fetchedTalks = await fetch(TALK_URL)
  const allTalks = await fetchedTalks.json()
  const allEvents = allTalks.flatMap((talk) =>
    talk.presentedAt.map((event) => ({
      id: talk.title,
      date: event.eventDate,
      description: event.description
        ? event.description
        : 'Longer description coming soon.',
      shortDescription: `Presented at ${
        event.eventType == 'meetup'
          ? `the ${event.eventName} meetup`
          : event.eventName
      }${
        event.location !== 'virtual' ? ` in ${event.location}.` : ', online.'
      }`,
      event: event.eventName,
      href: '/talks',
      location: event.location,
      title: talk.title,
    }))
  )

  const featuredTalks = sortByDateDesc(allEvents).splice(0, 4)
  return [...featuredBlogs, ...featuredTalks]
}
