import { BsMoonStars, BsSun } from 'react-icons/bs'
import { StyledButton } from './shared'
import { useState, useEffect } from 'react'

import utilStyles from '../styles/utils.module.css'

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light'
  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem('theme', activeTheme)
  }, [activeTheme])

  return (
    <StyledButton
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      {activeTheme === 'light' ? (
        <span className={utilStyles.singleRow}>
          <BsMoonStars /> Toggle {inactiveTheme} mode
        </span>
      ) : (
        <span className={utilStyles.singleRow}>
          <BsSun />
          Toggle {inactiveTheme} mode
        </span>
      )}
    </StyledButton>
  )
}

export default ThemeToggle
