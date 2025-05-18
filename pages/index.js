import FeaturedCard from '../components/FeaturedCard'
import Layout from '../components/Layout'
import styled from '@emotion/styled'
import { METADATA } from '../utils/data/personal-info'
import { getMostRecentPosts } from '../utils/data/posts'
import { landingSocialImage } from '../utils/preview-cards'

const HighlightBackground = styled.div`
  z-index: -50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--linear-gradient);
`

const HomePageLayout = styled.div`
  height: 70vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: white;
  }
`

export default function HomePage({ recentPosts }) {
  return (
    <Layout home>
      <HighlightBackground />
      <br />

      <HomePageLayout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {recentPosts.map((recentPost) => (
            <FeaturedCard key={recentPost.date} item={recentPost} />
          ))}
        </div>
      </HomePageLayout>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = `${METADATA.SITE_NAME}`
  const description = 'Web developer and public speaker.'
  const recentPosts = await getMostRecentPosts()

  return {
    props: {
      title,
      description,
      recentPosts,
      ...(await landingSocialImage({
        title,
        baseName: 'home',
      })),
    },
  }
}
