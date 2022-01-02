import React, { useState } from 'react'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../utils/posts'
import { CATEGORY_TYPE, METADATA } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import cardStyles from '../components/BlogCard.module.css'
import categoryStyles from '../components/Category.module.css'
import utilStyles from '../styles/utils.module.css'

export default function BlogLandingPage({ allPostsData }) {
  const [viewCategory, setCategory] = useState(CATEGORY_TYPE.ALL)
  const buildCategories = () =>
    Object.entries(CATEGORY_TYPE).map(([key, value]) => {
      return (
        <button
          className={
            viewCategory === CATEGORY_TYPE[key]
              ? categoryStyles.categorySelected
              : 'categoryButton'
          }
          onClick={() =>
            setCategory(
              viewCategory === CATEGORY_TYPE[key]
                ? CATEGORY_TYPE.ALL
                : CATEGORY_TYPE[key]
            )
          }
        >
          {value}
        </button>
      )
    })

  return (
    <Layout>
      <h1 className={utilStyles.headingXl}>Blog</h1>
      <section className={cardStyles.blogCategoryWrapper}>
        {buildCategories()}
      </section>

      <section className={utilStyles.headingMd}>
        <ul className={cardStyles.blogCardWrapperUl}>
          {allPostsData.map((post) => (
            <li
              key={post.id}
              style={{
                display:
                  viewCategory === post.category ||
                  viewCategory === CATEGORY_TYPE.ALL
                    ? 'block'
                    : 'none',
              }}
            >
              <BlogCard item={post} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const title = `${METADATA.NAME}'s Technical Blog`
  const description = `${METADATA.NAME} is writing about Javascript, GraphQl, open source, and more.`

  return {
    props: {
      allPostsData,
      ...(await socialImage({
        title,
        description,
        baseName: 'blog',
      })),
    },
  }
}
