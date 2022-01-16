import Layout from '../components/Layout'
import TalkCard from '../components/TalkCard'
import { SPEAKING_DATA } from '../utils/data/speaking'
import { METADATA } from '../utils/constants'
import { socialImage } from '../utils/preview-cards'

import cardStyles from '../components/TalkCard.module.css'
import utilStyles from '../styles/utils.module.css'

export default function SpeakingPage({ allTalks, title }) {
  const randomId = Math.floor(Math.random() * 100)

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        Technical Talks and Presentations
      </h1>
      <div className={cardStyles.talkCardWrapper}>
        {allTalks.map((talk) => (
          <TalkCard key={`${talk.title}-${randomId}`} item={talk} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(SPEAKING_DATA)
  const allTalks = await res.json()
  const title = 'Speaking'
  const description = `${METADATA.NAME} is talking about Javascript, open source, GraphQL, and more.`

  return {
    props: {
      allTalks,
      ...(await socialImage({
        title,
        description,
        baseName: 'speaking',
      })),
    },
  }
}
