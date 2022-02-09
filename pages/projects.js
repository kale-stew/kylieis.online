import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import { METADATA, SOCIAL_LINKS } from '../utils/data/personal-info'
import { socialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '80%',
}

export default function ProjectsPage({ title }) {
  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        {title}
      </h1>
      {/* TODO: Add projects! */}

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

  return {
    props: {
      title,
      description,
      ...(await socialImage({
        title,
        description,
        baseName: 'projects',
      })),
    },
  }
}
