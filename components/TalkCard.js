import Link from 'next/link'
import { formatDate } from '../utils/helpers'
import styles from './TalkCard.module.css'

const TalkCard = ({ item, page }) => {
  // Every talk has: title, description, presentedAt{},
  // exportedSlidesUrl, hostedSlidesUrl, previewImg
  const buildEvent = (title, item) => {
    // Every event item in presentedAt{} has eventDate,
    // eventName, eventType, eventUrl, recordedPresentationUrl?, location?
    return (
      <div className={styles.eventItem}>
        {item.location && item.location !== 'virtual' ? (
          <p>
            {formatDate(item.eventDate)}: Presented at{' '}
            <a href={item.eventUrl} className={styles.eventName}>
              {item.eventName}
            </a>{' '}
            in {item.location}
          </p>
        ) : (
          <p>
            {formatDate(item.eventDate)}: Presented at{' '}
            <a href={item.eventUrl} className={styles.eventName}>
              {item.eventName}
            </a>
          </p>
        )}
        {item.recordedPresentationUrl && (
          <a
            href={item.recordedPresentationUrl}
            alt={`Watch a recording of ${title} on Youtube.`}
            className={styles.youtubeLink}
          >
            → watch the recording
          </a>
        )}
      </div>
    )
  }

  return (
    <div className={styles.talkCard}>
      {page == 'home' ? (
        <h2 className={styles.titleLink}>
          <Link href={item.href} alt={`Read ${item.title} on the blog.`}>
            {item.title}
          </Link>
        </h2>
      ) : (
        <h2>{item.title}</h2>
      )}
      {item.date && <small>{formatDate(item.date)}</small>}
      <p>{item.description}</p>
      {item.presentedAt && (
        <div className={styles.eventWrapper}>
          {item.presentedAt.map(
            (item) => item.eventDate && buildEvent(item.title, item)
          )}
        </div>
      )}
    </div>
  )
}

export default TalkCard
