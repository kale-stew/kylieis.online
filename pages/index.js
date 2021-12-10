import Head from 'next/head'
import Layout from '../components/Layout'

import utilStyles from '../styles/utils.module.css'

const HomePage = () => (
  <Layout home>
    <Head>
      <title>Kylie Stewart | Web Developer</title>
    </Head>
    <h1 className={utilStyles.headingXl}>Where am I</h1>
  </Layout>
)

export default HomePage
