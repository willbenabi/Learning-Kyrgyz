import { useState, useEffect } from 'react'
import { router, Link } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import authService from '@/lib/auth'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  returnTo?: string
  onSwitchToRegister?: () => void
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

export function LoginDialog({ open, onOpenChange, returnTo, onSwitchToRegister }: LoginDialogProps) {
  const [error, setError] = useState('')
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

  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting }, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      reset()
      setError('')
    }
  }, [open, reset])

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
        onOpenChange(false)
        // Redirect based on user role
        const isAdmin = data.user?.admin || false
        const defaultUrl = isAdmin ? '/admin/console' : '/learning/dashboard'
        const redirectUrl = returnTo || defaultUrl
        router.visit(redirectUrl, { replace: true })
      } else {
        setError(data.error || t.loginFailed)
      }
    } catch (err) {
      setError(t.loginError)
}
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">{t.welcomeBack}</DialogTitle>
          <DialogDescription className="text-center">
            {t.signInDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

          <Button type="submit" className="w-full bg-[#1CB0F6] hover:bg-[#0E9ED9]" disabled={isSubmitting}>
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
              {onSwitchToRegister ? (
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false)
                    onSwitchToRegister()
                  }}
                  className="text-primary hover:underline"
                >
                  {t.registerHere}
                </button>
              ) : (
                <Link href="/register" className="text-primary hover:underline">
                  {t.registerHere}
                </Link>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
