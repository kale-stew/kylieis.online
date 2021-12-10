import { formatDate } from '../utils/helpers'
import styles from './Card.module.css'

const Card = ({ item }) => {
  // Every talk has: title, description, presentedAt{},
  // exportedSlidesUrl, hostedSlidesUrl, previewImg
  const buildEvent = ({ title, item }) => {
    // Every event item in presentedAt{} has eventDate,
    // eventName, eventType, eventUrl, recordedPresentationUrl?, location?
    return (
      <div className={styles.eventItem}>
        {item.location && item.location !== 'virtual' ? (
          <small>
            · {formatDate(item.eventDate)}: Presented at{' '}
            <a href={item.eventUrl}>{item.eventName}</a> in {item.location}
          </small>
        ) : (
          <small>
            · {formatDate(item.eventDate)}: Presented at{' '}
            <a href={item.eventUrl}>{item.eventName}</a>
          </small>
        )}
        {item.recordedPresentationUrl && (
          <small>
            <a
              href={item.recordedPresentationUrl}
              alt={`Watch a recording of ${title} on Youtube.`}
              className={styles.youtubeLink}
            >
              → watch the recording
            </a>
          </small>
        )}
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div className={styles.eventWrapper}>
        {item.presentedAt.map(
          (item) => item.eventDate && buildEvent({ title: item.title, item })
        )}
      </div>
    </div>
  )
}

export default Card
