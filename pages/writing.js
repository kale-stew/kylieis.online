import BlogItem from '../components/BlogItem'
import Layout from '../components/Layout'
import styled from '@emotion/styled'
import { CATEGORY_TYPE } from '../utils/constants'
import { METADATA } from '../utils/data/personal-info'
import { PageDivider } from '../components/shared'
import { defaultSocialImage } from '../utils/preview-cards'
import { getAllPostData } from '../utils/data/posts'
import { useState } from 'react'

import styles from '../styles/blog.module.css'
import utilStyles from '../styles/utils.module.css'

const BlogListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2;
  padding: 0;
  margin: 0 auto;
  max-width: 50vw;

  @media (max-width: 1024px) {
    max-width: 90vw;
  }
`

const CategoryItemsWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0.25rem;
  margin: 2rem auto 0 auto;
  @media (max-width: 1024px) {
    margin: auto;
    justify-content: center;
  }
`

export default function WritingPage({ allPostsData, title }) {
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
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '3rem' }}
      >
        {title}
      </h1>
      <CategoryItemsWrapper>{buildCategories()}</CategoryItemsWrapper>
      <PageDivider />

      <BlogListWrapper>
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
            <BlogItem item={post} />
          </li>
        ))}
      </BlogListWrapper>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Technical Writings'
  const description = `${METADATA.FIRST_NAME} is writing about Javascript, AI, and more.`
  const allPostsData = await getAllPostData()

  return {
    props: {
      allPostsData,
      title,
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'writing',
      })),
    },
  }
}
