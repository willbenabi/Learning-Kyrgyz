import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, ExternalLink, BookOpen, Headphones, Film, ChevronDown, ChevronUp } from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface AIRecommendation {
  id: number
  type: 'reading' | 'listening' | 'watching'
  resource_type: string | null
  title: string
  description: string
  url: string | null
  thumbnail_url: string | null
  generated_at: string
}

interface AIRecommendationsProps {
  level: Level
  language: 'en' | 'ru'
}

export default function AIRecommendations({ level, language }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const translations = {
    en: {
      title: 'AI-Powered Daily Recommendations',
      subtitle: 'Personalized content suggestions for your level',
      loading: 'Generating recommendations...',
      error: 'Failed to load recommendations',
      retry: 'Try Again',
      noRecommendations: 'No recommendations available yet',
      showMore: 'Show Recommendations',
      showLess: 'Hide Recommendations',
      types: {
        reading: 'Reading',
        listening: 'Listening',
        watching: 'Watching'
      },
      resourceTypes: {
        Song: 'Song',
        Article: 'Article',
        Video: 'Video',
        Podcast: 'Podcast',
        Book: 'Book',
        Film: 'Film',
        Series: 'Series',
        Story: 'Story',
        Game: 'Game',
        Website: 'Website'
      },
      interested: 'I\'m interested'
    },
    ru: {
      title: 'Ежедневные AI-рекомендации',
      subtitle: 'Персональные материалы для вашего уровня',
      loading: 'Генерируем рекомендации...',
      error: 'Не удалось загрузить рекомендации',
      retry: 'Попробовать снова',
      noRecommendations: 'Пока нет рекомендаций',
      showMore: 'Показать рекомендации',
      showLess: 'Скрыть рекомендации',
      types: {
        reading: 'Чтение',
        listening: 'Слушание',
        watching: 'Просмотр'
      },
      resourceTypes: {
        Song: 'Песня',
        Article: 'Статья',
        Video: 'Видео',
        Podcast: 'Подкаст',
        Book: 'Книга',
        Film: 'Фильм',
        Series: 'Сериал',
        Story: 'Сказка',
        Game: 'Игра',
        Website: 'Сайт'
      },
      interested: 'Мне интересно'
    }
  }
  const t = translations[language]

  const getIcon = (type: string) => {
    switch (type) {
      case 'reading':
        return BookOpen
      case 'listening':
        return Headphones
      case 'watching':
        return Film
      default:
        return BookOpen
    }
  }

  const fetchRecommendations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/ai-recommendations?level=${level}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }
      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [level])

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-purple-900 text-base sm:text-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="break-words">{t.title}</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-purple-700 mt-1 break-words">{t.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 text-xs sm:text-sm w-full sm:w-auto shrink-0"
            >
              {isExpanded ? (
                <>
                  {t.showLess}
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  {t.showMore}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <span className="ml-3 text-muted-foreground">{t.loading}</span>
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-purple-900 text-base sm:text-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="break-words">{t.title}</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-purple-700 mt-1 break-words">{t.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 text-xs sm:text-sm w-full sm:w-auto shrink-0"
            >
              {isExpanded ? (
                <>
                  {t.showLess}
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  {t.showMore}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <p className="text-muted-foreground">{t.error}</p>
              <Button onClick={fetchRecommendations} variant="outline">
                {t.retry}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-purple-900 text-base sm:text-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="break-words">{t.title}</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-purple-700 mt-1 break-words">{t.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 text-xs sm:text-sm w-full sm:w-auto shrink-0"
            >
              {isExpanded ? (
                <>
                  {t.showLess}
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  {t.showMore}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground">{t.noRecommendations}</p>
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 text-purple-900 text-base sm:text-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="break-words">{t.title}</span>
            </CardTitle>
            <p className="text-xs sm:text-sm text-purple-700 mt-1 break-words">{t.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-700 hover:text-purple-900 hover:bg-purple-100 text-xs sm:text-sm w-full sm:w-auto shrink-0"
          >
            {isExpanded ? (
              <>
                {t.showLess}
                <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                {t.showMore}
                <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => {
              const Icon = getIcon(rec.type)
              return (
                <div
                  key={rec.id}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Thumbnail */}
                  {rec.thumbnail_url ? (
                    <div className="relative h-32 w-full bg-gradient-to-br from-purple-100 to-indigo-100">
                      <img
                        src={rec.thumbnail_url}
                        alt={rec.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Icon overlay */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-32 w-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-purple-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {t.types[rec.type]}
                      </Badge>
                      {rec.resource_type && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          {t.resourceTypes[rec.resource_type as keyof typeof t.resourceTypes] || rec.resource_type}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 mb-2">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{rec.description}</p>
                    {rec.url && (
                      <button
                        onClick={() => window.open(rec.url, '_blank', 'noopener,noreferrer')}
                        className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
                      >
                        {t.interested}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
