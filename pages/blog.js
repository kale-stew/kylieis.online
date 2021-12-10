import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Category from '../components/Category'
import FormattedDate from '../components/Date'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../utils/posts'
import { CATEGORY_TYPE } from '../utils/constants'

import categoryStyles from '../components/Category.module.css'
import styles from '../styles/blog.module.css'
import utilStyles from '../styles/utils.module.css'

export default function BlogLandingPage({ allPostsData }) {
  const [viewCategory, setCategory] = useState(CATEGORY_TYPE.ALL)

  return (
    <Layout>
      <Head>
        <title>kyliestewart.tech | Blog</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Blog</h1>

      <section className={utilStyles.blogCategoryWrapper}>
        <button
          className={
            viewCategory === CATEGORY_TYPE.ALL
              ? categoryStyles.categorySelected
              : 'categoryButton'
          }
          onClick={() => setCategory(CATEGORY_TYPE.ALL)}
        >
          All
        </button>
        <button
          className={
            viewCategory === CATEGORY_TYPE.NOTION
              ? categoryStyles.categorySelected
              : 'categoryButton'
          }
          onClick={() =>
            setCategory(
              viewCategory === CATEGORY_TYPE.NOTION
                ? CATEGORY_TYPE.ALL
                : CATEGORY_TYPE.NOTION
            )
          }
        >
          Notion
        </button>
        <button
          className={
            viewCategory === CATEGORY_TYPE.OSS
              ? categoryStyles.categorySelected
              : 'categoryButton'
          }
          onClick={() =>
            setCategory(
              viewCategory === CATEGORY_TYPE.OSS
                ? CATEGORY_TYPE.ALL
                : CATEGORY_TYPE.OSS
            )
          }
        >
          OSS
        </button>
        <button
          className={
            viewCategory === CATEGORY_TYPE.JAVASCRIPT
              ? categoryStyles.categorySelected
              : 'categoryButton'
          }
          onClick={() =>
            setCategory(
              viewCategory === CATEGORY_TYPE.JAVASCRIPT
                ? CATEGORY_TYPE.ALL
                : CATEGORY_TYPE.JAVASCRIPT
            )
          }
        >
          Javascript
        </button>
      </section>

      <section className={utilStyles.headingMd}>
        <ul className={styles.list}>
          {allPostsData.map(({ id, category, date, preview, title }) => (
            <li
              className={styles.blogItemPreview}
              key={id}
              style={{
                display:
                  viewCategory === category ||
                  viewCategory === CATEGORY_TYPE.ALL
                    ? 'block'
                    : 'none',
              }}
            >
              <Link href="/[category]/[id]" as={`/${category}/${id}`}>
                <a className={`${styles.blogPostHeading}`}>{title}</a>
              </Link>
              <br />
              <small
                className={`${utilStyles.lightText} ${styles.blogItemCategory}`}
              >
                <FormattedDate dateString={date} />{' '}
                <Category category={category} />
              </small>
              <small className={styles.blogItemPreview}>{preview}...</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
