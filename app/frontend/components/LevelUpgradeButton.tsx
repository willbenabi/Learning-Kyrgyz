import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, CheckCircle2, XCircle, Award } from 'lucide-react'
import type { UpgradeEligibility } from '@/lib/levelUpgradeApi'

interface LevelUpgradeButtonProps {
  eligibility: UpgradeEligibility
  onUpgrade: () => void
  variant?: 'banner' | 'card'
  language?: 'en' | 'ru'
}

export default function LevelUpgradeButton({
  eligibility,
  onUpgrade,
  variant = 'card',
  language = 'en'
}: LevelUpgradeButtonProps) {
  const translations = {
    en: {
      congratulations: 'Congratulations! Level Complete!',
      readyToAdvance: "You've completed all {level} modules. Ready to advance to {nextLevel}?",
      upgradeButton: 'Upgrade to {level}',
      progressTitle: 'Level Progress',
      progressDesc: 'Complete all modules to unlock next level',
      grammar: 'Grammar',
      reading: 'Reading',
      writing: 'Writing',
      vocabulary: 'Vocabulary',
      keepLearning: 'Keep Learning',
      completedOf: '{completed}/{required}'
    },
    ru: {
      congratulations: 'Поздравляем! Уровень завершен!',
      readyToAdvance: 'Вы завершили все модули {level}. Готовы перейти на {nextLevel}?',
      upgradeButton: 'Перейти на {level}',
      progressTitle: 'Прогресс уровня',
      progressDesc: 'Завершите все модули чтобы разблокировать следующий уровень',
      grammar: 'Грамматика',
      reading: 'Чтение',
      writing: 'Письмо',
      vocabulary: 'Словарный запас',
      keepLearning: 'Продолжить обучение',
      completedOf: '{completed}/{required}'
    }
  }

  const t = translations[language]

  const moduleNames = {
    grammar: t.grammar,
    reading: t.reading,
    writing: t.writing,
    vocabulary: t.vocabulary
  }

  if (!eligibility.next_level) {
    return null // C1 level - no upgrade available
  }

  if (variant === 'banner' && eligibility.eligible) {
    return (
      <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 border-2 border-orange-200" data-testid="upgrade-banner">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900">{t.congratulations}</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {t.readyToAdvance
                    .replace('{level}', eligibility.current_level)
                    .replace('{nextLevel}', eligibility.next_level)}
                </p>
              </div>
            </div>
            <Button
              onClick={onUpgrade}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg"
              data-testid="upgrade-banner-button"
            >
              <Award className="w-5 h-5 mr-2" />
              {t.upgradeButton.replace('{level}', eligibility.next_level)}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'card') {
    return (
      <Card data-testid="upgrade-progress-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            {t.progressTitle}
          </CardTitle>
          <CardDescription>{t.progressDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {Object.entries(eligibility.completion_status).map(([module, status]) => (
              <div key={module} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{moduleNames[module as keyof typeof moduleNames]}</span>
                    {status.complete ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {t.completedOf
                      .replace('{completed}', status.completed.toString())
                      .replace('{required}', status.required.toString())}
                  </span>
                </div>
                <Progress value={(status.completed / status.required) * 100} className="h-2" />
              </div>
            ))}
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{eligibility.overall_percentage}%</span>
            </div>
            <Progress value={eligibility.overall_percentage} className="h-3" />
          </div>

          {eligibility.eligible ? (
            <Button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
              size="lg"
              data-testid="upgrade-card-button"
            >
              <Award className="w-5 h-5 mr-2" />
              {t.upgradeButton.replace('{level}', eligibility.next_level)}
            </Button>
          ) : (
            <Button variant="outline" className="w-full" size="lg" disabled>
              {t.keepLearning}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return null
}
