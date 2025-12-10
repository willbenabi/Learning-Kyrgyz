import { useState } from 'react'
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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').optional().or(z.literal('')),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string().min(8, 'Password confirmation is required'),
  interface_language: z.enum(['en', 'ru']).default('en'),
  country: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
})

type RegisterFormData = z.infer<typeof registerSchema>

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
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  const { register, handleSubmit, formState: { errors: formErrors, isSubmitting }, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      interface_language: 'en',
    },
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
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred during registration')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Start your Kyrgyz language learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                data-testid="register-name-input"
                {...register('name')}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                data-testid="register-email-input"
                {...register('email')}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">{formErrors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username (Optional)</Label>
              <Input
                id="username"
                type="text"
                placeholder="unique_username"
                data-testid="register-username-input"
                {...register('username')}
              />
              {formErrors.username && (
                <p className="text-sm text-destructive">{formErrors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                data-testid="register-password-input"
                {...register('password')}
              />
              {formErrors.password && (
                <p className="text-sm text-destructive">{formErrors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="Repeat your password"
                data-testid="register-password-confirmation-input"
                {...register('password_confirmation')}
              />
              {formErrors.password_confirmation && (
                <p className="text-sm text-destructive">{formErrors.password_confirmation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interface_language">Interface Language</Label>
              <Select
                value={selectedLanguage}
                onValueChange={(value) => {
                  setSelectedLanguage(value)
                  setValue('interface_language', value as 'en' | 'ru')
                }}
              >
                <SelectTrigger id="interface_language" data-testid="register-language-select">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country (Optional)</Label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value)
                  setValue('country', value)
                }}
              >
                <SelectTrigger id="country" data-testid="register-country-select">
                  <SelectValue placeholder="Select your country" />
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
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
