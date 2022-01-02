import BlogCard from '../components/BlogCard'
import TalkCard from '../components/TalkCard'
import Head from 'next/head'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { getMostRecentPosts } from '../utils/posts'
import { defaultSocialImage } from '../utils/preview-cards'

import blogStyles from '../components/BlogCard.module.css'
import talkStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

export default function HomePage({ featuredPosts }) {
  return (
    <Layout home>
      <Head>
        <title>
          {METADATA.NAME} | {METADATA.SITE_NAME}
        </title>
      </Head>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        Recent Blog Posts
      </h1>
      <div className={blogStyles.blogCardWrapper}>
        {featuredPosts.map(
          (post) => !post.event && <BlogCard key={post.id} item={post} />
        )}
      </div>

      <br />
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        Recent Tech Talks
      </h1>
      <div className={talkStyles.talkCardWrapper}>
        {featuredPosts.map(
          (post) =>
            post.event && <TalkCard key={post.id} item={post} page={'home'} />
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const featuredPosts = await getMostRecentPosts()
  const title = `${METADATA.SITE_NAME}`
  const description = 'Web developer and public speaker.'

  return {
    props: {
      featuredPosts,
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'home',
      })),
    },
  }
}
