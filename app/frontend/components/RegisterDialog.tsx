import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import authService from '@/lib/auth'

interface RegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
}

type RegisterFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
  country?: string
}

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

export function RegisterDialog({ open, onOpenChange, onSwitchToLogin }: RegisterDialogProps) {
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

  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting }, setValue, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      reset()
      setError('')
      setSelectedCountry('')
    }
  }, [open, reset])

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
        authService.handleLoginResponse(data)
        onOpenChange(false)
        // Redirect to language selection
        router.visit('/onboarding/language', { replace: true })
      } else {
        setError(data.error || t.registrationFailed)
      }
    } catch (err) {
      setError(t.registrationError)
    }
  }

  const handleSwitchToLogin = () => {
    onOpenChange(false)
    if (onSwitchToLogin) {
      onSwitchToLogin()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">{t.createAccount}</DialogTitle>
          <DialogDescription className="text-center">
            {t.startJourney}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">{t.confirmPassword}</Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder={t.confirmPasswordPlaceholder}
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
              <SelectTrigger id="country">
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

          <Button type="submit" className="w-full bg-[#58CC02] hover:bg-[#4FB300]" disabled={isSubmitting}>
            {isSubmitting ? t.creatingAccount : t.createAccountButton}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t.alreadyHaveAccount}</span>
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="text-primary hover:underline"
            >
              {t.signIn}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
