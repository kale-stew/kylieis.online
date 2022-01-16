import styled from '@emotion/styled'
import { CgMoon } from 'react-icons/cg'
import { FaRegSun } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const ToggleButton = styled.button`
  font-size: 1.5rem;
  line-height: 1;
  border: 0;
  cursor: pointer;
  background: transparent;
  transition: background 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  color: var(--color-white);
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light'
  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem('theme', activeTheme)
  }, [activeTheme])

  return (
    <ToggleButton
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      {activeTheme === 'light' ? <FaRegSun /> : <CgMoon />}
    </ToggleButton>
  )
}

export default ThemeToggle
