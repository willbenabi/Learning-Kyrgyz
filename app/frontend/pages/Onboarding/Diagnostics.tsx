import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Award,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Target,
  Lightbulb,
  ChevronDown,
  ArrowRight
} from 'lucide-react'

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

interface TestResults {
  level: Level
  score: number
  total: number
  answers: Array<{
    questionId: string
    selectedOption: number
    correct: boolean
    level: Level
  }>
  questions: Array<{
    id: string
    question: string
    options: string[]
    correct: number
    level: Level
  }>
}

const LEVEL_INFO = {
  en: {
    A1: {
      name: 'Beginner',
      description: 'You are at the beginning of your Kyrgyz learning journey',
      color: 'bg-green-500'
    },
    A2: {
      name: 'Elementary',
      description: 'You understand basic phrases and common expressions',
      color: 'bg-blue-500'
    },
    B1: {
      name: 'Intermediate',
      description: 'You can handle most everyday situations in Kyrgyz',
      color: 'bg-yellow-500'
    },
    B2: {
      name: 'Upper Intermediate',
      description: 'You can express yourself fluently on complex topics',
      color: 'bg-orange-500'
    },
    C1: {
      name: 'Advanced',
      description: 'You have near-native proficiency in Kyrgyz',
      color: 'bg-purple-500'
    }
  },
  ru: {
    A1: {
      name: 'Начальный',
      description: 'Вы только начинаете изучать кыргызский язык',
      color: 'bg-green-500'
    },
    A2: {
      name: 'Элементарный',
      description: 'Вы понимаете базовые фразы и распространенные выражения',
      color: 'bg-blue-500'
    },
    B1: {
      name: 'Средний',
      description: 'Вы можете справиться с большинством повседневных ситуаций на кыргызском',
      color: 'bg-yellow-500'
    },
    B2: {
      name: 'Выше среднего',
      description: 'Вы можете свободно выражать свои мысли на сложные темы',
      color: 'bg-orange-500'
    },
    C1: {
      name: 'Продвинутый',
      description: 'Вы владеете кыргызским языком почти на уровне носителя',
      color: 'bg-purple-500'
    }
  }
}

