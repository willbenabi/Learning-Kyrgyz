import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Bot, User } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AIAssistantModalProps {
  open: boolean
  onClose: () => void
  language: 'en' | 'ru'
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistantModal({ open, onClose, language }: AIAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      title: 'AI Kyrgyz Assistant',
      description: 'Practice Kyrgyz with AI - ask questions, have conversations',
      placeholder: 'Type your message in Kyrgyz...',
      send: 'Send',
      poweredBy: 'Powered by AkylAI',
      learnMore: 'Learn more about AkylAI',
      welcome: 'Салам! I\'m your AI assistant for learning Kyrgyz. Ask me anything in Kyrgyz or get help with translations!'
    },
    ru: {
      title: 'AI Ассистент по кыргызскому',
      description: 'Практикуйте кыргызский с AI - задавайте вопросы, общайтесь',
      placeholder: 'Напишите сообщение на кыргызском...',
      send: 'Отправить',
      poweredBy: 'Работает на AkylAI',
      learnMore: 'Узнать больше о AkylAI',
      welcome: 'Салам! Я ваш AI ассистент для изучения кыргызского языка. Задавайте любые вопросы на кыргызском или просите помощь с переводами!'
    }
  }

  const t = translations[language]

  // Initialize with welcome message
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: t.welcome,
        timestamp: new Date()
      }])
    }
  }, [open])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // TODO: Integrate with AkylAI API (https://www.akylai.com/)
      // For now, mock response
      await new Promise(resolve => setTimeout(resolve, 1500))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en'
          ? 'This is a demo response. To enable real AI chat, integrate with AkylAI API at https://www.akylai.com/'
          : 'Это демо-ответ. Для реального AI чата нужно интегрировать AkylAI API на https://www.akylai.com/',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{t.title}</DialogTitle>
              <DialogDescription>{t.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="mt-2 text-center">
            <a
              href="https://www.akylai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {t.poweredBy} - {t.learnMore} →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
