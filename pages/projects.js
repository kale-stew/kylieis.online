import Layout from '../components/Layout'
import ProjectCard, { ProjectCarousel } from '../components/ProjectCard'
import { METADATA } from '../utils/data/personal-info'
import { IntroParagraph, PageDivider } from '../components/shared'
import { defaultSocialImage } from '../utils/preview-cards'
import { getAllProjects } from '../utils/data/projects'

import utilStyles from '../styles/utils.module.css'

export default function ProjectsPage({ title, allProjects }) {
  return (
    <Layout>
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '3rem' }}
      >
        {title}
      </h1>
      <IntroParagraph
        className={utilStyles.centerText}
        style={{ margin: '0.5rem auto' }}
      >
        The following is a selection of projects I'm especially excited about.
      </IntroParagraph>
      <IntroParagraph className={utilStyles.centerText}>
        Click on a project's title to visit the live website; technologies
        involved are tagged. See{' '}
        <a
          href="https://github.com/kale-stew"
          target="_blank"
          rel="noopener noreferrer"
        >
          my Github profile
        </a>{' '}
        for a longer list.
      </IntroParagraph>

      <ProjectCarousel className={utilStyles.whiteBg}>
        {allProjects.map((project) => (
          <ProjectCard item={project} />
        ))}
      </ProjectCarousel>

      <PageDivider />
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Projects'
  const description = `${METADATA.FIRST_NAME} is a web developer and public speaker.`
  const allProjects = getAllProjects()

  return {
    props: {
      title,
      description,
      allProjects,
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'projects',
      })),
    },
  }
}
