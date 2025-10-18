import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { useTheme } from './theme-provider'

interface PageProps {
  preferences?: {
    theme?: 'light' | 'dark' | 'system'
  }
}

export function InertiaThemeSync({ children }: { children: React.ReactNode }) {
  const { props } = usePage<PageProps>()
  const { setTheme } = useTheme()

  useEffect(() => {
    // Sync theme from server preferences whenever page props change
    if (props.preferences?.theme) {
      setTheme(props.preferences.theme)
    }
  }, [props.preferences?.theme, setTheme])

  return <>{children}</>
}
