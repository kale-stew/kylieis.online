import { describe, it, expect, vi, afterEach } from 'vitest'
import { getPhotos } from '../../src/lib/photos-api'

const photo = (id: string) => ({ id, title: null, caption: null, location: null, date: null, width: 1, height: 1, blurhash: null, format: 'jpeg', tags: null })
const listing = (id: string) => Response.json({ photos: [photo(id)], meta: { limit: 100, offset: 0, count: 1 } })
const binding = (respond: () => Response) => ({ fetch: async () => respond() }) as unknown as Fetcher

describe('getPhotos', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('uses the service binding when it answers', async () => {
    vi.stubGlobal('fetch', async () => listing('via-public-url'))
    const { photos } = await getPhotos({ site: 'kylieis-online' }, binding(() => listing('via-binding')))
    expect(photos.map((p) => p.id)).toEqual(['via-binding'])
  })

  it('falls back to the public url when the binding fails', async () => {
    vi.stubGlobal('fetch', async () => listing('via-public-url'))
    const { photos } = await getPhotos({ site: 'kylieis-online' }, binding(() => new Response('error code: 1042', { status: 404 })))
    expect(photos.map((p) => p.id)).toEqual(['via-public-url'])
  })

  it('returns an empty list when both fail', async () => {
    vi.stubGlobal('fetch', async () => new Response('error code: 1042', { status: 200 }))
    const { photos } = await getPhotos({ site: 'kylieis-online' }, binding(() => new Response('down', { status: 503 })))
    expect(photos).toEqual([])
  })
})
