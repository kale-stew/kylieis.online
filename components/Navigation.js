import Link from 'next/link'
import styles from './Layout.module.css'

const Navigation = () => (
  <header className={styles.header}>
    <h2>kyliestewart.tech</h2>
    <div className={styles.navLinks}>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/talks">Talks</Link>
      <Link href="/about">About</Link>
    </div>
  </header>
)

export default Navigation
