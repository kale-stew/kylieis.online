import Layout from '../components/Layout'
import styled from '@emotion/styled'
import { METADATA } from '../utils/data/personal-info'
import { NOW_KEYS } from '../utils/constants'
import { PageDivider, StyledLink } from '../components/shared'
import { formatDateWithDayOfWeek } from '../utils/helpers'
import { getAllNowPosts, getMostRecentNow } from '../utils/data/now'
import { socialImage } from '../utils/preview-cards'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'

import utilStyles from '../styles/utils.module.css'

const PastEntriesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PastEntry = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const NowItem = ({ label, entry }) =>
  NOW_KEYS[label] !== NOW_KEYS.date && (
    <li>
      <b>{NOW_KEYS[label]}:</b> {entry}
    </li>
  )

export default function NowPage({ mostRecentPost, allNowPosts }) {
  const [post, setPost] = useState(mostRecentPost)

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}>
        What I'm Doing "Now"
      </h1>
      <h2 className={utilStyles.centerText}>
        {formatDateWithDayOfWeek(post.date)}
      </h2>

      <ul className="now">
        {Object.entries(post).map(
          ([key, value]) =>
            value && <NowItem key={key} label={key} entry={value} />
        )}
      </ul>

      <h2
        className={`${utilStyles.centerText} ${utilStyles.headingXl}`}
        style={{ marginTop: '5rem' }}
      >
        All Entries, Past & Present:
      </h2>
      <PastEntriesList>
        {allNowPosts.map((post) => (
          <PastEntry onClick={() => setPost(post)}>
            {format(parseISO(post.date), 'y: iiii, MMMM Mo')}
          </PastEntry>
        ))}
      </PastEntriesList>

      <PageDivider />
      <StyledLink
        href="https://nownownow.com/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        What is this page?
      </StyledLink>
    </Layout>
  )
}

export async function getStaticProps() {
  const title = 'Now'
  const description = `What ${METADATA.FIRST_NAME} is doing, reading, listening to, celebrating now.`
  const mostRecentPost = getMostRecentNow()
  const allNowPosts = getAllNowPosts()

  return {
    props: {
      title,
      description,
      mostRecentPost,
      allNowPosts,
      ...(await socialImage({
        title,
        description,
        baseName: 'now',
      })),
    },
  }
}
