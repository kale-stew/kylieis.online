import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getSortedWritingsData, WRITINGS_DIR } from './writing'
import { getAllSpeakingEvents, getAllTalkIds } from './speaking'
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
  const talkItemNames = await getAllTalkIds()

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

// Get one recent speaking & writing post
export async function getMostRecentPosts() {
  const allEvents = await getAllSpeakingEvents()
  return [getSortedWritingsData().shift(), sortByDateDesc(allEvents).shift()]
}
