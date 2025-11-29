import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardCheck, Rocket, ArrowRight } from 'lucide-react'

export default function LevelAssessmentChoice() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'How Would You Like to Start?',
      description: 'Choose the best option for your learning journey',
      takeTest: 'Take Level Test',
      takeTestDesc: 'Complete a placement test to determine your current Kyrgyz level (15-20 minutes)',
      takeTestButton: 'Start Test',
      startFresh: 'Start from Scratch',
      startFreshDesc: 'Begin learning Kyrgyz from the very beginning (Level A1) with no prior knowledge',
      startFreshButton: 'Start Learning',
      recommended: 'Recommended',
      forBeginners: 'For complete beginners'
    },
    ru: {
      title: 'Как Вы Хотите Начать?',
      description: 'Выберите лучший вариант для вашего обучения',
      takeTest: 'Пройти Тест',
      takeTestDesc: 'Пройдите тест на определение вашего текущего уровня кыргызского языка (15-20 минут)',
      takeTestButton: 'Начать Тест',
      startFresh: 'Начать с Нуля',
      startFreshDesc: 'Начните изучение кыргызского языка с самого начала (уровень A1) без предварительных знаний',
      startFreshButton: 'Начать Обучение',
      recommended: 'Рекомендуется',
      forBeginners: 'Для начинающих'
    }
  }

  const t = translations[language]

  const handleChoice = async (choice: 'test' | 'beginner') => {
    setIsSubmitting(true)

    try {
      if (choice === 'test') {
        // Redirect to placement test
        router.visit('/onboarding/placement-test', { replace: true })
      } else {
        // Set level to A1 and skip test
        localStorage.setItem('test_results', JSON.stringify({
          level: 'A1',
          score: 0,
          total: 0,
          skipped: true,
          timestamp: new Date().toISOString()
        }))

        // Redirect to diagnostics (or directly to dashboard)
        router.visit('/onboarding/diagnostics', { replace: true })
      }
    } catch (err) {
      console.error('Failed to process choice:', err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl md:text-4xl">{t.title}</CardTitle>
          <CardDescription className="text-base md:text-lg">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Take Test Option */}
            <Card className="border-2 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-10 h-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{t.takeTest}</CardTitle>
                <CardDescription className="text-base">
                  {t.takeTestDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleChoice('test')}
                  disabled={isSubmitting}
                  data-testid="take-test-button"
                >
                  {t.takeTestButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Start from Scratch Option */}
            <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-green-50 to-white relative">
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t.forBeginners}
                </span>
              </div>
              <CardHeader className="text-center space-y-4 pt-12">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.startFresh}</CardTitle>
                <CardDescription className="text-base">
                  {t.startFreshDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={() => handleChoice('beginner')}
                  disabled={isSubmitting}
                  data-testid="start-beginner-button"
                >
                  {t.startFreshButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            <p className="italic">
              {language === 'en'
                ? 'You can always retake the placement test later from your profile settings.'
                : 'Вы всегда можете пройти тест позже в настройках профиля.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
