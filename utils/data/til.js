// Full length for a single TIL:
//    https://raw.githubusercontent.com/kale-stew/til/main/<category>/<title>.md
const TIL_URL = 'https://raw.githubusercontent.com/kale-stew/til/main'

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
