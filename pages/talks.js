import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

import utilStyles from '../styles/utils.module.css'

const NotFoundPage = () => (
  <Layout>
    <Head>
      <title>Talks & Presentations | kyliestewart.tech</title>
    </Head>

    <h1>Well this is embarrassing...</h1>
    <h3>This page isn't quite done yet.</h3>
    <div className={utilStyles.singleRow}>
      <p>Let's get you back </p>
      <Link href="/">home</Link> for now.
    </div>
  </Layout>
)

export default NotFoundPage
