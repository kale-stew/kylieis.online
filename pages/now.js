import Layout from '../components/Layout'
import styled from '@emotion/styled'
import { METADATA } from '../utils/data/personal-info'
import { NOW_KEYS } from '../utils/constants'
import { PageDivider, StyledLink } from '../components/shared'
import { defaultSocialImage } from '../utils/preview-cards'
import { format, parseISO } from 'date-fns'
import { formatDateWithDayOfWeek } from '../utils/helpers'
import { getAllNowPosts, getMostRecentNow } from '../utils/data/now'
import { useState } from 'react'

import utilStyles from '../styles/utils.module.css'

const NowItemsList = styled.ul`
  line-height: 1.7;
  max-width: 90%;
  padding-left: 2vw;
  margin: 2rem auto;
  text-indent: -2em;
`

const PastEntriesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 2rem auto;
`

const PastEntry = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const NowItem = ({ label, entry }) =>
  NOW_KEYS[label] !== NOW_KEYS.date && (
    <li style={{ listStyle: 'none' }}>
      <b>{NOW_KEYS[label]}:</b> {entry}
    </li>
  )

export default function NowPage({ mostRecentPost, allNowPosts }) {
  const [currentPost, setPost] = useState(mostRecentPost)

  return (
    <Layout>
      <h1 className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}>
        What I'm Doing "Now"
      </h1>
      <h2
        className={`${utilStyles.centerText} ${utilStyles.headingMd}`}
        style={{ fontStyle: 'italic', fontFamily: 'Fira Code, monospace' }}
      >
        {formatDateWithDayOfWeek(parseISO(currentPost.date))}
      </h2>

      <NowItemsList>
        {Object.entries(currentPost).map(
          ([key, value]) =>
            value && <NowItem key={key} label={key} entry={value} />
        )}
      </NowItemsList>

      <PageDivider />
      <h2
        className={`${utilStyles.centerText} ${utilStyles.headingLg}`}
        style={{ marginTop: '2rem' }}
      >
        All Entries, Past & Present:
      </h2>
      <PastEntriesList>
        {allNowPosts.map((post) => (
          <PastEntry key={post.date} onClick={() => setPost(post)}>
            {post.date === currentPost.date && '→ '}
            {format(parseISO(post.date), 'y: iiii, MMMM do')}
          </PastEntry>
        ))}
      </PastEntriesList>
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
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'now',
      })),
    },
  }
}
