import Layout from '../components/Layout'
import Link from 'next/link'
import { METADATA } from '../utils/data/personal-info'
import { socialImage } from '../utils/preview-cards'

import utilStyles from '../styles/utils.module.css'

export default function NotFoundPage() {
  return (
    <Layout>
      <h1>Oh no!</h1>
      <h3>You've found a route that doesn't exist.</h3>
      <div className={utilStyles.singleRow}>
        Let's get you back to
        <Link href="/writing">a functional page</Link> so we can try this again.
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Page Not Found'
  const description = `${METADATA.FULL_NAME} is developing websites with Javascript.`

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
