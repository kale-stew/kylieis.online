import { describe, it, expect, beforeAll } from 'vitest'
import { env, SELF, applyD1Migrations } from 'cloudflare:test'

beforeAll(async () => {
  await applyD1Migrations(env.DB, [
    {
      name: '0001_initial_schema',
      queries: [
        `create table if not exists posts (id text primary key, title text not null, description text, category text not null, date text not null, type text not null default 'blog', tags text)`,
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
})

describe('dynamic routes', () => {
  it('search page renders html', async () => {
    const res = await SELF.fetch('http://localhost/search')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toMatch(/text\/html/)
    const text = await res.text()
    expect(text).toContain('Search — kylieis.online')
  })

  it('now page renders html', async () => {
    const res = await SELF.fetch('http://localhost/now')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Now')
  })
})
