import BlogCard from '../components/BlogCard'
import TalkCard from '../components/TalkCard'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'
import { getMostRecentPosts } from '../utils/data/posts'

import blogStyles from '../components/BlogCard.module.css'
import talkStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

export default function HomePage({ featuredPosts }) {
  return (
    <Layout home>
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

  return {
    props: {
      featuredPosts,
      ...(await defaultSocialImage({
        title,
        baseName: 'home',
      })),
    },
  }
}
