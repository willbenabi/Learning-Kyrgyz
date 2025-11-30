import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Wrench, Send, CheckCircle2 } from 'lucide-react'

interface TechSupportModalProps {
  open: boolean
  onClose: () => void
  language: 'en' | 'ru'
}

export default function TechSupportModal({ open, onClose, language }: TechSupportModalProps) {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const translations = {
    en: {
      title: 'Technical Support',
      description: 'Describe your issue and we\'ll help you',
      label: 'Your Message',
      placeholder: 'Please describe the problem you\'re experiencing...',
      submit: 'Send',
      success: 'Thank you! We\'ll review your message and get back to you soon.',
      close: 'Close'
    },
    ru: {
      title: 'Техническая поддержка',
      description: 'Опишите вашу проблему, и мы обязательно поможем',
      label: 'Ваше сообщение',
      placeholder: 'Пожалуйста, опишите проблему, с которой вы столкнулись...',
      submit: 'Отправить',
      success: 'Спасибо! Мы обязательно разберемся с этой проблемой.',
      close: 'Закрыть'
    }
  }

  const t = translations[language]

  const handleSubmit = async () => {
    if (!message.trim()) return

    setIsSubmitting(true)

    // Level 1: Just show success message (mock)
    // Level 2: Send to backend
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setMessage('')
    setSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{t.title}</DialogTitle>
              <DialogDescription>{t.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">{t.label}</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholder}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                {t.close}
              </Button>
              <Button onClick={handleSubmit} disabled={!message.trim() || isSubmitting}>
                <Send className="w-4 h-4 mr-2" />
                {t.submit}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <p className="text-lg">{t.success}</p>
            <Button onClick={handleClose} className="w-full">
              {t.close}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
