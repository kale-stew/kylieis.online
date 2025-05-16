import FeaturedCard from '../components/FeaturedCard'
import Layout from '../components/Layout'
import ProjectCard, { ProjectCarousel } from '../components/ProjectCard'
import Timeline from '../components/Timeline'
import styled from '@emotion/styled'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { GiDeskLamp } from 'react-icons/gi'
import {
  METADATA,
  PERSONAL_TIMELINE,
  SOCIAL_LINKS,
} from '../utils/data/personal-info'
import { MdOutlineMail } from 'react-icons/md'
import { getFeaturedProjects } from '../utils/data/projects'
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
  h1 {
    color: white;
  }
`

const IntroParagraph = styled.div`
  max-width: 80%;
  margin: 0 auto;
  color: white;
  font-size: 18px;
  a {
    color: var(--color-red);
  }
`

export default function HomePage({ recentPosts, allProjects }) {
  return (
    <Layout home>
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
            experience across the web stack. My expertise lies primarily in API
            design and the implementation of a number of Javascript frameworks.
          </p>
          <p>
            I currently work as an engineering manager at{' '}
            <a href="https://cloudflare.com" alt="Go to Cloudflare's home page.">
              Cloudflare
            </a>
            , where I lead teams that write Javascript, develop frontends, and build AI tooling. I am also a{' '}
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

        <h1
          className={utilStyles.headingXl}
          style={{ margin: '2.5rem auto 2rem auto' }}
        >
          Recent Posts
        </h1>
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
      </Introduction>

      <h1
        className={`${utilStyles.centerText} ${utilStyles.headingXl}`}
        style={{ margin: '4rem auto 2rem auto' }}
      >
        Featured Projects
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <ProjectCarousel>
          {allProjects.map((project) => (
            <ProjectCard key={project.title} item={project} />
          ))}
        </ProjectCarousel>
      </div>

      <h1
        className={`${utilStyles.centerText} ${utilStyles.headingXl}`}
        style={{ margin: '3rem auto 2rem auto' }}
        id="timeline"
      >
        Personal Timeline
      </h1>
      <Timeline events={PERSONAL_TIMELINE} />

      <div
        className={utilStyles.socialIcons}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: '40%',
          margin: '5rem auto 0 auto',
        }}
      >
        <a href={SOCIAL_LINKS.Email} network="email" target="_blank">
          <MdOutlineMail />
        </a>
        <a href={SOCIAL_LINKS.Twitter} target="_blank">
          <FaTwitter />
        </a>
        <a href={SOCIAL_LINKS.LinkedIn} target="_blank">
          <FaLinkedinIn />
        </a>
        <a href={SOCIAL_LINKS.Github} target="_blank">
          <FaGithub />
        </a>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = `${METADATA.SITE_NAME}`
  const description = 'Web developer and public speaker.'
  const recentPosts = await getMostRecentPosts()
  const allProjects = getFeaturedProjects()

  return {
    props: {
      title,
      description,
      recentPosts,
      allProjects,
      ...(await landingSocialImage({
        title,
        baseName: 'home',
      })),
    },
  }
}
