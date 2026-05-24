import { Hono } from 'hono'
import { ImageResponse } from 'hono-og'
import type { Env } from '../env'

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const title = c.req.query('title') || 'kylieis.online'
  const subtitle = c.req.query('subtitle') || ''

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #e23500 0%, #ffbc2d 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
        }}
      >
        <h1
          style={{
            fontSize: title.length > 20 ? '64px' : '80px',
            fontWeight: 'bold',
            color: '#000',
            margin: '0 0 16px 0',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          {title.toLowerCase()}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: '32px',
              color: '#fff',
              margin: 0,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {subtitle.toLowerCase()}
          </p>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '28px',
            color: '#fff',
            fontWeight: 500,
          }}
        >
          kylieis.online
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
})

export { app as ogRoutes }
