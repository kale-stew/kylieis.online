import Link from 'next/link'
import { formatDate } from '../utils/helpers'
import styles from './BlogCard.module.css'

const BlogCard = ({ item }) => {
  // Every blog post has a { title, date, href, description}

  return (
    <div className={styles.blogCard}>
      <h2 className={styles.titleLink}>
        <Link href={item.href} alt={`Read ${item.title} on the blog.`}>
          {item.title}
        </Link>
      </h2>
      {item.date && <small>{formatDate(item.date)}</small>}
      <p>{item.description}</p>
    </div>
  )
}

export default BlogCard
