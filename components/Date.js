import { formatDate, formatDateWithDayOfWeek } from '../utils/helpers'
import { parseISO } from 'date-fns'
import utilStyles from '../styles/utils.module.css'

const FormattedDate = ({ dateString, withDOW }) => {
  const date =
    typeof dateString === 'string' || dateString instanceof String
      ? parseISO(dateString)
      : new Date(dateString)

  return (
    <time
      className={utilStyles.lightText}
      dateTime={dateString}
      style={{ fontSize: '14px' }}
    >
      {withDOW ? formatDateWithDayOfWeek(date) : formatDate(date)}
    </time>
  )
}

export default FormattedDate
