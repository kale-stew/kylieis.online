import Link from 'next/link'
import styles from './Card.module.css'

const Card = ({ item }) => {
  console.log(item.presentedAt)
  // 'title',
  // 'description',
  // 'presentedAt':
  //     eventDate: '4-28-18',
  //     eventName: 'Zeit Day',
  //     eventType: 'conference',
  //     eventUrl: 'https://zeit.co/day',
  //     recordedPresentationUrl: 'https://youtu.be/QaV7a64mUYE',
  //     location: 'San Francisco, CA'
  // 'exportedSlidesUrl',
  // 'hostedSlidesUrl',
  // 'previewImg'

  return (
    <div className={styles.card}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </div>
  )
}

export default Card
