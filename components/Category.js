import { CATEGORY_TYPE } from '../utils/constants'
import styles from './Category.module.css'

const Category = ({ category }) => {
  switch (category) {
    case CATEGORY_TYPE.NOTION:
      return <div className={styles.categoryOne}>{CATEGORY_TYPE.NOTION}</div>
    case CATEGORY_TYPE.OSS:
      return <div className={styles.categoryTwo}>{CATEGORY_TYPE.OSS}</div>
    case CATEGORY_TYPE.JAVASCRIPT:
      return (
        <div className={styles.categoryThree}>{CATEGORY_TYPE.JAVASCRIPT}</div>
      )
  }
}

export default Category
