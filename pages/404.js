import DenverImage from '../public/images/formidadenver-speaking.jpg'
import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import { METADATA } from '../utils/data/personal-info'
import { landingSocialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

export default function NotFoundPage() {
  return (
    <Layout>
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '2rem' }}
      >
        👀
      </h1>
      <h3 className={utilStyles.centerText}>
        You've found a route that doesn't exist.
      </h3>
      <div className={utilStyles.centerText}>
        Let's get you back home so we can try this again:{' '}
        <Link href="/">🏡</Link>
      </div>

      <div style={{ marginTop: '3rem', maxWidth: '100%' }}>
        <Image src={DenverImage} layout="intrinsic" placeholder="blur" />
        <div
          className={utilStyles.centerText}
          style={{
            fontSize: '14px',
            fontFamily: "'Arsenal",
            maxWidth: '70%',
            margin: '0 auto',
          }}
        >
          {METADATA.FIRST_NAME} presenting "How TypeScript Made me a Better JS
          Developer" at the FormidaDenver Open House in October of 2018.
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Page Not Found'
  const description = `${METADATA.FULL_NAME} is developing websites with Javascript.`

  return {
    props: {
      ...(await landingSocialImage({
        title,
        description,
        baseName: '404',
      })),
    },
  }
}
