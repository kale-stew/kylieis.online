import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

export default function NotFoundPage() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | {METADATA.SITE_NAME}</title>
      </Head>

      <h1>Oh no!</h1>
      <h3>You've found a route that doesn't exist.</h3>
      <div className={utilStyles.singleRow}>
        Let's get you back to
        <Link href="/blog">a functional page</Link> so we can try this again.
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Page Not Found'
  const description = `${METADATA.NAME} is developing websites with Javascript.`

  return {
    props: {
      ...(await socialImage({
        title,
        description,
        baseName: '404',
      })),
    },
  }
}
