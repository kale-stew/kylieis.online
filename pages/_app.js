import { Analytics } from '@vercel/analytics/react'
import CustomHead from '../components/CustomHead'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CustomHead {...pageProps} />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
