import Category from './Category'
import FormattedDate from './Date'
import Link from 'next/link'

import styles from './BlogCard.module.css'
import utilStyles from '../styles/utils.module.css'

const BlogCard = ({ post }) => (
  <div className={styles.blogCard} key={post.id}>
    <h2 className={styles.titleLink}>
      <Link
        className={styles.blogCardTitle}
        href="/[category]/[id]"
        as={`/${post.category}/${post.id}`}
        alt={`Read ${post.title} on the blog.`}
      >
        {post.title}
      </Link>
    </h2>
    <small className={`${utilStyles.lightText} ${styles.blogCardSmallText}`}>
      <FormattedDate dateString={post.date} />{' '}
      <Category category={post.category} />
    </small>
    <p>{post.description}</p>
  </div>
)

export default BlogCard
