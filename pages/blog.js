import React, { useState } from 'react'
import Head from 'next/head'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../utils/posts'
import { CATEGORY_TYPE, METADATA } from '../utils/constants'

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
      <Head>
        <title>{METADATA.SITE_NAME} | Blog</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Blog</h1>

      <section>{buildCategories()}</section>

      <section className={utilStyles.headingMd}>
        <ul className={cardStyles.blogCardWrapper}>
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
  return {
    props: {
      allPostsData,
    },
  }
}
