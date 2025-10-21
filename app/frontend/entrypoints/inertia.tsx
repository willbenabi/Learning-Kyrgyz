/**
 * Inertia.js Application Entry Point
 *
 * KEY ARCHITECTURAL DECISIONS:
 *
 * 1. NO InertiaThemeSync component wrapper (CRITICAL)
 *    - usePage() subscribes to ALL prop changes, causing full re-renders on every request
 *    - This was THE ROOT CAUSE of input focus loss during typing
 *    - Solution: Theme/preferences initialized once in setup() instead
 *
 * 2. Using 'only' parameter in filter requests (REQUIRED)
 *    - Pages that update via filters (search, pagination) MUST use:
 *      router.get(url, params, { only: ['data', 'pagination', 'filters'] })
 *    - This prevents shared props (auth, preferences, flash) from updating
 *    - Maintains input focus during typing by avoiding unnecessary re-renders
 *
 * 3. NO React.StrictMode wrapper (OPTIONAL)
 *    - Removed for consistency with temp-starter-base (working reference)
 *    - Note: StrictMode only double-renders in development, not production
 *    - Can be added back if needed - InertiaThemeSync was the real culprit
 *
 * 4. Eager loading with import.meta.glob (OPTIONAL)
 *    - Loads all pages at build time for better initial performance
 *    - Alternative: Remove { eager: true } for code splitting and lazy loading
 */

import { createRoot } from 'react-dom/client'
import { createInertiaApp, router } from '@inertiajs/react'
import { AppLayout } from '@/layouts/app-layout'

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
    // Resolve page components with eager loading
    // NOTE: We don't wrap components with InertiaThemeSync here because it uses usePage()
    // which causes re-renders on every Inertia request, breaking input focus.
    // Theme/preferences are initialized once in setup() instead.
    resolve: (name) => {
      const pages = import.meta.glob<{ default: any }>('../pages/**/*.tsx', { eager: true })
      const page = pages[`../pages/${name}.tsx`]

      if (!page) {
        throw new Error(`Page not found: ${name}`)
      }

      // Set default layout for all pages (Inertia best practice)
      // This allows using usePage() hook for flash messages
      page.default.layout = page.default.layout || ((page: React.ReactNode) => (
        <AppLayout>{page}</AppLayout>
      ))

      return page
    },

    // Setup the app
    setup({ el, App, props }) {
      // Set sidebar variant on body (for background styling)
      const preferences = props.initialPage.props.preferences as { theme?: string; sidebar_variant?: string } | undefined
      if (preferences?.sidebar_variant === 'inset') {
        document.body.setAttribute('data-sidebar-bg', 'true')
      }

      createRoot(el).render(<App {...props} />)
    },

    // Progress bar at top of page
    progress: {
      color: '#3b82f6',
      showSpinner: false,
    },
  })
}
