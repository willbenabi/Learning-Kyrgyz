import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setCurrentLang(lang)
    }
  }, [])

  const switchLanguage = (lang: 'en' | 'ru') => {
    localStorage.setItem('interface_language', lang)
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={currentLang === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('en')}
        className="h-8 px-3 text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={currentLang === 'ru' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLanguage('ru')}
        className="h-8 px-3 text-xs font-medium"
      >
        RU
      </Button>
    </div>
  )
}
