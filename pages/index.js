import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'
import { getMostRecentPosts } from '../utils/data/posts'
import BlogCard from '../components/BlogCard'
import TalkCard from '../components/TalkCard'

import styles from '../styles/home.module.css'
import utilStyles from '../styles/utils.module.css'

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
        <p>
          She currently works as a freelance web developer and{' '}
          <a
            href="https://notion.so"
            alt="Go to Notion's home page."
            target="_blank"
          >
            Notion
          </a>{' '}
          Ambassador, helping her clients transition from other knowledge
          management tools to an enterprise Notion setup while simultaneously
          building user-friendly integrations using the API for them to leverage
          internally.
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
