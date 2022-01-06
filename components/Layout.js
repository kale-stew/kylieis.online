import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Router from 'next/router'
import Header from './Header'
import Loading from './Loading'
import Footer from './Footer'

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
})

import styles from './Layout.module.css'

export default function Layout({ children, home }) {
  const [loading, setLoading] = useState(false)
  Router.events.on('routeChangeStart', (url) => setLoading(true))
  Router.events.on('routeChangeComplete', (url) => setLoading(false))

  return (
    <>
      <Header />
      <ThemeToggle />
      <div className={styles.wrapper}>
        <main>{!loading ? children : <Loading />}</main>
      </div>
      <Footer />
    </>
  )
}
