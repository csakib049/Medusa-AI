import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const themes = ['green', 'purple', 'red']

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('medusa-theme') || 'green'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('medusa-theme', theme)
  }, [theme])

  const cycleTheme = () => {
    setTheme(prev => {
      const idx = themes.indexOf(prev)
      return themes[(idx + 1) % themes.length]
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
