import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react'

export default function LevelChoice() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const storedLanguage = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  const translations = {
    en: {
      title: 'Choose Your Learning Path',
      subtitle: 'How would you like to start your Kyrgyz language journey?',
      option1Title: 'I Know My Level',
      option1Desc: 'Choose your current proficiency level',
      option1Detail: 'Select from A1 to C1 if you already know your level',
      option2Title: 'Take Placement Test',
      option2Desc: 'Let us determine your level',
      option2Detail: '40 questions, 15-20 minutes for accurate assessment',
      option2Warning: 'The test is comprehensive to accurately measure your level',
      option3Title: 'Start from Scratch',
      option3Desc: 'Begin at A1 level',
      option3Detail: 'Perfect for complete beginners with no prior knowledge',
      option3Badge: 'Recommended for beginners',
      continue: 'Continue',
      back: 'Back'
    },
    ru: {
      title: 'Выберите свой путь обучения',
      subtitle: 'Как вы хотите начать изучение кыргызского языка?',
      option1Title: 'Я знаю свой уровень',
      option1Desc: 'Выберите текущий уровень владения',
      option1Detail: 'Выберите от A1 до C1, если уже знаете свой уровень',
      option2Title: 'Пройти тест',
      option2Desc: 'Позвольте нам определить ваш уровень',
      option2Detail: '40 вопросов, 15-20 минут для точной оценки',
      option2Warning: 'Тест длинный для точного измерения уровня',
      option3Title: 'Начать с нуля',
      option3Desc: 'Начать с уровня A1',
      option3Detail: 'Идеально для новичков без предварительных знаний',
      option3Badge: 'Рекомендуется для начинающих',
      continue: 'Продолжить',
      back: 'Назад'
    }
  }

  const t = translations[language]

  const options = [
    {
      icon: GraduationCap,
      title: t.option1Title,
      description: t.option1Desc,
      detail: t.option1Detail,
      color: 'from-blue-500 to-blue-600',
      action: () => router.visit('/onboarding/manual-level-select'),
      badge: null
    },
    {
      icon: ClipboardCheck,
      title: t.option2Title,
      description: t.option2Desc,
      detail: t.option2Detail,
      color: 'from-purple-500 to-purple-600',
      action: () => router.visit('/onboarding/placement-test'),
      warning: t.option2Warning
    },
    {
      icon: Sparkles,
      title: t.option3Title,
      description: t.option3Desc,
      detail: t.option3Detail,
      color: 'from-green-500 to-green-600',
      action: () => {
        // Store A1 level in localStorage
        localStorage.setItem('user_level', 'A1')

        // Save A1 level choice and go to dashboard
        fetch('/onboarding/set-level', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
          },
          body: JSON.stringify({ level: 'A1', source: 'beginner' })
        }).then(() => {
          router.visit('/learning/dashboard')
        })
      },
      badge: t.option3Badge
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <Card
                key={index}
                className="relative hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
                onClick={option.action}
              >
                {option.badge && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    {option.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-center">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center mb-4">{option.detail}</p>
                  {option.warning && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{option.warning}</p>
                    </div>
                  )}
                  <Button className="w-full group-hover:bg-primary" variant="outline">
                    {t.continue}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.visit('/onboarding/language')}
          >
            ← {t.back}
          </Button>
        </div>
      </div>
    </div>
  )
}
