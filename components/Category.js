import utilStyles from '../styles/utils.module.css'
import { CATEGORY_TYPE } from '../utils/constants'

const Category = ({ category }) => {
  switch (category) {
    case CATEGORY_TYPE.NOTION:
      return (
        <div className={utilStyles.gearCategory}>{CATEGORY_TYPE.NOTION}</div>
      )
    case CATEGORY_TYPE.OSS:
      return (
        <div className={utilStyles.thoughtsCategory}>{CATEGORY_TYPE.OSS}</div>
      )
    case CATEGORY_TYPE.JAVASCRIPT:
      return (
        <div className={utilStyles.hikeCategory}>
          {CATEGORY_TYPE.JAVASCRIPT}
        </div>
      )
  }
}

export default Category
