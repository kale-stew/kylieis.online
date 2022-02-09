import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import TalkCard from '../components/TalkCard'
import Timeline from '../components/Timeline'
import { GiMountainRoad } from 'react-icons/gi'
import {
  METADATA,
  SOCIAL_LINKS,
  WORK_TIMELINE,
} from '../utils/data/personal-info'
import { defaultSocialImage } from '../utils/preview-cards'
import { getMostRecentPosts } from '../utils/data/posts'

import styles from '../styles/home.module.css'
import utilStyles from '../styles/utils.module.css'

export default function HomePage({ recentPosts }) {
  return (
    <Layout home>
      <br />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <GiMountainRoad size="5rem" style={{ marginTop: '2rem' }} />
        <h1 className={utilStyles.heading2Xl}>Hello! I'm Kylie.</h1>
      </div>

      <h1 className={utilStyles.centerText}>Recent Posts</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {recentPosts.map((recentPost) =>
          recentPost.category ? (
            <BlogCard post={recentPost} />
          ) : (
            <TalkCard item={recentPost} />
          )
        )}
      </div>

      <div
        className={`${utilStyles.centerText} ${utilStyles.vertical} ${styles.aboutBlockText}`}
      >
        <h1 id="about" style={{ marginTop: '5rem' }}>
          About
        </h1>
        <p>
          {METADATA.FIRST_NAME} is a software engineer and technical speaker
          with experience across the web stack. Her expertise lies primarily in
          API design and the implementation of a number of Javascript
          frameworks.
        </p>
        <p>
          She currently works as a freelance web developer and{' '}
          <a href="https://notion.so" alt="Go to Notion's home page.">
            Notion
          </a>{' '}
          Ambassador, helping her clients transition from other knowledge
          management tools to an enterprise Notion setup while simultaneously
          building user-friendly integrations using the API for them to leverage
          internally. She is also currently open to new opportunities. You can
          download her resume →{' '}
          <a href="/Kylie Stewart cv.pdf" download>
            here
          </a>
          .
        </p>
        <p>
          In her free time, {METADATA.FIRST_NAME} is an avid hiker and
          photographer that documents her adventures on{' '}
          <a href={SOCIAL_LINKS.HikingHomepage}>a hiking blog</a> built using
          Next.js and Notion. She is tracking progress towards her goal of
          summitting every 14,000+' peak in the lower 48 United States there.
        </p>
      </div>

      <div style={{ margin: '2rem' }}>
        <h1 className={utilStyles.centerText} id="work">
          Work
        </h1>
        <Timeline events={WORK_TIMELINE} />
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
