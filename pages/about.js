import ContactForm from '../components/ContactForm'
import Headshot from '../public/notion-kylie.png'
import Image from 'next/image'
import Layout from '../components/Layout'
import { METADATA, SocialLinks } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '80%',
}

export default function AboutPage() {
  return (
    <Layout home>
      <div className={`${utilStyles.centerText} ${utilStyles.vertical}`}>
        <Image src={Headshot} height={250} width={250} layout="intrinsic" />
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
          internally.
        </p>
      </div>

      <br />
      <h2 className={utilStyles.centerText}>Contact {METADATA.FIRST_NAME}</h2>
      <p style={captionStyles}>
        To stay up to date with {METADATA.FIRST_NAME}'s work, follow her{' '}
        <a href={SocialLinks.Twitter}>on Twitter</a>. To discuss working
        together (you can download her resume{' '}
        <a href="/Kylie Stewart cv.pdf" download>
          here
        </a>
        ), use the following form:
      </p>
      <ContactForm />
    </Layout>
  )
}

export async function getStaticProps() {
  const title = `${METADATA.SITE_NAME}`
  const description = 'Web developer and public speaker.'

  return {
    props: {
      title,
      description,
      ...(await socialImage({
        title,
        description,
        baseName: 'about',
      })),
    },
  }
}
