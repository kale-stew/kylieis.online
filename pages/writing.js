import BlogItem from '../components/BlogItem'
import Layout from '../components/Layout'
import styled from '@emotion/styled'
import { CATEGORY_TYPE } from '../utils/constants'
import { METADATA } from '../utils/data/personal-info'
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
  margin: 2rem auto;

  @media (max-width: 1024px) {
    margin: auto;
    justify-content: center;
  }
`

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
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '3rem' }}
      >
        Technical Writings and Tutorials
      </h1>
      <CategoryItemsWrapper>{buildCategories()}</CategoryItemsWrapper>

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
