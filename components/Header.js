import Link from 'next/link'
import styles from './Layout.module.css'

const Header = () => (
  <header className={styles.header}>
    <h2>
      <Link href="/">kyliestewart.tech</Link>
    </h2>
    <div className={styles.navLinks}>
      <Link href="/blog">Blog</Link>
      <Link href="/talks">Talks</Link>
      <Link href="/about">About</Link>
    </div>
  </header>
)

export default Header
