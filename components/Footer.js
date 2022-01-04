import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'
import { SocialLinks, METADATA } from '../utils/constants'

import utilStyles from '../styles/utils.module.css'

const Footer = () => (
  <footer>
    <small className={utilStyles.copyright}>
      © {new Date().getFullYear()}{' '}
      <a href={SocialLinks.PersonalHomepage} target="_blank">
        {METADATA.NAME}
      </a>
    </small>
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
  </footer>
)

export default Footer
