import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookMarked, ArrowRight, ArrowLeft, Volume2, CheckCircle2, X, RotateCcw } from 'lucide-react'
import { VOCABULARY_TOPICS, getTopicsByLevel, type Level, type VocabularyTopic } from '@/data/vocabularyTopics'
import { isLessonCompleted } from '@/lib/progressHelper'
import { trackLessonCompletion } from '@/lib/progressTracker'
import * as dbProgress from '@/lib/progressApi'
import authService from '@/lib/auth'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function VocabularyPage() {
  const { props } = usePage()
  const currentUser = props.auth?.user
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedTopic, setSelectedTopic] = useState<VocabularyTopic | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Vocabulary Builder',
      description: 'Expand your Kyrgyz vocabulary',
      yourLevel: 'Your Level',
      startLearning: 'Start Learning',
      backToTopics: 'Back to Topics',
      words: 'words',
      targetWords: 'Target vocabulary'
    },
    ru: {
      title: 'Изучение лексики',
      description: 'Расширяйте свой кыргызский словарный запас',
      yourLevel: 'Ваш уровень',
      startLearning: 'Начать изучение',
      backToTopics: 'К темам',
      words: 'слов',
      targetWords: 'Целевой словарный запас'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load user level from localStorage
    const level = localStorage.getItem('user_level') as Level | null
    if (level) {
      setUserLevel(level)
    }

    // Load completed topics from database if authenticated
    const loadProgress = async () => {
      if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
        try {
          await dbProgress.refreshProgressCache()
          const completed = dbProgress.getCompletedLessons('vocabulary')
          setCompletedTopics(completed)
        } catch (error) {
          console.error('Failed to load vocabulary progress:', error)
        }
      }
    }

    loadProgress()
  }, [currentUser, refreshKey])

  const topics = getTopicsByLevel(userLevel)

  const handleTopicComplete = () => {
    setSelectedTopic(null)
    setRefreshKey(prev => prev + 1) // Force re-render to show updated completion status
  }

  if (selectedTopic) {
    return <TopicView topic={selectedTopic} language={language} currentUser={currentUser} onBack={() => setSelectedTopic(null)} onComplete={handleTopicComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-3 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Back Button and Language Switcher */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => router.visit('/learning/dashboard')} className="shrink-0">
            <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'Back to Dashboard' : 'К дашборду'}</span>
            <span className="sm:hidden">{language === 'en' ? 'Back' : 'Назад'}</span>
          </Button>
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 break-words">{t.title}</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-lg text-gray-600">{t.description}</p>
            </div>
            <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg shrink-0 self-start">
              {t.yourLevel}: {userLevel}
            </Badge>
          </div>
        </div>

        {/* Vocabulary Topics */}
        <div className="grid gap-4 md:grid-cols-2" key={`vocabulary-${refreshKey}`}>
          {topics.map((topic) => {
            const completed = currentUser ? completedTopics.includes(topic.id) : isLessonCompleted(topic.id)
            return (
              <Card
                key={topic.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${completed ? 'bg-green-50 border-green-300' : ''}`}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-2xl sm:text-3xl shrink-0">{topic.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base sm:text-lg break-words">{topic.title[language]}</CardTitle>
                            {completed && <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />}
                          </div>
                          <CardDescription className="mt-1 text-xs sm:text-sm break-words">{topic.description[language]}</CardDescription>
                        </div>
                      </div>
                    <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookMarked className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                        <span className="break-words">{topic.words.length} {t.words}</span>
                      </div>
                      <div className="text-orange-600 font-medium break-words">
                        {t.targetWords}: {topic.targetWords}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0 self-start">{topic.level}</Badge>
                </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button
                    onClick={() => setSelectedTopic(topic)}
                    className="w-full text-xs sm:text-sm"
                    variant={completed ? "outline" : "default"}
                  >
                    {completed ? (language === 'en' ? 'Restart Topic' : 'Перезапустить тему') : t.startLearning}
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TopicView({
  topic,
  language,
  currentUser,
  onBack,
  onComplete
}: {
  topic: VocabularyTopic
  language: 'en' | 'ru'
  currentUser: any
  onBack: () => void
  onComplete?: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard')
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizOptions, setQuizOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const translations = {
    en: {
      backToTopics: 'Back to Topics',
      flashcardMode: 'Flashcards',
      quizMode: 'Quiz',
      showTranslation: 'Show Translation',
      hideTranslation: 'Hide Translation',
      nextWord: 'Next Word',
      previousWord: 'Previous Word',
      example: 'Example',
      checkAnswer: 'Check Answer',
      nextQuestion: 'Next Question',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      score: 'Score',
      restart: 'Restart',
      progress: 'Progress',
      topicCompleted: 'Topic Completed!'
    },
    ru: {
      backToTopics: 'К темам',
      flashcardMode: 'Карточки',
      quizMode: 'Тест',
      showTranslation: 'Показать перевод',
      hideTranslation: 'Скрыть перевод',
      nextWord: 'Следующее слово',
      previousWord: 'Предыдущее слово',
      example: 'Пример',
      checkAnswer: 'Проверить ответ',
      nextQuestion: 'Следующий вопрос',
      correct: 'Правильно!',
      incorrect: 'Неправильно',
      score: 'Результат',
      restart: 'Начать заново',
      progress: 'Прогресс',
      topicCompleted: 'Тема завершена!'
    }
  }

  const t = translations[language]

  const currentWord = topic.words[currentIndex]

  useEffect(() => {
    if (mode === 'quiz') {
      generateQuizOptions()
    }
  }, [currentIndex, mode])

  // Load voices for Speech Synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Voices are loaded asynchronously
      speechSynthesis.getVoices()

      // Some browsers need this event
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          speechSynthesis.getVoices()
        }
      }
    }
  }, [])

  const generateQuizOptions = () => {
    const correct = currentWord.translation[language]
    const allTranslations = topic.words
      .map(w => w.translation[language])
      .filter(t => t !== correct)

    // Get 3 random wrong answers
    const wrongAnswers = allTranslations
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    // Mix correct answer with wrong ones
    const options = [...wrongAnswers, correct]
      .sort(() => Math.random() - 0.5)

    setQuizOptions(options)
    setQuizAnswer(null)
  }

  const handleNext = () => {
    if (currentIndex < topic.words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowTranslation(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowTranslation(false)
    }
  }

  const handleQuizAnswer = (selectedIndex: number) => {
    if (quizAnswer !== null) return // Already answered

    const isCorrect = quizOptions[selectedIndex] === currentWord.translation[language]
    setQuizAnswer(selectedIndex)
    setAttempted(attempted + 1)
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentIndex < topic.words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setQuizAnswer(null)
      generateQuizOptions()
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setAttempted(0)
    setQuizAnswer(null)
    if (mode === 'quiz') {
      generateQuizOptions()
    }
  }

  const handlePronounce = () => {
    if (isPlaying) return

    setIsPlaying(true)

    // Try Web Speech API first (built into browsers)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.kyrgyz)

      // Try to find Russian voice (closest to Kyrgyz)
      const voices = speechSynthesis.getVoices()
      const russianVoice = voices.find(voice => voice.lang.startsWith('ru'))

      if (russianVoice) {
        utterance.voice = russianVoice
      }

      utterance.lang = 'ru-RU' // Use Russian as closest approximation
      utterance.rate = 0.8 // Slightly slower for clarity
      utterance.pitch = 1

      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      speechSynthesis.speak(utterance)
    } else {
      // Fallback if Speech API not available
      console.warn('Speech synthesis not supported')
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToTopics}
        </Button>

        {/* Topic Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{topic.icon}</span>
                <div>
                  <CardTitle className="text-2xl">{topic.title[language]}</CardTitle>
                  <CardDescription className="mt-2">{topic.description[language]}</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">{topic.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Mode Toggle */}
        <div className="mb-6 flex gap-3">
          <Button
            variant={mode === 'flashcard' ? 'default' : 'outline'}
            onClick={() => { setMode('flashcard'); setShowTranslation(false) }}
            className="flex-1"
          >
            {t.flashcardMode}
          </Button>
          <Button
            variant={mode === 'quiz' ? 'default' : 'outline'}
            onClick={() => { setMode('quiz'); setQuizAnswer(null); generateQuizOptions() }}
            className="flex-1"
          >
            {t.quizMode}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t.progress}: {currentIndex + 1} / {topic.words.length}
            </span>
            {mode === 'quiz' && attempted > 0 && (
              <span className="text-sm font-medium text-orange-600">
                {t.score}: {score} / {attempted}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard Mode */}
        {mode === 'flashcard' && (
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Kyrgyz Word */}
                <div className="space-y-2">
                  <h2 className="text-5xl font-bold text-gray-900">{currentWord.kyrgyz}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-600 hover:text-orange-700"
                    onClick={handlePronounce}
                    disabled={isPlaying}
                  >
                    <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>

                {/* Translation (Toggleable) */}
                {showTranslation && (
                  <div className="pt-4 border-t">
                    <p className="text-2xl text-gray-700">{currentWord.translation[language]}</p>
                  </div>
                )}

                {/* Example (if available and translation shown) */}
                {showTranslation && currentWord.example && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">{t.example}:</p>
                    <p className="text-lg text-gray-800 mb-1">{currentWord.example.kyrgyz}</p>
                    <p className="text-base text-gray-600">{currentWord.example.translation[language]}</p>
                  </div>
                )}

                {/* Toggle Button */}
                <Button
                  onClick={() => setShowTranslation(!showTranslation)}
                  variant="outline"
                  className="w-full"
                >
                  {showTranslation ? t.hideTranslation : t.showTranslation}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && (
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Question */}
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-bold text-gray-900">{currentWord.kyrgyz}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-600 hover:text-orange-700"
                    onClick={handlePronounce}
                    disabled={isPlaying}
                  >
                    <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {quizOptions.map((option, idx) => {
                    const isSelected = quizAnswer === idx
                    const isCorrect = option === currentWord.translation[language]
                    const showFeedback = quizAnswer !== null

                    return (
                      <div
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected && showFeedback
                            ? isCorrect
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-400'
                        } ${showFeedback && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{option}</span>
                          {showFeedback && isSelected && (
                            isCorrect ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                              <X className="h-6 w-6 text-red-600" />
                            )
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Feedback */}
                {quizAnswer !== null && (
                  <div className={`p-4 rounded-lg text-center ${
                    quizOptions[quizAnswer] === currentWord.translation[language]
                      ? 'bg-green-50 text-green-900'
                      : 'bg-red-50 text-red-900'
                  }`}>
                    {quizOptions[quizAnswer] === currentWord.translation[language] ? t.correct : t.incorrect}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {mode === 'flashcard' && (
            <>
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.previousWord}
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex === topic.words.length - 1}
                className="flex-1"
              >
                {t.nextWord}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {mode === 'quiz' && (
            <>
              {quizAnswer === null ? (
                <Button disabled className="flex-1">
                  {t.checkAnswer}
                </Button>
              ) : currentIndex < topic.words.length - 1 ? (
                <Button onClick={handleNextQuestion} className="flex-1">
                  {t.nextQuestion}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={async () => {
                  // Calculate score percentage
                  const scorePercentage = attempted > 0 ? Math.round((score / attempted) * 100) : 0

                  // Mark topic as completed - use backend for authenticated users
                  if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
                    await trackLessonCompletion({
                      moduleType: 'vocabulary',
                      lessonId: topic.id,
                      score: scorePercentage,
                      timeSpent: undefined
                    })
                    // Refresh progress cache
                    await dbProgress.refreshProgressCache()
                  } else {
                    // Fallback to localStorage for guests
                    isLessonCompleted(topic.id) // This saves to localStorage
                  }

                  if (onComplete) {
                    onComplete()
                  } else {
                    onBack()
                  }
                }} className="flex-1">
                  {t.topicCompleted} <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
