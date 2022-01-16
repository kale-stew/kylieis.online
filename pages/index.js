// import Headshot from '../public/notion-kylie.png'
// import Image from 'next/image'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'

import styles from '../styles/home.module.css'
import utilStyles from '../styles/utils.module.css'

export default function HomePage(/*{ title, description }*/) {
  return (
    <Layout home>
      {/* <Image src={Headshot} height={250} width={250} layout="intrinsic" /> */}
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
          building user-friendly integrations using the API for them to leverage
          internally.
        </p>
      </div>
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
        baseName: 'home',
      })),
    },
  }
}
