import Link from 'next/link'
import styled from '@emotion/styled'
import { METADATA, SOURCE_CODE } from '../utils/data/personal-info'

const StyledFooter = styled.footer`
  background-image: var(--linear-gradient);
  color: white;
  bottom: 0;
  width: 100%;
  height: 50px;
  font-size: 12px;
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    margin: 0 5px;
  }
  a:hover {
    text-decoration: underline;
  }
`

const Footer = () => (
  <StyledFooter>
    © {new Date().getFullYear()}
    <Link href="/">{METADATA.FULL_NAME}</Link>－ built with 🤍 on
    <a href={SOURCE_CODE} target="_blank">
      github
    </a>
  </StyledFooter>
)

export default Footer
