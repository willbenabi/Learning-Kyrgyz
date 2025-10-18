import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp, router } from '@inertiajs/react'
import { ThemeProvider } from '@/components/theme-provider'
import { InertiaThemeSync } from '@/components/inertia-theme-sync'

// Import CSS
import './application.css'

const appElement = document.getElementById('app')

if (appElement) {
  // Configure Inertia to include JWT token in all requests
  router.on('before', (event) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Add Authorization header to all Inertia requests
      event.detail.visit.headers = {
        ...event.detail.visit.headers,
        'Authorization': `Bearer ${token}`,
      }
    }
  })

  // Add global loading indicator
  let loadingTimeout: NodeJS.Timeout | null = null

  router.on('start', () => {
    // Show loading indicator after 250ms (prevents flash for fast requests)
    loadingTimeout = setTimeout(() => {
      document.body.classList.add('inertia-loading')
    }, 250)
  })

  router.on('finish', () => {
    // Clear timeout and hide loading indicator
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      loadingTimeout = null
    }
    document.body.classList.remove('inertia-loading')
  })

  createInertiaApp({
    // Resolve page components with lazy loading (code splitting)
    resolve: async (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx')
      const importPage = pages[`../pages/${name}.tsx`]

      if (!importPage) {
        throw new Error(`Page not found: ${name}`)
      }

      const page = await importPage()
      const PageComponent = (page as { default: any }).default

      // Wrap page component with theme sync
      return {
        default: (props: any) => (
          <InertiaThemeSync>
            <PageComponent {...props} />
          </InertiaThemeSync>
        )
      }
    },

    // Setup the app
    setup({ el, App, props }) {
      // Get initial theme from props (preferences)
      const initialTheme = props.initialPage.props.preferences?.theme || 'system'

      createRoot(el).render(
        <React.StrictMode>
          <ThemeProvider defaultTheme={initialTheme as 'light' | 'dark' | 'system'}>
            <App {...props} />
          </ThemeProvider>
        </React.StrictMode>
      )
    },

    // Progress bar at top of page
    progress: {
      color: '#3b82f6',
      showSpinner: true,
    },
  })
}
