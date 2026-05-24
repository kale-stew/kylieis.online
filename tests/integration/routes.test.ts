import { describe, it, expect, beforeAll } from 'vitest'
import { env, SELF, applyD1Migrations } from 'cloudflare:test'

beforeAll(async () => {
  await applyD1Migrations(env.DB, [
    {
      name: '0001_initial_schema',
      queries: [
        `create table if not exists posts (id text primary key, title text not null, description text, category text not null, date text not null, type text not null default 'blog', tags text, content text)`,
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
    const body = await res.json()
    expect(body.results).toEqual([])
  })

  it('search returns results matching title or content', async () => {
    await env.DB.prepare("INSERT INTO posts (id, title, description, category, date, type, content) VALUES ('test-post', 'Cloudflare Workers Guide', 'A guide to workers', 'dev', '2025-01-01', 'blog', 'This post covers Cloudflare Workers in depth')").run()
    await env.DB.prepare("INSERT INTO posts (id, title, description, category, date, type, content) VALUES ('test-talk', 'My Talk', 'A talk about JS', 'general', '2025-02-01', 'talk', 'Nothing about workers here')").run()

    const res = await SELF.fetch('http://localhost/api/search?q=workers')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.results.length).toBe(2)
    const ids = body.results.map((r) => r.id)
    expect(ids).toContain('test-post')
    expect(ids).toContain('test-talk')
  })

  it('search returns no results for unknown term', async () => {
    const res = await SELF.fetch('http://localhost/api/search?q=zzzznotfound')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.results).toEqual([])
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
