import Link from 'next/link'
import dynamic from 'next/dynamic'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { METADATA, SocialLinks } from '../utils/constants'
import { MdOutlineMail } from 'react-icons/md'

import styles from './Layout.module.css'
import utilStyles from '../styles/utils.module.css'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
})

/**
 * TODO:
 *  - turn into a toggle for full-screen nav (on mobile only?)
 *  - nav should have up to two screens, expand posts on click
 *  - properly display ThemeToggle
 */

const HeaderNavigation = () => (
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
    <div className={utilStyles.socialIcons}>
      <a href={SocialLinks.Email} network="email" target="_blank">
        <MdOutlineMail />
      </a>
      <a href={SocialLinks.Twitter} target="_blank">
        <FaTwitter />
      </a>
      <a href={SocialLinks.LinkedIn} target="_blank">
        <FaLinkedinIn />
      </a>
      <a href={SocialLinks.Github} target="_blank">
        <FaGithub />
      </a>
    </div>
  </header>
)

export default HeaderNavigation
