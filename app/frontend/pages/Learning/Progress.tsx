import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Flame,
  Trophy,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Clock,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'

interface Achievement {
  id: number
  type: string
  title: string
  description: string
  earnedAt: string
  icon: string
}

interface RecentLesson {
  id: number
  moduleType: string
  lessonId: string
  completedAt: string
  score: number | null
  timeSpent: number | null
}

interface ProgressProps {
  level: string
  daysActive: number
  lessonsCompleted: number
  vocabularyCount: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  achievements: Achievement[]
  lessonsByModule: Record<string, number>
  recentLessons: RecentLesson[]
  stats: {
    today: number
    thisWeek: number
    thisMonth: number
  }
}

const MODULE_NAMES = {
  grammar: { en: 'Grammar', ru: 'Грамматика', color: 'bg-blue-500' },
  reading: { en: 'Reading', ru: 'Чтение', color: 'bg-green-500' },
  writing: { en: 'Writing', ru: 'Письмо', color: 'bg-purple-500' },
  vocabulary: { en: 'Vocabulary', ru: 'Словарный запас', color: 'bg-orange-500' }
}

const MODULE_TOTALS = {
  grammar: 57, // 52 lessons + 5 final tests
  reading: 50, // 10 texts per level
  writing: 11, // Existing writing prompts
  vocabulary: 21 // Existing vocabulary topics
}

export default function ProgressPage({
  level,
  daysActive,
  lessonsCompleted,
  vocabularyCount,
  currentStreak,
  longestStreak,
  lastActivityDate,
  achievements,
  lessonsByModule,
  recentLessons,
  stats
}: ProgressProps) {
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Your Learning Progress',
      subtitle: 'Track your achievements and stay motivated',
      backToDashboard: 'Back to Dashboard',
      overview: 'Overview',
      level: 'Current Level',
      streak: 'Current Streak',
      days: 'days',
      longestStreak: 'Longest Streak',
      lessonsCompleted: 'Lessons Completed',
      wordsLearned: 'Words Learned',
      achievements: 'Achievements',
      achievementsEarned: 'Achievements Earned',
      viewAll: 'View All',
      recentActivity: 'Recent Activity',
      moduleProgress: 'Progress by Module',
      stats: 'Statistics',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      lessons: 'lessons',
      noAchievements: 'No achievements yet. Keep learning to earn badges!',
      noRecentActivity: 'No recent activity. Start a lesson now!',
      lastActive: 'Last Active',
      completed: 'completed',
      score: 'Score',
      timeSpent: 'Time'
    },
    ru: {
      title: 'Ваш прогресс обучения',
      subtitle: 'Отслеживайте свои достижения и оставайтесь мотивированными',
      backToDashboard: 'Вернуться на главную',
      overview: 'Обзор',
      level: 'Текущий уровень',
      streak: 'Текущая серия',
      days: 'дней',
      longestStreak: 'Самая длинная серия',
      lessonsCompleted: 'Уроков завершено',
      wordsLearned: 'Слов изучено',
      achievements: 'Достижения',
      achievementsEarned: 'Получено наград',
      viewAll: 'Посмотреть все',
      recentActivity: 'Недавняя активность',
      moduleProgress: 'Прогресс по модулям',
      stats: 'Статистика',
      today: 'Сегодня',
      thisWeek: 'За неделю',
      thisMonth: 'За месяц',
      lessons: 'уроков',
      noAchievements: 'Пока нет достижений. Продолжайте учиться, чтобы заработать награды!',
      noRecentActivity: 'Нет недавней активности. Начните урок прямо сейчас!',
      lastActive: 'Последняя активность',
      completed: 'завершено',
      score: 'Оценка',
      timeSpent: 'Время'
    }
  }
  const t = translations[language]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTime = (seconds: number | null) => {
    if (!seconds) return '-'
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/20 mb-4"
            onClick={() => router.visit('/learning/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToDashboard}
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-10 h-10" />
            <h1 className="text-4xl font-bold">{t.title}</h1>
          </div>
          <p className="text-lg opacity-90">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overview Stats */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            {t.overview}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{level}</div>
                <div className="text-sm text-muted-foreground">{t.level}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-100 to-orange-50">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <div className="text-4xl font-bold text-orange-600">{currentStreak}</div>
                </div>
                <div className="text-sm text-orange-700">{t.streak}</div>
                <div className="text-xs text-orange-600 mt-1">{t.days}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-gray-700 mb-2">{longestStreak}</div>
                <div className="text-sm text-muted-foreground">{t.longestStreak}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  <div className="text-3xl font-bold text-blue-600">{lessonsCompleted}</div>
                </div>
                <div className="text-sm text-muted-foreground">{t.lessonsCompleted}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{vocabularyCount}</div>
                <div className="text-sm text-muted-foreground">{t.wordsLearned}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-purple-500" />
                  <div className="text-3xl font-bold text-purple-600">{achievements.length}</div>
                </div>
                <div className="text-sm text-muted-foreground">{t.achievementsEarned}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Module Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {t.moduleProgress}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(MODULE_NAMES).map(([moduleType, moduleInfo]) => {
                const completed = lessonsByModule[moduleType] || 0
                const total = MODULE_TOTALS[moduleType as keyof typeof MODULE_TOTALS]
                const percentage = total > 0 ? (completed / total) * 100 : 0

                return (
                  <div key={moduleType}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${moduleInfo.color}`} />
                        <span className="font-medium">{moduleInfo[language]}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {completed}/{total} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t.stats}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{t.today}</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.today}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.lessons}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{t.thisWeek}</span>
                  <span className="text-2xl font-bold text-green-600">{stats.thisWeek}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.lessons}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{t.thisMonth}</span>
                  <span className="text-2xl font-bold text-purple-600">{stats.thisMonth}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.lessons}</p>
              </div>
              {lastActivityDate && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{t.lastActive}: {new Date(lastActivityDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                {t.achievements}
              </CardTitle>
              <Badge variant="secondary">{achievements.length} {t.achievementsEarned}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {achievements.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t.noAchievements}</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h4 className="font-semibold mb-1">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(achievement.earnedAt)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLessons.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t.noRecentActivity}</p>
            ) : (
              <div className="space-y-3">
                {recentLessons.map((lesson) => {
                  const moduleInfo = MODULE_NAMES[lesson.moduleType as keyof typeof MODULE_NAMES]
                  return (
                    <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${moduleInfo.color} flex items-center justify-center`}>
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{moduleInfo[language]}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.lessonId} • {formatDate(lesson.completedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {lesson.score !== null && (
                          <div className="text-sm font-medium text-green-600">{t.score}: {lesson.score}%</div>
                        )}
                        {lesson.timeSpent !== null && (
                          <div className="text-xs text-muted-foreground">{t.timeSpent}: {formatTime(lesson.timeSpent)}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
