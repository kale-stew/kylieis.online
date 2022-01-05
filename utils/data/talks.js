const TALK_PREFIX =
  'https://raw.githubusercontent.com/kale-stew/all-talks/main/content'
export const ALL_TALK_DATA = `${TALK_PREFIX}/talks.json`

// Get a flatmap of every event ever spoken at
export async function getAllTalkEvents() {
  const fetchedTalks = await fetch(ALL_TALK_DATA)
  const allTalks = await fetchedTalks.json()

  return allTalks.flatMap((talk) =>
    talk.presentedAt.map((event) => ({
      id: talk.id,
      date: event.eventDate,
      title: talk.title,
      event: event.eventName,
      location: event.location,
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

// Get a simple arr of only titles
export async function getTalkIds() {
  const fetched = await fetch(ALL_TALK_DATA)
  const allTalks = await fetched.json()
  return allTalks.map((talk) => talk.id)
}

export async function getTalkData(id) {
  const fetched = await fetch(ALL_TALK_DATA)
  const allTalks = await fetched.json()
  const match = allTalks.find((talk) => talk.id === id)

  const fetchedReadme = await fetch(
    `${TALK_PREFIX}/${match.year}/${id}/README.md`
  )
  const content = await fetchedReadme.text()

  return {
    id,
    category: 'talks',
    content,
    title: match.title,
    date: match.presentedAt[0].eventDate,
    description: match.description,
  }
}
