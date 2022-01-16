import Footer from './Footer'
import HeaderNavigation from './HeaderNavigation'
import Loading from './Loading'
import Router from 'next/router'
import { useState } from 'react'

import styles from './Layout.module.css'

export default function Layout({ children, home }) {
  const [loading, setLoading] = useState(false)
  Router.events.on('routeChangeStart', (url) => setLoading(true))
  Router.events.on('routeChangeComplete', (url) => setLoading(false))

  return (
    <>
      <HeaderNavigation isHome={home} />
      <div className={styles.wrapper}>
        <main>{!loading ? children : <Loading />}</main>
      </div>
      <Footer />
    </>
  )
}
