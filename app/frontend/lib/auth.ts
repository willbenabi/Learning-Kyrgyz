/**
 * JWT Authentication Service for Inertia.js
 * Manages JWT tokens on the client side with automatic refresh
 */

interface JWTPayload {
  user_id: number
  exp: number
  iat: number
}

interface LoginResponse {
  jwt_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    name: string
    role: string
    super_admin: boolean
  }
}

class AuthService {
  private token: string | null = null
  private refreshToken: string | null = null

  constructor() {
    this.token = this.getToken()
    this.refreshToken = this.getRefreshToken()

    // Start auto-refresh if authenticated
    if (this.isAuthenticated() && !this.isTokenExpired()) {
      this.startTokenRefresh()
    }
  }

  /**
   * Get the current JWT token from storage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * Get the refresh token from storage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }

  /**
   * Store JWT token and refresh token in browser storage
   */
  setTokens(token: string, refreshToken: string): void {
    this.token = token
    this.refreshToken = refreshToken
    localStorage.setItem('auth_token', token)
    localStorage.setItem('refresh_token', refreshToken)
  }

  /**
   * Remove tokens from storage (logout)
   */
  clearTokens(): void {
    this.token = null
    this.refreshToken = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    this.stopTokenRefresh()
  }

  /**
   * Check if user has a token
   */
  isAuthenticated(): boolean {
    return !!this.token
  }

  /**
   * Check if the JWT token is expired
   */
  isTokenExpired(): boolean {
    if (!this.token) return true

    try {
      const base64Payload = this.token.split('.')[1]
      const payload: JWTPayload = JSON.parse(atob(base64Payload))

      if (payload.exp) {
        return Date.now() >= payload.exp * 1000
      }

      return true
    } catch (error) {
      console.error('Error parsing JWT token:', error)
      return true
    }
  }

  /**
   * Get decoded payload from JWT token
   */
  getTokenPayload(): JWTPayload | null {
    if (!this.token) return null

    try {
      const base64Payload = this.token.split('.')[1]
      return JSON.parse(atob(base64Payload))
    } catch (error) {
      console.error('Error parsing JWT token:', error)
      return null
    }
  }

  /**
   * Get Authorization header for requests
   */
  authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {}

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  /**
   * Process login response and store tokens
   */
  handleLoginResponse(data: LoginResponse): boolean {
    if (data.jwt_token && data.refresh_token) {
      this.setTokens(data.jwt_token, data.refresh_token)
      this.startTokenRefresh()
      return true
    }
    return false
  }

  /**
   * Refresh the JWT token using refresh token
   */
  async refreshJwtToken(): Promise<boolean> {
    if (!this.refreshToken) return false

    try {
      const response = await fetch('/session/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      })

      if (response.ok) {
        const data: LoginResponse = await response.json()
        if (data.jwt_token && data.refresh_token) {
          this.setTokens(data.jwt_token, data.refresh_token)
          return true
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }

    return false
  }

  /**
   * Start automatic token refresh
   * Refreshes every 20 hours (24-hour expiration with 4-hour buffer)
   */
  private startTokenRefresh(): void {
    // Clear any existing interval
    if ((window as any).__authRefreshInterval) {
      clearInterval((window as any).__authRefreshInterval)
    }

    // Refresh every 20 hours
    (window as any).__authRefreshInterval = setInterval(() => {
      this.refreshJwtToken()
    }, 20 * 60 * 60 * 1000)
  }

  /**
   * Stop automatic token refresh
   */
  private stopTokenRefresh(): void {
    if ((window as any).__authRefreshInterval) {
      clearInterval((window as any).__authRefreshInterval)
      delete (window as any).__authRefreshInterval
    }
  }

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    try {
      await fetch('/session', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          ...this.authHeaders(),
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      this.clearTokens()
    }
  }
}

// Create singleton instance
const authService = new AuthService()

export default authService
