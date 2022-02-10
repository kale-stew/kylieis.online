import Category from './Category'
import FlippableCard from './FlippableCard'
import FormattedDate from './Date'
import Link from 'next/link'

import blogCardStyles from './BlogCard.module.css'
import utilStyles from '../styles/utils.module.css'

const Card = ({ item, flippable }) =>
  flippable ? (
    <FlippableCard item={item} />
  ) : (
    <div className={blogCardStyles.blogCard} key={item.id}>
      <h2 className={blogCardStyles.titleLink}>
        <Link
          className={blogCardStyles.blogCardTitle}
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
      </h2>
      <small
        className={`${utilStyles.lightText} ${blogCardStyles.blogCardSmallText}`}
      >
        <FormattedDate dateString={item.date} />{' '}
        <Category category={item.category} />
      </small>
      <p>{item.description}</p>
    </div>
  )

export default Card
