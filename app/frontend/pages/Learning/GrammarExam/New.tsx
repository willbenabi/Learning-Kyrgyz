import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import authService from '@/lib/auth'

interface Question {
  id: number
  category: string
  question: string
  options: {
    en: string[]
    ru: string[]
  }
}

interface ExamPageProps {
  level: string
  bestScore: number
  attemptCount: number
  previousAttempts: Array<{
    id: number
    score: number
    attempted_at: string
    time_spent: number | null
    passed: boolean
  }>
}

export default function GrammarExamNew({ level, bestScore, attemptCount, previousAttempts }: ExamPageProps) {
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'
  const [examStarted, setExamStarted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translations = {
    en: {
      title: 'Grammar Comprehensive Exam',
      subtitle: 'Test your knowledge across all grammar topics',
      level: 'Level',
      bestScore: 'Best Score',
      attempts: 'Attempts',
      previousAttempts: 'Previous Attempts',
      startExam: 'Start Exam',
      backToGrammar: 'Back to Grammar',
      question: 'Question',
      of: 'of',
      timeElapsed: 'Time Elapsed',
      selectAnswer: 'Select your answer',
      previous: 'Previous',
      next: 'Next',
      submitExam: 'Submit Exam',
      confirmSubmit: 'Are you sure you want to submit? You have {unanswered} unanswered question(s).',
      category: 'Category',
      syntax: 'Syntax',
      morphology: 'Morphology',
      passed: 'Passed',
      failed: 'Failed',
      ago: 'ago',
      minutes: 'min',
      answeredQuestions: 'Answered',
      noAttempts: 'No previous attempts'
    },
    ru: {
      title: 'Комплексный экзамен по грамматике',
      subtitle: 'Проверьте свои знания по всем темам грамматики',
      level: 'Уровень',
      bestScore: 'Лучший результат',
      attempts: 'Попытки',
      previousAttempts: 'Предыдущие попытки',
      startExam: 'Начать экзамен',
      backToGrammar: 'К грамматике',
      question: 'Вопрос',
      of: 'из',
      timeElapsed: 'Прошло времени',
      selectAnswer: 'Выберите ответ',
      previous: 'Назад',
      next: 'Далее',
      submitExam: 'Отправить экзамен',
      confirmSubmit: 'Вы уверены, что хотите отправить? У вас {unanswered} неотвеченных вопросов.',
      category: 'Категория',
      syntax: 'Синтаксис',
      morphology: 'Морфология',
      passed: 'Сдан',
      failed: 'Не сдан',
      ago: 'назад',
      minutes: 'мин',
      answeredQuestions: 'Отвечено',
      noAttempts: 'Нет предыдущих попыток'
    }
  }

  const t = translations[language]

  // Timer
  useEffect(() => {
    if (!examStarted) return

    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [examStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startExam = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/grammar_exams/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify({ level })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate exam')
      }

      setQuestions(data.questions)
      setExamStarted(true)
      setTimeElapsed(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start exam')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length

    if (unansweredCount > 0) {
      const message = t.confirmSubmit.replace('{unanswered}', unansweredCount.toString())
      if (!window.confirm(message)) {
        return
      }
    }

    setLoading(true)

    try {
      const formattedAnswers = questions.map((q, index) => ({
        question_id: q.id,
        selected_index: answers[index] ?? -1 // -1 for unanswered
      }))

      const response = await fetch('/grammar_exams/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify({
          level,
          answers: formattedAnswers,
          time_spent_seconds: timeElapsed
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit exam')
      }

      // Redirect to results page
      router.visit(`/grammar_exams/${data.results.exam_id}/results`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit exam')
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" onClick={() => router.visit('/learning/grammar')} className="mb-4 sm:mb-6">
            <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
            {t.backToGrammar}
          </Button>

          <Card className="mb-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl">{t.title}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">{t.level}: {level}</Badge>
                  <Badge variant="secondary" className="text-sm">35 {language === 'en' ? 'questions' : 'вопросов'}</Badge>
                </div>

                {attemptCount > 0 && (
                  <div className="grid gap-2 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">{t.bestScore}:</span>
                      <span className={bestScore >= 70 ? 'text-green-600 font-bold text-lg' : 'text-gray-700 text-lg'}>
                        {bestScore}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.attempts}: {attemptCount}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  onClick={startExam}
                  disabled={loading}
                  className="w-full text-sm sm:text-base"
                  size="lg"
                >
                  {loading ? (language === 'en' ? 'Loading...' : 'Загрузка...') : t.startExam}
                </Button>
              </div>
            </CardContent>
          </Card>

          {previousAttempts.length > 0 && (
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">{t.previousAttempts}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  {previousAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {attempt.passed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold text-sm">
                            {attempt.score}% {attempt.passed ? `(${t.passed})` : `(${t.failed})`}
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(attempt.attempted_at).toLocaleDateString(language)}
                            {attempt.time_spent && ` • ${Math.round(attempt.time_spent / 60)} ${t.minutes}`}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.visit(`/grammar_exams/${attempt.id}/results`)}
                      >
                        {language === 'en' ? 'View' : 'Смотреть'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header with progress */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs sm:text-sm">{level}</Badge>
              <span className="text-sm sm:text-base text-gray-600">
                {t.question} {currentQuestionIndex + 1} {t.of} {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-xs sm:text-sm text-gray-600 text-right">
            {t.answeredQuestions}: {answeredCount}/{questions.length}
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {currentQuestion.category === 'syntax' ? t.syntax : t.morphology}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentQuestionIndex + 1}/{questions.length}
              </Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl leading-relaxed break-words">
              {currentQuestion.question}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-2">{t.selectAnswer}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3">
              {currentQuestion.options[language].map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  data-testid={`answer-option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      answers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {answers[currentQuestionIndex] === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base break-words">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.previous}
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
              data-testid="submit-exam-button"
            >
              {loading ? (language === 'en' ? 'Submitting...' : 'Отправка...') : t.submitExam}
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              {t.next}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
