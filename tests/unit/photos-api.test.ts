import { describe, it, expect, vi, afterEach } from 'vitest'
import { getCollectionPhotos, getPhotos, hasAboutTag, pickAboutPhoto } from '../../src/lib/photos-api'

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

describe('getCollectionPhotos', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reads the collection endpoint', async () => {
    let requested = ''
    vi.stubGlobal('fetch', async () => listing('unused'))
    const { photos } = await getCollectionPhotos('about', { limit: 100 }, { fetch: async (url: string) => { requested = url; return listing('member') } } as unknown as Fetcher)
    expect(requested).toBe('https://photos-api.kylieski.workers.dev/api/collections/about/photos?limit=100')
    expect(photos.map((p) => p.id)).toEqual(['member'])
  })

  it('returns an empty list for an unknown collection', async () => {
    vi.stubGlobal('fetch', async () => Response.json({ error: 'Collection not found' }, { status: 404 }))
    const { photos } = await getCollectionPhotos('about')
    expect(photos).toEqual([])
  })
})

describe('about rotation', () => {
  const tagged = (id: string, tags: string | null) => ({ ...photo(id), tags })

  it('matches the kylie tag exactly, in json or comma form', () => {
    expect(hasAboutTag('["summit","Kylie"]')).toBe(true)
    expect(hasAboutTag('summit, kylie')).toBe(true)
    expect(hasAboutTag('["kylies-photos"]')).toBe(false)
    expect(hasAboutTag(null)).toBe(false)
  })

  it('picks from the collection when it has photos', () => {
    const picked = pickAboutPhoto([photo('a'), photo('b')], [tagged('c', '["kylie"]')], () => 0.99)
    expect(picked?.id).toBe('b')
  })

  it('falls back to kylie-tagged site photos, then to nothing', () => {
    expect(pickAboutPhoto([], [tagged('c', '["ridge"]'), tagged('d', '["kylie"]')], () => 0)?.id).toBe('d')
    expect(pickAboutPhoto([], [tagged('c', '["ridge"]')])).toBeNull()
  })
})
