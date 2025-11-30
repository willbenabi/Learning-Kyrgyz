import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { PenTool, BookOpen, ArrowRight, ArrowLeft, Save, CheckCircle2, AlertCircle } from 'lucide-react'
import { WRITING_PROMPTS, getPromptsByLevel, type Level, type WritingPrompt } from '@/data/writingPrompts'

export default function WritingPage() {
  const [userLevel, setUserLevel] = useState<Level>('A1')
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null)
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
  }, [])

  const prompts = getPromptsByLevel(userLevel)

  if (selectedPrompt) {
    return <WritingView prompt={selectedPrompt} language={language} onBack={() => setSelectedPrompt(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
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

        {/* Writing Prompts */}
        <div className="grid gap-4 md:grid-cols-2">
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{prompt.title[language]}</CardTitle>
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
                <Button onClick={() => setSelectedPrompt(prompt)} className="w-full">
                  {t.startWriting} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function WritingView({
  prompt,
  language,
  onBack
}: {
  prompt: WritingPrompt
  language: 'en' | 'ru'
  onBack: () => void
}) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

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
      howEvaluated: 'Your writing will be evaluated based on these criteria'
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
      howEvaluated: 'Ваш текст будет оцениваться по этим критериям'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="mx-auto max-w-5xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToPrompts}
        </Button>

        {/* Prompt Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{prompt.title[language]}</CardTitle>
                <div className="mt-2 text-xl font-medium text-purple-600">{prompt.kyrgyzTitle}</div>
                <CardDescription className="mt-3 text-base">{prompt.prompt[language]}</CardDescription>
                <div className="mt-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{t.minWords}: {prompt.minWords}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">{prompt.level}</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Guidelines and Support */}
          <div className="space-y-6 lg:col-span-1">
            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.guidelines}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prompt.guidelines[language].map((guideline, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Word Bank */}
            {prompt.wordBank && prompt.wordBank.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.wordBank}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{t.helpfulWords}</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.wordBank.map((word, idx) => (
                      <Badge key={idx} variant="secondary" className="cursor-pointer hover:bg-purple-100">
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
                <CardHeader>
                  <CardTitle className="text-lg">{t.template}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{t.useTemplate}</p>
                  <div className="p-3 bg-purple-50 rounded-lg text-sm font-mono">
                    {prompt.template[language]}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Evaluation Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.evaluationCriteria}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{t.howEvaluated}</p>
                <ul className="space-y-2">
                  {prompt.evaluationCriteria[language].map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Writing Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t.yourText}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{t.wordCount}:</span>
                    <Badge variant={meetsMinimum ? "default" : "secondary"} className={meetsMinimum ? "bg-green-600" : ""}>
                      {wordCount} / {prompt.minWords}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t.yourText}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] text-base resize-none"
                  dir="ltr"
                />

                {saved && (
                  <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-green-900 font-medium">{t.workSaved}</span>
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <Button onClick={handleSave} className="flex-1" disabled={text.trim().length === 0}>
                    <Save className="mr-2 h-4 w-4" />
                    {t.saveWork}
                  </Button>
                  {saved && (
                    <Button onClick={onBack} variant="outline" className="flex-1">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
