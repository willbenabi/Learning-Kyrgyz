import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { BookOpen, CheckCircle2 } from 'lucide-react'

// Mock questions organized by level (based on Google Doc structure)
const QUESTIONS_BY_LEVEL = {
  A1: [
    {
      id: 'a1_1',
      question: 'What does "Салам" mean?',
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correct: 0,
      level: 'A1'
    },
    {
      id: 'a1_2',
      question: 'How do you say "Thank you" in Kyrgyz?',
      options: ['Рахмат', 'Кош', 'Жакшы', 'Ооба'],
      correct: 0,
      level: 'A1'
    },
    {
      id: 'a1_3',
      question: 'What is the Kyrgyz word for "water"?',
      options: ['Тамак', 'Суу', 'Чай', 'Сүт'],
      correct: 1,
      level: 'A1'
    },
    {
      id: 'a1_4',
      question: '"Кандайсың?" means:',
      options: ['How are you?', 'What is your name?', 'Where are you?', 'Who are you?'],
      correct: 0,
      level: 'A1'
    }
  ],
  A2: [
    {
      id: 'a2_1',
      question: 'Complete: "Мен ___ барам" (I am going to school)',
      options: ['мектепке', 'мектеп', 'мектептен', 'мектепти'],
      correct: 0,
      level: 'A2'
    },
    {
      id: 'a2_2',
      question: 'What is the plural form of "китеп" (book)?',
      options: ['китептер', 'китеп', 'китептен', 'китепке'],
      correct: 0,
      level: 'A2'
    },
    {
      id: 'a2_3',
      question: '"Мен бүгүн иштедим" means:',
      options: ['I work today', 'I worked today', 'I will work today', 'I am working today'],
      correct: 1,
      level: 'A2'
    },
    {
      id: 'a2_4',
      question: 'How do you say "I want to eat"?',
      options: ['Мен тамак жегим келет', 'Мен тамак жедим', 'Мен тамак жейм', 'Мен тамак жеймин'],
      correct: 0,
      level: 'A2'
    }
  ],
  B1: [
    {
      id: 'b1_1',
      question: 'Which suffix indicates direction towards something?',
      options: ['-ке/-ге', '-ден/-дан', '-да/-де', '-ны/-ну'],
      correct: 0,
      level: 'B1'
    },
    {
      id: 'b1_2',
      question: 'Complete: "Эгер мен бай ___, үй алмакмын" (If I were rich, I would buy a house)',
      options: ['болсом', 'болмок', 'болуп', 'болот'],
      correct: 0,
      level: 'B1'
    },
    {
      id: 'b1_3',
      question: 'What is the passive form of "жаз" (write)?',
      options: ['жазыл', 'жазды', 'жазат', 'жазган'],
      correct: 0,
      level: 'B1'
    },
    {
      id: 'b1_4',
      question: '"Окулган китеп" means:',
      options: ['The book being read', 'The book that was read', 'The book to read', 'The reading book'],
      correct: 1,
      level: 'B1'
    }
  ],
  B2: [
    {
      id: 'b2_1',
      question: 'Which form expresses "having done something"?',
      options: ['-ып/-ип/-уп', '-ар/-ер/-ор', '-са/-се', '-ган/-ген'],
      correct: 0,
      level: 'B2'
    },
    {
      id: 'b2_2',
      question: 'Complete the idiomatic expression: "Тилин ___ билбейт" (He doesn\'t know what to say)',
      options: ['кайдан', 'качан', 'кантип', 'ким'],
      correct: 0,
      level: 'B2'
    },
    {
      id: 'b2_3',
      question: 'What is the difference between "көргөн" and "көрүп жаткан"?',
      options: [
        'Past perfect vs present continuous',
        'Simple past vs past continuous',
        'Present perfect vs present continuous',
        'Past vs future'
      ],
      correct: 0,
      level: 'B2'
    },
    {
      id: 'b2_4',
      question: 'Which suffix combination creates "supposedly/apparently"?',
      options: ['-ган/-ген + экен', '-ып/-ип + жатат', '-мак/-мек + чы', '-са/-се + болот'],
      correct: 0,
      level: 'B2'
    }
  ],
  C1: [
    {
      id: 'c1_1',
      question: 'Identify the correct usage of archaic/literary Kyrgyz:',
      options: [
        '"Келгинчи" instead of "Кел"',
        '"Барганчы" instead of "Барган"',
        '"Келе жаткан" instead of "Келген"',
        '"Баратканда" instead of "Барганда"'
      ],
      correct: 0,
      level: 'C1'
    },
    {
      id: 'c1_2',
      question: 'Complete the proverb: "Тилден ___, элден тайма"',
      options: ['тайма', 'качма', 'кайтпа', 'чыкпа'],
      correct: 0,
      level: 'C1'
    },
    {
      id: 'c1_3',
      question: 'Which phrase indicates subtle disagreement in formal speech?',
      options: [
        '"Туура, бирок..."',
        '"Жок, ал туура эмес"',
        '"Макул эмесмин"',
        '"Ойлойм дейсизби"'
      ],
      correct: 0,
      level: 'C1'
    },
    {
      id: 'c1_4',
      question: 'What does "алып барууда" express in formal contexts?',
      options: [
        'Ongoing process/development',
        'Future intention',
        'Past completed action',
        'Conditional statement'
      ],
      correct: 0,
      level: 'C1'
    }
  ]
}

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
const LEVEL_ORDER: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  level: Level
}

