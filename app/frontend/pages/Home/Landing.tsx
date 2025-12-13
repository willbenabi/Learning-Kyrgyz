import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Mic,
  PenTool,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { LoginDialog } from '@/components/LoginDialog'
import { RegisterDialog } from '@/components/RegisterDialog'

export default function Landing() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en')
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setLanguage(lang)
    }
  }, [])

  const translations = {
    en: {
      getStarted: 'GET STARTED',
      signIn: 'SIGN IN',
      hero: 'The free, fun, and effective way to learn',
      heroLanguage: 'Kyrgyz',
      heroSubtitle: 'Learn through bite-sized lessons, real conversations, and cultural immersion.',
      startLearning: 'GET STARTED',
      iHaveAccount: 'I ALREADY HAVE AN ACCOUNT',
      whyLearnTitle: 'Why learn Kyrgyz with Berkut?',
      effectiveTitle: 'Effective and efficient',
      effectiveDesc: 'Our bite-sized lessons are proven to boost your language skills. Grammar, reading, writing, and vocabulary—all designed for rapid progress.',
      personalizedTitle: 'Personalized learning',
      personalizedDesc: 'Our AI analyzes your level and creates a custom curriculum just for you. Practice at your own pace with adaptive lessons.',
      stayMotivatedTitle: 'Stay motivated',
      stayMotivatedDesc: 'Track your progress, earn achievements, and maintain your streak. Learning a language has never been this engaging.',
      funTitle: 'Have fun with it!',
      funDesc: 'Effective learning doesn\'t have to be boring! Build skills through interactive exercises, conversations with AI, and cultural content.',
      howItWorksTitle: 'How you\'ll learn Kyrgyz',
      lessonsTitle: 'Interactive Lessons',
      lessonsDesc: 'Master grammar, vocabulary, and writing through structured lessons designed for all levels (A1-C1).',
      practiceTitle: 'AI Conversation Practice',
      practiceDesc: 'Chat with our AI assistant in Kyrgyz. Get instant feedback and improve your conversation skills naturally.',
      progressTitle: 'Track Your Progress',
      progressDesc: 'See your improvement with detailed statistics, achievements, and level progression tracking.',
      readyTitle: 'Ready to start learning?',
      readySubtitle: 'Join thousands of learners discovering the beauty of Kyrgyz.',
      startNow: 'START NOW'
    },
    ru: {
      getStarted: 'НАЧАТЬ',
      signIn: 'ВОЙТИ',
      hero: 'Бесплатный, увлекательный и эффективный способ изучения',
      heroLanguage: 'кыргызского',
      heroSubtitle: 'Учитесь через короткие уроки, реальные разговоры и культурное погружение.',
      startLearning: 'НАЧАТЬ',
      iHaveAccount: 'У МЕНЯ УЖЕ ЕСТЬ АККАУНТ',
      whyLearnTitle: 'Почему изучать кыргызский с Berkut?',
      effectiveTitle: 'Эффективно и результативно',
      effectiveDesc: 'Наши короткие уроки доказанно улучшают ваши языковые навыки. Грамматика, чтение, письмо и лексика—всё для быстрого прогресса.',
      personalizedTitle: 'Персонализированное обучение',
      personalizedDesc: 'Наш AI анализирует ваш уровень и создаёт индивидуальную программу. Занимайтесь в своём темпе с адаптивными уроками.',
      stayMotivatedTitle: 'Сохраняйте мотивацию',
      stayMotivatedDesc: 'Отслеживайте прогресс, зарабатывайте достижения и поддерживайте серию. Изучение языка ещё никогда не было таким увлекательным.',
      funTitle: 'Получайте удовольствие!',
      funDesc: 'Эффективное обучение не должно быть скучным! Развивайте навыки через интерактивные упражнения, разговоры с AI и культурный контент.',
      howItWorksTitle:'Как вы будете изучать кыргызский',
      lessonsTitle: 'Интерактивные уроки',
      lessonsDesc: 'Осваивайте грамматику, лексику и письмо через структурированные уроки для всех уровней (A1-C1).',
      practiceTitle: 'Практика с AI',
      practiceDesc: 'Общайтесь с нашим AI-ассистентом на кыргызском. Получайте мгновенную обратную связь и улучшайте разговорные навыки естественно.',
      progressTitle: 'Отслеживайте прогресс',
      progressDesc: 'Наблюдайте своё улучшение с подробной статистикой, достижениями и отслеживанием уровней.',
      readyTitle: 'Готовы начать обучение?',
      readySubtitle: 'Присоединяйтесь к тысячам учащихся, открывающих для себя красоту кыргызского языка.',
      startNow: 'НАЧАТЬ СЕЙЧАС'
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/95 dark:bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=80&auto=format&fit=crop"
              alt="Berkut Logo"
              className="h-12 w-12 rounded-xl object-cover"
            />
            <span className="text-2xl font-black text-foreground tracking-tight">BERKUT</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="lg"
              className="font-bold tracking-wide"
              onClick={() => setLoginOpen(true)}
            >
              {t.signIn}
            </Button>
            <Button
              size="lg"
              className="bg-[#58CC02] hover:bg-[#4FB300] text-white font-bold tracking-wide rounded-2xl px-8 shadow-lg"
              onClick={() => setRegisterOpen(true)}
            >
              {t.getStarted}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-foreground">
                {t.hero} <span className="text-[#58CC02]">{t.heroLanguage}</span>!
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#58CC02] hover:bg-[#4FB300] text-white font-bold tracking-wide rounded-2xl px-10 py-7 text-lg shadow-lg w-full sm:w-auto"
                  onClick={() => setRegisterOpen(true)}
                >
                  {t.startLearning}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold tracking-wide rounded-2xl px-10 py-7 text-lg border-2 border-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
                  onClick={() => setLoginOpen(true)}
                >
                  {t.iHaveAccount}
                </Button>
              </div>
            </div>

            {/* Right: Mascot Image */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=600&auto=format&fit=crop"
                  alt="Berkut Mascot"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 bg-[#FFB800] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                  A1-C1
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#FF4B4B] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  AI-Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-16 text-foreground">
            {t.whyLearnTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: t.effectiveTitle, desc: t.effectiveDesc, color: 'text-[#58CC02]' },
              { icon: Users, title: t.personalizedTitle, desc: t.personalizedDesc, color: 'text-[#1CB0F6]' },
              { icon: Globe, title: t.stayMotivatedTitle, desc: t.stayMotivatedDesc, color: 'text-[#FFB800]' },
              { icon: PenTool, title: t.funTitle, desc: t.funDesc, color: 'text-[#FF4B4B]' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-white dark:bg-background shadow-lg">
                    <item.icon className={`w-12 h-12 ${item.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-16 text-foreground">
            {t.howItWorksTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: BookOpen, title: t.lessonsTitle, desc: t.lessonsDesc, gradient: 'from-[#58CC02] to-[#4FB300]' },
              { icon: Mic, title: t.practiceTitle, desc: t.practiceDesc, gradient: 'from-[#1CB0F6] to-[#0E9ED9]' },
              { icon: TrendingUp, title: t.progressTitle, desc: t.progressDesc, gradient: 'from-[#FFB800] to-[#FF9600]' },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative bg-white dark:bg-card border-2 border-gray-200 dark:border-border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#58CC02] to-[#4FB300] text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black">
            {t.readyTitle}
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            {t.readySubtitle}
          </p>
          <Button
            size="lg"
            className="bg-white text-[#58CC02] hover:bg-gray-100 font-bold tracking-wide rounded-2xl px-12 py-7 text-lg shadow-2xl"
            onClick={() => setRegisterOpen(true)}
          >
            {t.startNow}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-white dark:bg-background">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="https://images.unsplash.com/vector-1740629145639-51b2768eb3ca?q=80&w=60&auto=format&fit=crop"
              alt="Berkut Logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="text-xl font-black text-foreground">BERKUT</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Learn Kyrgyz the easy way
          </p>
        </div>
      </footer>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToRegister={() => {
          setLoginOpen(false)
          setRegisterOpen(true)
        }}
      />
      <RegisterDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSwitchToLogin={() => {
          setRegisterOpen(false)
          setLoginOpen(true)
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-bounce {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
