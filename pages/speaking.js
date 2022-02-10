import Image from 'next/image'
import Layout from '../components/Layout'
import Panorama from '../public/images/speaking-pano.jpeg'
import Card from '../components/Card'
import { METADATA } from '../utils/data/personal-info'
import { TALK_TYPE } from '../utils/constants'
import { getAllSpeakingEvents, SPEAKING_DATA } from '../utils/data/speaking'
import { socialImage } from '../utils/preview-cards'

import cardStyles from '../components/FlippableCard.module.css'
import utilStyles from '../styles/utils.module.css'

/**
 * TODO:
 * - Add year <2018-current> headers to the talks
 * - Update get all talks method to pull IDs and metadata instead of entire talk
 * - Filter by [conference, meetup]
 * - Sort by date, descending & ascending
 */

export default function SpeakingPage({ allTalks, allEvents, title }) {
  const randomId = Math.floor(Math.random() * 100)
  const CONFERENCE_COUNT = allEvents.filter(
    (event) => event.type === TALK_TYPE.C
  ).length
  const MEETUP_COUNT = allEvents.filter(
    (event) => event.type === TALK_TYPE.M
  ).length

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        {title}
      </h1>
      <p className={utilStyles.centerText}>
        An experienced speaker and educator, {METADATA.FIRST_NAME} has presented
        at {CONFERENCE_COUNT} conferences and {MEETUP_COUNT} meetups since
        beginning her career in 2018.
      </p>
      <div className={cardStyles.talkCardWrapper}>
        {allTalks.map((talk) => (
          <Card flippable key={`${talk.title}-${randomId}`} item={talk} />
        ))}
      </div>
      <br />
      <Image src={Panorama} layout="intrinsic" placeholder="blur" />
      <div className={utilStyles.centerText} style={{ fontSize: '12px' }}>
        {METADATA.FIRST_NAME} presenting "ML on the CL" at js.la in June of
        2018.
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(SPEAKING_DATA)
  const allTalks = await res.json()
  const allEvents = await getAllSpeakingEvents()
  const title = 'Conference Talks & Presentations'
  const description = `${METADATA.FIRST_NAME} is talking about Javascript, open source, GraphQL, and more.`

  return {
    props: {
      allTalks,
      allEvents,
      ...(await socialImage({
        title,
        description,
        baseName: 'speaking',
      })),
    },
  }
}
