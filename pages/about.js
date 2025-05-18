import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import styled from '@emotion/styled'
import { GiDeskLamp } from 'react-icons/gi'
import {
  METADATA,
  PERSONAL_TIMELINE,
  SOCIAL_LINKS,
} from '../utils/data/personal-info'
import { getMostRecentPosts } from '../utils/data/posts'
import { landingSocialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

const HighlightBackground = styled.div`
  z-index: -50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background-image: var(--linear-gradient);
  @media (max-width: 750px) {
    height: 1200px;
  }
`

const Introduction = styled.div`
  color: white;
  text-align: center;
  height: 70vh;
  justify-content: center;
  h1 {
    color: white;
  }
`

const IntroParagraph = styled.div`
  max-width: 90%;
  margin: 0 auto;
  color: white;
  font-size: 21px;
  font-family: 'Arsenal';
  a {
    color: var(--color-red);
  }
`

export default function AboutPage({ recentPosts }) {
  return (
    <Layout>
      <HighlightBackground />
      <br />

      <Introduction className={utilStyles.vertical}>
        <GiDeskLamp size="5rem" style={{ marginTop: '2rem' }} />
        <h1 className={utilStyles.heading2Xl}>
          Hello! I'm {METADATA.FIRST_NAME}.
        </h1>

        <IntroParagraph id="about">
          <p style={{ marginTop: '0' }}>
            I am a web developer, technical speaker, and digital creator with
            experience across the web stack. My expertise lies primarily in
            product growth and the implementation of a number of Javascript
            frameworks.
          </p>
          <p>
            I currently work as an engineering manager at{' '}
            <a
              href="https://cloudflare.com"
              alt="Go to Cloudflare's home page."
            >
              Cloudflare
            </a>
            , where I lead teams that write Javascript, develop frontends, and
            build AI tooling. I am also a{' '}
            <a href="https://notion.so" alt="Go to Notion's home page.">
              Notion
            </a>{' '}
            Ambassador, advocating for and beta testing the software ahead of
            official releases.
          </p>
          <p>
            In my free time, I am an avid hiker and photographer that documents
            my adventures on{' '}
            <a href={SOCIAL_LINKS.HikingHomepage}>a hiking blog</a> built with
            Next.js. I am tracking progress towards my goal of summitting every
            14,000+' peak in the lower 48 United States there.
          </p>
        </IntroParagraph>
      </Introduction>

      <div style={{ height: '12rem' }} />

      <h1
        className={`${utilStyles.centerText} ${utilStyles.headingXl}`}
        style={{ margin: '3rem auto 2rem auto' }}
        id="timeline"
      >
        Personal Timeline
      </h1>
      <Timeline events={PERSONAL_TIMELINE} />
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
