import { TALK_URL } from './constants'

// Get a flatmap of every event ever spoken at
export async function getAllTalkEvents() {
  const fetchedTalks = await fetch(TALK_URL)
  const allTalks = await fetchedTalks.json()
  return allTalks.flatMap((talk) =>
    talk.presentedAt.map((event) => ({
      id: talk.title,
      date: event.eventDate,
      title: talk.title,
      event: event.eventName,
      location: event.location,
      href: '/talks',
      description: talk.description
        ? talk.description
        : 'Longer description coming soon.',
      shortDescription: `Presented at ${
        event.eventType == 'meetup'
          ? `the ${event.eventName} meetup`
          : event.eventName
      }${
        event.location !== 'virtual' ? ` in ${event.location}.` : ', online.'
      }`,
    }))
  )
}
