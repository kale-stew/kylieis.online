import Card from '../components/Card'
import Head from 'next/head'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { getMostRecentPosts } from '../utils/posts'

import cardStyles from '../components/Card.module.css'
import utilStyles from '../styles/utils.module.css'

const HomePage = ({ featuredPosts }) => (
  <Layout home>
    <Head>
      <title>
        {METADATA.NAME} | {METADATA.SITE_NAME}
      </title>
    </Head>
    <h1 className={utilStyles.headingXl}>Most Recent Posts</h1>
    <div className={cardStyles.cardWrapper}>
      {featuredPosts.map((post) => (
        <Card key={post.id} item={post} type="post" />
      ))}
    </div>
  </Layout>
)

export async function getStaticProps() {
  const featuredPosts = await getMostRecentPosts()
  return {
    props: {
      featuredPosts,
    },
  }
}

export default HomePage
