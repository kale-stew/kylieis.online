import FeaturedCard from '../components/FeaturedCard'
import Image from 'next/image'
import Layout from '../components/Layout'
import JslaImage from '../public/images/jsla-speaking-pano.jpeg'
import styled from '@emotion/styled'
import { IntroParagraph, PageDivider } from '../components/shared'
import { METADATA } from '../utils/data/personal-info'
import { TALK_TYPE } from '../utils/constants'
import { defaultSocialImage } from '../utils/preview-cards'
import { getAllSpeakingEvents, SPEAKING_DATA } from '../utils/data/speaking'

import utilStyles from '../styles/utils.module.css'

/**
 * TODO:
 * - Add year <2018-current> headers to the talks
 * - Update get all talks method to pull IDs and metadata instead of entire talk
 * - Filter by [conference, meetup]
 * - Sort by date, descending & ascending
 */

const TalkCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(345px, 1fr));
  grid-column-gap: 2em;
  grid-row-gap: 2.25em;
  margin: 2.2em 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-column-gap: 3em;
    grid-row-gap: 2.75em;
  }

  @media (max-width: 710px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto auto 6vh auto;
    font-size: 14px;
  }
`

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
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '3rem' }}
      >
        {title}
      </h1>
      <IntroParagraph className={utilStyles.centerText}>
        An experienced speaker and educator, {METADATA.FIRST_NAME} has presented
        at {CONFERENCE_COUNT} conferences and {MEETUP_COUNT} meetups since
        beginning her career in 2018.
      </IntroParagraph>

      <TalkCardWrapper>
        {allTalks.map((talk) => (
          <FeaturedCard
            flippable
            key={`${talk.title}-${randomId}`}
            item={talk}
          />
        ))}
      </TalkCardWrapper>

      <br />
      <PageDivider />
      <Image src={JslaImage} layout="intrinsic" placeholder="blur" />
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
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'speaking',
      })),
    },
  }
}
