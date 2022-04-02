import Category from './Category'
import FormattedDate from './Date'
import Link from 'next/link'
import styled from '@emotion/styled'
import { capitalizeFirstLetter } from '../utils/helpers'

import utilStyles from '../styles/utils.module.css'

const TitleLink = styled.h2`
  a {
    color: var(--color-text-primary);
    &:hover {
      text-decoration: underline;
      box-shadow: none;
    }
  }
`

const createLink = (item) => {
  switch (item.type) {
    case 'blog':
      return (
        <Link
          href="/[category]/[id]"
          as={`/${item.category}/${item.id}`}
          alt={`Read '${item.title}'.`}
        >
          {item.title}
        </Link>
      )
    case 'notion':
      return (
        <a href={item.url}>{`Notion ${capitalizeFirstLetter(item.category)} · ${
          item.title
        }`}</a>
      )
    case 'talk':
      return (
        <Link
          href="/[category]/[id]"
          as={`/speaking/${item.id}`}
          alt={`Read about '${item.title}'.`}
        >
          {`Talk · ${item.title}`}
        </Link>
      )
    case 'project':
      return item.url.startsWith('/') ? (
        <Link href={item.url} alt={`Go to the ${item.title} project page.`}>
          {`Project · ${item.title}`}
        </Link>
      ) : (
        <a
          href={item.url}
          target="_blank"
          alt={`Go to ${item.title}'s landing page.`}
        >
          {`Project · ${item.title}`}
        </a>
      )
  }
}

const BlogItem = ({ item }) => (
  <>
    <TitleLink className={utilStyles.headingLg}>{createLink(item)}</TitleLink>
    <small
      className={utilStyles.lightText}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {item.date && <FormattedDate dateString={item.date} />}{' '}
      {item.category && <Category category={item.category} />}
    </small>
    <p style={{ fontSize: '18px' }}>{item.description}</p>
  </>
)

export default BlogItem
