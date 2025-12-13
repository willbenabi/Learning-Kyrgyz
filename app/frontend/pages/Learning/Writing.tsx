import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { PenTool, BookOpen, ArrowRight, ArrowLeft, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { WRITING_PROMPTS, getPromptsByLevel, type Level, type WritingPrompt } from '@/data/writingPrompts'
import { isLessonCompleted } from '@/lib/progressHelper'
import { trackLessonCompletion } from '@/lib/progressTracker'
import * as dbProgress from '@/lib/progressApi'
import authService from '@/lib/auth'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface AIEvaluation {
  grammar_score: number
  topic_relevance_score: number
  vocabulary_score: number
  structure_score: number
  overall_feedback: string
  grammar_errors: Array<{
    error: string
    correction: string
    explanation: string
  }>
  suggestions: string[]
}

export default function WritingPage() {
  const { props } = usePage()
  const currentUser = props.auth?.user
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [completedPrompts, setCompletedPrompts] = useState<string[]>([])
  const language = (localStorage.getItem('interface_language') || 'en') as 'en' | 'ru'

  const translations = {
    en: {
      title: 'Writing Practice',
      description: 'Improve your Kyrgyz writing skills',
      yourLevel: 'Your Level',
      startWriting: 'Start Writing',
      backToPrompts: 'Back to Prompts',
      minWords: 'Minimum words',
      guidelines: 'Guidelines',
      wordBank: 'Word Bank',
      template: 'Template (optional)',
      evaluationCriteria: 'Evaluation Criteria',
      yourText: 'Write your text here in Kyrgyz',
      wordCount: 'Words',
      saveWork: 'Save Work',
      workSaved: 'Your work has been saved!',
      continueWriting: 'Continue Writing',
      newPrompt: 'Try Another Prompt'
    },
    ru: {
      title: 'Практика письма',
      description: 'Улучшайте навыки письма на кыргызском',
      yourLevel: 'Ваш уровень',
      startWriting: 'Начать писать',
      backToPrompts: 'К заданиям',
      minWords: 'Минимум слов',
      guidelines: 'Рекомендации',
      wordBank: 'Банк слов',
      template: 'Шаблон (опционально)',
      evaluationCriteria: 'Критерии оценки',
      yourText: 'Напишите свой текст здесь на кыргызском',
      wordCount: 'Слов',
      saveWork: 'Сохранить работу',
      workSaved: 'Ваша работа сохранена!',
      continueWriting: 'Продолжить писать',
      newPrompt: 'Попробовать другое задание'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load user level from localStorage
    const level = localStorage.getItem('user_level') as Level | null
    if (level) {
      setUserLevel(level)
    }

    // Load completed prompts from database if authenticated
    const loadProgress = async () => {
      if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
        try {
          await dbProgress.refreshProgressCache()
          const completed = dbProgress.getCompletedLessons('writing')
          setCompletedPrompts(completed)
        } catch (error) {
          console.error('Failed to load writing progress:', error)
        }
      }
    }

    loadProgress()
  }, [currentUser, refreshKey])

  const prompts = getPromptsByLevel(userLevel)

  const handlePromptComplete = () => {
    setSelectedPrompt(null)
    setRefreshKey(prev => prev + 1) // Force re-render to show updated completion status
  }

  if (selectedPrompt) {
    return <WritingView prompt={selectedPrompt} language={language} currentUser={currentUser} onBack={() => setSelectedPrompt(null)} onComplete={handlePromptComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-3 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header with Back Button and Language Switcher */}
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

        {/* Writing Prompts */}
        <div className="grid gap-4 md:grid-cols-2" key={`writing-${refreshKey}`}>
          {prompts.map((prompt) => {
            const completed = currentUser ? completedPrompts.includes(prompt.id) : isLessonCompleted(prompt.id)
            return (
              <Card
                key={prompt.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${completed ? 'bg-green-50 border-green-300' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{prompt.title[language]}</CardTitle>
                        {completed && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
                      </div>
                      <div className="mt-1 text-sm font-medium text-purple-600">{prompt.kyrgyzTitle}</div>
                      <CardDescription className="mt-2">{prompt.description[language]}</CardDescription>
                      <div className="mt-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{t.minWords}: {prompt.minWords}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{prompt.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setSelectedPrompt(prompt)}
                    className="w-full"
                    variant={completed ? "outline" : "default"}
                  >
                    {completed ? (language === 'en' ? 'Restart Prompt' : 'Перезапустить задание') : t.startWriting}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function WritingView({
  prompt,
  language,
  currentUser,
  onBack,
  onComplete
}: {
  prompt: WritingPrompt
  language: 'en' | 'ru'
  currentUser: any
  onBack: () => void
  onComplete?: () => void
}) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null)

  const translations = {
    en: {
      backToPrompts: 'Back to Prompts',
      minWords: 'Minimum words',
      guidelines: 'Guidelines',
      wordBank: 'Word Bank',
      template: 'Template (optional)',
      evaluationCriteria: 'Evaluation Criteria',
      yourText: 'Write your text here in Kyrgyz',
      wordCount: 'Words',
      saveWork: 'Save Work',
      workSaved: 'Your work has been saved!',
      continueWriting: 'Continue Writing',
      newPrompt: 'Try Another Prompt',
      helpfulWords: 'Helpful words to use in your writing',
      useTemplate: 'You can use this template to help structure your writing',
      howEvaluated: 'Your writing will be evaluated based on these criteria',
      checkWithAI: 'Check with AI',
      checking: 'Checking your text, please wait...',
      aiEvaluation: 'AI Evaluation Results',
      grammarScore: 'Grammar',
      topicRelevance: 'Topic Relevance',
      vocabularyScore: 'Vocabulary',
      structureScore: 'Structure',
      overallFeedback: 'Overall Feedback',
      grammarErrors: 'Grammar Errors & Corrections',
      suggestions: 'Suggestions for Improvement',
      error: 'Error',
      correction: 'Correction',
      explanation: 'Explanation',
      lessonCompleted: 'Lesson Completed!'
    },
    ru: {
      backToPrompts: 'К заданиям',
      minWords: 'Минимум слов',
      guidelines: 'Рекомендации',
      wordBank: 'Банк слов',
      template: 'Шаблон (опционально)',
      evaluationCriteria: 'Критерии оценки',
      yourText: 'Напишите свой текст здесь на кыргызском',
      wordCount: 'Слов',
      saveWork: 'Сохранить работу',
      workSaved: 'Ваша работа сохранена!',
      continueWriting: 'Продолжить писать',
      newPrompt: 'Попробовать другое задание',
      helpfulWords: 'Полезные слова для использования в вашем тексте',
      useTemplate: 'Вы можете использовать этот шаблон для структурирования текста',
      howEvaluated: 'Ваш текст будет оцениваться по этим критериям',
      checkWithAI: 'Проверить с помощью AI',
      checking: 'Проверяем ваш текст, пожалуйста подождите...',
      aiEvaluation: 'Результаты AI оценки',
      grammarScore: 'Грамматика',
      topicRelevance: 'Соответствие теме',
      vocabularyScore: 'Словарный запас',
      structureScore: 'Структура',
      overallFeedback: 'Общая оценка',
      grammarErrors: 'Грамматические ошибки и исправления',
      suggestions: 'Рекомендации по улучшению',
      error: 'Ошибка',
      correction: 'Исправление',
      explanation: 'Объяснение',
      lessonCompleted: 'Урок завершен!'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load saved work if exists
    const savedWork = localStorage.getItem(`writing_${prompt.id}`)
    if (savedWork) {
      setText(savedWork)
    }
  }, [prompt.id])

  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
  const meetsMinimum = wordCount >= prompt.minWords

  const handleSave = () => {
    localStorage.setItem(`writing_${prompt.id}`, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCheckWithAI = async () => {
    if (text.trim().length === 0) return

    setIsChecking(true)
    setEvaluation(null)

    try {
      const token = authService.getToken()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch('/ai/writing_evaluations', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          text: text,
          prompt_title: prompt.title[language],
          level: prompt.level,
          language: language
        })
      })

      const data = await response.json()

      if (response.ok) {
        setEvaluation(data.evaluation)
      } else {
        console.error('Evaluation error:', data.error)
        // Show error to user
        alert(language === 'ru'
          ? `Ошибка: ${data.error || 'Не удалось получить оценку. Попробуйте снова.'}`
          : `Error: ${data.error || 'Failed to get evaluation. Please try again.'}`)
      }
    } catch (error) {
      console.error('Failed to get AI evaluation:', error)
      alert(language === 'ru'
        ? 'Не удалось связаться с сервером. Проверьте подключение к интернету.'
        : 'Failed to connect to server. Please check your internet connection.')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-3 sm:p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header with Back Button and Language Switcher */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={onBack} className="shrink-0">
            <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{t.backToPrompts}</span>
            <span className="sm:hidden">{language === 'en' ? 'Back' : 'Назад'}</span>
          </Button>
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Prompt Header */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl sm:text-3xl break-words">{prompt.title[language]}</CardTitle>
                <div className="mt-1 sm:mt-2 text-base sm:text-xl font-medium text-purple-600 break-words">{prompt.kyrgyzTitle}</div>
                <CardDescription className="mt-2 sm:mt-3 text-sm sm:text-base">{prompt.prompt[language]}</CardDescription>
                <div className="mt-3 sm:mt-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-600">{t.minWords}: {prompt.minWords}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-base sm:text-lg px-2 sm:px-3 py-1 shrink-0 self-start">{prompt.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Left Column - Guidelines and Support */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-1">
            {/* Guidelines */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base sm:text-lg">{t.guidelines}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {prompt.guidelines[language].map((guideline, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm break-words">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Word Bank */}
            {prompt.wordBank && prompt.wordBank.length > 0 && (
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base sm:text-lg">{t.wordBank}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-600 mb-3">{t.helpfulWords}</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.wordBank.map((word, idx) => (
                      <Badge key={idx} variant="secondary" className="cursor-pointer hover:bg-purple-100 text-xs sm:text-sm">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Template */}
            {prompt.template && (
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base sm:text-lg">{t.template}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-600 mb-3">{t.useTemplate}</p>
                  <div className="p-3 bg-purple-50 rounded-lg text-xs sm:text-sm font-mono overflow-x-auto">
                    {prompt.template[language]}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Evaluation Criteria */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base sm:text-lg">{t.evaluationCriteria}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-600 mb-3">{t.howEvaluated}</p>
                <ul className="space-y-2">
                  {prompt.evaluationCriteria[language].map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-sm break-words">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Writing Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg">{t.yourText}</CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs sm:text-sm text-gray-600">{t.wordCount}:</span>
                    <Badge variant={meetsMinimum ? "default" : "secondary"} className={meetsMinimum ? "bg-green-600" : ""}>
                      {wordCount} / {prompt.minWords}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Textarea
                  placeholder={t.yourText}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] sm:min-h-[400px] text-sm sm:text-base resize-none w-full"
                  dir="ltr"
/>

                {saved && (
                  <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    <span className="text-sm sm:text-base text-green-900 font-medium">{t.workSaved}</span>
                  </div>
                )}

                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button onClick={handleSave} className="flex-1 text-sm sm:text-base" disabled={text.trim().length === 0}>
                    <Save className="mr-1 sm:mr-2 h-4 w-4" />
                    {t.saveWork}
                  </Button>
                  <Button
                    onClick={handleCheckWithAI}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
                    disabled={text.trim().length === 0 || isChecking}
                  >
                    <Sparkles className="mr-1 sm:mr-2 h-4 w-4" />
                    {t.checkWithAI}
                  </Button>
                  {saved && (
                    <Button onClick={onBack} variant="outline" className="flex-1 text-sm sm:text-base">
                      {t.newPrompt}
                    </Button>
                  )}
                </div>

                {/* Progress Indicator */}
                {!meetsMinimum && wordCount > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-900 font-medium">
                        {language === 'en'
                          ? `Keep writing! ${prompt.minWords - wordCount} more words needed.`
                          : `Продолжайте писать! Нужно еще ${prompt.minWords - wordCount} слов.`}
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((wordCount / prompt.minWords) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* AI Checking Indicator */}
                {isChecking && (
                  <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-3 border-solid border-purple-600 border-r-transparent"></div>
                      <span className="text-purple-900 font-medium">{t.checking}</span>
                    </div>
                  </div>
                )}

                {/* AI Evaluation Results */}
                {evaluation && !isChecking && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      {t.aiEvaluation}
                    </h3>

                    {/* Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-700">{evaluation.grammar_score}</div>
                        <div className="text-xs text-blue-600 mt-1">{t.grammarScore}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-700">{evaluation.topic_relevance_score}</div>
                        <div className="text-xs text-green-600 mt-1">{t.topicRelevance}</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-700">{evaluation.vocabulary_score}</div>
                        <div className="text-xs text-orange-600 mt-1">{t.vocabularyScore}</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-700">{evaluation.structure_score}</div>
                        <div className="text-xs text-purple-600 mt-1">{t.structureScore}</div>
                      </div>
                    </div>

                    {/* Overall Feedback */}
                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-base">{t.overallFeedback}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700">{evaluation.overall_feedback}</p>
                      </CardContent>
                    </Card>

                    {/* Grammar Errors */}
                    {evaluation.grammar_errors && evaluation.grammar_errors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base text-red-700">{t.grammarErrors}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {evaluation.grammar_errors.map((error, idx) => (
                              <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-2 mb-2">
                                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-red-900 mb-1">
                                      {t.error}: <span className="line-through">{error.error}</span>
                                    </div>
                                    <div className="text-sm font-medium text-green-900 mb-1">
                                      {t.correction}: <span className="font-bold">{error.correction}</span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {t.explanation}: {error.explanation}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Suggestions */}
                    {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-base text-green-700">{t.suggestions}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {evaluation.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Lesson Completed Button */}
                    <div className="mt-6">
                      <Button
                        onClick={async () => {
                          // Calculate average score from all criteria
                          const avgScore = Math.round(
                            (evaluation.grammar_score +
                              evaluation.topic_relevance_score +
                              evaluation.vocabulary_score +
                              evaluation.structure_score) / 4
                          )

                          // Mark prompt as completed - use backend for authenticated users
                          if (currentUser && authService.getToken() && !authService.isTokenExpired()) {
                            await trackLessonCompletion({
                              moduleType: 'writing',
                              lessonId: prompt.id,
                              score: avgScore,
                              timeSpent: undefined
                            })
                            // Refresh progress cache
                            await dbProgress.refreshProgressCache()
                          } else {
                            // Fallback to localStorage for guests
                            isLessonCompleted(prompt.id) // This saves to localStorage
                          }

                          if (onComplete) {
                            onComplete()
                          } else {
                            onBack()
                          }
                        }}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        {t.lessonCompleted} <CheckCircle2 className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
