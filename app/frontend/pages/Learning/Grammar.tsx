import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FileText, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react'
import { COMPREHENSIVE_GRAMMAR_LESSONS as GRAMMAR_LESSONS, getLessonsByLevel, type Level, type GrammarLesson } from '@/data/comprehensiveGrammarLessons'

export default function GrammarPage() {
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null)
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Grammar Lessons',
      description: 'Master Kyrgyz grammar step by step',
      syntax: 'Syntax',
      morphology: 'Morphology',
      yourLevel: 'Your Level',
      allLevels: 'All Levels',
      startLesson: 'Start Lesson',
      backToList: 'Back to Lessons',
      examples: 'Examples',
      exercises: 'Practice Exercises',
      explanation: 'Explanation',
      checkAnswer: 'Check Answer',
      nextExercise: 'Next Exercise',
      correct: 'Correct!',
      incorrect: 'Incorrect. Try again.',
      completed: 'Lesson Completed!'
    },
    ru: {
      title: 'Уроки грамматики',
      description: 'Освойте кыргызскую грамматику шаг за шагом',
      syntax: 'Синтаксис',
      morphology: 'Морфология',
      yourLevel: 'Ваш уровень',
      allLevels: 'Все уровни',
      startLesson: 'Начать урок',
      backToList: 'К списку уроков',
      examples: 'Примеры',
      exercises: 'Практические упражнения',
      explanation: 'Объяснение',
      checkAnswer: 'Проверить ответ',
      nextExercise: 'Следующее упражнение',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Попробуйте ещё раз.',
      completed: 'Урок завершён!'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load user level from test results
    const storedResults = localStorage.getItem('test_results')
    if (storedResults) {
      const results = JSON.parse(storedResults)
      setUserLevel(results.level || 'A1')
    }
  }, [])

  const lessons = getLessonsByLevel(userLevel)
  const syntaxLessons = lessons.filter(l => l.category === 'syntax')
  const morphologyLessons = lessons.filter(l => l.category === 'morphology')
  const finalTest = lessons.find(l => l.category === 'final_test')

  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} language={language} onBack={() => setSelectedLesson(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
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

        {/* Syntax Lessons */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t.syntax}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {syntaxLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{lesson.title[language]}</CardTitle>
                      <CardDescription className="mt-2">{lesson.description[language]}</CardDescription>
                    </div>
                    <Badge variant="outline">{lesson.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedLesson(lesson)} className="w-full">
                    {t.startLesson} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Morphology Lessons */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t.morphology}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {morphologyLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{lesson.title[language]}</CardTitle>
                      <CardDescription className="mt-2">{lesson.description[language]}</CardDescription>
                    </div>
                    <Badge variant="outline">{lesson.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedLesson(lesson)} className="w-full">
                    {t.startLesson} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Test */}
        {finalTest && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Final Test' : 'Финальный тест'}
              </h2>
            </div>
            <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{finalTest.title[language]}</CardTitle>
                    <CardDescription className="mt-2 text-base">{finalTest.description[language]}</CardDescription>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="secondary" className="text-base">
                        {finalTest.quiz.length} {language === 'en' ? 'questions' : 'вопросов'}
                      </Badge>
                      <Badge variant="outline" className="text-base">{finalTest.level}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setSelectedLesson(finalTest)} className="w-full bg-green-600 hover:bg-green-700">
                  {language === 'en' ? 'Take Final Test' : 'Пройти финальный тест'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function LessonView({
  lesson,
  language,
  onBack
}: {
  lesson: GrammarLesson
  language: 'en' | 'ru'
  onBack: () => void
}) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const translations = {
    en: {
      backToList: 'Back to Lessons',
      examples: 'Examples',
      exercises: 'Practice Exercises',
      explanation: 'Explanation',
      checkAnswer: 'Check Answer',
      nextExercise: 'Next Exercise',
      correct: 'Correct!',
      incorrect: 'Incorrect. Try again.',
      completed: 'Lesson Completed!',
      translation: 'Translation'
    },
    ru: {
      backToList: 'К списку уроков',
      examples: 'Примеры',
      exercises: 'Практические упражнения',
      explanation: 'Объяснение',
      checkAnswer: 'Проверить ответ',
      nextExercise: 'Следующее упражнение',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Попробуйте ещё раз.',
      completed: 'Урок завершён!',
      translation: 'Перевод'
    }
  }

  const t = translations[language]

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    const exercise = lesson.quiz?.[currentExercise]
    if (exercise) {
      const correct = selectedAnswer === exercise.correct
      setIsCorrect(correct)
      setShowResult(true)
    }
  }

  const handleNextExercise = () => {
    if (lesson.quiz && currentExercise < lesson.quiz.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const currentEx = lesson.quiz?.[currentExercise]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← {t.backToList}
        </Button>

        {/* Lesson Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{lesson.title[language]}</CardTitle>
                <CardDescription className="mt-2 text-base">{lesson.description[language]}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">{lesson.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Lesson Theory */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Theory' : 'Теория'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {lesson.theory[language].split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary (if available) */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Vocabulary' : 'Словарный запас'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lesson.vocabulary.map((word, idx) => (
                  <Badge key={idx} variant="secondary" className="text-base px-3 py-1">
                    {word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.examples}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {lesson.examples.map((example, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <div className="text-2xl font-bold text-blue-900 mb-2">{example.kyrgyz}</div>
                  <div className="text-gray-700 mb-2">
                    <span className="font-semibold">{t.translation}:</span> {example.translation[language]}
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-gray-600 italic">
                      <span className="font-semibold">{t.explanation}:</span> {example.explanation[language]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Exercises */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.exercises} ({currentExercise + 1}/{lesson.quiz.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {currentEx && (
                <div className="space-y-4">
                  <p className="text-lg font-semibold">{currentEx.question[language]}</p>

                  <div className="space-y-2">
                    {currentEx.options[language].map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => !showResult && setSelectedAnswer(idx)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAnswer === idx
                            ? showResult
                              ? idx === currentEx.correct
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === idx ? 'border-current' : 'border-gray-300'
                          }`}>
                            {selectedAnswer === idx && showResult && (
                              idx === currentEx.correct ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="text-red-600">✗</span>
                              )
                            )}
                          </div>
                          <span className="text-base">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isCorrect ? t.correct : t.incorrect}
                      {currentEx.explanation && (
                        <div className="mt-2 text-sm">
                          {currentEx.explanation[language]}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showResult && (
                      <Button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className="flex-1"
                      >
                        {t.checkAnswer}
                      </Button>
                    )}
                    {showResult && currentExercise < lesson.quiz.length - 1 && (
                      <Button onClick={handleNextExercise} className="flex-1">
                        {t.nextExercise} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {showResult && currentExercise === lesson.quiz.length - 1 && (
                      <Button onClick={onBack} className="flex-1">
                        {t.completed} <CheckCircle2 className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
