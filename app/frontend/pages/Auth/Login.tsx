import { useState, useEffect } from 'react'
import { router, Link } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import authService from '@/lib/auth'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface LoginProps {
  return_to?: string
}

type LoginFormData = {
  email: string
  password: string
}

const translations = {
  en: {
    welcomeBack: 'Welcome Back',
    signInDescription: 'Sign in to your account to continue',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: '••••••••',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account? ",
    registerHere: 'Register here',
    loginFailed: 'Login failed',
    loginError: 'An error occurred during login',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 6 characters'
  },
  ru: {
    welcomeBack: 'С возвращением',
    signInDescription: 'Войдите в свой аккаунт, чтобы продолжить',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Пароль',
    passwordPlaceholder: '••••••••',
    signIn: 'Войти',
    signingIn: 'Вход...',
    forgotPassword: 'Забыли пароль?',
    noAccount: 'Нет аккаунта? ',
    registerHere: 'Зарегистрируйтесь здесь',
    loginFailed: 'Ошибка входа',
    loginError: 'Произошла ошибка при входе',
    emailRequired: 'Email обязателен',
    emailInvalid: 'Введите корректный email',
    passwordRequired: 'Пароль обязателен',
    passwordMin: 'Пароль должен содержать минимум 6 символов'
  }
}

export default function Login({ return_to }: LoginProps) {
  const [error, setError] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [language, setLanguage] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setLanguage(lang)
    }
  }, [])

  const t = translations[language]

  const loginSchema = z.object({
    email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
    password: z.string().min(6, t.passwordMin),
  })

  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Check if user is already authenticated with existing token
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = authService.getToken()
      const refreshToken = authService.getRefreshToken()

      // No token at all - show login form immediately
      if (!token) {
        setIsCheckingAuth(false)
        return
      }

      // Token expired but refresh token exists - try to refresh
      if (authService.isTokenExpired() && refreshToken) {
        const refreshed = await authService.refreshJwtToken()

        if (refreshed) {
          // Refresh succeeded, redirect to intended destination
          const user = authService.getUser()
          const isAdmin = user?.admin || false
          const defaultUrl = isAdmin ? '/admin/console' : '/learning/dashboard'
          const redirectUrl = return_to || defaultUrl
          router.visit(redirectUrl, {
            replace: true,
            onError: () => {
              // If the visit fails (e.g., 401), clear the invalid token
              authService.clearTokens()
              setIsCheckingAuth(false)
            },
          })
          return
        } else {
          // Refresh failed, clear tokens and show login form
          authService.clearTokens()
          setIsCheckingAuth(false)
          return
        }
      }

      // Token exists and is not expired - redirect immediately
      if (!authService.isTokenExpired()) {
        const user = authService.getUser()
        const isAdmin = user?.admin || false
        const defaultUrl = isAdmin ? '/admin/console' : '/learning/dashboard'
        const redirectUrl = return_to || defaultUrl
        router.visit(redirectUrl, {
          replace: true,
          onError: () => {
            authService.clearTokens()
            setIsCheckingAuth(false)
          },
        })
      } else {
        // Token expired and no refresh token - show login form
        authService.clearTokens()
        setIsCheckingAuth(false)
      }
    }

    checkExistingAuth()
  }, [return_to])

  const onSubmit = async (formData: LoginFormData) => {
    setError('')

    try {
      const response = await fetch('/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        authService.handleLoginResponse(data)
        // Redirect based on user role
        const isAdmin = data.user?.admin || false
        const defaultUrl = isAdmin ? '/admin/console' : '/learning/dashboard'
        const redirectUrl = return_to || defaultUrl
        router.visit(redirectUrl, { replace: true })
      } else {
        setError(data.error || t.loginFailed)
      }
    } catch (err) {
      setError(t.loginError)
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.welcomeBack}</CardTitle>
          <CardDescription>{t.signInDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                {...register('email')}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">{formErrors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
type="password"
                placeholder={t.passwordPlaceholder}
                {...register('password')}
              />
              {formErrors.password && (
                <p className="text-sm text-destructive">{formErrors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t.signingIn : t.signIn}
            </Button>

            <div className="text-center text-sm space-y-2">
              <div>
                <Link href="/password/forgot" className="text-muted-foreground hover:text-primary">
                  {t.forgotPassword}
                </Link>
              </div>
              <div>
                <span className="text-muted-foreground">{t.noAccount}</span>
                <Link href="/register" className="text-primary hover:underline">
                  {t.registerHere}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
