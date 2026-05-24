import { Hono } from 'hono'
import { ImageResponse, loadGoogleFont } from 'hono-og'
import type { Env } from '../env'

const GRADIENTS = [
  'linear-gradient(135deg, #e23500 0%, #ffbc2d 100%)',
  'linear-gradient(135deg, #c41e00 0%, #ff9500 100%)',
  'linear-gradient(135deg, #ff4e00 0%, #ffb700 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #ffbc2d 100%)',
  'linear-gradient(135deg, #ff3b30 0%, #ff8c42 100%)',
  'linear-gradient(135deg, #e23500 0%, #ff6b35 50%, #ffbc2d 100%)',
  'linear-gradient(135deg, #c41e00 0%, #e23500 50%, #ff9500 100%)',
  'linear-gradient(135deg, #ff4e00 0%, #ff8c42 50%, #ffb700 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #ffbc2d 50%, #ffd700 100%)',
  'linear-gradient(135deg, #e23500 0%, #ff3b30 50%, #ff9500 100%)',
  'linear-gradient(45deg, #ffbc2d 0%, #e23500 100%)',
  'linear-gradient(45deg, #ffb700 0%, #c41e00 100%)',
  'linear-gradient(45deg, #ff8c42 0%, #ff4e00 100%)',
  'linear-gradient(45deg, #ff9500 0%, #e23500 50%, #c41e00 100%)',
  'linear-gradient(90deg, #e23500 0%, #ffbc2d 100%)',
  'linear-gradient(180deg, #ffbc2d 0%, #e23500 100%)',
  'linear-gradient(225deg, #ff6b35 0%, #c41e00 100%)',
  'linear-gradient(225deg, #ff9500 0%, #e23500 50%, #ff4e00 100%)',
  'radial-gradient(circle at top left, #ffbc2d 0%, #e23500 100%)',
  'radial-gradient(circle at bottom right, #e23500 0%, #ffbc2d 100%)',
]

const DISPLAY_FONTS = [
  'Monoton',
  'Rubik Glitch',
  'Nabla',
  'Silkscreen',
  'Bitcount Prop Single',
  'Megrim',
  'Atomic Age',
  'Jersey 10',
]

function getRandomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
}

function getRandomFont() {
  return DISPLAY_FONTS[Math.floor(Math.random() * DISPLAY_FONTS.length)]
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const title = c.req.query('title') || 'kylieis.online'
  const rawSubtitle = c.req.query('subtitle') || ''
  const subtitle = rawSubtitle.toLowerCase().replace(/[.,;:!?'"\-–—]/g, '')
  const isPost = c.req.query('type') === 'post' || title.length > 35
  const fontFamily = getRandomFont()

  const [displayFont, bodyFont, monoFont] = await Promise.all([
    loadGoogleFont({ family: fontFamily, weight: 400 }),
    loadGoogleFont({ family: 'Inter', weight: 400 }),
    loadGoogleFont({ family: 'Fira Code', weight: 400 }),
  ])

  const titleSize = isPost ? (title.length > 50 ? '72px' : '88px') : (title.length > 20 ? '110px' : '140px')
  const subtitleSize = isPost ? '32px' : '42px'

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: getRandomGradient(),
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isPost ? '40px 60px' : '30px 40px',
        }}
      >
        <h1
          style={{
            fontFamily: fontFamily,
            fontSize: titleSize,
            fontWeight: 'normal',
            color: '#fff',
            margin: '0 0 24px 0',
            textAlign: 'center',
            lineHeight: 1.05,
          }}
        >
          {title.toLowerCase()}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: subtitleSize,
              color: '#fff',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'Fira Code',
            fontSize: '24px',
            color: '#fff',
            opacity: 0.7,
          }}
        >
          kylieis.online
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: fontFamily,
          data: displayFont,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: bodyFont,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Fira Code',
          data: monoFont,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )
})

export { app as ogRoutes }
