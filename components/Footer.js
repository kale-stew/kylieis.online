import styled from '@emotion/styled'
import { FaBluesky, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'
import { SOCIAL_LINKS } from '../utils/data/personal-info'

const StyledFooter = styled.footer`
  background-image: var(--linear-gradient);
  color: white;
  bottom: 0;
  width: 100%;
  font-size: 1.1rem;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    margin: 0 0.75rem;
  }
`

const Footer = ({ isHome }) => (
  <StyledFooter style={isHome ? { background: 'transparent' } : null}>
    <a href={SOCIAL_LINKS.Email} network="email" target="_blank">
      <MdOutlineMail />
    </a>
    <a href={SOCIAL_LINKS.Twitter} target="_blank">
      <FaTwitter />
    </a>
    <a href={SOCIAL_LINKS.Bluesky} target="_blank">
      <FaBluesky />
    </a>
    <a href={SOCIAL_LINKS.LinkedIn} target="_blank">
      <FaLinkedinIn />
    </a>
    <a href={SOCIAL_LINKS.Github} target="_blank">
      <FaGithub />
    </a>
  </StyledFooter>
)

export default Footer
