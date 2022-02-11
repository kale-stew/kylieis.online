import {
  METADATA,
  SOCIAL_LINKS,
  SOURCE_CODE,
} from '../utils/data/personal-info'

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}
    <a
      href={SOCIAL_LINKS.PersonalHomepage}
      target="_blank"
      style={{ margin: '0 0.3rem' }}
    >
      {METADATA.FULL_NAME}
    </a>
    － built with 🤍 on
    <a href={SOURCE_CODE} target="_blank" style={{ marginLeft: '0.3rem' }}>
      github
    </a>
  </footer>
)

export default Footer
