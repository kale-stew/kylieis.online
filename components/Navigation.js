import Link from 'next/link'
import styles from './Layout.module.css'

const Navigation = () => (
  <header className={styles.navigation}>
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <Link href="/talks">Talks</Link>
    <Link href="/about">About</Link>
  </header>
)

export default Navigation
