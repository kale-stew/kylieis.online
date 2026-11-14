/**
 * photos-api client for kylieis.online
 *
 * Provides helpers for fetching photos and generating responsive image URLs
 * from the photos-api worker (photos-api.kylieski.workers.dev)
 */

const PHOTOS_API_BASE = 'https://photos-api.kylieski.workers.dev'

// Supported widths for responsive images
export const IMAGE_WIDTHS = [200, 400, 800, 1600] as const
export type ImageWidth = (typeof IMAGE_WIDTHS)[number]

export interface Photo {
  id: string
  title: string | null
  caption: string | null
  location: string | null
  date: string | null
  width: number | null
  height: number | null
  blurhash: string | null
  format: string
  tags: string | null
}

export interface PhotosApiResponse {
  photos: Photo[]
  meta: {
    limit: number
    offset: number
    count: number
  }
}

/**
 * Generate image URL for a photo
 * @param photoId - The photo ID from photos-api
 * @param width - Optional width (200, 400, 800, 1600) for resized WebP, or undefined for original
 */
export function getPhotoUrl(photoId: string, width?: ImageWidth): string {
  const base = `${PHOTOS_API_BASE}/img/${photoId}`
  return width ? `${base}?w=${width}` : base
}

/**
 * Generate srcset attribute for responsive images
 * @param photoId - The photo ID from photos-api
 * @param widths - Array of widths to include (defaults to all)
 */
export function getPhotoSrcset(
  photoId: string,
  widths: readonly ImageWidth[] = IMAGE_WIDTHS
): string {
  return widths.map((w) => `${getPhotoUrl(photoId, w)} ${w}w`).join(', ')
}

/**
 * Fetch a single photo by ID
 */
export async function getPhoto(photoId: string): Promise<Photo | null> {
  try {
    const res = await fetch(`${PHOTOS_API_BASE}/api/photos/${photoId}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function requestPhotos(
  doFetch: (url: string) => Promise<Response>,
  url: string
): Promise<PhotosApiResponse | null> {
  try {
    const res = await doFetch(url)
    if (!res.ok) return null
    const body = await res.json<PhotosApiResponse>()
    return Array.isArray(body?.photos) ? body : null
  } catch {
    return null
  }
}

/**
 * Fetch photos with optional filtering. Never throws: any failure returns an empty list.
 *
 * Inside the Worker, pass the PHOTOS_API service binding. A plain fetch() to
 * photos-api.kylieski.workers.dev from another Worker on kylieski.workers.dev
 * (every preview and draft) fails with Cloudflare error 1042. The public URL is
 * still tried when the binding is missing or fails, which covers the Node build,
 * `wrangler dev`, and tests.
 */
export async function getPhotos(
  options?: {
    site?: string
    limit?: number
    offset?: number
  },
  binding?: Fetcher
): Promise<PhotosApiResponse> {
  const params = new URLSearchParams()
  if (options?.site) params.set('site', options.site)
  if (options?.limit) params.set('limit', String(options.limit))
  if (options?.offset) params.set('offset', String(options.offset))

  const url = `${PHOTOS_API_BASE}/api/photos${params.toString() ? `?${params}` : ''}`
  const viaBinding = binding ? await requestPhotos((u) => binding.fetch(u), url) : null
  return (
    viaBinding ??
    (await requestPhotos((u) => fetch(u), url)) ?? { photos: [], meta: { limit: 0, offset: 0, count: 0 } }
  )
}

