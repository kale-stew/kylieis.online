import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { env, SELF, applyD1Migrations } from 'cloudflare:test'

beforeAll(async () => {
  await applyD1Migrations(env.DB, [
    {
      name: '0001_initial_schema',
      queries: [
        `create table if not exists posts (id text primary key, title text not null, description text, category text not null, date text not null, type text not null default 'blog', tags text, content text, draft integer default 0)`,
      ],
    },
    {
      name: '0002_now_entries',
      queries: [
        `create table if not exists now_entries (id integer primary key autoincrement, date text not null, location text, celebrate text, read text, travel text, learn text, watch text, listen text, work text)`,
      ],
    },
  ])
})

describe('api routes', () => {
  it('health endpoint returns ok', async () => {
    const res = await SELF.fetch('http://localhost/api/health')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ status: 'ok' })
  })

  it('search returns empty results with no query', async () => {
    const res = await SELF.fetch('http://localhost/api/search')
    expect(res.status).toBe(200)
    const body = await res.json<{ results: unknown[] }>()
    expect(body.results).toEqual([])
  })

  it('search returns results matching title or content', async () => {
    await env.DB.prepare("INSERT INTO posts (id, title, description, category, date, type, content) VALUES ('test-post', 'Cloudflare Workers Guide', 'A guide to workers', 'dev', '2025-01-01', 'blog', 'This post covers Cloudflare Workers in depth')").run()
    await env.DB.prepare("INSERT INTO posts (id, title, description, category, date, type, content) VALUES ('test-talk', 'My Talk', 'A talk about JS', 'general', '2025-02-01', 'talk', 'Nothing about workers here')").run()

    const res = await SELF.fetch('http://localhost/api/search?q=workers')
    expect(res.status).toBe(200)
    const body = await res.json<{ results: { id: string }[] }>()
    expect(body.results.length).toBe(2)
    const ids = body.results.map((r) => r.id)
    expect(ids).toContain('test-post')
    expect(ids).toContain('test-talk')
  })

  it('search returns no results for unknown term', async () => {
    const res = await SELF.fetch('http://localhost/api/search?q=zzzznotfound')
    expect(res.status).toBe(200)
    const body = await res.json<{ results: unknown[] }>()
    expect(body.results).toEqual([])
  })
})

describe('now routes', () => {
  it('shows an empty state when there are no entries', async () => {
    const res = await SELF.fetch('http://localhost/now')
    expect(res.status).toBe(200)
    expect(await res.text()).toContain('No updates yet')
  })

  it('shows the latest entry at /now and older ones at /now/:date', async () => {
    await env.DB.prepare(
      "INSERT INTO now_entries (date, location, read) VALUES ('2022-03-31', 'Georgetown', 'Newest book'), ('2020-01-05', 'Denver', 'Older book')"
    ).run()

    const latest = await (await SELF.fetch('http://localhost/now')).text()
    expect(latest).toContain('Newest book')
    expect(latest).toContain('href="/now/2020-01-05"')
    expect(latest).toContain('aria-current="page">Thursday, March 31, 2022')

    const older = await SELF.fetch('http://localhost/now/2020-01-05')
    expect(older.status).toBe(200)
    const olderText = await older.text()
    expect(olderText).toContain('Older book')
    expect(olderText).toContain('An older entry')
    expect(olderText).toContain('<link rel="canonical" href="https://kylieis.online/now/2020-01-05"')
  })

  it('404s for a date with no entry', async () => {
    const res = await SELF.fetch('http://localhost/now/2099-01-01')
    expect(res.status).toBe(404)
  })
})

describe('dynamic routes', () => {
  it('search page renders html', async () => {
    const res = await SELF.fetch('http://localhost/search')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toMatch(/text\/html/)
    const text = await res.text()
    expect(text).toContain('Search — kylieis.online')
  })

  it('search page with query returns results', async () => {
    await env.DB.prepare("INSERT INTO posts (id, title, description, category, date, type, content) VALUES ('search-test', 'Test Post', 'A test post about search', 'dev', '2025-03-01', 'blog', 'This is the full content of the test post')").run()

    const res = await SELF.fetch('http://localhost/search?q=search')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Test Post')
  })

  it('now page renders html', async () => {
    const res = await SELF.fetch('http://localhost/now')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Now')
  })
})

describe('about page', () => {
  afterEach(() => vi.restoreAllMocks())

  it('renders photos fetched from photos-api at request time', async () => {
    const realFetch = globalThis.fetch
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const url = input instanceof Request ? input.url : String(input)
      if (!url.startsWith('https://photos-api.kylieski.workers.dev/api/photos')) return realFetch(input, init)
      return Response.json({
        photos: [{ id: 'live-photo-1', title: 'Fresh from the api', caption: null, location: null, date: null, width: 800, height: 600, blurhash: null, format: 'jpeg', tags: null }],
        meta: { limit: 100, offset: 0, count: 1 },
      })
    })

    const res = await SELF.fetch('http://localhost/about')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('photos-api.kylieski.workers.dev/img/live-photo-1')
  })

  it('falls back to the deploy-time page when photos-api fails', async () => {
    const realFetch = globalThis.fetch
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const url = input instanceof Request ? input.url : String(input)
      if (!url.startsWith('https://photos-api.kylieski.workers.dev/api/photos')) return realFetch(input, init)
      return new Response('boom', { status: 500 })
    })

    const res = await SELF.fetch('http://localhost/about')
    expect(res.status).not.toBe(500)
    expect(await res.text()).not.toContain('live-photo-1')
  })
})
