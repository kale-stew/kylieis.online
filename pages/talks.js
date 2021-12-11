import Head from 'next/head'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { TALK_URL } from '../utils/constants'

import cardStyles from '../components/Card.module.css'
import utilStyles from '../styles/utils.module.css'

const Talks = ({ talks }) => (
  <Layout>
    <Head>
      <title>Talks & Presentations | kyliestewart.tech</title>
    </Head>
    <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
      Kylie's Technical Talks & Presentations
    </h1>
    <div className={cardStyles.cardWrapper}>
      {talks.map((talk) => (
        <Card key={talk.title} item={talk} type="talk" />
      ))}
    </div>
  </Layout>
)

export async function getStaticProps() {
  const res = await fetch(TALK_URL)
  const talks = await res.json()

  return {
    props: {
      talks,
    },
  }
}

export default Talks
