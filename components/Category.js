import styles from '../styles/blog.module.css'

const Category = ({ category }) => (
  <div className={styles.categoryInline}>{`#${category}`}</div>
)

export default Category
