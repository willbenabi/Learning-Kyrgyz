import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react'

interface ExamResultsProps {
  exam: {
    id: number
    level: string
    score: number
    passed: boolean
    attempted_at: string
    time_spent: number | null
    category_breakdown: Record<string, { correct: number; total: number }>
    incorrect_answers: Array<{
      question_id: number
      category: string
      selected_index: number
      correct_index: number
      options: {
        en: string[]
        ru: string[]
      }
      explanation: string | null
      correct: boolean
    }>
  }
  bestScore: number
}

export default function GrammarExamResults({ exam, bestScore }: ExamResultsProps) {
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Exam Results',
      subtitle: 'Your performance on the grammar comprehensive exam',
      level: 'Level',
      score: 'Score',
      bestScore: 'Best Score',
      passed: 'Passed',
      failed: 'Failed',
      passingScore: 'Passing Score: 70%',
      timeSpent: 'Time Spent',
      minutes: 'minutes',
      categoryBreakdown: 'Category Breakdown',
      syntax: 'Syntax',
      morphology: 'Morphology',
      correct: 'Correct',
      incorrect: 'Incorrect',
      incorrectAnswers: 'Questions to Review',
      yourAnswer: 'Your Answer',
      correctAnswer: 'Correct Answer',
      explanation: 'Explanation',
      retakeExam: 'Retake Exam',
      backToGrammar: 'Back to Grammar',
      congratulations: 'Congratulations!',
      passedMessage: 'You passed the exam! Great work on mastering this level.',
      failedMessage: 'Keep practicing! Review the topics below and try again.',
      newBestScore: 'New Best Score!',
      percentageCorrect: '% Correct'
    },
    ru: {
      title: 'Результаты экзамена',
      subtitle: 'Ваша производительность на комплексном экзамене по грамматике',
      level: 'Уровень',
      score: 'Результат',
      bestScore: 'Лучший результат',
      passed: 'Сдан',
      failed: 'Не сдан',
      passingScore: 'Проходной балл: 70%',
      timeSpent: 'Затрачено времени',
      minutes: 'минут',
      categoryBreakdown: 'Разбор по категориям',
      syntax: 'Синтаксис',
      morphology: 'Морфология',
      correct: 'Правильно',
      incorrect: 'Неправильно',
      incorrectAnswers: 'Вопросы для повторения',
      yourAnswer: 'Ваш ответ',
      correctAnswer: 'Правильный ответ',
      explanation: 'Объяснение',
      retakeExam: 'Пересдать экзамен',
      backToGrammar: 'К грамматике',
      congratulations: 'Поздравляем!',
      passedMessage: 'Вы сдали экзамен! Отличная работа по освоению этого уровня.',
      failedMessage: 'Продолжайте практиковаться! Повторите темы ниже и попробуйте снова.',
      newBestScore: 'Новый рекорд!',
      percentageCorrect: '% правильно'
    }
  }

  const t = translations[language]

  const formatTime = (seconds: number | null) => {
    if (!seconds) return '--'
    const mins = Math.floor(seconds / 60)
    return `${mins} ${t.minutes}`
  }

  const isNewBestScore = exam.score === bestScore && exam.score > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.visit('/learning/grammar')} className="mb-4 sm:mb-6">
          <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
          {t.backToGrammar}
        </Button>

        {/* Results Header */}
        <Card className={`mb-6 ${exam.passed ? 'border-2 border-green-500' : 'border-2 border-orange-500'}`}>
          <CardHeader className={`p-4 sm:p-6 ${exam.passed ? 'bg-gradient-to-br from-green-50 to-white' : 'bg-gradient-to-br from-orange-50 to-white'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {exam.passed ? (
                    <Trophy className="h-6 w-6 text-green-600 shrink-0" />
                  ) : (
                    <RotateCcw className="h-6 w-6 text-orange-600 shrink-0" />
                  )}
                  <CardTitle className="text-2xl sm:text-3xl break-words">
                    {exam.passed ? t.congratulations : t.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-base">
                  {exam.passed ? t.passedMessage : t.failedMessage}
                </CardDescription>
              </div>
              <Badge
                variant={exam.passed ? 'default' : 'secondary'}
                className={`text-lg sm:text-xl px-3 sm:px-4 py-2 shrink-0 ${
                  exam.passed ? 'bg-green-600' : 'bg-orange-600'
                }`}
              >
                {exam.score}%
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-gray-600 mb-1">{t.level}</div>
                <div className="text-lg font-bold">{exam.level}</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-gray-600 mb-1">{t.timeSpent}</div>
                <div className="text-lg font-bold">{formatTime(exam.time_spent)}</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-gray-600 mb-1">{t.bestScore}</div>
                <div className="text-lg font-bold flex items-center gap-1">
                  {bestScore}%
                  {isNewBestScore && <Award className="h-4 w-4 text-yellow-600" />}
                </div>
              </div>
            </div>

            {isNewBestScore && exam.passed && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-sm text-yellow-800">
                <Award className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{t.newBestScore}</span>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-6">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">{t.categoryBreakdown}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {Object.entries(exam.category_breakdown).map(([category, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100)
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">
                          {category === 'syntax' ? t.syntax : t.morphology}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {stats.correct}/{stats.total}
                        </Badge>
                      </div>
                      <span className={`font-bold ${percentage >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Incorrect Answers */}
        {exam.incorrect_answers.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-orange-600 shrink-0" />
                <CardTitle className="text-lg sm:text-xl">{t.incorrectAnswers}</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                {exam.incorrect_answers.length} {language === 'en' ? 'question(s)' : 'вопрос(ов)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {exam.incorrect_answers.map((answer, index) => (
                  <div key={index} className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {answer.category === 'syntax' ? t.syntax : t.morphology}
                      </Badge>
                    </div>

                    {/* Your answer */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-600 mb-1">{t.yourAnswer}:</div>
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-red-700 break-words">
                          {answer.selected_index >= 0
                            ? answer.options[language][answer.selected_index]
                            : (language === 'en' ? 'No answer selected' : 'Не выбран ответ')
                          }
                        </div>
                      </div>
                    </div>

                    {/* Correct answer */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-600 mb-1">{t.correctAnswer}:</div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-green-700 font-semibold break-words">
                          {answer.options[language][answer.correct_index]}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    {answer.explanation && (
                      <div className="pt-3 border-t border-orange-300">
                        <div className="text-xs text-gray-600 mb-1">{t.explanation}:</div>
                        <div className="text-sm text-gray-700 break-words">{answer.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => router.visit('/learning/grammar')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToGrammar}
          </Button>
          <Button
            onClick={() => router.visit(`/grammar_exams/new?level=${exam.level}`)}
            className="flex-1"
            data-testid="retake-exam-button"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.retakeExam}
          </Button>
        </div>
      </div>
    </div>
  )
}
