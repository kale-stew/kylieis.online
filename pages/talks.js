import Head from 'next/head'
import TalkCard from '../components/TalkCard'
import Layout from '../components/Layout'
import { TALK_URL } from '../utils/constants'

import cardStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

const Talks = ({ talks }) => (
  <Layout>
    <Head>
      <title>Talks & Presentations | kyliestewart.tech</title>
    </Head>
    <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
      Kylie's Technical Talks & Presentations
    </h1>
    <div className={cardStyles.talkCardWrapper}>
      {talks.map((talk) => (
        <TalkCard key={talk.title} item={talk} />
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
