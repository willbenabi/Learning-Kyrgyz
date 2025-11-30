import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { FileText, BookOpen, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react'
import { READING_LESSONS, getLessonsByLevel, type Level, type ReadingLesson } from '@/data/readingLessons'

export default function ReadingPage() {
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedLesson, setSelectedLesson] = useState<ReadingLesson | null>(null)
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Reading & Comprehension',
      description: 'Practice reading Kyrgyz texts and improve comprehension',
      yourLevel: 'Your Level',
      startReading: 'Start Reading',
      backToList: 'Back to Texts',
      textType: 'Text Type',
      questions: 'Comprehension Questions',
      checkAnswers: 'Check Answers',
      yourAnswer: 'Your Answer',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      completed: 'Reading Completed!',
      score: 'Score',
      continueReading: 'Continue Reading',
      comprehensionQuestions: 'Comprehension Questions'
    },
    ru: {
      title: 'Чтение и понимание',
      description: 'Практикуйте чтение кыргызских текстов и улучшайте понимание',
      yourLevel: 'Ваш уровень',
      startReading: 'Начать чтение',
      backToList: 'К списку текстов',
      textType: 'Тип текста',
      questions: 'Вопросы на понимание',
      checkAnswers: 'Проверить ответы',
      yourAnswer: 'Ваш ответ',
      correct: 'Правильно!',
      incorrect: 'Неправильно',
      completed: 'Чтение завершено!',
      score: 'Результат',
      continueReading: 'Продолжить чтение',
      comprehensionQuestions: 'Вопросы на понимание'
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

  const lessons = getLessonsByLevel(userLevel)

  if (selectedLesson) {
    return <ReadingView lesson={selectedLesson} language={language} onBack={() => setSelectedLesson(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
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

        {/* Reading Texts */}
        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{lesson.title[language]}</CardTitle>
                    <CardDescription className="mt-2">{lesson.description[language]}</CardDescription>
                    <div className="mt-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{lesson.textType[language]}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{lesson.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setSelectedLesson(lesson)} className="w-full">
                  {t.startReading} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReadingView({
  lesson,
  language,
  onBack
}: {
  lesson: ReadingLesson
  language: 'en' | 'ru'
  onBack: () => void
}) {
  const [answers, setAnswers] = useState<Record<string, number | string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const translations = {
    en: {
      backToList: 'Back to Texts',
      textType: 'Text Type',
      comprehensionQuestions: 'Comprehension Questions',
      checkAnswers: 'Check Answers',
      yourAnswer: 'Your Answer (write in Kyrgyz)',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      completed: 'Reading Completed!',
      score: 'Score',
      continueReading: 'Continue Reading',
      openEndedNote: 'Open-ended questions help you practice thinking in Kyrgyz. There are no wrong answers!'
    },
    ru: {
      backToList: 'К списку текстов',
      textType: 'Тип текста',
      comprehensionQuestions: 'Вопросы на понимание',
      checkAnswers: 'Проверить ответы',
      yourAnswer: 'Ваш ответ (пишите на кыргызском)',
      correct: 'Правильно!',
      incorrect: 'Неправильно',
      completed: 'Чтение завершено!',
      score: 'Результат',
      continueReading: 'Продолжить чтение',
openEndedNote: 'Открытые вопросы помогают практиковать мышление на кыргызском. Нет неправильных ответов!'
    }
  }

  const t = translations[language]

  const handleCheckAnswers = () => {
    let correctCount = 0
    let totalMultipleChoice = 0

    lesson.questions.forEach((question) => {
      if (question.type === 'multiple_choice' && question.correct !== undefined) {
        totalMultipleChoice++
        if (answers[question.id] === question.correct) {
          correctCount++
        }
      }
    })

    setScore(totalMultipleChoice > 0 ? Math.round((correctCount / totalMultipleChoice) * 100) : 0)
    setShowResults(true)
  }

  const handleAnswerChange = (questionId: string, value: number | string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    })
  }

  const allQuestionsAnswered = lesson.questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToList}
        </Button>

        {/* Reading Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{lesson.title[language]}</CardTitle>
                <CardDescription className="mt-2 text-base">{lesson.description[language]}</CardDescription>
                <div className="mt-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{lesson.textType[language]}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">{lesson.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Reading Text */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <CardTitle>Text</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-xl leading-relaxed text-gray-900 whitespace-pre-wrap">{lesson.text}</p>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <CardTitle>{t.comprehensionQuestions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {lesson.questions.map((question, idx) => (
                <div key={question.id} className="space-y-3">
                  <p className="text-lg font-semibold">
                    {idx + 1}. {question.question}
                  </p>

                  {question.type === 'multiple_choice' && question.options ? (
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => {
                        const isSelected = answers[question.id] === optIdx
                        const isCorrect = question.correct === optIdx
                        const showFeedback = showResults && isSelected

                        return (
                          <div
                            key={optIdx}
                            onClick={() => !showResults && handleAnswerChange(question.id, optIdx)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? showFeedback
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-red-500 bg-red-50'
                                  : 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-400'
                            } ${showResults ? 'cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-current' : 'border-gray-300'
                              }`}>
                                {isSelected && showResults && (
                                  isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <span className="text-red-600">✗</span>
                                  )
                                )}
                              </div>
                              <span className="text-base">{option}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder={t.yourAnswer}
                        value={(answers[question.id] as string) || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        disabled={showResults}
                        className="min-h-[100px] text-base"
                        dir="ltr"
                      />
                      {question.id === lesson.questions[0]?.id && (
                        <p className="text-sm text-gray-500 italic">{t.openEndedNote}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Results and Actions */}
            <div className="mt-6 space-y-4">
              {showResults && (
                <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-900">{t.score}:</span>
                    <span className="text-2xl font-bold text-blue-900">{score}%</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!showResults && (
                  <Button
                    onClick={handleCheckAnswers}
                    disabled={!allQuestionsAnswered}
                    className="flex-1"
                  >
                    {t.checkAnswers}
                  </Button>
                )}
                {showResults && (
                  <Button onClick={onBack} className="flex-1">
                    {t.continueReading} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
