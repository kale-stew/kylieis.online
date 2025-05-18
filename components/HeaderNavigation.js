import Link from 'next/link'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { BsSearch } from 'react-icons/bs'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { SOCIAL_LINKS } from '../utils/data/personal-info'
import { MdOutlineMail } from 'react-icons/md'
import { StyledButton } from './shared'
import { useEffect, useRef, useState } from 'react'

import utilStyles from '../styles/utils.module.css'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
})

const SearchButton = () => (
  <StyledButton>
    <BsSearch /> <Link href="/search">Search the site</Link>
  </StyledButton>
)

const MenuToggleButton = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
  float: right;
`

const FullScreenNavigation = styled.div`
  background-image: var(--linear-gradient);
  z-index: 100;
  width: 15vw;
  height: min-content;
  margin: auto 0 auto auto;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;
  gap: 1rem;
  a {
    width: max-content;
  }
  @media (max-width: 1024px) {
    height: max-content;
    -webkit-transform: translate3d(0, 0, 0);
    gap: 1;
  }
  @media (max-width: 700px) {
    margin: 0 0 auto auto;
    width: max-content;
    padding: 1.5rem;
    font-size: 18px;
  }
`

const HeaderNavigation = ({ isHome }) => {
  const menuRef = useRef()
  const [showMenu, toggleShowMenu] = useState(false)
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and clicked target isn't within the window
      // close the HeaderNavigation
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        toggleShowMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showMenu])

  return (
    <header style={isHome ? { background: 'transparent' } : null}>
      {showMenu ? (
        <FullScreenNavigation ref={menuRef}>
          <MenuToggleButton
            onClick={() => toggleShowMenu(!showMenu)}
            style={{ textAlign: 'right', padding: 0 }}
          >
            <IoMdClose size="1rem" />
          </MenuToggleButton>

          <div
            style={{ display: 'flex', flexDirection: 'column', lineHeight: 2 }}
            onClick={() => toggleShowMenu(!showMenu)}
          >
            {!isHome && <Link href="/">Home</Link>}
            <Link href="/writing">Writing</Link>
            <Link href="/speaking">Speaking</Link>
            <Link href="/projects">Projects</Link>
            {/* <Link href="/about/#timeline">Personal Timeline</Link> */}
            {/* <Link href="/now">Now</Link> */}
            <Link href="/about">About</Link>
          </div>
          <div
            className={utilStyles.socialIcons}
            style={{
              width: '100%',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href={SOCIAL_LINKS.Email} network="email" target="_blank">
              <MdOutlineMail />
            </a>
            <a href={SOCIAL_LINKS.Twitter} target="_blank">
              <FaTwitter />
            </a>
            <a href={SOCIAL_LINKS.LinkedIn} target="_blank">
              <FaLinkedinIn />
            </a>
            <a href={SOCIAL_LINKS.Github} target="_blank">
              <FaGithub />
            </a>
          </div>
          <SearchButton />
          <ThemeToggle />
        </FullScreenNavigation>
      ) : (
        <MenuToggleButton onClick={() => toggleShowMenu(!showMenu)}>
          <IoEllipsisVerticalOutline size="1.5rem" />
        </MenuToggleButton>
      )}
    </header>
  )
}

export default HeaderNavigation
