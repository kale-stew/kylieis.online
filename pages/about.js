import Head from 'next/head'
import Headshot from '../public/notion-kylie.png'
import Image from 'next/image'
import Layout from '../components/Layout'
import { METADATA, SocialLinks } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import styles from '../styles/about.module.css'
import utilStyles from '../styles/utils.module.css'

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>
          About {METADATA.NAME} | {METADATA.SITE_NAME}
        </title>
      </Head>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        More about {METADATA.NAME}
      </h1>
      <br />
      <div className={styles.aboutBlock}>
        <Image src={Headshot} height={250} width={250} layout="intrinsic" />
        <div
          className={`${utilStyles.centerText} ${utilStyles.vertical} ${styles.aboutBlockText}`}
        >
          <p>
            {METADATA.NAME} is a software engineer and technical speaker with
            experience across the web stack. Her expertise lies primarily in API
            design and the implementation of a number of Javascript frameworks.
          </p>
          <p>
            She currently works as a freelance web developer and{' '}
            <a href="https://notion.so" alt="Go to Notion's home page.">
              Notion
            </a>{' '}
            Ambassador, helping her clients transition from other knowledge
            management tools to an enterprise Notion setup while simultaneously
            building user-friendly integrations using the API for them to
            leverage internally.
          </p>
          <p>
            To see some of her other projects, check out her{' '}
            <a href={SocialLinks.PersonalHomepage}>personal website</a>. To find
            out more about her work or to discuss working together,{' '}
            <a href={SocialLinks.Email}>send Kylie an email</a>.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = `About ${METADATA.NAME}`
  const description = 'Web developer and public speaker.'

  return {
    props: {
      ...(await socialImage({
        title,
        description,
        baseName: 'about',
      })),
    },
  }
}
