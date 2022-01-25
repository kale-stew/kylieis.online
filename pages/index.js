import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import TalkCard from '../components/TalkCard'
import { METADATA } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'
import { getMostRecentPosts } from '../utils/data/posts'

import styles from '../styles/home.module.css'
import utilStyles from '../styles/utils.module.css'

// TODO: BlogCard has cursor: pointer on *, TalkCard only has it on the clickable parts (intended behavior)

export default function HomePage({ recentPosts }) {
  console.log(recentPosts)
  return (
    <Layout home>
      <div
        className={`${utilStyles.centerText} ${utilStyles.vertical} ${styles.aboutBlockText}`}
      >
        <br />
        <br />
        <p>
          {METADATA.FIRST_NAME} is a software engineer and technical speaker
          with experience across the web stack. Her expertise lies primarily in
          API design and the implementation of a number of Javascript
          frameworks.
        </p>
      </div>

      <h2>Recent Posts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {recentPosts.map((recentPost) =>
          recentPost.category ? (
            <BlogCard post={recentPost} />
          ) : (
            <TalkCard item={recentPost} />
          )
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = `${METADATA.SITE_NAME}`
  const description = 'Web developer and public speaker.'
  const recent = await getMostRecentPosts()

  return {
    props: {
      title,
      description,
      recentPosts: recent,
      ...(await defaultSocialImage({
        title,
        baseName: 'home',
      })),
    },
  }
}
