import { TIL_URL } from '../constants'

// Get a flatmap of all 'Today I Learned' (TIL) items
export async function getAllTilItems() {
  const fetched = await fetch(`${TIL_URL}/data.json`)
  const allItems = await fetched.json()

  return allItems.flatMap((item) =>
    item.presentedAt.map((category) => ({
      category,
      ...item,
    }))
  )
}
