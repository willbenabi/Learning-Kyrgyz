import { useState, useEffect } from 'react'
import { router, Link } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import authService from '@/lib/auth'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const translations = {
  en: {
    createAccount: 'Create Your Account',
    startJourney: 'Start your Kyrgyz language learning journey',
    name: 'Name',
    namePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'At least 8 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Repeat your password',
    country: 'Country (Optional)',
    countryPlaceholder: 'Select your country',
    createAccountButton: 'Create Account',
    creatingAccount: 'Creating account...',
    alreadyHaveAccount: 'Already have an account? ',
    signIn: 'Sign in',
    registrationFailed: 'Registration failed',
    registrationError: 'An error occurred during registration',
    nameMin: 'Name must be at least 2 characters',
    emailInvalid: 'Please enter a valid email address',
    passwordMin: 'Password must be at least 8 characters',
    passwordConfirmationRequired: 'Password confirmation is required',
    passwordsDontMatch: "Passwords don't match"
  },
  ru: {
    createAccount: 'Создайте аккаунт',
    startJourney: 'Начните свое путешествие в мир кыргызского языка',
    name: 'Имя',
    namePlaceholder: 'Ваше полное имя',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Минимум 8 символов',
    confirmPassword: 'Подтвердите пароль',
    confirmPasswordPlaceholder: 'Повторите пароль',
    country: 'Страна (Необязательно)',
    countryPlaceholder: 'Выберите страну',
    createAccountButton: 'Создать аккаунт',
    creatingAccount: 'Создание аккаунта...',
    alreadyHaveAccount: 'Уже есть аккаунт? ',
    signIn: 'Войти',
    registrationFailed: 'Ошибка регистрации',
    registrationError: 'Произошла ошибка при регистрации',
    nameMin: 'Имя должно содержать минимум 2 символа',
    emailInvalid: 'Введите корректный email',
    passwordMin: 'Пароль должен содержать минимум 8 символов',
    passwordConfirmationRequired: 'Требуется подтверждение пароля',
    passwordsDontMatch: 'Пароли не совпадают'
  }
}

type RegisterFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
  country?: string
}

const COUNTRIES = [
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'RU', label: 'Russia' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'TR', label: 'Turkey' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'CN', label: 'China' },
  { value: 'OTHER', label: 'Other' },
]

export default function Register() {
  const [error, setError] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [language, setLanguage] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setLanguage(lang)
    }
  }, [])

  const t = translations[language]

  const registerSchema = z.object({
    name: z.string().min(2, t.nameMin),
    email: z.string().email(t.emailInvalid),
    password: z.string().min(8, t.passwordMin),
    password_confirmation: z.string().min(8, t.passwordConfirmationRequired),
    country: z.string().optional(),
  }).refine((data) => data.password === data.password_confirmation, {
    message: t.passwordsDontMatch,
    path: ['password_confirmation'],
  })

  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting }, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (formData: RegisterFormData) => {
    setError('')

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens and user info
        authService.handleLoginResponse(data)
        // Redirect to language selection
        router.visit('/onboarding/language', { replace: true })
      } else {
        setError(data.error || t.registrationFailed)
      }
    } catch (err) {
      setError(t.registrationError)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.createAccount}</CardTitle>
          <CardDescription>{t.startJourney}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t.namePlaceholder}
                data-testid="register-name-input"
                {...register('name')}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                data-testid="register-email-input"
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
                data-testid="register-password-input"
                {...register('password')}
              />
              {formErrors.password && (
                <p className="text-sm text-destructive">{formErrors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">{t.confirmPassword}</Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder={t.confirmPasswordPlaceholder}
                data-testid="register-password-confirmation-input"
                {...register('password_confirmation')}
              />
              {formErrors.password_confirmation && (
                <p className="text-sm text-destructive">{formErrors.password_confirmation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">{t.country}</Label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value)
                  setValue('country', value)
                }}
              >
                <SelectTrigger id="country" data-testid="register-country-select">
                  <SelectValue placeholder={t.countryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              data-testid="register-submit-button"
            >
              {isSubmitting ? t.creatingAccount : t.createAccountButton}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.alreadyHaveAccount}</span>
              <Link href="/login" className="text-primary hover:underline">
                {t.signIn}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
