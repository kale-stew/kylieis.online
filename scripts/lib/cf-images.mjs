/**
 * Cloudflare Images upload helper for the Notion -> markdown export.
 *
 * Notion-hosted image URLs are signed and expire (~1h), so any image that lives
 * in Notion must be copied to durable storage at export time. We upload to
 * Cloudflare Images with a DETERMINISTIC id (hash of the Notion block id) so
 * re-running the export never creates duplicates, and we cache the mapping in
 * scripts/.notion-image-map.json to skip re-uploads entirely.
 *
 * If no CF Images token is configured (or --dry-run), uploads are skipped and
 * the original URL is returned with a warning.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

export function loadImageMap(path) {
  if (!path || !existsSync(path)) return {}
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return {}
  }
}

export function saveImageMap(path, map) {
  if (!path) return
  writeFileSync(path, JSON.stringify(map, null, 2) + '\n')
}

/** Stable, URL-safe Cloudflare Images id derived from a Notion block id. */
export function deterministicId(key) {
  return 'notion-' + createHash('sha256').update(String(key)).digest('hex').slice(0, 24)
}

/** Only Notion-hosted (expiring) URLs need migrating; leave external URLs alone. */
export function isNotionHosted(url) {
  return /amazonaws\.com|secure\.notion-static\.com|prod-files-secure|notion\.so\/image/i.test(
    String(url ?? '')
  )
}

export function createImageUploader({
  accountId,
  token,
  imagesHash,
  map = {},
  dryRun = false,
  onWarn = () => {},
}) {
  const enabled = Boolean(accountId && token && imagesHash)

  return {
    map,
    enabled,
    /** Returns the durable imagedelivery URL (or the original if skipped). */
    async upload(key, sourceUrl) {
      if (map[key]) return map[key]
      if (!isNotionHosted(sourceUrl)) return sourceUrl // external/photos-api URL — keep as-is

      if (dryRun) {
        onWarn(`[dry-run] would upload Notion image for block ${key}`)
        return sourceUrl
      }
      if (!enabled) {
        onWarn(
          `CF Images not configured (set CF_IMAGES_API_TOKEN) — leaving expiring Notion URL for block ${key}`
        )
        return sourceUrl
      }

      const id = deterministicId(key)
      const deliveryUrl = `https://imagedelivery.net/${imagesHash}/${id}/public`

      const res = await fetch(sourceUrl)
      if (!res.ok) throw new Error(`failed to fetch Notion image (${res.status}) for block ${key}`)
      const bytes = Buffer.from(await res.arrayBuffer())

      const form = new FormData()
      form.append('file', new Blob([bytes]), `${id}`)
      form.append('id', id)

      const up = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
        { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form }
      )

      if (up.status === 409) {
        // already uploaded under this deterministic id — idempotent success
        map[key] = deliveryUrl
        return deliveryUrl
      }

      const json = await up.json().catch(() => ({}))
      if (!up.ok || !json.success) {
        throw new Error(
          `CF Images upload failed for block ${key}: ${JSON.stringify(json.errors ?? up.status)}`
        )
      }

      map[key] = deliveryUrl
      return deliveryUrl
    },
  }
}
