import { CATEGORY_TYPE } from '../utils/constants'
import styles from './Category.module.css'

const Category = ({ category }) => {
  switch (category) {
    case CATEGORY_TYPE.NOTION:
      return (
        <div className={`${styles.categoryPill} ${styles.categoryOne}`}>
          {CATEGORY_TYPE.NOTION}
        </div>
      )
    case CATEGORY_TYPE.OSS:
      return (
        <div className={`${styles.categoryPill} ${styles.categoryTwo}`}>
          {CATEGORY_TYPE.OSS}
        </div>
      )
    case CATEGORY_TYPE.JAVASCRIPT:
      return (
        <div className={`${styles.categoryPill} ${styles.categoryThree}`}>
          {CATEGORY_TYPE.JAVASCRIPT}
        </div>
      )
    case CATEGORY_TYPE.REACT:
      return (
        <div className={`${styles.categoryPill} ${styles.categoryFour}`}>
          {CATEGORY_TYPE.REACT}
        </div>
      )
    default:
      return (
        <div className={`${styles.categoryPill} ${styles.categoryDefault}`}>
          {category}
        </div>
      )
  }
}

export default Category
