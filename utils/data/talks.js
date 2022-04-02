import matter from 'gray-matter'
import { format } from 'date-fns'

const TALK_PREFIX =
  'https://raw.githubusercontent.com/kale-stew/all-talks/main/content'
const SPEAKING_DATA = `${TALK_PREFIX}/talks.json`

export async function getAllSpeakingData() {
  const fetched = await fetch(SPEAKING_DATA)
  const allTalks = await fetched.json()
  return allTalks
}

// Get a flatmap of every event ever spoken at
export async function getAllSpeakingEvents() {
  const allTalks = await getAllSpeakingData()
  return allTalks.flatMap(({ title, id, category, ...talk }) =>
    talk.presentedAt.map((event) => ({
      id,
      title,
      type: event.eventType,
      date: event.eventDate,
      category,
      description: talk.description
        ? `${talk.description} Presented at ${
            event.eventType == 'meetup'
              ? `the ${event.eventName} meetup`
              : event.eventName
          }${
            event.location !== 'virtual'
              ? ` in ${event.location}.`
              : ', online.'
          }`
        : 'Longer description coming soon.',
    }))
  )
}

export async function getTalkMetadata() {
  const allTalks = await getAllSpeakingData()
  return allTalks.map((talk) => talk.id)
}

export async function getSingleTalkData(id) {
  const allTalks = await getAllSpeakingData()
  const match = allTalks.find((talk) => talk.id === id)
  const fetchedReadme = await fetch(
    `${TALK_PREFIX}/${format(new Date(match.date), 'y')}/${id}/README.md`
  )
  const text = await fetchedReadme.text()
  const { data, content } = matter(text)

  return {
    id,
    category: match.category,
    content,
    title: data.title ? data.title : match.title,
    date: match.presentedAt[0].eventDate,
    description: match.description,
  }
}
