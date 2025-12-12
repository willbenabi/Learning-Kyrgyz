import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Shield,
  ArrowRight,
  UserCog
} from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Landing() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setLanguage(lang)
    }
  }, [])

  const translations = {
    en: {
      getStarted: 'Get Started',
      logIn: 'Log In',
      signIn: 'Sign In',
      hero: 'Master the Kyrgyz Language',
      heroHighlight: 'With Ease',
      subtitle: 'Your personalized journey to learning Kyrgyz. Adaptive lessons, AI-powered assistance, and cultural immersion - all in one place.',
      startLearning: 'Start Learning Free',
      adaptiveTitle: 'Adaptive Learning',
      adaptiveDesc: 'Take a placement test and get personalized lessons based on your level (A1-C1).',
      aiTitle: 'AI-Powered Assistance',
      aiDesc: 'Chat with AI to practice conversation, get grammar help, and instant feedback.',
      curriculumTitle: 'Complete Curriculum',
      curriculumDesc: 'Grammar, reading, writing, and vocabulary - everything you need to master Kyrgyz.',
      readyTitle: 'Ready to start your Kyrgyz journey?',
      readySubtitle: 'Join thousands of learners and discover the beauty of the Kyrgyz language.',
      createAccount: 'Create Free Account'
    },
    ru: {
      getStarted: 'Начать',
      logIn: 'Войти',
      signIn: 'Войти',
      hero: 'Освойте кыргызский язык',
      heroHighlight: 'легко',
      subtitle: 'Ваш персональный путь к изучению кыргызского. Адаптивные уроки, помощь AI и культурное погружение - всё в одном месте.',
      startLearning: 'Начать обучение бесплатно',
      adaptiveTitle: 'Адаптивное обучение',
      adaptiveDesc: 'Пройдите тест на уровень и получите персонализированные уроки по вашему уровню (A1-C1).',
      aiTitle: 'Помощь AI',
      aiDesc: 'Общайтесь с AI для практики разговора, помощи с грамматикой и мгновенной обратной связи.',
      curriculumTitle: 'Полная программа',
      curriculumDesc: 'Грамматика, чтение, письмо и лексика - всё необходимое для освоения кыргызского.',
      readyTitle: 'Готовы начать изучение кыргызского?',
      readySubtitle: 'Присоединяйтесь к тысячам учащихся и откройте для себя красоту кыргызского языка.',
      createAccount: 'Создать бесплатный аккаунт'
    }
  }

  const t = translations[language]

  const features = [
    {
      icon: Shield,
      title: t.adaptiveTitle,
      description: t.adaptiveDesc,
    },
    {
      icon: UserCog,
      title: t.aiTitle,
      description: t.aiDesc,
    },
    {
      icon: Sparkles,
      title: t.curriculumTitle,
      description: t.curriculumDesc,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Learning Kyrgyz</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/register">
              <Button>{t.getStarted}</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">{t.logIn}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {t.hero}{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              {t.heroHighlight}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all">
                {t.startLearning}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                {t.signIn}
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-24 w-full max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-24 w-full max-w-4xl rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-12">
            <h2 className="mb-4 text-3xl font-bold">{t.readyTitle}</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t.readySubtitle}
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all">
                {t.createAccount}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built using{' '}
            <a
              href="https://cayu.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cayu AI
            </a>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear 3 forwards;
        }
      `}</style>
    </div>
  )
}
