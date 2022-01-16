import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { CATEGORY_TYPE, METADATA } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'
import { getSortedPostsData } from '../utils/data/posts'
import { useState } from 'react'

import cardStyles from '../components/BlogCard.module.css'
import styles from '../styles/blog.module.css'
import utilStyles from '../styles/utils.module.css'

export default function WritingPage({ allPostsData }) {
  const [viewCategory, setCategory] = useState(CATEGORY_TYPE.ALL)
  const buildCategories = () =>
    Object.entries(CATEGORY_TYPE).map(([key, value]) => (
      <button
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
      <div className={styles.wrapper}>
        <br />
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
                <BlogCard item={post} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const title = 'Writing'
  const description = `${METADATA.NAME} is writing about Javascript, GraphQl, open source, and more.`

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