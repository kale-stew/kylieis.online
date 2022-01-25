import Link from 'next/link'
import ReactCardFlip from 'react-card-flip'
import { formatDate } from '../utils/helpers'
import { useState } from 'react'

import styles from './TalkCard.module.css'

// In mobile: should remove all headers, display data inline
// Only clickable in desktop

const TalkCard = ({ item }) => {
  const [isFlipped, setFlip] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    setFlip(!isFlipped)
  }

  const FlipButton = () => (
    <button className={styles.flipButton} onClick={handleClick}>
      Flip over
    </button>
  )

  const buildEvent = (title, item) => (
    <div className={styles.eventItem}>
      {item.location && item.location !== 'virtual' ? (
        <p>
          →{' '}
          <a href={item.eventUrl} className={styles.eventName}>
            {item.eventName}
          </a>{' '}
          in {item.location} on {formatDate(item.eventDate)}.
        </p>
      ) : (
        <p>
          →{' '}
          <a href={item.eventUrl} className={styles.eventName}>
            {item.eventName}
          </a>{' '}
          online on {formatDate(item.eventDate)}.
        </p>
      )}
      {/* {item.recordedPresentationUrl && (
        <a
          href={item.recordedPresentationUrl}
          alt={`Watch a recording of ${title} on Youtube.`}
          className={styles.youtubeLink}
        >
          watch the recording
        </a>
      )} */}
    </div>
  )

  return (
    <ReactCardFlip isFlipped={isFlipped} infinite>
      <div className={styles.talkCard}>
        {
          <h2 className={styles.titleLink}>
            <Link
              href="/speaking/[id]"
              as={`/speaking/${item.id}`}
              alt={`See more information about this talk: '${item.title}.'`}
            >
              {item.title}
            </Link>
          </h2>
        }
        {item.date && <small>{formatDate(item.date)}</small>}
        <p>
          {item.eventDescription ? item.eventDescription : item.description}
        </p>
        <FlipButton />
      </div>

      <div className={styles.talkCard}>
        {item.presentedAt ? (
          <>
            <h3>Presented At</h3>
            <div className={styles.eventWrapper}>
              {item.presentedAt.map(
                (item) => item.eventDate && buildEvent(item.title, item)
              )}
            </div>
          </>
        ) : (
          <p>{item.description}</p>
        )}
        <FlipButton />
      </div>
    </ReactCardFlip>
  )
}

export default TalkCard
