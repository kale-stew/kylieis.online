import { formatDate, formatDateWithDayOfWeek } from '../utils/helpers'
import { parseISO } from 'date-fns'

const FormattedDate = ({ dateString, withDOW }) => {
  const date =
    typeof dateString === 'string' || dateString instanceof String
      ? parseISO(dateString)
      : new Date(dateString)

  return (
    <time dateTime={dateString} style={{ fontSize: '14px' }}>
      {withDOW ? formatDateWithDayOfWeek(date) : formatDate(date)}
    </time>
  )
}

export default FormattedDate
