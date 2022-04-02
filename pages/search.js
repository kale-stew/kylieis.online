import BlogItem from '../components/BlogItem'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import { METADATA } from '../utils/data/personal-info'
import { PageDivider } from '../components/shared'
import { getAllPostData } from '../utils/data/posts'
import { getAllProjects } from '../utils/data/projects'
import { getNotionProjects } from '../utils/data/notion'
import { landingSocialImage } from '../utils/preview-cards'
import { sortByDateDesc } from '../utils/helpers'
import { useState } from 'react'

export default function SearchPage({ allData }) {
  const [userSearch, setUserSearch] = useState('')
  const [filteredData, setFilteredData] = useState(allData)

  const handleSearch = (e) => {
    if (e === '') {
      setFilteredData(allData)
      setUserSearch(e)
      return
    }
    let searchQuery = e.toUpperCase()
    let sorted = allData.filter((entry) => {
      let title = entry.title.toUpperCase()
      let description = entry.description && entry.description.toUpperCase()
      // let month
      // let year
      return (
        title.includes(searchQuery) || description.includes(searchQuery)
        // ||
        // month.includes(searchQuery) ||
        // year.includes(searchQuery)
      )
    })
    setFilteredData(sorted)
    setUserSearch(e)
  }

  return (
    <Layout>
      <SearchBar query={userSearch} onChange={handleSearch} />
      <PageDivider />
      <ul style={{ minWidth: '70%' }}>
        {filteredData.length ? (
          filteredData.map((item) => <BlogItem key={item.title} item={item} />)
        ) : (
          <i>
            Nothing to show for that query ({userSearch}), try something else.
          </i>
        )}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  // query params?
  const title = 'Search'
  const description = `${METADATA.FIRST_NAME} is a web developer and public speaker.`
  const devProjects = getAllProjects()
  const notionProjects = getNotionProjects()
  const allPosts = await getAllPostData()

  return {
    props: {
      title,
      description,
      allData: sortByDateDesc([...devProjects, ...notionProjects, ...allPosts]),
      ...(await landingSocialImage({
        title,
        description,
        baseName: 'search',
      })),
    },
  }
}
