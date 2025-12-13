import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FileText, ArrowRight, CheckCircle2, ArrowLeft, Check, Award, Lock, Trophy } from 'lucide-react'
import { COMPREHENSIVE_GRAMMAR_LESSONS as GRAMMAR_LESSONS, getLessonsByLevel, type Level, type GrammarLesson } from '@/data/comprehensiveGrammarLessons'
import { trackLessonCompletion } from '@/lib/progressTracker'
import authService from '@/lib/auth'
import * as localProgress from '@/lib/progressHelper'
import * as dbProgress from '@/lib/progressApi'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function GrammarPage() {
  const { props } = usePage()
  const currentUser = props.auth?.user

  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'
  const [examUnlocked, setExamUnlocked] = useState(false)
  const [examBestScore, setExamBestScore] = useState<number | null>(null)
  const [examAttempts, setExamAttempts] = useState(0)

  const translations = {
    en: {
      title: 'Grammar Lessons',
      description: 'Master Kyrgyz grammar step by step',
      syntax: 'Syntax',
      morphology: 'Morphology',
      yourLevel: 'Your Level',
      allLevels: 'All Levels',
      startLesson: 'Start Lesson',
      restartLesson: 'Restart Lesson',
      backToList: 'Back to Lessons',
      examples: 'Examples',
      exercises: 'Practice Exercises',
      explanation: 'Explanation',
      checkAnswer: 'Check Answer',
      nextExercise: 'Next Exercise',
      correct: 'Correct!',
      incorrect: 'Incorrect. Try again.',
      completed: 'Lesson Completed!',
      finalExam: 'Final Comprehensive Exam',
      finalExamTitle: 'Level Completion Exam',
      finalExamDesc: '35 comprehensive questions covering all grammar topics',
      takeExam: 'Take Exam',
      retakeExam: 'Retake Exam',
      examLocked: 'Complete all lessons to unlock',
      examUnlocked: 'Exam Available',
      bestScore: 'Best Score',
      attempts: 'Attempts'
    },
    ru: {
      title: 'Уроки грамматики',
      description: 'Освойте кыргызскую грамматику шаг за шагом',
      syntax: 'Синтаксис',
      morphology: 'Морфология',
      yourLevel: 'Ваш уровень',
      allLevels: 'Все уровни',
      startLesson: 'Начать урок',
      restartLesson: 'Повторить урок',
      backToList: 'К списку уроков',
      examples: 'Примеры',
      exercises: 'Практические упражнения',
      explanation: 'Объяснение',
      checkAnswer: 'Проверить ответ',
      nextExercise: 'Следующее упражнение',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Попробуйте ещё раз.',
      completed: 'Урок завершён!',
      finalExam: 'Финальный комплексный экзамен',
      finalExamTitle: 'Экзамен на завершение уровня',
      finalExamDesc: '35 комплексных вопросов по всем темам грамматики',
      takeExam: 'Сдать экзамен',
      retakeExam: 'Пересдать экзамен',
      examLocked: 'Завершите все уроки чтобы разблокировать',
      examUnlocked: 'Экзамен доступен',
      bestScore: 'Лучший результат',
      attempts: 'Попытки'
    }
  }

  const t = translations[language]

  useEffect(() => {
    const loadProgress = async () => {
      // Load user level from localStorage
      const level = localStorage.getItem('user_level') as Level | null
      if (level) {
        setUserLevel(level)
      }

      // Load completed lessons based on authentication
      if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
        // Authenticated user - load from database
        try {
          await dbProgress.refreshProgressCache()
          const completed = dbProgress.getCompletedLessons('grammar')
          setCompletedLessons(completed)
        } catch (error) {
          console.error('Failed to load progress from database:', error)
          // Fall back to localStorage
          const localCompleted = localProgress.getCompletedLessonsForLevel(level || 'A1', 'grammar')
          setCompletedLessons(localCompleted)
        }
      } else {
        // Guest user - load from localStorage
        const localCompleted = localProgress.getCompletedLessonsForLevel(level || 'A1', 'grammar')
        setCompletedLessons(localCompleted)
      }

      setLoading(false)
    }

    loadProgress()
  }, [currentUser, refreshKey])

  // Load exam availability and stats
  useEffect(() => {
    const checkExamAvailability = async () => {
      try {
        const response = await fetch(`/grammar_exams/new?level=${userLevel}`, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(authService.getToken() ? { 'Authorization': `Bearer ${authService.getToken()}` } : {})
          }
        })

        if (response.ok) {
          const data = await response.json()
          setExamUnlocked(data.can_take_exam)
          setExamBestScore(data.best_score)
          setExamAttempts(data.attempt_count)
        }
      } catch (error) {
        console.error('Failed to check exam availability:', error)
      }
    }

    if (currentUser) {
      checkExamAvailability()
    }
  }, [currentUser, userLevel, refreshKey])

  const lessons = getLessonsByLevel(userLevel)
  const syntaxLessons = lessons.filter(l => l.category === 'syntax')
  const morphologyLessons = lessons.filter(l => l.category === 'morphology')
  const finalTest = lessons.find(l => l.category === 'final_test')

  // Helper function to check if lesson is completed
  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId)

  // Check if all regular lessons are completed
  const regularLessons = [...syntaxLessons, ...morphologyLessons]
  const allLessonsCompleted = regularLessons.length > 0 && regularLessons.every(l => isLessonCompleted(l.id))
  const showFinalTest = finalTest && allLessonsCompleted

  const handleLessonComplete = () => {
    setSelectedLesson(null)
    setRefreshKey(prev => prev + 1) // Force re-render to show updated completion status
  }

  if (selectedLesson) {
    return <LessonView lesson={selectedLesson} language={language} currentUser={currentUser} onBack={() => setSelectedLesson(null)} onComplete={handleLessonComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6">
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

        {/* Syntax Lessons */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{t.syntax}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2" key={`syntax-${refreshKey}`}>
            {syntaxLessons.map((lesson) => {
              const completed = isLessonCompleted(lesson.id)
              return (
                <Card
                  key={lesson.id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${completed ? 'bg-green-50 border-green-300' : ''}`}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base sm:text-lg break-words">{lesson.title[language]}</CardTitle>
                          {completed && <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />}
                        </div>
                        <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm break-words">{lesson.description[language]}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0 self-start">{lesson.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <Button
                      onClick={() => setSelectedLesson(lesson)}
                      className="w-full text-xs sm:text-sm"
                      variant={completed ? "outline" : "default"}
                    >
                      {completed ? t.restartLesson : t.startLesson}
                      <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Morphology Lessons */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{t.morphology}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2" key={`morphology-${refreshKey}`}>
            {morphologyLessons.map((lesson) => {
              const completed = isLessonCompleted(lesson.id)
              return (
                <Card
                  key={lesson.id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${completed ? 'bg-green-50 border-green-300' : ''}`}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base sm:text-lg break-words">{lesson.title[language]}</CardTitle>
                          {completed && <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />}
                        </div>
                        <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm break-words">{lesson.description[language]}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0 self-start">{lesson.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <Button
                      onClick={() => setSelectedLesson(lesson)}
                      className="w-full text-xs sm:text-sm"
                      variant={completed ? "outline" : "default"}
                    >
                      {completed ? t.restartLesson : t.startLesson}
                      <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Final Test */}
        {showFinalTest && (
          <div>
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {language === 'en' ? 'Final Test' : 'Финальный тест'}
              </h2>
            </div>
            <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl break-words">{finalTest.title[language]}</CardTitle>
                    <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-base break-words">{finalTest.description[language]}</CardDescription>
                    <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs sm:text-base">
                        {finalTest.quiz.length} {language === 'en' ? 'questions' : 'вопросов'}
                      </Badge>
                      <Badge variant="outline" className="text-xs sm:text-base">{finalTest.level}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button onClick={() => setSelectedLesson(finalTest)} className="w-full bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                  {language === 'en' ? 'Take Final Test' : 'Пройти финальный тест'} <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Final Comprehensive Exam */}
        {currentUser && (
          <div className="mt-6 sm:mt-8">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              {examUnlocked ? (
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
              ) : (
                <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 shrink-0" />
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{t.finalExam}</h2>
            </div>
            <Card className={`border-2 transition-all ${
              examUnlocked
                ? 'border-blue-500 hover:shadow-lg cursor-pointer bg-gradient-to-br from-blue-50 to-white'
                : 'border-gray-300 bg-gray-50 opacity-60'
            }`}>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg sm:text-xl break-words">{t.finalExamTitle}</CardTitle>
                      {examBestScore !== null && examBestScore >= 70 && (
                        <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 shrink-0" />
                      )}
                    </div>
                    <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-base break-words">{t.finalExamDesc}</CardDescription>
                    <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs sm:text-base">
                        35 {language === 'en' ? 'questions' : 'вопросов'}
                      </Badge>
                      <Badge variant="outline" className="text-xs sm:text-base">{userLevel}</Badge>
                      {examUnlocked ? (
                        <Badge className="bg-green-600 text-xs sm:text-base">{t.examUnlocked}</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs sm:text-base">{t.examLocked}</Badge>
                      )}
                    </div>
                    {examBestScore !== null && examAttempts > 0 && (
                      <div className="mt-3 flex flex-wrap gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                          <span className="font-semibold">{t.bestScore}:</span>
                          <span className={examBestScore >= 70 ? 'text-green-600 font-bold' : 'text-gray-700'}>
                            {examBestScore}%
                          </span>
                        </div>
                        <div className="text-gray-600">
                          {t.attempts}: {examAttempts}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button
                  onClick={() => examUnlocked && router.visit(`/grammar_exams/new?level=${userLevel}`)}
                  disabled={!examUnlocked}
                  className="w-full text-xs sm:text-sm"
                  variant={examUnlocked ? 'default' : 'secondary'}
                >
                  {examUnlocked ? (
                    <>
                      {examAttempts > 0 ? t.retakeExam : t.takeExam} <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> {t.examLocked}
                    </>
                  )}
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
  currentUser,
  onBack,
  onComplete
}: {
  lesson: GrammarLesson
  language: 'en' | 'ru'
  currentUser: any
  onBack: () => void
  onComplete?: () => void
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-4 sm:mb-6 text-xs sm:text-sm">
          ← {t.backToList}
        </Button>

        {/* Lesson Header */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl sm:text-3xl break-words">{lesson.title[language]}</CardTitle>
                <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-base break-words">{lesson.description[language]}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm sm:text-lg px-2 sm:px-3 py-1 shrink-0 self-start">{lesson.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Lesson Theory */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">{language === 'en' ? 'Theory' : 'Теория'}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="prose max-w-none text-sm sm:text-base">
              {lesson.theory[language].split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-3 sm:mb-4 whitespace-pre-wrap break-words">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary (if available) */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">{language === 'en' ? 'Vocabulary' : 'Словарный запас'}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {lesson.vocabulary.map((word, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs sm:text-base px-2 sm:px-3 py-1">
                    {word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">{t.examples}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              {lesson.examples.map((example, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <div className="text-lg sm:text-2xl font-bold text-blue-900 mb-1 sm:mb-2 break-words">{example.kyrgyz}</div>
                  <div className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2 break-words">
                    <span className="font-semibold">{t.translation}:</span> {example.translation[language]}
                  </div>
                  {example.explanation && (
                    <div className="text-xs sm:text-sm text-gray-600 italic break-words">
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
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">{t.exercises} ({currentExercise + 1}/{lesson.quiz.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {currentEx && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg font-semibold break-words">{currentEx.question[language]}</p>

                  <div className="space-y-2">
                    {currentEx.options[language].map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => !showResult && setSelectedAnswer(idx)}
                        className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAnswer === idx
                            ? showResult
                              ? idx === currentEx.correct
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedAnswer === idx ? 'border-current' : 'border-gray-300'
                          }`}>
                            {selectedAnswer === idx && showResult && (
                              idx === currentEx.correct ? (
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                              ) : (
                                <span className="text-red-600 text-sm">✗</span>
                              )
                            )}
                          </div>
                          <span className="text-xs sm:text-base break-words">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`p-3 sm:p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <div className="text-sm sm:text-base break-words">{isCorrect ? t.correct : t.incorrect}</div>
                      {currentEx.explanation && (
                        <div className="mt-2 text-xs sm:text-sm break-words">
                          {currentEx.explanation[language]}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {!showResult && (
                      <Button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        {t.checkAnswer}
                      </Button>
                    )}
                    {showResult && currentExercise < lesson.quiz.length - 1 && (
                      <Button onClick={handleNextExercise} className="flex-1 text-xs sm:text-sm">
                        {t.nextExercise} <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                    {showResult && currentExercise === lesson.quiz.length - 1 && (
                      <Button onClick={async () => {
                        // Mark lesson as completed
                        await trackLessonCompletion({
                          moduleType: 'grammar',
                          lessonId: lesson.id,
                          score: undefined,
                          timeSpent: undefined
                        })
                        // Refresh the progress cache to show updated completions
                        if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
                          await dbProgress.refreshProgressCache()
                        }
                        if (onComplete) {
                          onComplete()
                        } else {
                          onBack()
                        }
                      }} className="flex-1 text-xs sm:text-sm">
                        {t.completed} <CheckCircle2 className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
