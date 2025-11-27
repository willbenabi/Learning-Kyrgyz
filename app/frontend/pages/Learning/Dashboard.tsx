import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
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
  Star,
  TrendingUp,
  Music,
  Film,
  Newspaper,
  Youtube
} from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface UserProgress {
  level: Level
  daysActive: number
  lessonsCompleted: number
  vocabularyCount: number
  badges: number
}

// Mock content recommendations
const RECOMMENDATIONS = {
  en: {
    A1: [
      { type: 'book', title: 'Kyrgyz Children\'s Stories', icon: BookOpen, description: 'Simple stories for beginners' },
      { type: 'music', title: 'Traditional Kyrgyz Folk Songs', icon: Music, description: 'Learn through music' },
      { type: 'video', title: 'Basic Kyrgyz Lessons on YouTube', icon: Youtube, description: 'Visual learning materials' },
    ],
    A2: [
      { type: 'book', title: 'Short Kyrgyz Tales', icon: BookOpen, description: 'Engaging short stories' },
      { type: 'news', title: 'Kyrgyz News for Learners', icon: Newspaper, description: 'Simplified news articles' },
      { type: 'music', title: 'Popular Kyrgyz Songs', icon: Music, description: 'Modern Kyrgyz music' },
    ],
    B1: [
      { type: 'news', title: 'Current Kyrgyz News', icon: Newspaper, description: 'Real news content' },
      { type: 'film', title: 'Kyrgyz Films with Subtitles', icon: Film, description: 'Cultural immersion' },
      { type: 'book', title: 'Kyrgyz Short Novels', icon: BookOpen, description: 'Intermediate literature' },
    ],
    B2: [
      { type: 'book', title: 'Contemporary Kyrgyz Literature', icon: BookOpen, description: 'Modern novels and essays' },
      { type: 'news', title: 'Kyrgyz Opinion Articles', icon: Newspaper, description: 'Complex discussions' },
      { type: 'film', title: 'Kyrgyz Documentary Series', icon: Film, description: 'In-depth content' },
    ],
    C1: [
      { type: 'book', title: 'Classical Kyrgyz Poetry', icon: BookOpen, description: 'Literary masterpieces' },
      { type: 'book', title: 'Manas Epic', icon: BookMarked, description: 'The great Kyrgyz epic' },
      { type: 'news', title: 'Academic Kyrgyz Publications', icon: Newspaper, description: 'Scholarly articles' },
    ]
  },
  ru: {
    A1: [
      { type: 'book', title: 'Кыргызские детские рассказы', icon: BookOpen, description: 'Простые истории для начинающих' },
      { type: 'music', title: 'Традиционные кыргызские песни', icon: Music, description: 'Учитесь через музыку' },
      { type: 'video', title: 'Базовые уроки кыргызского на YouTube', icon: Youtube, description: 'Визуальные материалы' },
    ],
    A2: [
      { type: 'book', title: 'Короткие кыргызские сказки', icon: BookOpen, description: 'Увлекательные короткие истории' },
      { type: 'news', title: 'Кыргызские новости для учащихся', icon: Newspaper, description: 'Упрощенные новостные статьи' },
      { type: 'music', title: 'Популярные кыргызские песни', icon: Music, description: 'Современная кыргызская музыка' },
    ],
    B1: [
      { type: 'news', title: 'Актуальные кыргызские новости', icon: Newspaper, description: 'Реальный новостной контент' },
      { type: 'film', title: 'Кыргызские фильмы с субтитрами', icon: Film, description: 'Культурное погружение' },
      { type: 'book', title: 'Кыргызские короткие романы', icon: BookOpen, description: 'Литература среднего уровня' },
    ],
    B2: [
      { type: 'book', title: 'Современная кыргызская литература', icon: BookOpen, description: 'Современные романы и эссе' },
      { type: 'news', title: 'Кыргызские аналитические статьи', icon: Newspaper, description: 'Сложные дискуссии' },
      { type: 'film', title: 'Кыргызские документальные сериалы', icon: Film, description: 'Углубленный контент' },
    ],
    C1: [
      { type: 'book', title: 'Классическая кыргызская поэзия', icon: BookOpen, description: 'Литературные шедевры' },
      { type: 'book', title: 'Эпос Манас', icon: BookMarked, description: 'Великий кыргызский эпос' },
      { type: 'news', title: 'Академические кыргызские публикации', icon: Newspaper, description: 'Научные статьи' },
    ]
  }
}

export default function LearningDashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [currentRecommendation, setCurrentRecommendation] = useState(0)

  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      welcome: 'Welcome to Learning Kyrgyz',
      subtitle: 'Start your journey to mastery',
      recommendedContent: 'Recommended for You',
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
      daysActive: 'Days Active',
      lessons: 'Lessons Completed',
      words: 'Words Learned',
      badges: 'Badges Earned',
      comingSoon: 'Coming Soon'
    },
    ru: {
      welcome: 'Добро пожаловать в изучение кыргызского',
      subtitle: 'Начните свой путь к мастерству',
      recommendedContent: 'Рекомендовано для вас',
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
      daysActive: 'Дней активности',
      lessons: 'Уроков завершено',
      words: 'Слов изучено',
      badges: 'Получено наград',
      comingSoon: 'Скоро'
    }
  }
  const t = translations[language]

  useEffect(() => {
    // Load user progress from test results
    const storedResults = localStorage.getItem('test_results')
    if (storedResults) {
      const results = JSON.parse(storedResults)
      setProgress({
        level: results.level,
        daysActive: 1,
        lessonsCompleted: 0,
        vocabularyCount: 0,
        badges: 1 // Completion badge
      })
    } else {
      // Default progress if no test taken
      setProgress({
        level: 'A1',
        daysActive: 1,
        lessonsCompleted: 0,
        vocabularyCount: 0,
        badges: 0
      })
    }

    // Rotate recommendations every 5 seconds
    const interval = setInterval(() => {
      setCurrentRecommendation((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    )
  }

  const recommendations = RECOMMENDATIONS[language][progress.level]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{t.welcome}</h1>
          <p className="text-lg opacity-90">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Recommendations Banner */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              {t.recommendedContent}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {recommendations[currentRecommendation] && (
                <>
                  {(() => {
                    const Icon = recommendations[currentRecommendation].icon
                    return <Icon className="w-12 h-12" />
                  })()}
                  <div>
                    <h3 className="text-xl font-semibold">{recommendations[currentRecommendation].title}</h3>
                    <p className="opacity-90">{recommendations[currentRecommendation].description}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentRecommendation ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                  onClick={() => setCurrentRecommendation(index)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t.yourProgress}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{progress.level}</div>
                <div className="text-sm text-muted-foreground">{t.level}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 flex items-center justify-center gap-1">
                  <Flame className="w-6 h-6" />
                  {progress.daysActive}
                </div>
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
            {modules.map((module, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => {
                  // Module pages will be created in Level 2
                  console.log('Navigate to', module.path)
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
                      <Badge variant="secondary" className="mt-2">{t.comingSoon}</Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => console.log('Navigate to AI Chat')}
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
            onClick={() => console.log('Navigate to Support')}
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
      </div>
    </div>
  )
}
