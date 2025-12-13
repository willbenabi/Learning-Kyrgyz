import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read from localStorage, default to 'system' if not set
    const stored = localStorage.getItem(storageKey) as Theme | null
    return stored || defaultTheme
  })
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Helper to apply theme
  const applyTheme = (actualTheme: 'light' | 'dark') => {
    const root = window.document.documentElement

    // Update resolved theme state
    setResolvedTheme(actualTheme)

    // Set background for overscroll
    const bgColor = actualTheme === 'dark' ? 'oklch(0.26 0.03 262.67)' : 'oklch(0.98 0 0)'
    root.style.backgroundColor = bgColor

    // Update meta theme-color for browser chrome
    const metaColor = actualTheme === 'dark' ? '#2a2d3e' : '#fafafa'
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      document.head.appendChild(metaThemeColor)
    }
    metaThemeColor.setAttribute('content', metaColor)
  }

  useEffect(() => {
    const root = window.document.documentElement

    // Remove both classes first
    root.classList.remove('light', 'dark')

    // Determine the actual theme to apply
    let actualTheme: 'light' | 'dark'

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      actualTheme = systemTheme
    } else {
      actualTheme = theme
    }

    // Apply the theme
    root.classList.add(actualTheme)
    applyTheme(actualTheme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = () => {
        const root = window.document.documentElement
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'

        root.classList.remove('light', 'dark')
        root.classList.add(systemTheme)
        applyTheme(systemTheme)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      // Save to localStorage for persistence
      localStorage.setItem(storageKey, newTheme)
    },
    resolvedTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