const DIAGNOSTICS = {
  en: {
    A1: {
      strengths: ['You can recognize basic Kyrgyz greetings', 'You understand simple vocabulary', 'You show motivation to learn'],
      weaknesses: ['Grammar structures need development', 'Vocabulary is limited', 'Sentence formation needs practice'],
      grammar: ['Basic sentence structure', 'Present tense verbs', 'Personal pronouns', 'Basic case endings'],
      reading: 'Start with simple dialogues and children\'s stories',
      vocabulary: 'Focus on everyday words: family, food, numbers, colors',
      recommendations: ['Practice greetings daily', 'Learn 5-10 new words every day', 'Listen to simple Kyrgyz songs', 'Use flashcards for vocabulary']
    },
    A2: {
      strengths: ['You understand common phrases', 'You know basic grammar', 'You can form simple sentences'],
      weaknesses: ['Complex grammar patterns are challenging', 'Speaking confidence needs improvement', 'Vocabulary range should expand'],
      grammar: ['Past and future tenses', 'Possessive endings', 'Plural forms', 'Question formation'],
      reading: 'Short stories, simple news articles, basic texts',
      vocabulary: 'Expand to: work, travel, hobbies, descriptions',
      recommendations: ['Read simple texts daily', 'Practice writing short paragraphs', 'Watch Kyrgyz content with subtitles', 'Join language exchange groups']
    },
    B1: {
      strengths: ['You handle everyday conversations well', 'Grammar foundation is solid', 'You understand context'],
      weaknesses: ['Idiomatic expressions need work', 'Complex sentence structures are difficult', 'Formal language requires practice'],
      grammar: ['Conditional forms', 'Passive voice', 'Complex verb aspects', 'Conjunctions'],
      reading: 'News articles, short novels, opinion pieces',
      vocabulary: 'Abstract concepts, professional terms, idiomatic phrases',
      recommendations: ['Read Kyrgyz news daily', 'Write essays on various topics', 'Practice speaking on complex subjects', 'Study Kyrgyz literature']
    },
    B2: {
      strengths: ['You express ideas clearly', 'You understand nuanced meanings', 'Grammar is mostly accurate'],
      weaknesses: ['Rare grammatical forms need attention', 'Cultural idioms could improve', 'Native-level fluency is the next goal'],
      grammar: ['Literary forms', 'Archaic expressions', 'Advanced participles', 'Stylistic variations'],
      reading: 'Literature, academic texts, poetry, professional articles',
      vocabulary: 'Specialized terminology, proverbs, regional variations',
      recommendations: ['Read Kyrgyz literature', 'Engage in debates in Kyrgyz', 'Write formal documents', 'Consume native media']
    },
    C1: {
      strengths: ['Near-native proficiency', 'Excellent grammar control', 'Rich vocabulary'],
      weaknesses: ['Minor refinements in rare contexts', 'Regional dialects exploration', 'Cultural depth can always grow'],
      grammar: ['Subtle stylistic choices', 'Formal register mastery', 'Dialectal variations'],
      reading: 'Any level of text including classical literature',
      vocabulary: 'Master specialized fields and regional expressions',
      recommendations: ['Read classical Kyrgyz poetry', 'Write creative works in Kyrgyz', 'Mentor other learners', 'Explore regional dialects']
    }
  },
  ru: {
    A1: {
      strengths: ['Вы узнаете базовые кыргызские приветствия', 'Вы понимаете простую лексику', 'Вы мотивированы учиться'],
      weaknesses: ['Грамматические структуры требуют развития', 'Словарный запас ограничен', 'Построение предложений требует практики'],
      grammar: ['Базовая структура предложения', 'Глаголы настоящего времени', 'Личные местоимения', 'Базовые падежные окончания'],
      reading: 'Начните с простых диалогов и детских рассказов',
      vocabulary: 'Сосредоточьтесь на повседневных словах: семья, еда, числа, цвета',
      recommendations: ['Практикуйте приветствия каждый день', 'Учите 5-10 новых слов ежедневно', 'Слушайте простые кыргызские песни', 'Используйте карточки для запоминания слов']
    },
    A2: {
      strengths: ['Вы понимаете распространенные фразы', 'Вы знаете базовую грамматику', 'Вы можете строить простые предложения'],
      weaknesses: ['Сложные грамматические конструкции вызывают трудности', 'Уверенность в разговоре нуждается в улучшении', 'Словарный запас следует расширить'],
      grammar: ['Прошедшее и будущее время', 'Притяжательные окончания', 'Формы множественного числа', 'Построение вопросов'],
      reading: 'Короткие рассказы, простые новостные статьи, базовые тексты',
      vocabulary: 'Расширяйте до: работа, путешествия, хобби, описания',
      recommendations: ['Читайте простые тексты ежедневно', 'Практикуйте написание коротких абзацев', 'Смотрите кыргызский контент с субтитрами', 'Присоединяйтесь к группам языкового обмена']
    },
    B1: {
      strengths: ['Вы хорошо справляетесь с повседневными разговорами', 'Грамматическая основа прочная', 'Вы понимаете контекст'],
      weaknesses: ['Идиоматические выражения требуют работы', 'Сложные структуры предложений сложны', 'Формальный язык требует практики'],
      grammar: ['Условные формы', 'Страдательный залог', 'Сложные глагольные аспекты', 'Союзы'],
      reading: 'Новостные статьи, короткие романы, статьи с мнениями',
      vocabulary: 'Абстрактные концепции, профессиональные термины, идиоматические фразы',
      recommendations: ['Читайте кыргызские новости ежедневно', 'Пишите эссе на различные темы', 'Практикуйте речь на сложные темы', 'Изучайте кыргызскую литературу']
    },
    B2: {
      strengths: ['Вы ясно выражаете идеи', 'Вы понимаете нюансированные значения', 'Грамматика в основном точная'],
      weaknesses: ['Редкие грамматические формы требуют внимания', 'Культурные идиомы можно улучшить', 'Беглость на уровне носителя - следующая цель'],
      grammar: ['Литературные формы', 'Архаичные выражения', 'Продвинутые причастия', 'Стилистические вариации'],
      reading: 'Литература, академические тексты, поэзия, профессиональные статьи',
      vocabulary: 'Специализированная терминология, пословицы, региональные вариации',
      recommendations: ['Читайте кыргызскую литературу', 'Участвуйте в дебатах на кыргызском', 'Пишите официальные документы', 'Потребляйте родные медиа']
    },
    C1: {
      strengths: ['Владение почти на уровне носителя', 'Отличный контроль грамматики', 'Богатый словарный запас'],
      weaknesses: ['Незначительные уточнения в редких контекстах', 'Изучение региональных диалектов', 'Культурная глубина всегда может расти'],
      grammar: ['Тонкие стилистические выборы', 'Мастерство формального регистра', 'Диалектные вариации'],
      reading: 'Любой уровень текста, включая классическую литературу',
      vocabulary: 'Овладейте специализированными областями и региональными выражениями',
      recommendations: ['Читайте классическую кыргызскую поэзию', 'Пишите творческие работы на кыргызском', 'Наставляйте других учащихся', 'Исследуйте региональные диалекты']
    }
  }
}

