import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { EXTENDED_PLACEMENT_TEST, determineLevel } from '@/data/extendedPlacementTest'

export default function PlacementTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get interface language
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Placement Test',
      description: 'Answer 40 questions to accurately determine your Kyrgyz level (15-20 minutes)',
      progress: 'Question',
      of: 'of',
      next: 'Next',
      finish: 'Finish Test',
      select: 'Please select an answer'
    },
    ru: {
      title: 'Тест на определение уровня',
      description: 'Ответьте на 40 вопросов для точного определения вашего уровня кыргызского языка (15-20 минут)',
      progress: 'Вопрос',
      of: 'из',
      next: 'Далее',
      finish: 'Завершить тест',
      select: 'Пожалуйста, выберите ответ'
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

  const handleFinishTest = async (finalAnswers: number[]) => {
    setIsSubmitting(true)

    // Determine level using the algorithm from extendedPlacementTest
    const determinedLevel = determineLevel(finalAnswers)

    // Calculate correct count
    const correctCount = finalAnswers.filter((answer, index) =>
      answer === EXTENDED_PLACEMENT_TEST[index].correctAnswer
    ).length

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
          answers: finalAnswers,
          level: determinedLevel,
          score: correctCount,
          total: EXTENDED_PLACEMENT_TEST.length
        }),
      })

      // Store in localStorage for mock implementation
      localStorage.setItem('test_results', JSON.stringify({
        level: determinedLevel,
        score: correctCount,
        total: EXTENDED_PLACEMENT_TEST.length,
        answers: finalAnswers
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
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

        <CardContent className="space-y-6">
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

          <div className="flex justify-end">
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

          {selectedOption === null && (
            <p className="text-sm text-muted-foreground text-center">{t.select}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
