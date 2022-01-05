import TalkCard from '../components/TalkCard'
import Layout from '../components/Layout'
import { METADATA } from '../utils/constants'
import { ALL_TALK_DATA } from '../utils/data/talks'
import { socialImage } from '../utils/preview-cards'

import cardStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Talks({ talks, title }) {
  const randomId = Math.floor(Math.random() * 100)

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        {title}
      </h1>
      <div className={cardStyles.talkCardWrapper}>
        {talks.map((talk) => (
          <TalkCard key={`${talk.title}-${randomId}`} item={talk} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(ALL_TALK_DATA)
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
