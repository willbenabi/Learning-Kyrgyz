import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { BookOpen, CheckCircle2, SkipForward, Flag, ArrowRight } from 'lucide-react'
import { EXTENDED_PLACEMENT_TEST, determineLevel } from '@/data/extendedPlacementTest'

export default function PlacementTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([]) // null for skipped questions
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEarlyFinishDialog, setShowEarlyFinishDialog] = useState(false)
  const [earlyFinishResult, setEarlyFinishResult] = useState<{ level: string; questionsAnswered: number } | null>(null)

  // Get interface language
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Placement Test',
      description: 'Answer 40 questions to accurately determine your Kyrgyz level (15-20 minutes)',
      progress: 'Question',
      of: 'of',
      next: 'Next',
      skip: 'Skip Question',
      finishEarly: 'Finish Early',
      finish: 'Finish Test',
      select: 'Please select an answer',
      earlyFinishTitle: 'Early Test Completion',
      earlyFinishMessage: 'Based on your answers so far:',
      detectedLevel: 'Detected Level',
      questionsAnswered: 'Questions Answered',
      continueTest: 'Continue Test',
      acceptLevel: 'Accept This Level',
      skipped: '(skipped)'
    },
    ru: {
      title: 'Тест на определение уровня',
      description: 'Ответьте на 40 вопросов для точного определения вашего уровня кыргызского языка (15-20 минут)',
      progress: 'Вопрос',
      of: 'из',
      next: 'Далее',
      skip: 'Пропустить вопрос',
      finishEarly: 'Завершить досрочно',
      finish: 'Завершить тест',
      select: 'Пожалуйста, выберите ответ',
      earlyFinishTitle: 'Досрочное завершение теста',
      earlyFinishMessage: 'На основе ваших ответов:',
      detectedLevel: 'Определен уровень',
      questionsAnswered: 'Отвечено вопросов',
      continueTest: 'Продолжить тест',
      acceptLevel: 'Принять этот уровень',
      skipped: '(пропущен)'
    }
  }
  const t = translations[language]

  const handleNext = () => {
    if (selectedOption === null) return

    // Record answer
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)

    // Move to next question or finish
    if (currentQuestionIndex < EXTENDED_PLACEMENT_TEST.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      handleFinishTest(newAnswers)
    }
  }

  const handleSkip = () => {
    // Record skipped question as null
    const newAnswers = [...answers, null]
    setAnswers(newAnswers)

    // Move to next question or finish
    if (currentQuestionIndex < EXTENDED_PLACEMENT_TEST.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      handleFinishTest(newAnswers)
    }
  }

  const handleEarlyFinish = () => {
    // Calculate current level based on answers so far
    const answeredQuestions = answers.filter(a => a !== null)

    if (answeredQuestions.length === 0) {
      // Can't finish early without any answers
      return
    }

    // Determine level from current answers (need to pad with nulls)
    const paddedAnswers = [...answers]
    while (paddedAnswers.length < EXTENDED_PLACEMENT_TEST.length) {
      paddedAnswers.push(null)
    }

    const level = determineLevel(paddedAnswers as number[])

    setEarlyFinishResult({
      level,
      questionsAnswered: answers.length
    })
    setShowEarlyFinishDialog(true)
  }

  const handleAcceptEarlyLevel = () => {
    if (!earlyFinishResult) return

    // Pad answers array to match test length (with nulls for unanswered)
    const paddedAnswers = [...answers]
    while (paddedAnswers.length < EXTENDED_PLACEMENT_TEST.length) {
      paddedAnswers.push(null)
    }

    handleFinishTest(paddedAnswers as number[])
  }

  const handleContinueTest = () => {
    setShowEarlyFinishDialog(false)
    setEarlyFinishResult(null)
  }

  const handleFinishTest = async (finalAnswers: (number | null)[]) => {
    setIsSubmitting(true)

    // Filter out nulls for level determination
    const validAnswers = finalAnswers.map(a => a === null ? -1 : a) // Use -1 for skipped
    const determinedLevel = determineLevel(validAnswers)

    // Calculate correct count (only for answered questions)
    const correctCount = finalAnswers.filter((answer, index) =>
      answer !== null && answer === EXTENDED_PLACEMENT_TEST[index].correctAnswer
    ).length

    const answeredCount = finalAnswers.filter(a => a !== null).length

    // Store results
    try {
      await fetch('/onboarding/placement-test/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({
          answers: validAnswers,
          level: determinedLevel,
          score: correctCount,
          total: answeredCount,
          skipped: EXTENDED_PLACEMENT_TEST.length - answeredCount
        }),
      })

      // Store in localStorage
      localStorage.setItem('user_level', determinedLevel)
      localStorage.setItem('test_results', JSON.stringify({
        level: determinedLevel,
        score: correctCount,
        total: answeredCount,
        skipped: EXTENDED_PLACEMENT_TEST.length - answeredCount,
        answers: validAnswers
      }))

      // Redirect to diagnostics
      router.visit('/onboarding/diagnostics', { replace: true })
    } catch (err) {
      console.error('Failed to submit test:', err)
      setIsSubmitting(false)
    }
  }

  const currentQuestion = EXTENDED_PLACEMENT_TEST[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / EXTENDED_PLACEMENT_TEST.length) * 100

  // Early finish dialog
  if (showEarlyFinishDialog && earlyFinishResult) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t.earlyFinishTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{t.earlyFinishMessage}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">{t.detectedLevel}</div>
                <div className="text-4xl font-bold text-primary">{earlyFinishResult.level}</div>
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground">{t.questionsAnswered}</div>
                <div className="text-2xl font-semibold">
                  {earlyFinishResult.questionsAnswered} {t.of} {EXTENDED_PLACEMENT_TEST.length}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleContinueTest}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {t.continueTest}
              </Button>
              <Button
                onClick={handleAcceptEarlyLevel}
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t.acceptLevel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-32 md:pb-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-muted-foreground">
                {t.progress} {currentQuestionIndex + 1} {t.of} {EXTENDED_PLACEMENT_TEST.length}
              </div>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6 pb-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

            {currentQuestion.instruction && (
              <p className="text-sm text-muted-foreground italic">
                {currentQuestion.instruction[language]}
              </p>
)}

            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
            >
              <div className="space-y-3">
                {currentQuestion.options[language].map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOption(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {selectedOption === null && answers.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">{t.select}</p>
          )}
        </CardContent>
      </Card>

      {/* Fixed bottom buttons on mobile, normal on desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg md:hidden z-10">
        <div className="flex justify-between items-center gap-3 max-w-3xl mx-auto">
          {/* Left side buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSkip}
              variant="outline"
              size="default"
              disabled={isSubmitting}
            >
              <SkipForward className="w-4 h-4 md:mr-2" />
              <span className="hidden sm:inline">{t.skip}</span>
            </Button>

            {answers.length > 0 && (
              <Button
                onClick={handleEarlyFinish}
                variant="secondary"
                size="default"
                disabled={isSubmitting}
              >
                <Flag className="w-4 h-4 md:mr-2" />
                <span className="hidden sm:inline">{t.finishEarly}</span>
              </Button>
            )}
          </div>

          {/* Right side button */}
          <Button
            onClick={handleNext}
            disabled={selectedOption === null || isSubmitting}
            size="default"
            data-testid="test-next-button"
          >
            {currentQuestionIndex === EXTENDED_PLACEMENT_TEST.length - 1 ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t.finish}
              </>
            ) : (
              t.next
            )}
          </Button>
        </div>
      </div>

      {/* Desktop buttons (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex justify-between items-center gap-3">
            {/* Left side buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSkip}
                variant="outline"
                size="lg"
                disabled={isSubmitting}
              >
                <SkipForward className="w-4 h-4 mr-2" />
                {t.skip}
              </Button>

              {answers.length > 0 && (
                <Button
                  onClick={handleEarlyFinish}
                  variant="secondary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {t.finishEarly}
                </Button>
              )}
            </div>

            {/* Right side button */}
            <Button
              onClick={handleNext}
              disabled={selectedOption === null || isSubmitting}
              size="lg"
              data-testid="test-next-button"
            >
              {currentQuestionIndex === EXTENDED_PLACEMENT_TEST.length - 1 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t.finish}
                </>
              ) : (
                t.next
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
