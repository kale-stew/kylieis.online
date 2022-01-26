import ContactForm from '../components/ContactForm'
import Headshot from '../public/notion-kylie.png'
import Image from 'next/image'
import Layout from '../components/Layout'
import { METADATA, SocialLinks } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '80%',
}

export default function AboutPage() {
  return (
    <Layout>
      <div className={`${utilStyles.centerText} ${utilStyles.vertical}`}>
        <br />
        <Image src={Headshot} height={200} width={200} layout="intrinsic" />
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
          <a href={SocialLinks.HikingHomepage}>a hiking blog</a> (built using
          Next.js and Notion). She is tracking progress towards her goal of
          summitting every 14,000+' peak in the lower 48 United States there.
        </p>
      </div>

      <h2 className={utilStyles.centerText}>📫 Get in Touch</h2>
      <p style={captionStyles}>
        To stay up to date with {METADATA.FIRST_NAME}'s projects, follow her{' '}
        <a href={SocialLinks.Twitter}>on Twitter</a>. To discuss working
        together, send her <a href={SocialLinks.Email}>an email</a> or use the
        following form:
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
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'about',
      })),
    },
  }
}
