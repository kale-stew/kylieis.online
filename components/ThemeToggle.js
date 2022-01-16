import styled from '@emotion/styled'
import { useState, useEffect } from 'react'

const ToggleButton = styled.button`
  cursor: pointer;
  border: 2px solid var(--color-text-accent);
  border-radius: 5px;
  color: white;
  font-size: 0.75rem;
  background: transparent;
  transition: background 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  margin: 0 auto;
  width: max-content;
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
      {activeTheme === 'light' ? (
        <span>Toggle {inactiveTheme} mode</span>
      ) : (
        <span>Toggle {inactiveTheme} mode</span>
      )}
    </ToggleButton>
  )
}

export default ThemeToggle
