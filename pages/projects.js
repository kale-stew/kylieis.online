import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import ProjectCard, { ProjectCarousel } from '../components/ProjectCard'
import { IntroParagraph, PageDivider } from '../components/shared'
import { METADATA, SOCIAL_LINKS } from '../utils/data/personal-info'
import { getAllProjects } from '../utils/data/projects'
import { socialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '80%',
}

export default function ProjectsPage({ title, allProjects }) {
  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}>
        {title}
      </h1>
      <IntroParagraph className={utilStyles.centerText}>
        While the majority of my projects are available on{' '}
        <a
          href="https://github.com/kale-stew"
          target="_blank"
          rel="noopener noreferrer"
        >
          my Github profile
        </a>
        , the following are some projects I'm especially proud of or eager to
        show off. The technologies involved are tagged, and you can click on the
        project title to visit the live website.
      </IntroParagraph>

      <ProjectCarousel>
        {allProjects.map((project) => (
          <ProjectCard item={project} />
        ))}
      </ProjectCarousel>

      <PageDivider />
      <h2 className={utilStyles.centerText}>📫 Get in Touch</h2>
      <p style={captionStyles}>
        To stay up to date with {METADATA.FIRST_NAME}'s projects, follow her{' '}
        <a href={SOCIAL_LINKS.Twitter}>on Twitter</a>. To discuss working
        together, send her <a href={SOCIAL_LINKS.Email}>an email</a> or use the
        following form:
      </p>
      <ContactForm />
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
      ...(await socialImage({
        title,
        description,
        baseName: 'projects',
      })),
    },
  }
}
