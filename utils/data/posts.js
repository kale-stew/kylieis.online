import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { WRITINGS_DIR } from './writing'
import { getAllSpeakingData, getTalkMetadata } from './speaking'
import { sortByDateDesc } from '../helpers'

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

// Get all speaking & writing post IDs
export async function getAllPostIds() {
  const blogFileNames = fs.readdirSync(WRITINGS_DIR)
  const talkItemNames = await getTalkMetadata()

  let categoryNames = []
  blogFileNames.forEach(function (file) {
    const fullPath = path.join(WRITINGS_DIR, file)
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
    categoryStr: 'speaking',
    itemNames: talkItemNames,
  })
  const postParams = [...blogParams, ...talkParams]

  return postParams.map((postParam) => ({
    params: {
      category: postParam.categoryName,
      id: postParam.id,
    },
  }))
}

// Get all post data except content, sorted by desc date
export async function getAllPostData() {
  const allFileNames = fs.readdirSync(WRITINGS_DIR)
  const blogData = allFileNames.map((fileName) => {
    const fullPath = path.join(WRITINGS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      id: fileName.replace(/\.md$/, ''),
      description: data.description
        ? data.description
        : `${content.substring(0, 175)}...`,
      type: 'blog',
      ...data,
    }
  })

  const talkData = await getAllSpeakingData()
  const allData = [...talkData, ...blogData]
  return sortByDateDesc(allData)
}

// Get all post data except content for a specific category, sorted by desc date
export async function getPostDataByCategory(category) {
  const allFileNames = fs.readdirSync(WRITINGS_DIR)
  const filteredData = allFileNames.map((fileName) => {
    const fullPath = path.join(WRITINGS_DIR, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return data.category === category
      ? {
          id: fileName.replace(/\.md$/, ''),
          description: data.description
            ? data.description
            : `${content.substring(0, 175)}...`,
          type: 'blog',
          ...data,
        }
      : null
  })

  return sortByDateDesc(filteredData)
}

// Get one recent speaking & writing post
export async function getMostRecentPosts() {
  const allPosts = await getAllPostData()
  const sorted = sortByDateDesc(allPosts)
  return sorted.splice(0, 2)
}
