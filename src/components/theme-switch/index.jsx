import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'

import * as Dom from '../../utils/dom'
import { THEME } from '../../constants'

import { SunIcon, MoonIcon } from './icons'
import './index.scss'

function getTheme(checked) {
  return checked ? THEME.DARK : THEME.LIGHT
}

function toggleTheme(theme) {
  switch (theme) {
    case THEME.LIGHT: {
      Dom.addClassToBody(THEME.LIGHT)
      Dom.removeClassToBody(THEME.DARK)
      break
    }
    case THEME.DARK: {
      Dom.addClassToBody(THEME.DARK)
      Dom.removeClassToBody(THEME.LIGHT)
      break
    }
  }
}

export const ThemeSwitch = () => {
  // @TODO: Bug
  // Currently, when a user toggles to light mode but has an OS
  // default to 'dark', the dark mode persists on a page change,
  // instead of light mode
  const isInitiallyDark =
    (typeof window !== `undefined` && Dom.hasClassOfBody(THEME.DARK)) ||
    (typeof window !== `undefined` &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  const [checked, setChecked] = useState(isInitiallyDark)

  const handleChange = (checked) => {
    const theme = getTheme(checked)
    setChecked(checked)
    toggleTheme(theme)
  }

  useEffect(() => {
    handleChange(checked)
  }, [checked])

  useEffect(() => {
    const mediaListener = (e) => {
      handleChange(e.matches)
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener(mediaListener)

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeListener(mediaListener)
  }, [])

  return (
    <div className="switch-container">
      <label htmlFor="normal-switch">
        <Switch
          onChange={handleChange}
          checked={checked}
          id="normal-switch"
          height={24}
          width={48}
          checkedIcon={
            <div className="icon checkedIcon">
              <MoonIcon />
            </div>
          }
          uncheckedIcon={
            <div className="icon uncheckedIcon">
              <SunIcon />
            </div>
          }
          offColor={'#d9dfe2'}
          offHandleColor={'#fff'}
          onColor={'#999'}
          onHandleColor={'#282c35'}
        />
      </label>
    </div>
  )
}