export default function Diagnostics() {
  const [results, setResults] = useState<TestResults | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Your Kyrgyz Level Assessment',
      yourLevel: 'Your Level',
      score: 'Score',
      strengths: 'Your Strengths',
      weaknesses: 'Areas to Improve',
      grammarFocus: 'Grammar Focus Areas',
      readingLevel: 'Recommended Reading Level',
      vocabularyFocus: 'Vocabulary Focus',
      recommendations: 'Personalized Recommendations',
      viewMistakes: 'View Detailed Mistakes',
      hideMistakes: 'Hide Mistakes',
      correctAnswer: 'Correct Answer',
      yourAnswer: 'Your Answer',
      explanation: 'Explanation',
      startLearning: 'Start Learning',
      question: 'Question'
    },
    ru: {
      title: 'Оценка вашего уровня кыргызского языка',
      yourLevel: 'Ваш уровень',
      score: 'Результат',
      strengths: 'Ваши сильные стороны',
      weaknesses: 'Области для улучшения',
      grammarFocus: 'Фокус на грамматике',
      readingLevel: 'Рекомендуемый уровень чтения',
      vocabularyFocus: 'Фокус на лексике',
      recommendations: 'Персональные рекомендации',
      viewMistakes: 'Посмотреть подробные ошибки',
      hideMistakes: 'Скрыть ошибки',
      correctAnswer: 'Правильный ответ',
      yourAnswer: 'Ваш ответ',
      explanation: 'Объяснение',
      startLearning: 'Начать обучение',
      question: 'Вопрос'
    }
  }
  const t = translations[language]

  useEffect(() => {
    const storedResults = localStorage.getItem('test_results')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // Redirect back to test if no results found
      router.visit('/onboarding/placement-test')
    }
  }, [])

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    )
  }

  const levelInfo = LEVEL_INFO[language][results.level]
  const diagnostics = DIAGNOSTICS[language][results.level]
  const percentage = Math.round((results.score / results.total) * 100)

  const incorrectAnswers = results.answers
    .map((answer, index) => ({
      answer,
      question: results.questions[index]
    }))
    .filter(item => !item.answer.correct)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Level Badge */}
        <Card className="text-center">
          <CardHeader className="space-y-6">
            <div className="mx-auto">
              <div className={`w-32 h-32 ${levelInfo.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <Award className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2">{results.level}</h1>
              <p className="text-2xl text-muted-foreground mb-2">{levelInfo.name}</p>
              <p className="text-muted-foreground">{levelInfo.description}</p>
            </div>
            <div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t.score}: {results.score}/{results.total} ({percentage}%)
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              {t.strengths}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {diagnostics.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas to Improve */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              {t.weaknesses}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {diagnostics.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Grammar Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {t.grammarFocus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {diagnostics.grammar.map((topic, index) => (
                <Badge key={index} variant="outline">{topic}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reading & Vocabulary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-purple-600" />
                {t.readingLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{diagnostics.reading}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                {t.vocabularyFocus}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{diagnostics.vocabulary}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              {t.recommendations}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {diagnostics.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">💡</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Mistakes Section */}
        {incorrectAnswers.length > 0 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      {isOpen ? t.hideMistakes : t.viewMistakes} ({incorrectAnswers.length})
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {incorrectAnswers.map((item, index) => {
                    // Handle both old and new question format
                    const questionText = item.question.question?.[language] || item.question.question || ''
                    const userAnswer = item.question.shuffledOptions?.[item.answer.selectedOption] ||
                                      item.question.options?.[item.answer.selectedOption] || ''
                    const correctAnswer = item.question.shuffledOptions?.[item.question.shuffledCorrect] ||
                                         item.question.options?.[item.question.correct] || ''

                    return (
                      <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                        <p className="font-semibold mb-2">{t.question} {index + 1}:</p>
                        <p className="mb-2">{questionText}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-red-600">
                            {t.yourAnswer}: {userAnswer}
                          </p>
                          <p className="text-green-600">
                            {t.correctAnswer}: {correctAnswer}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Start Learning Button */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="text-lg px-8"
            onClick={() => router.visit('/learning/dashboard', { replace: true })}
            data-testid="start-learning-button"
          >
            {t.startLearning}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
