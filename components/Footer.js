import { SocialLinks, METADATA } from '../utils/constants'

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}
    <a
      href={SocialLinks.PersonalHomepage}
      target="_blank"
      style={{ marginLeft: '0.4em' }}
    >
      {METADATA.NAME}
    </a>
  </footer>
)

export default Footer