interface Answer {
  questionId: string
  selectedOption: number
  correct: boolean
  level: Level
}

export default function PlacementTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get interface language
  const language = localStorage.getItem('interface_language') || 'en'
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
  const t = translations[language as keyof typeof translations]

  // Initialize test with adaptive questions
  useEffect(() => {
    const selectedQuestions: Question[] = []
    let currentLevel: Level = 'A2' // Start at A2

    // Shuffle questions within each level
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Shuffle options for each question
    const shuffleQuestion = (q: Question): Question => {
      const indices = [0, 1, 2, 3]
      const shuffledIndices = shuffleArray(indices)
      const newCorrect = shuffledIndices.indexOf(q.correct)
      return {
        ...q,
        options: shuffledIndices.map(i => q.options[i]),
        correct: newCorrect
      }
    }

    // Get all questions shuffled
    const allQuestions = {
      A1: shuffleArray(QUESTIONS_BY_LEVEL.A1.map(shuffleQuestion)),
      A2: shuffleArray(QUESTIONS_BY_LEVEL.A2.map(shuffleQuestion)),
      B1: shuffleArray(QUESTIONS_BY_LEVEL.B1.map(shuffleQuestion)),
      B2: shuffleArray(QUESTIONS_BY_LEVEL.B2.map(shuffleQuestion)),
      C1: shuffleArray(QUESTIONS_BY_LEVEL.C1.map(shuffleQuestion))
    }

    const levelCounts: Record<Level, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 }

    // Simulate adaptive selection (in real implementation, this would be dynamic)
    // For Level 1, we pre-select 20 questions with a balanced distribution
    for (let i = 0; i < 20; i++) {
      const availableLevels = LEVEL_ORDER.filter(level => levelCounts[level] < allQuestions[level].length)
      if (availableLevels.length === 0) break

      const question = allQuestions[currentLevel][levelCounts[currentLevel]]
      if (question) {
        selectedQuestions.push(question)
        levelCounts[currentLevel]++

        // Simulate adaptive logic for next question selection
        // Alternate between levels to create a balanced test
        const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel)
        if (i % 4 === 0 && currentLevelIndex < LEVEL_ORDER.length - 1) {
          currentLevel = LEVEL_ORDER[currentLevelIndex + 1]
        }
      }
    }

    setQuestions(selectedQuestions)
  }, [])

  const handleNext = () => {
    if (selectedOption === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correct

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
        correct: selectedOption === currentQuestion.correct,
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
            <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : undefined}
              onValueChange={(value) => setSelectedOption(parseInt(value))}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
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
