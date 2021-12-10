import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

import utilStyles from '../styles/utils.module.css'

const NotFoundPage = () => (
  <Layout>
    <Head>
      <title>Page Not Found | kyliestewart.tech</title>
    </Head>

    <h1>Oh no!</h1>
    <h3>You've found a route that doesn't exist.</h3>
    <div className={utilStyles.singleRow}>
      Let's get you back to
      <Link href="/blog">a functional page</Link> so we can try this again.
    </div>
  </Layout>
)

export default NotFoundPage
