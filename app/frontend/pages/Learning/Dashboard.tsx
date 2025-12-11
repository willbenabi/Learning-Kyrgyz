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

  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      welcome: 'Welcome to Learning Kyrgyz',
      subtitle: 'Start your journey to mastery',
      modules: 'Learning Modules',
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
      welcome: 'Добро пожаловать в изучение кыргызского',
      subtitle: 'Начните свой путь к мастерству',
      modules: 'Модули обучения',
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
    // Load real user progress from progressHelper
    const userProgress = getUserProgress()

    // Calculate days active
    let daysActive = 1
    if (userProgress.lastActivityDate) {
      const lastDate = new Date(userProgress.lastActivityDate)
      const firstDate = userProgress.completedLessons.length > 0
        ? new Date(userProgress.completedLessons[0].completedAt)
        : lastDate
      daysActive = Math.max(1, Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    }

    setProgress({
      level: userProgress.level,
      daysActive: daysActive,
      lessonsCompleted: userProgress.completedLessons.length,
      vocabularyCount: userProgress.vocabularyCount,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.currentStreak, // For now, same as current
      badges: userProgress.achievements.length
    })
  }, [])

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
      <div className="bg-primary text-primary-foreground py-8 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{t.welcome}</h1>
          <p className="text-lg opacity-90">{t.subtitle}</p>
        </div>
        {/* Profile Button */}
        {currentUser && (
          <div className="absolute top-4 right-4">
            <ProfileDropdown
              user={currentUser}
              trigger={
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-primary-foreground/10">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentUser.avatar_url || undefined} alt={currentUser.name} />
                    <AvatarFallback className="bg-primary-foreground text-primary text-lg font-semibold">
                      {getUserInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* AI-Powered Daily Recommendations */}
        <AIRecommendations level={progress.level} language={language} />

        {/* Progress Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t.yourProgress}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.visit('/learning/progress')}
            >
              {t.viewDetails}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{progress.level}</div>
                <div className="text-sm text-muted-foreground">{t.level}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 flex items-center justify-center gap-1">
                  <Flame className="w-6 h-6" />
                  {progress.currentStreak || 0}
                </div>
                <div className="text-sm text-muted-foreground">{t.currentStreak}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{progress.daysActive}</div>
                <div className="text-sm text-muted-foreground">{t.daysActive}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{progress.lessonsCompleted}</div>
                <div className="text-sm text-muted-foreground">{t.lessons}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{progress.vocabularyCount}</div>
                <div className="text-sm text-muted-foreground">{t.words}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 flex items-center justify-center gap-1">
                  <Trophy className="w-6 h-6" />
                  {progress.badges}
                </div>
                <div className="text-sm text-muted-foreground">{t.badges}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.modules}</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`${module.color} w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <module.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                        {!isActive && <Badge variant="secondary" className="mt-2">{t.comingSoon}</Badge>}
                        {isActive && <Badge variant="default" className="mt-2 bg-green-600">Active</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowAIAssistant(true)}
            data-testid="ai-assistant-card"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.aiAssistant}</CardTitle>
                  <CardDescription>{t.aiAssistantDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowTechSupport(true)}
            data-testid="support-card"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-slate-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.support}</CardTitle>
                  <CardDescription>{t.supportDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
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
      </div>
    </div>
  )
}
