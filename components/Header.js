import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './Layout.module.css'
import { METADATA } from '../utils/constants'

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
})

/**
 * TODO:
 *  - turn into a toggle for full-screen nav (on mobile only?)
 *  - nav should have up to two screens, expand posts on click
 *  - add ThemeToggle
 */

const Header = () => (
  <header className={styles.header}>
    <h2>
      <Link href="/">{METADATA.SITE_NAME}</Link>
    </h2>
    <div className={styles.navLinks}>
      <Link href="/blog">Writing</Link>
      <Link href="/talks">Speaking</Link>
      <ThemeToggle />
      {/* <Link href="/contact">Contact</Link> */}
    </div>
  </header>
)

export default Header
