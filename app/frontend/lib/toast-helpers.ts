/**
 * Toast Notification Helpers
 *
 * Utility functions for showing toast notifications in the app.
 * Uses Sonner with custom styling matching Shadcn Studio Premium design.
 */

import { toast } from 'sonner'

/**
 * Show a success toast (soft green styling)
 */
export function showSuccess(message: string) {
  toast.success(message, {
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    } as React.CSSProperties
  })
}

/**
 * Show an error toast (soft red styling)
 */
export function showError(message: string) {
  toast.error(message, {
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
      '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
    } as React.CSSProperties
  })
}

/**
 * Show an info toast (default styling)
 */
export function showInfo(message: string) {
  toast.info(message)
}

/**
 * Show a warning toast (soft amber styling)
 */
export function showWarning(message: string) {
  toast.warning(message, {
    style: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
    } as React.CSSProperties
  })
}

/**
 * Show a loading toast (returns ID to dismiss later)
 */
export function showLoading(message: string = 'Loading...') {
  return toast.loading(message)
}

/**
 * Dismiss a specific toast by ID
 */
export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId)
}

/**
 * Example usage in a component:
 *
 * import { showSuccess, showError } from '@/lib/toast-helpers'
 *
 * const handleSubmit = async () => {
 *   try {
 *     await someAction()
 *     showSuccess('Item saved successfully!')
 *   } catch (error) {
 *     showError('Failed to save item')
 *   }
 * }
 */
