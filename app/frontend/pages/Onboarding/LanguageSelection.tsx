import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export default function LanguageSelection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLanguageSelect = async (language: 'en' | 'ru') => {
    setIsSubmitting(true)

    try {
      // Store language preference
      const response = await fetch('/onboarding/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ language }),
      })

      if (response.ok) {
        // Store in localStorage for mock implementation
        localStorage.setItem('interface_language', language)

        // Redirect to level assessment choice
        router.visit('/onboarding/level-choice', { replace: true })
      }
    } catch (err) {
      console.error('Failed to set language:', err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Languages className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">Choose Your Interface Language</CardTitle>
          <CardDescription className="text-base">
            Select the language for app navigation and instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-32 text-xl font-semibold flex flex-col items-center justify-center gap-4 hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => handleLanguageSelect('ru')}
              disabled={isSubmitting}
              data-testid="language-russian-button"
            >
              <span className="text-4xl">🇷🇺</span>
              <span>Русский</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 text-xl font-semibold flex flex-col items-center justify-center gap-4 hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => handleLanguageSelect('en')}
              disabled={isSubmitting}
              data-testid="language-english-button"
            >
              <span className="text-4xl">🇬🇧</span>
              <span>English</span>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>This setting affects menus, instructions, and explanations.</p>
            <p>Kyrgyz learning content will always be in Kyrgyz.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
