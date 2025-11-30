import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookMarked, ArrowRight, ArrowLeft, Volume2, CheckCircle2, X, RotateCcw } from 'lucide-react'
import { VOCABULARY_TOPICS, getTopicsByLevel, type Level, type VocabularyTopic } from '@/data/vocabularyTopics'

export default function VocabularyPage() {
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedTopic, setSelectedTopic] = useState<VocabularyTopic | null>(null)
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
  }, [])

  const topics = getTopicsByLevel(userLevel)

  if (selectedTopic) {
    return <TopicView topic={selectedTopic} language={language} onBack={() => setSelectedTopic(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.visit('/learning/dashboard')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> {language === 'en' ? 'Back to Dashboard' : 'К дашборду'}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{t.description}</p>
            </div>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              {t.yourLevel}: {userLevel}
            </Badge>
          </div>
        </div>

        {/* Vocabulary Topics */}
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{topic.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{topic.title[language]}</CardTitle>
                        <CardDescription className="mt-1">{topic.description[language]}</CardDescription>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookMarked className="h-4 w-4" />
                        <span>{topic.words.length} {t.words}</span>
                      </div>
                      <div className="text-orange-600 font-medium">
                        {t.targetWords}: {topic.targetWords}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{topic.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setSelectedTopic(topic)} className="w-full">
                  {t.startLearning} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function TopicView({
  topic,
  language,
  onBack
}: {
  topic: VocabularyTopic
  language: 'en' | 'ru'
  onBack: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard')
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizOptions, setQuizOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)

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
      progress: 'Progress'
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
      progress: 'Прогресс'
    }
  }

  const t = translations[language]

  const currentWord = topic.words[currentIndex]

  useEffect(() => {
    if (mode === 'quiz') {
      generateQuizOptions()
    }
  }, [currentIndex, mode])

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
                  <Button variant="ghost" size="sm" className="text-orange-600">
                    <Volume2 className="h-5 w-5" />
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
                  <Button variant="ghost" size="sm" className="text-orange-600">
                    <Volume2 className="h-5 w-5" />
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
                <Button onClick={handleRestart} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {t.restart}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
