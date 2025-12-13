import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  FileText,
  PenTool,
  BookMarked,
  MessageSquare,
  Wrench,
  Flame,
  Trophy,
  TrendingUp
} from 'lucide-react'
import { getUserProgress } from '@/lib/progressHelper'
import TechSupportModal from '@/components/TechSupportModal'
import AIAssistantModal from '@/components/AIAssistantModal'
import AIRecommendations from '@/components/AIRecommendations'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LevelUpgradeButton from '@/components/LevelUpgradeButton'
import LevelUpgradeCelebration from '@/components/LevelUpgradeCelebration'
import { checkUpgradeEligibility, performLevelUpgrade, type UpgradeEligibility, type UpgradeResult } from '@/lib/levelUpgradeApi'
import authService from '@/lib/auth'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface UserProgress {
  level: Level
  daysActive: number
  lessonsCompleted: number
  vocabularyCount: number
  currentStreak: number
  longestStreak: number
  badges: number
}

interface DashboardProps {
  userProgress?: UserProgress | null
}

export default function LearningDashboard({ userProgress }: DashboardProps) {
  const { props } = usePage()
  const currentUser = props.auth?.user

  const [progress, setProgress] = useState<UserProgress | null>(userProgress || null)
  const [showTechSupport, setShowTechSupport] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [upgradeEligibility, setUpgradeEligibility] = useState<UpgradeEligibility | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [upgradeResult, setUpgradeResult] = useState<UpgradeResult | null>(null)

  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      welcome: 'Welcome to Berkut',
      subtitle: 'Start your journey to mastery',
      modules: 'Learning Modules',
      customerSupport: 'Customer Support',
      grammar: 'Grammar',
      grammarDesc: 'Master Kyrgyz grammar rules',
      reading: 'Reading & Comprehension',
      readingDesc: 'Practice with real texts',
      writing: 'Writing',
      writingDesc: 'Improve your writing skills',
      vocabulary: 'Vocabulary Builder',
      vocabularyDesc: 'Expand your word knowledge',
      aiAssistant: 'AI Assistant',
      aiAssistantDesc: 'Ask questions and practice',
      support: 'Technical Support',
      supportDesc: 'Get help and report issues',
      yourProgress: 'Your Progress',
      level: 'Level',
      currentStreak: 'Current Streak',
      daysActive: 'Days Active',
      lessons: 'Lessons Completed',
      words: 'Words Learned',
      badges: 'Badges Earned',
      comingSoon: 'Coming Soon',
      viewDetails: 'View Details'
    },
    ru: {
      welcome: 'Добро пожаловать в Berkut',
      subtitle: 'Начните свой путь к мастерству',
      modules: 'Модули обучения',
      customerSupport: 'Поддержка клиентов',
      grammar: 'Грамматика',
      grammarDesc: 'Освойте правила кыргызской грамматики',
      reading: 'Чтение и понимание',
      readingDesc: 'Практикуйтесь с реальными текстами',
      writing: 'Письмо',
      writingDesc: 'Улучшите навыки письма',
      vocabulary: 'Изучение лексики',
      vocabularyDesc: 'Расширьте словарный запас',
      aiAssistant: 'AI Ассистент',
      aiAssistantDesc: 'Задавайте вопросы и практикуйтесь',
      support: 'Техническая поддержка',
      supportDesc: 'Получите помощь и сообщите о проблемах',
      yourProgress: 'Ваш прогресс',
      level: 'Уровень',
      currentStreak: 'Текущая серия',
      daysActive: 'Дней активности',
      lessons: 'Уроков завершено',
      words: 'Слов изучено',
      badges: 'Получено наград',
      comingSoon: 'Скоро',
      viewDetails: 'Подробнее'
    }
  }
  const t = translations[language]

  useEffect(() => {
    const loadProgress = async () => {
      // If userProgress prop is provided (from backend), use it directly
      if (userProgress) {
        setProgress(userProgress)
        return
      }

      // Fallback to localStorage for guests (Level 1)
      const localUserProgress = getUserProgress()

      // Calculate days active
      let daysActive = 1
      if (localUserProgress.lastActivityDate) {
        const lastDate = new Date(localUserProgress.lastActivityDate)
        const firstDate = localUserProgress.completedLessons.length > 0
          ? new Date(localUserProgress.completedLessons[0].completedAt)
          : lastDate
        daysActive = Math.max(1, Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)
      }

      setProgress({
        level: localUserProgress.level,
        daysActive: daysActive,
        lessonsCompleted: localUserProgress.completedLessons.length,
        vocabularyCount: localUserProgress.vocabularyCount,
        currentStreak: localUserProgress.currentStreak,
        longestStreak: localUserProgress.currentStreak, // For now, same as current
        badges: localUserProgress.achievements.length
      })
    }

    loadProgress()
  }, [userProgress])

  useEffect(() => {
    const fetchUpgradeEligibility = async () => {
      // Only check for authenticated users
      if (!currentUser || !authService.getToken() || authService.isTokenExpired()) {
        return
      }

      try {
        const eligibility = await checkUpgradeEligibility()
        setUpgradeEligibility(eligibility)
      } catch (error) {
        console.error('Failed to check upgrade eligibility:', error)
      }
    }

    fetchUpgradeEligibility()
  }, [currentUser])

  const handleUpgrade = async () => {
    if (!upgradeEligibility?.eligible || !upgradeEligibility.next_level) {
      return
    }

    try {
      const result = await performLevelUpgrade(upgradeEligibility.next_level)
      setUpgradeResult(result)
      setShowCelebration(true)

      // Update local progress state
      if (progress) {
        setProgress({
          ...progress,
          level: result.new_level as Level
        })
      }
    } catch (error) {
      console.error('Failed to upgrade level:', error)
      alert('Failed to upgrade level. Please try again.')
    }
  }

  const handleCelebrationClose = () => {
    setShowCelebration(false)
    // Refresh page to load new level content
    window.location.reload()
  }

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    )
  }

  const modules = [
    {
      icon: BookOpen,
      title: t.grammar,
      description: t.grammarDesc,
      color: 'bg-blue-500',
      path: '/learning/grammar'
    },
    {
      icon: FileText,
      title: t.reading,
      description: t.readingDesc,
      color: 'bg-green-500',
      path: '/learning/reading'
    },
    {
      icon: PenTool,
      title: t.writing,
      description: t.writingDesc,
      color: 'bg-purple-500',
      path: '/learning/writing'
    },
    {
      icon: BookMarked,
      title: t.vocabulary,
      description: t.vocabularyDesc,
      color: 'bg-orange-500',
      path: '/learning/vocabulary'
    }
  ]

  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 sm:py-8 px-3 sm:px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 break-words pr-24 sm:pr-32">{t.welcome}</h1>
          <p className="text-sm sm:text-lg opacity-90 break-words pr-24 sm:pr-32">{t.subtitle}</p>
        </div>
        {/* Top right buttons */}
        <div className="absolute top-3 sm:top-6 right-2 sm:right-6 z-50 flex items-center gap-1 sm:gap-2">
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
          {/* Profile Button */}
          {currentUser && (
            <ProfileDropdown
              user={currentUser}
              trigger={
                <button className="flex items-center justify-center h-9 w-9 sm:h-14 sm:w-14 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-all border-2 border-primary-foreground/40 cursor-pointer">
                  <Avatar className="h-7 w-7 sm:h-12 sm:w-12">
                    <AvatarImage src={currentUser.avatar_url || undefined} alt={currentUser.name} />
                    <AvatarFallback className="bg-primary-foreground text-primary text-xs sm:text-lg font-bold">
                      {getUserInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              }
            />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Level Upgrade Banner (if eligible) */}
        {upgradeEligibility?.eligible && currentUser && (
          <LevelUpgradeButton
            eligibility={upgradeEligibility}
            onUpgrade={handleUpgrade}
            variant="banner"
            language={language}
          />
        )}

        {/* AI-Powered Daily Recommendations */}
        <AIRecommendations level={progress.level} language={language} />

        {/* Progress Stats */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              {t.yourProgress}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.visit('/learning/progress')}
              className="text-xs sm:text-sm w-full sm:w-auto"
            >
              {t.viewDetails}
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{progress.level}</div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.level}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  {progress.currentStreak || 0}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.currentStreak}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-600">{progress.daysActive}</div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.daysActive}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500">{progress.lessonsCompleted}</div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.lessons}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-500">{progress.vocabularyCount}</div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.words}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-500 flex items-center justify-center gap-1">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  {progress.badges}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground break-words">{t.badges}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Upgrade Progress Card (for authenticated users) */}
        {upgradeEligibility && currentUser && (
          <LevelUpgradeButton
            eligibility={upgradeEligibility}
            onUpgrade={handleUpgrade}
            variant="card"
            language={language}
          />
        )}

        {/* Learning Modules */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 break-words">{t.modules}</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {modules.map((module, index) => {
              const isActive = module.path === '/learning/grammar' || module.path === '/learning/reading' || module.path === '/learning/writing' || module.path === '/learning/vocabulary'
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => {
                    if (isActive) {
                      router.visit(module.path)
                    }
                  }}
                  data-testid={`module-${module.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`${module.color} w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                        <module.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-xl mb-1 sm:mb-2 break-words">{module.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm break-words">{module.description}</CardDescription>
                        {!isActive && <Badge variant="secondary" className="mt-2 text-xs">{t.comingSoon}</Badge>}
                        {isActive && <Badge variant="default" className="mt-2 bg-green-600 text-xs">Active</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 break-words">{t.customerSupport}</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <Card
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setShowAIAssistant(true)}
              data-testid="ai-assistant-card"
            >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-cyan-500 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg break-words">{t.aiAssistant}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm break-words">{t.aiAssistantDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowTechSupport(true)}
            data-testid="support-card"
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-slate-500 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg break-words">{t.support}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm break-words">{t.supportDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          </div>
        </div>

        {/* Modals */}
        <TechSupportModal
          open={showTechSupport}
          onClose={() => setShowTechSupport(false)}
          language={language}
        />
        <AIAssistantModal
          open={showAIAssistant}
          onClose={() => setShowAIAssistant(false)}
          language={language}
          userId={currentUser?.id}
        />
        {upgradeResult && (
          <LevelUpgradeCelebration
            open={showCelebration}
            onClose={handleCelebrationClose}
            previousLevel={upgradeResult.previous_level}
            newLevel={upgradeResult.new_level}
            achievement={upgradeResult.achievement}
            language={language}
          />
        )}
      </div>
    </div>
  )
}
