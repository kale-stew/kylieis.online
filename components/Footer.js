import { METADATA, SOCIAL_LINKS } from '../utils/data/personal-info'

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}
    <a
      href={SOCIAL_LINKS.PersonalHomepage}
      target="_blank"
      style={{ marginLeft: '0.4em' }}
    >
      {METADATA.FULL_NAME}
    </a>
  </footer>
)

export default Footer
