import Head from 'next/head'
import TalkCard from '../components/TalkCard'
import Layout from '../components/Layout'
import { METADATA, TALK_URL } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import cardStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Talks({ talks }) {
  return (
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
}

export async function getStaticProps() {
  const res = await fetch(TALK_URL)
  const talks = await res.json()
  const title = 'Technical Talks & Presentations'
  const description = `${METADATA.NAME} is talking about Javascript, open source, GraphQL, and more.`

  return {
    props: {
      talks,
      ...(await socialImage({
        title,
        description,
        baseName: 'talks',
      })),
    },
  }
}
