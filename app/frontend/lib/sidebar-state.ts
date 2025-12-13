const SIDEBAR_STORAGE_KEY = 'sidebar_state'
const EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000 // 1 week

interface SidebarStorageValue {
  open: boolean
  expiresAt: number
}

/**
 * Read the sidebar state from localStorage
 * Returns true (expanded) by default if not set or expired
 */
export function getSidebarState(): boolean {
  if (typeof window === 'undefined') return true

  const raw = localStorage.getItem(SIDEBAR_STORAGE_KEY)

  if (raw === null) return true

  const data: SidebarStorageValue = JSON.parse(raw)

  if (Date.now() > data.expiresAt) {
    localStorage.removeItem(SIDEBAR_STORAGE_KEY)
    return true
  }

  return data.open
}

/**
 * Save the sidebar state to localStorage with 1 week expiration
 */
export function setSidebarState(open: boolean): void {
  if (typeof window === 'undefined') return

  const data: SidebarStorageValue = {
    open,
    expiresAt: Date.now() + EXPIRATION_MS,
  }

  localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(data))
}
