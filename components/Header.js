import Link from 'next/link'
import styles from './Layout.module.css'

import { METADATA } from '../utils/constants'

const Header = () => (
  <header className={styles.header}>
    <h2>
      <Link href="/">{METADATA.SITE_NAME}</Link>
    </h2>
    <div className={styles.navLinks}>
      <Link href="/blog">Blog</Link>
      <Link href="/talks">Talks</Link>
      <Link href="/about">About</Link>
    </div>
  </header>
)

export default Header
