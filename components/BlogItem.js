import Category from './Category'
import FormattedDate from './Date'
import Link from 'next/link'
import styled from '@emotion/styled'

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

const BlogItem = ({ item }) => (
  <>
    <TitleLink className={utilStyles.headingLg}>
      <Link
        href="/[category]/[id]"
        as={
          item.type === 'blog'
            ? `/${item.category}/${item.id}`
            : `/speaking/${item.id}`
        }
        alt={`Read '${item.title}'.`}
      >
        {item.title}
      </Link>
    </TitleLink>
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
