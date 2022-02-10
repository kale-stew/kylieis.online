import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { CATEGORY_TYPE } from '../utils/constants'
import { METADATA } from '../utils/data/personal-info'
import { defaultSocialImage } from '../utils/preview-cards'
import { getAllPostData } from '../utils/data/posts'
import { useState } from 'react'

import cardStyles from '../components/BlogCard.module.css'
import styles from '../styles/blog.module.css'
import utilStyles from '../styles/utils.module.css'

export default function WritingPage({ allPostsData }) {
  const [viewCategory, setCategory] = useState(CATEGORY_TYPE.ALL)
  const buildCategories = () =>
    Object.entries(CATEGORY_TYPE).map(([key, value]) => (
      <button
        style={{ background: 'transparent' }}
        className={
          viewCategory === CATEGORY_TYPE[key]
            ? `${styles.categorySelected} ${styles.categoryButton}`
            : styles.categoryButton
        }
        onClick={() =>
          setCategory(
            viewCategory === CATEGORY_TYPE[key]
              ? CATEGORY_TYPE.ALL
              : CATEGORY_TYPE[key]
          )
        }
      >
        {value === 'all' ? value : `#${value}`}
      </button>
    ))

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        Technical Writings and Tutorials
      </h1>
      <section className={cardStyles.categoryWrapper}>
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
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getAllPostData()
  const title = 'Writing'
  const description = `${METADATA.FIRST_NAME} is writing about Javascript, GraphQl, open source, and more.`

  return {
    props: {
      allPostsData,
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'blog',
      })),
    },
  }
}
