import { SocialLinks, METADATA } from '../utils/constants'

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}{' '}
    <a href={SocialLinks.PersonalHomepage} target="_blank">
      {METADATA.NAME}
    </a>
  </footer>
)

export default Footer
