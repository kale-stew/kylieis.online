import Link from 'next/link'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { METADATA, SOCIAL_LINKS } from '../utils/data/personal-info'
import { MdOutlineMail } from 'react-icons/md'
import { useState } from 'react'

import utilStyles from '../styles/utils.module.css'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
})

const MenuToggleButton = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
`

const FullScreenNavigation = styled.div`
  background-image: linear-gradient(
    72deg,
    var(--color-purple),
    var(--color-pink)
  );
  z-index: 100;
  width: 15vw;
  height: min-content;
  margin: auto 0 auto auto;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 1rem;
  @media (max-width: 1024px) {
    height: max-content;
    -webkit-transform: translate3d(0, 0, 0);
    gap: 1;
  }
  @media (max-width: 700px) {
    margin: 0 0 auto auto;
    width: 60vw;
    padding: 1rem;
    font-size: 18px;
  }
`

const HeaderNavigation = ({ isHome }) => {
  const [showMenu, toggleShowMenu] = useState(false)

  return (
    <header>
      <h2>
        <Link href="/">{METADATA.SITE_NAME}</Link>
      </h2>
      {showMenu ? (
        <FullScreenNavigation>
          <MenuToggleButton
            onClick={() => toggleShowMenu(!showMenu)}
            style={{ textAlign: 'right', padding: 0 }}
          >
            <IoMdClose size="1rem" />
          </MenuToggleButton>

          <div
            style={{ display: 'flex', flexDirection: 'column', lineHeight: 2 }}
          >
            {!isHome && <Link href="/">Home</Link>}
            <Link href="/writing">Writing</Link>
            <Link href="/speaking">Speaking</Link>
            {/* <Link href="/projects">Projects</Link> */}
            <Link href="/#about">About Kylie</Link>
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
