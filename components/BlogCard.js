import Category from './Category'
import FormattedDate from './Date'
import Link from 'next/link'

import styles from './BlogCard.module.css'
import utilStyles from '../styles/utils.module.css'

const BlogCard = ({ item }) => (
  <div className={`${utilStyles.card} ${styles.blogCard}`}>
    <h2 className={styles.titleLink}>
      <Link
        className={styles.blogCardTitle}
        href="/[category]/[id]"
        as={`/${item.category}/${item.id}`}
        alt={`Read ${item.title} on the blog.`}
      >
        {item.title}
      </Link>
    </h2>
    <small className={`${utilStyles.lightText} ${styles.blogCardSmallText}`}>
      <FormattedDate dateString={item.date} />{' '}
      <Category category={item.category} />
    </small>
    <p>{item.preview}</p>
  </div>
)

export default BlogCard
