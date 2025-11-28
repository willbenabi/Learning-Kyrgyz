import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { PLACEMENT_TEST_QUESTIONS, type Question, type Level } from '@/data/placementTestQuestions'

const LEVEL_ORDER: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']

interface Answer {
  questionId: string
  selectedOption: number
  correct: boolean
  level: Level
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[]
  shuffledCorrect: number
}

export default function PlacementTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get interface language
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Placement Test',
      description: 'Answer 20 questions to determine your Kyrgyz level',
      progress: 'Question',
      of: 'of',
      next: 'Next',
      finish: 'Finish Test',
      select: 'Please select an answer'
    },
    ru: {
      title: 'Тест на определение уровня',
      description: 'Ответьте на 20 вопросов, чтобы определить ваш уровень кыргызского языка',
      progress: 'Вопрос',
      of: 'из',
      next: 'Далее',
      finish: 'Завершить тест',
      select: 'Пожалуйста, выберите ответ'
    }
  }
  const t = translations[language]

  // Initialize test with adaptive questions
  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Shuffle options for each question based on language
    const shuffleQuestion = (q: Question): ShuffledQuestion => {
      const indices = [0, 1, 2, 3]
      const shuffledIndices = shuffleArray(indices)
      const newCorrect = shuffledIndices.indexOf(q.correct)
      const optionsInLanguage = q.options[language]

      return {
        ...q,
        shuffledOptions: shuffledIndices.map(i => optionsInLanguage[i]),
        shuffledCorrect: newCorrect
      }
    }

    // Group questions by level
    const questionsByLevel: Record<Level, Question[]> = {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
      C1: []
    }

    PLACEMENT_TEST_QUESTIONS.forEach(q => {
      questionsByLevel[q.level].push(q)
    })

    // Shuffle questions within each level
    const shuffledByLevel: Record<Level, Question[]> = {
      A1: shuffleArray(questionsByLevel.A1),
      A2: shuffleArray(questionsByLevel.A2),
      B1: shuffleArray(questionsByLevel.B1),
      B2: shuffleArray(questionsByLevel.B2),
      C1: shuffleArray(questionsByLevel.C1)
    }

    // Adaptive selection: Start easy (A1), progress based on performance
    const selectedQuestions: ShuffledQuestion[] = []
    let currentLevel: Level = 'A1' // Start at A1 (easiest)
    const levelCounts: Record<Level, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 }

    // Select 20 questions with adaptive difficulty simulation
    for (let i = 0; i < 20; i++) {
      const availableInLevel = shuffledByLevel[currentLevel][levelCounts[currentLevel]]

      if (availableInLevel) {
        selectedQuestions.push(shuffleQuestion(availableInLevel))
        levelCounts[currentLevel]++

        // Simulate adaptive progression
        // Every 4 questions, increase difficulty if possible
        if ((i + 1) % 4 === 0) {
          const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel)
          if (currentLevelIndex < LEVEL_ORDER.length - 1) {
            currentLevel = LEVEL_ORDER[currentLevelIndex + 1]
          }
        }
      }
    }

    setQuestions(selectedQuestions)
  }, [language])

  const handleNext = () => {
    if (selectedOption === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.shuffledCorrect

    // Record answer
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedOption,
        correct: isCorrect,
        level: currentQuestion.level
      }
    ])

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      handleFinishTest()
    }
  }

  const handleFinishTest = async () => {
    setIsSubmitting(true)

    // Calculate level based on answers
    const finalAnswers = [...answers]
    if (selectedOption !== null) {
      const currentQuestion = questions[currentQuestionIndex]
      finalAnswers.push({
        questionId: currentQuestion.id,
        selectedOption,
        correct: selectedOption === currentQuestion.shuffledCorrect,
        level: currentQuestion.level
      })
    }

    const correctCount = finalAnswers.filter(a => a.correct).length
    const totalCount = finalAnswers.length

    // Calculate level based on score
    let determinedLevel: Level
    const percentage = (correctCount / totalCount) * 100

    if (percentage >= 90) determinedLevel = 'C1'
    else if (percentage >= 75) determinedLevel = 'B2'
    else if (percentage >= 60) determinedLevel = 'B1'
    else if (percentage >= 40) determinedLevel = 'A2'
    else determinedLevel = 'A1'

    // Store results
    try {
      await fetch('/onboarding/placement-test/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          answers: finalAnswers,
          level: determinedLevel,
          score: correctCount,
          total: totalCount
        }),
      })

      // Store in localStorage for mock implementation
      localStorage.setItem('test_results', JSON.stringify({
        level: determinedLevel,
        score: correctCount,
        total: totalCount,
        answers: finalAnswers,
        questions: questions
      }))

      // Redirect to diagnostics
      router.visit('/onboarding/diagnostics', { replace: true })
    } catch (err) {
      console.error('Failed to submit test:', err)
      setIsSubmitting(false)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

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
                {t.progress} {currentQuestionIndex + 1} {t.of} {questions.length}
              </div>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{currentQuestion.question[language]}</h3>

            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
            >
              <div className="space-y-3">
                {currentQuestion.shuffledOptions.map((option, index) => (
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
              {currentQuestionIndex === questions.length - 1 ? (
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
