import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Sparkles, Award, ArrowRight } from 'lucide-react'
import type { Achievement } from '@/lib/levelUpgradeApi'

interface LevelUpgradeCelebrationProps {
  open: boolean
  onClose: () => void
  previousLevel: string
  newLevel: string
  achievement: Achievement | null
  language?: 'en' | 'ru'
}

export default function LevelUpgradeCelebration({
  open,
  onClose,
  previousLevel,
  newLevel,
  achievement,
  language = 'en'
}: LevelUpgradeCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (open) {
      setShowConfetti(true)
      // Stop confetti after 3 seconds
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const translations = {
    en: {
      congratulations: 'Congratulations!',
      levelUpTitle: "You've Advanced to {level}!",
      levelUpDesc: "You've successfully completed all {previous} modules and are now ready for the next challenge.",
      whatUnlocked: "What's New",
      newLessons: 'New grammar lessons appropriate for {level} level',
      newReadings: 'Reading texts with more complex vocabulary',
      newWriting: 'Advanced writing prompts and exercises',
      newVocabulary: 'Expanded vocabulary sets',
      achievementEarned: 'Achievement Earned',
      continueButton: 'Continue to {level}',
      wellDone: 'Well done on your language learning journey!'
    },
    ru: {
      congratulations: 'Поздравляем!',
      levelUpTitle: 'Вы перешли на уровень {level}!',
      levelUpDesc: 'Вы успешно завершили все модули {previous} и теперь готовы к следующему вызову.',
      whatUnlocked: 'Что нового',
      newLessons: 'Новые уроки грамматики для уровня {level}',
      newReadings: 'Тексты для чтения с более сложной лексикой',
      newWriting: 'Продвинутые задания по письму',
      newVocabulary: 'Расширенные наборы слов',
      achievementEarned: 'Достижение получено',
      continueButton: 'Продолжить на {level}',
      wellDone: 'Отличная работа в изучении языка!'
    }
  }

  const t = translations[language]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg" data-testid="celebration-modal">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{
                    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)]
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4 pt-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
                {t.congratulations}
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {previousLevel}
                </Badge>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <Badge className="text-lg px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600">
                  {newLevel}
                </Badge>
              </div>
              <DialogDescription className="text-base">
                {t.levelUpDesc.replace('{previous}', previousLevel)}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Achievement section */}
          {achievement && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-900">{t.achievementEarned}</p>
                  <p className="text-base font-bold text-purple-900">{achievement.title}</p>
                  {achievement.description && (
                    <p className="text-sm text-purple-700">{achievement.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* What's unlocked */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              {t.whatUnlocked}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <span>{t.newLessons.replace('{level}', newLevel)}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="bg-green-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                </div>
                <span>{t.newReadings}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                </div>
                <span>{t.newWriting}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="bg-orange-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                </div>
                <span>{t.newVocabulary}</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            {t.wellDone}
          </p>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg py-6"
            data-testid="continue-button"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            {t.continueButton.replace('{level}', newLevel)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
