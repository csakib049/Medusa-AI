import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const themes = ['green', 'purple', 'red']

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('medusa-theme') || 'green'
  })

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const stored = localStorage.getItem('medusa-animations')
    return stored !== null ? stored === 'true' : true
  })

  const [codeTheme, setCodeTheme] = useState(() => {
    const stored = localStorage.getItem('medusa-code-theme')
    return stored || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('medusa-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-animations', animationsEnabled ? 'on' : 'off')
    localStorage.setItem('medusa-animations', animationsEnabled)
  }, [animationsEnabled])

  useEffect(() => {
    document.documentElement.setAttribute('data-code-theme', codeTheme)
    localStorage.setItem('medusa-code-theme', codeTheme)
  }, [codeTheme])

  const cycleTheme = () => {
    setTheme(prev => {
      const idx = themes.indexOf(prev)
      return themes[(idx + 1) % themes.length]
    })
  }

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev)
  }

  const toggleCodeTheme = () => {
    setCodeTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, animationsEnabled, toggleAnimations, codeTheme, toggleCodeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
