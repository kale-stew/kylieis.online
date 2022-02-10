import FormattedDate from './Date'
import Link from 'next/link'
import ReactCardFlip from 'react-card-flip'
import { formatDate } from '../utils/helpers'
import { useState } from 'react'

import styles from './FlippableCard.module.css'

const FlippableCard = ({ item }) => {
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

  const buildEvent = (item) => (
    <div className={styles.eventItem}>
      <p>
        →{' '}
        <a href={item.eventUrl} className={styles.eventName}>
          {item.eventName}
        </a>{' '}
        {item.location !== 'virtual'
          ? `in ${item.location} on ${formatDate(item.eventDate)}.`
          : `online on ${formatDate(item.eventDate)}.`}
      </p>
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
        {item.date && (
          <small>
            <FormattedDate dateString={item.date} />
          </small>
        )}
        <p>{item.description}</p>
        <FlipButton />
      </div>

      <div className={styles.talkCard}>
        <>
          <h3>Presented At</h3>
          <div className={styles.eventWrapper}>
            {item.presentedAt.map((item) => item.eventDate && buildEvent(item))}
          </div>
        </>
        <FlipButton />
      </div>
    </ReactCardFlip>
  )
}

export default FlippableCard
