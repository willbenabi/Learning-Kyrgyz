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
 *    - Can be added back if needed
 *
 * 4. Eager loading with import.meta.glob (OPTIONAL)
 *    - Loads all pages at build time for better initial performance
 *    - Alternative: Remove { eager: true } for code splitting and lazy loading
 */

import { createRoot } from 'react-dom/client'
import { createInertiaApp, router } from '@inertiajs/react'
import { AppLayout } from '@/layouts/app-layout'
import authService from '@/lib/auth'

// Import CSS
import './application.css'

// Global error handler for module-level errors (missing npm packages, syntax errors)
// These errors happen BEFORE React mounts, so React error boundaries can't catch them
function showGlobalError(error: Error | string, source?: string) {
  const appElement = document.getElementById('app')
  if (!appElement) return

  const errorMessage = typeof error === 'string' ? error : error.message
  const errorStack = typeof error === 'object' && error.stack ? error.stack : ''
  const isDev = import.meta.env?.DEV ?? true

  appElement.innerHTML = `
    <div style="min-height: 100vh; background: #f9fafb; display: flex; align-items: center; justify-content: center; padding: 1rem; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 56rem; width: 100%;">
        <div style="background: #fef2f2; border: 1px solid #fecaca; ${isDev && errorStack ? 'border-radius: 0.5rem 0.5rem 0 0;' : 'border-radius: 0.5rem;'} padding: 1.5rem;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;">
            <div style="display: flex; align-items: flex-start; gap: 1rem; min-width: 0;">
              <svg style="width: 2rem; height: 2rem; color: #ef4444; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div style="min-width: 0;">
                <h1 style="font-size: 1.25rem; font-weight: 600; color: #991b1b; margin: 0;">Application Error</h1>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #b91c1c; word-break: break-word;">${escapeHtml(errorMessage)}</p>
              </div>
            </div>
            <button onclick="window.location.reload()" style="display: inline-flex; align-items: center; padding: 0.375rem 0.75rem; font-size: 0.875rem; font-weight: 500; color: white; background: #2563eb; border: none; border-radius: 0.375rem; cursor: pointer; flex-shrink: 0;">
              Reload
            </button>
          </div>
        </div>
        ${isDev && errorStack ? `
        <div style="background: white; border: 1px solid #fecaca; border-top: none; border-radius: 0 0 0.5rem 0.5rem; padding: 1.5rem;">
          <h2 style="font-size: 0.875rem; font-weight: 500; color: #6b7280; margin: 0 0 0.5rem 0;">Stack Trace</h2>
          <pre style="background: #f3f4f6; border-radius: 0.375rem; padding: 1rem; overflow-x: auto; font-size: 0.75rem; font-family: monospace; color: #1f2937; white-space: pre-wrap; word-break: break-word; max-height: 16rem; overflow-y: auto; margin: 0;">${escapeHtml(errorStack)}</pre>
          ${source ? `<p style="margin: 1rem 0 0 0; font-size: 0.75rem; color: #6b7280;">Source: ${escapeHtml(source)}</p>` : ''}
        </div>
        ` : ''}
      </div>
    </div>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Track whether React has mounted - only show full-page errors before mount
let reactMounted = false

// Catch unhandled errors (module loading, async errors, etc.)
window.addEventListener('error', (event) => {
  // Only handle if it's a script error (not resource loading error)
  // AND only before React mounts
  if (event.error && !reactMounted) {
    console.error('Global error caught:', event.error)
    showGlobalError(event.error, event.filename)
  }
})

// Catch unhandled promise rejections (only before React mounts)
window.addEventListener('unhandledrejection', (event) => {
  if (!reactMounted) {
    console.error('Unhandled promise rejection:', event.reason)
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    showGlobalError(error, 'Promise rejection')
  }
})

const appElement = document.getElementById('app')

if (appElement) {
  // Check and migrate localStorage tokens if needed
  // This helps when we rename fields in the user model (e.g., super_admin -> owner)
  const authVersion = localStorage.getItem('auth_version')
  const currentVersion = '3.0' // Increment this when user model structure changes

  if (authVersion !== currentVersion) {
    // Clear old tokens when version mismatch
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.setItem('auth_version', currentVersion)
    console.log('Auth tokens cleared due to version update')
  }

  // Track if we're currently refreshing to prevent infinite loops
  let isRefreshing = false

  // Configure Inertia to include JWT token in all requests
  // and refresh token if expired/expiring soon
  router.on('before', (event) => {
    const token = localStorage.getItem('auth_token')

    // Check if token is expired or will expire soon (within 5 minutes)
    if (token && !isRefreshing && (authService.isTokenExpired() || authService.willExpireSoon())) {
      // Prevent the current request
      event.preventDefault()
      isRefreshing = true

      // Try to refresh the token asynchronously
      authService.refreshJwtToken().then((refreshed) => {
        isRefreshing = false

        if (refreshed) {
          // Token refreshed successfully, retry the original request
          const newToken = localStorage.getItem('auth_token')
          const visitOptions = event.detail.visit

          router.visit(visitOptions.url.pathname + visitOptions.url.search, {
            method: visitOptions.method,
            data: visitOptions.data,
            headers: {
              ...visitOptions.headers,
              'Authorization': `Bearer ${newToken}`,
            },
            replace: visitOptions.replace,
            preserveScroll: visitOptions.preserveScroll,
            preserveState: visitOptions.preserveState,
            only: visitOptions.only,
            except: visitOptions.except,
          })
        } else {
          // Refresh failed, redirect to login
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')

          const currentPath = window.location.pathname
          const returnTo = currentPath !== '/login' ? currentPath : null

          router.visit('/login' + (returnTo ? `?return_to=${encodeURIComponent(returnTo)}` : ''), {
            replace: true,
          })
        }
      })

      return
    }

    if (token) {
      // Add Authorization header to all Inertia requests
      event.detail.visit.headers = {
        ...event.detail.visit.headers,
        'Authorization': `Bearer ${token}`,
      }
    }
  })

  // Handle authentication and authorization errors
  // Use 'invalid' event for non-Inertia responses (401, 403, etc.)
  router.on('invalid', (event) => {
    const response = event.detail.response

    // 401 Unauthorized - JWT expired/invalid
    if (response && response.status === 401) {
      // Clear invalid tokens
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')

      // Redirect to login page (preserving return_to URL)
      const currentPath = window.location.pathname
      const returnTo = currentPath !== '/login' ? currentPath : null

      router.visit('/login' + (returnTo ? `?return_to=${encodeURIComponent(returnTo)}` : ''), {
        replace: true, // Replace history entry instead of pushing
      })

      // Prevent default error handling
      event.preventDefault()
    }

    // 403 Forbidden - Insufficient permissions
    if (response && response.status === 403) {
      // Redirect to dashboard with error message
      router.visit('/', {
        replace: true,
        onFinish: () => {
          // Error message will be shown by error handler in the component
          console.error('Access forbidden: You do not have permission to access this resource')
        }
      })

      // Prevent default error handling
      event.preventDefault()
    }
  })

  // Handle cross-tab logout - redirect to login when logged out in another tab
  window.addEventListener('auth:logout', (event: Event) => {
    const customEvent = event as CustomEvent
    if (customEvent.detail?.crossTab) {
      console.log('Detected logout in another tab, redirecting to login')
      router.visit('/login', { replace: true })
    }
  })

  // Handle cross-tab login - optionally reload current page to get fresh data
  window.addEventListener('auth:login', (event: Event) => {
    const customEvent = event as CustomEvent
    if (customEvent.detail?.crossTab) {
      console.log('Detected login in another tab')
      // Optionally reload the current page to get fresh data
      // router.reload()
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
      // Load all .tsx files EXCEPT test files using negative glob patterns
      // CRITICAL: Must exclude test files at glob level, not after import,
      // otherwise Vitest mocks get bundled causing runtime errors
      const pages = import.meta.glob<{ default: any }>([
        '../pages/**/*.tsx',
        '!../pages/**/*.test.tsx',
        '!../pages/**/*.spec.tsx',
      ], { eager: true })

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
      createRoot(el).render(
        <App {...props} />
      )
      // Mark React as mounted
      reactMounted = true
    },

    // Progress bar at top of page
    progress: {
      color: '#3b82f6',
      showSpinner: false,
    },
  })
}
