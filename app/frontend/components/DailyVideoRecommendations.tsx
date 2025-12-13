import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Film, ExternalLink, RefreshCw } from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface VideoRecommendation {
  id: number
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  category: string | null
}

interface DailyVideoRecommendationsProps {
  level: Level
  language: 'en' | 'ru'
}

export default function DailyVideoRecommendations({ level, language }: DailyVideoRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const translations = {
    en: {
      title: 'Daily Video Recommendations',
      subtitle: 'Curated videos for your level',
      refresh: 'Get New Recommendations',
      loading: 'Loading recommendations...',
      error: 'Failed to load recommendations',
      retry: 'Try Again',
      categories: {
        tutorial: 'Tutorial',
        conversation: 'Conversation',
        grammar: 'Grammar',
        vocabulary: 'Vocabulary',
        culture: 'Culture',
        music: 'Music',
        news: 'News'
      }
    },
    ru: {
      title: 'Ежедневные видео рекомендации',
      subtitle: 'Подобранные видео для вашего уровня',
      refresh: 'Получить новые рекомендации',
      loading: 'Загрузка рекомендаций...',
      error: 'Не удалось загрузить рекомендации',
      retry: 'Попробовать снова',
      categories: {
        tutorial: 'Урок',
        conversation: 'Разговор',
        grammar: 'Грамматика',
        vocabulary: 'Словарь',
        culture: 'Культура',
        music: 'Музыка',
        news: 'Новости'
      }
    }
  }
  const t = translations[language]

  const fetchRecommendations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/daily-recommendations?level=${level}&count=5`)
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
            <Film className="w-5 h-5" />
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
            <Film className="w-5 h-5" />
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

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Film className="w-5 h-5" />
              {t.title}
            </CardTitle>
            <p className="text-sm text-orange-700 mt-1">{t.subtitle}</p>
          </div>
          <Button
            onClick={fetchRecommendations}
            variant="outline"
            size="sm"
            className="gap-2 border-orange-300 hover:bg-orange-100"
          >
            <RefreshCw className="w-4 h-4" />
            {t.refresh}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((video) => (
            <a
              key={video.id}
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-full h-40 bg-gray-100 overflow-hidden">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E'
}}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 group-hover:text-orange-600 transition-colors">
                    {video.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-orange-600 transition-colors" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{video.description}</p>
                {video.category && (
                  <Badge variant="secondary" className="text-xs">
                    {t.categories[video.category as keyof typeof t.categories] || video.category}
                  </Badge>
                )}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
