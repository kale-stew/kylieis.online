import dynamic from 'next/dynamic'
import Link from 'next/link'
import { METADATA } from '../utils/constants'

import styles from './Layout.module.css'

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
})

/**
 * TODO:
 *  - turn into a toggle for full-screen nav (on mobile only?)
 *  - nav should have up to two screens, expand posts on click
 *  - properly display ThemeToggle
 */

const Header = () => (
  <header className={styles.header}>
    <h2>
      <Link href="/">{METADATA.SITE_NAME}</Link>
    </h2>
    <div className={styles.navLinks}>
      <Link href="/writing">Writing</Link>
      <Link href="/speaking">Speaking</Link>
      {/* <Link href="/projects">Projects</Link> */}
      {/* <Link href="/about">More About Kylie</Link> */}
      <ThemeToggle />
    </div>
  </header>
)

export default Header
