import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Languages } from 'lucide-react'

export default function LanguageSelect() {
  const handleLanguageSelect = (lang: 'en' | 'ru') => {
    localStorage.setItem('interface_language', lang)
    router.visit('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Languages className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Choose Your Interface Language
          </h1>
          <p className="text-muted-foreground text-lg">
            Выберите язык интерфейса
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* English */}
          <Button
            onClick={() => handleLanguageSelect('en')}
            variant="outline"
            className="h-auto py-8 px-6 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <span className="text-6xl">🇬🇧</span>
            <span className="text-2xl font-semibold">English</span>
            <span className="text-sm text-muted-foreground">Interface language</span>
          </Button>

          {/* Russian */}
          <Button
            onClick={() => handleLanguageSelect('ru')}
            variant="outline"
            className="h-auto py-8 px-6 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <span className="text-6xl">🇷🇺</span>
            <span className="text-2xl font-semibold">Русский</span>
            <span className="text-sm text-muted-foreground">Язык интерфейса</span>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          You can change this later in settings • Вы сможете изменить это позже в настройках
        </p>
      </Card>
    </div>
  )
}
