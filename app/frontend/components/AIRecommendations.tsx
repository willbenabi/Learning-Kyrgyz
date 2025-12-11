import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, ExternalLink, BookOpen, Headphones, Film } from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface AIRecommendation {
  id: number
  type: 'reading' | 'listening' | 'watching'
  title: string
  description: string
  url: string | null
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

  const translations = {
    en: {
      title: 'AI-Powered Daily Recommendations',
      subtitle: 'Personalized content suggestions for your level',
      loading: 'Generating recommendations...',
      error: 'Failed to load recommendations',
      retry: 'Try Again',
      noRecommendations: 'No recommendations available yet',
      types: {
        reading: 'Reading',
        listening: 'Listening',
        watching: 'Watching'
      }
    },
    ru: {
      title: 'Ежедневные AI-рекомендации',
      subtitle: 'Персональные материалы для вашего уровня',
      loading: 'Генерируем рекомендации...',
      error: 'Не удалось загрузить рекомендации',
      retry: 'Попробовать снова',
      noRecommendations: 'Пока нет рекомендаций',
      types: {
        reading: 'Чтение',
        listening: 'Слушание',
        watching: 'Просмотр'
      }
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <span className="ml-3 text-muted-foreground">{t.loading}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p className="text-muted-foreground">{t.error}</p>
            <Button onClick={fetchRecommendations} variant="outline">
              {t.retry}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">{t.noRecommendations}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Sparkles className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <p className="text-sm text-purple-700 mt-1">{t.subtitle}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const Icon = getIcon(rec.type)
            return (
              <div
                key={rec.id}
                className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {t.types[rec.type]}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 mb-1">
                      {rec.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3">{rec.description}</p>
                {rec.url && (
                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {language === 'en' ? 'Open Link' : 'Открыть ссылку'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
