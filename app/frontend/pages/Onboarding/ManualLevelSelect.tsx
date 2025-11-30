import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export default function ManualLevelSelect() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en')
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  const translations = {
    en: {
      title: 'Select Your Level',
      subtitle: 'Choose the level that best describes your current Kyrgyz language proficiency',
      confirm: 'Confirm Selection',
      back: 'Back',
      levels: {
        A1: {
          title: 'A1 - Beginner',
          description: 'I don\'t know Kyrgyz at all',
          details: 'You can understand and use basic phrases, introduce yourself, and ask simple questions.'
        },
        A2: {
          title: 'A2 - Elementary',
          description: 'I know basic words and phrases',
          details: 'You can communicate in simple tasks requiring basic information exchange on familiar topics.'
        },
        B1: {
          title: 'B1 - Intermediate',
          description: 'I can have simple conversations',
          details: 'You can handle most situations in daily life and express opinions on familiar topics.'
        },
        B2: {
          title: 'B2 - Upper Intermediate',
          description: 'I communicate freely on everyday topics',
          details: 'You can interact with native speakers fluently and understand complex texts.'
        },
        C1: {
          title: 'C1 - Advanced',
          description: 'I have high-level language proficiency',
          details: 'You can express yourself fluently, understand complex texts, and use language effectively.'
        }
      }
    },
    ru: {
      title: 'Выберите свой уровень',
      subtitle: 'Выберите уровень, который лучше всего описывает ваше текущее владение кыргызским языком',
      confirm: 'Подтвердить выбор',
      back: 'Назад',
      levels: {
        A1: {
          title: 'A1 - Начинающий',
          description: 'Я совсем не знаю кыргызский язык',
          details: 'Вы понимаете и используете базовые фразы, можете представиться и задавать простые вопросы.'
        },
        A2: {
          title: 'A2 - Элементарный',
          description: 'Я знаю базовые слова и фразы',
          details: 'Вы можете общаться в простых задачах, требующих базового обмена информацией на знакомые темы.'
        },
        B1: {
          title: 'B1 - Средний',
          description: 'Я могу поддерживать простой разговор',
          details: 'Вы справляетесь с большинством ситуаций в повседневной жизни и можете выражать мнения.'
        },
        B2: {
          title: 'B2 - Выше среднего',
          description: 'Я свободно общаюсь на бытовые темы',
          details: 'Вы можете свободно общаться с носителями языка и понимать сложные тексты.'
        },
        C1: {
          title: 'C1 - Продвинутый',
          description: 'Я владею языком на высоком уровне',
          details: 'Вы можете свободно выражать свои мысли, понимать сложные тексты и эффективно использовать язык.'
        }
      }
    }
  }

  const t = translations[language]
  const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']

  const handleConfirm = () => {
    if (!selectedLevel) return

    // Save level choice and go to dashboard
    fetch('/onboarding/set-level', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({ level: selectedLevel, source: 'manual' })
    }).then(() => {
      router.visit('/learning/dashboard')
    })
  }

  const getColorClass = (level: Level) => {
    const colors = {
      A1: 'from-green-400 to-green-500',
      A2: 'from-blue-400 to-blue-500',
      B1: 'from-yellow-400 to-yellow-500',
      B2: 'from-orange-400 to-orange-500',
      C1: 'from-red-400 to-red-500'
    }
    return colors[level]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Level Cards */}
        <div className="space-y-4 mb-8">
          {levels.map((level) => (
            <Card
              key={level}
              className={`cursor-pointer transition-all duration-300 ${
                selectedLevel === level
                  ? 'border-primary border-2 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`bg-gradient-to-r ${getColorClass(level)} text-white text-lg px-4 py-1`}>
                        {level}
                      </Badge>
                      <CardTitle className="text-xl">{t.levels[level].title}</CardTitle>
                    </div>
                    <CardDescription className="text-base font-medium mb-2">
                      {t.levels[level].description}
                    </CardDescription>
                    <p className="text-sm text-gray-600">{t.levels[level].details}</p>
                  </div>
                  {selectedLevel === level && (
                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.visit('/onboarding/level-choice')}
          >
            ← {t.back}
          </Button>
          <Button
            size="lg"
            disabled={!selectedLevel}
            onClick={handleConfirm}
            className="min-w-[200px]"
          >
            {t.confirm}
          </Button>
        </div>
      </div>
    </div>
  )
}
