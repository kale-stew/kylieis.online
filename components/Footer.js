import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'
import { SocialLinks } from '../utils/constants'

import styles from '../styles/about.module.css'

const Footer = () => (
  <footer className={styles.socialIcons}>
    <a target="_blank" href={SocialLinks.Email} network="email">
      <MdOutlineMail />
    </a>
    <a target="_blank" href={SocialLinks.Twitter}>
      <FaTwitter />
    </a>
    <a target="_blank" href={SocialLinks.LinkedIn}>
      <FaLinkedinIn />
    </a>
    <a target="_blank" href={SocialLinks.Github}>
      <FaGithub />
    </a>
  </footer>
)

export default Footer
