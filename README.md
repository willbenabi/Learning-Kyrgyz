# Berkut / Беркут

A production-ready Rails 8 application for learning the Kyrgyz language with adaptive lessons, AI-powered assistance, and personalized content recommendations.

Готовое приложение на Rails 8 для изучения кыргызского языка с адаптивными уроками, помощью искусственного интеллекта и персонализированными рекомендациями контента.

---

## 📖 О проекте / About the Project

**Berkut** — это комплексное мобильное и веб-приложение для эффективного и персонализированного изучения кыргызского языка. Основная цель — создать интерактивную образовательную среду, которая адаптируется под уровень и интересы пользователя, предлагая разнообразные учебные материалы и практические задания.

---

## 🎯 Ключевые возможности / Key Features

### 1. Определение уровня пользователя

При первом входе в приложение пользователь проходит **адаптивный тест из 40 вопросов**. Система анализирует ответы: при правильных — задания усложняются, при ошибках — упрощаются. По результатам теста определяется стартовый уровень по шкале CEFR (A1–C1), и формируется индивидуальный учебный план.

**Реализовано:**
- ✅ Comprehensive 40-question placement test
- ✅ Adaptive difficulty based on performance
- ✅ CEFR level determination (A1-C1)
- ✅ AI-powered diagnostics with strengths/weaknesses analysis
- ✅ Manual level selection option
- ✅ "Start from scratch" option for complete beginners

### 2. Учебный план и ключевые модули

#### 📚 Грамматика (Grammar Module) ✅ FULLY IMPLEMENTED

Пользователь получает грамматический материал, соответствующий его уровню, а также практические упражнения и тесты. Предусмотрен встроенный чат с искусственным интеллектом, к которому можно обращаться за объяснениями и разбором сложных тем.

**Содержание:**
- **52 урока** по всем уровням (A1-C1)
- **195 вопросов** в тестах
- Двуязычная теория (английский/русский)
- Примеры на кыргызском с переводами
- Словарные банки для каждого урока
- Мгновенная обратная связь по упражнениям
- Финальные тесты по каждому уровню
- Отслеживание прогресса выполнения

#### 📖 Чтение и понимание текста (Reading Module) ✅ FULLY IMPLEMENTED

Учащемуся предоставляются тексты подходящего уровня сложности:
- Отрывки книг кыргызских авторов
- Сказки и народные рассказы
- Поэзия
- Современные статьи и новости (только грамматически корректные и без спорных тем)

**Содержание:**
- **50 текстов** по всем уровням
- A1-B1: Вопросы с множественным выбором
- B2-C1: Открытые вопросы для критического анализа
- Аутентичные кыргызские тексты
- Прогрессивное усложнение словарного запаса

#### ✍️ Письмо (Writing Module) ✅ FULLY IMPLEMENTED

Пользователю выдаётся тема по его уровню подготовки, и он должен написать небольшой текст. Раздел предназначен для развития навыков письма и формулировки мыслей на кыргызском языке.

**Возможности:**
- Письменные задания для всех уровней (A1-C1)
- Банки слов для начинающих уровней
- Шаблоны письма для A1-A2
- Автосохранение в localStorage
- Отслеживание количества слов
- **AI-оценка письма** с использованием Google Gemini:
  - 4 критерия оценки (0-100): Грамматика, Соответствие теме, Словарный запас, Структура
  - Обнаружение грамматических ошибок с исправлениями
  - Предложения по улучшению текста
  - Обратная связь на языке интерфейса (EN/RU)

#### 📝 Словарный запас (Vocabulary Module) ✅ ACTIVE

Ежедневно отображаются несколько новых слов с переводом и значением. Слова объединяются по недельным темам, а в конце каждой недели проводится мини-тест.

**Организация:**
- Словарные темы, организованные по уровням
- A1: 500-600 слов (Приветствия, Семья, Числа, Еда)
- A2: 1000-1200 слов (Здоровье, Погода)
- B1: 2000-2200 слов (Образование, Работа)
- B2: 4000-4500 слов (Политика и общество)
- C1: 6000-8000+ слов (Академический язык)
- **Два режима обучения**: Карточки и Викторина
- Поддержка аудио произношения (Web Speech API)
- Отслеживание прогресса и подсчёт баллов

### 3. Рекомендации контента ✅ FULLY IMPLEMENTED

В приложении предусмотрена отдельная лента рекомендаций: новости, книги в свободном доступе, музыка, фильмы, видеоролики на кыргызском языке.

**Две системы рекомендаций:**

#### A) Ежедневные видео-рекомендации
- 4-5 видео за запрос из базы данных
- Фильтрация по уровню (A1-C1)
- Логика без повторов в течение 24 часов
- 40+ видео с YouTube (алфавит, сказки, новости, литература, эпос Манас)
- Категории: tutorial, conversation, grammar, vocabulary, culture, music, news
- Админ-панель для управления контентом

#### B) AI-рекомендации контента (Google Gemini)
- 5-6 рекомендаций на уровень CEFR, обновляемых ежедневно
- Три типа контента: чтение, аудирование, просмотр
- **Настоящие рабочие URL** к ресурсам на кыргызском (YouTube, okuma.kg, kitep.kg, Азаттык, 24.kg, КТРК)
- Прогрессивное усложнение по уровням:
  - A1: Детские песни, простые мультики (Керемет көч)
  - A2: Народные сказки, упрощённые новости
  - B1: Статьи, фильмы с субтитрами
  - B2: Современная литература, документальные фильмы
  - C1: Классика (Айтматов, эпос Манас), академические лекции
- Автоматическое обновление при повышении уровня

### 4. Интерактивная поддержка ✅ FULLY IMPLEMENTED

#### AI-чат помощник (AI-powered)
- Практика разговора в реальном времени на кыргызском
- **Строгий режим "только кыргызский"** — AI всегда отвечает на кыргызском
- Адаптивная сложность беседы по уровню CEFR
- Объяснения грамматики с примерами
- Помощь с заданиями по письму и чтению
- **Постоянная история чатов** — все беседы автоматически сохраняются
- Контекстно-зависимые ответы для изучения языка

#### Техническая поддержка
- Пользователи могут сообщать об ошибках
- Форма обратной связи с темой и подробным сообщением
- **Админ-панель** для управления обращениями:
  - Статистика сообщений (всего/непрочитанных/прочитанных)
  - Счётчик непрочитанных в сайдбаре
  - Просмотр, пометка как прочитанное, удаление
  - Отображение информации об отправителе

### 5. Отслеживание прогресса ✅ FULLY IMPLEMENTED

**Комплексная система прогресса:**
- Текущий уровень CEFR (A1-C1)
- Текущая серия (последовательные дни активности)
- Самая длинная серия
- Всего дней активности
- Завершённые уроки по всем модулям
- Выученные слова
- Заработанные достижения/значки

**Система достижений (20+ значков):**
- Достижения серий: 3, 7, 14, 30, 100 дней
- Вехи уроков: 10, 50, 100, 200 завершённых уроков
- Завершение модулей: Завершить все уроки в модуле/уровне
- Вехи словаря: 100, 500, 1000 выученных слов
- Особые значки: Первый урок, Ранняя пташка, Ночная сова

**Страница прогресса:**
- Обзорные карточки с ключевыми метриками
- **Полосы прогресса по модулям** (Грамматика, Чтение, Письмо, Словарь)
- Статистика по периодам (день/неделя/месяц)
- Витрина достижений с иконками
- Лента последней активности
- Отслеживание даты последней активности

### 6. Двуязычный интерфейс ✅ FULLY IMPLEMENTED

**Полная поддержка английского и русского языков:**
- Выбор языка при первом посещении
- Переключатель языка на всех ключевых страницах
- Переводы для всех публичных страниц
- Переведённые сообщения валидации форм
- Настройки языка в профиле
- Сохранение выбора языка в localStorage
- Строгое разделение: интерфейс (EN/RU), учебный контент (кыргызский)

---

## 🚀 Tech Stack

### Backend
- **Rails 8.0.3** - Latest stable Rails version
- **Ruby 3.3.6** - Modern Ruby
- **SQLite** - Database (easily swappable to PostgreSQL)
- **JWT** - Token-based authentication (no cookies, iframe-safe)
- **ActiveInteraction** - Service objects for business logic
- **Pundit** - Authorization policies
- **Pagy** - Fast pagination
- **RSpec** - Test framework with 84 passing tests

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe components
- **Inertia.js** - SPA experience without API complexity
- **Vite** - Lightning-fast asset bundling with HMR
- **Tailwind CSS v4** - Modern utility-first CSS
- **shadcn/ui** - Beautiful, accessible components
  - Dashboard-01 template (sidebar, charts, data tables)
  - Login-03 template (authentication pages)

## ✨ Features

### Authentication & Security
- ✅ JWT-based authentication (localStorage, no cookies)
- ✅ Automatic token refresh (30-day expiration)
- ✅ Refresh token rotation for security
- ✅ Password reset flow
- ✅ CORS configuration for production
- ✅ Secure password hashing with bcrypt

### User Management
- ✅ Three-tier role system (user, admin, super_admin)
- ✅ Super Admin dashboard with user management
- ✅ User CRUD operations (create, read, update, delete)
- ✅ Profile management for all users
- ✅ Pagination with Pagy

### Developer Experience
- ✅ Full TypeScript support
- ✅ TDD with 84 passing specs
- ✅ Factory Bot for test data
- ✅ Shoulda Matchers for clean specs
- ✅ Hot module replacement (HMR)
- ✅ Code quality with RuboCop

## 📦 Installation

### Prerequisites
- Ruby 3.3.6
- Node.js 18+
- SQLite3

### Setup

1. **Clone and install dependencies:**
   ```bash
   bundle install
   npm install
   ```

2. **Setup database:**
   ```bash
   bundle exec rails db:create db:migrate db:seed
   ```

3. **Start development servers:**
   ```bash
   bin/dev
   ```

   This starts both Rails (port 3000) and Vite dev server

4. **Visit http://localhost:3000**

### Default Credentials

After running `db:seed`, you can login with:

- **Super Admin:** admin@example.com / password123
- **Admin:** admin.user@example.com / password123
- **Users:** user1@example.com ... user5@example.com / password123

## 🧪 Testing

Run the full test suite:
```bash
bundle exec rspec
```

Run specific tests:
```bash
bundle exec rspec spec/models
bundle exec rspec spec/services
bundle exec rspec spec/requests
```

## 📁 Project Structure

```
app/
├── controllers/
│   ├── concerns/
│   │   └── authenticatable.rb          # JWT authentication logic
│   ├── admin/
│   │   ├── dashboard_controller.rb
│   │   └── users_controller.rb
│   ├── password/
│   │   └── reset_controller.rb
│   ├── dashboard_controller.rb
│   ├── profiles_controller.rb
│   └── sessions_controller.rb
├── frontend/
│   ├── components/
│   │   └── ui/                          # shadcn/ui components
│   ├── entrypoints/
│   │   ├── inertia.tsx                  # Main Inertia app
│   │   └── application.css              # Tailwind styles
│   ├── lib/
│   │   ├── auth.ts                      # Frontend auth service
│   │   └── utils.ts                     # Utility functions
│   └── pages/
│       ├── Auth/
│       │   └── Login.tsx
│       ├── Admin/
│       │   ├── Dashboard.tsx
│       │   └── Users/Index.tsx
│       ├── Profile/
│       │   └── Show.tsx
│       └── Dashboard.tsx
├── models/
│   ├── user.rb
│   └── refresh_token.rb
└── services/
    └── auth/
        ├── jwt_service.rb               # JWT encoding/decoding
        ├── login.rb                     # Login service
        ├── refresh_token_service.rb     # Token refresh
        ├── request_password_reset.rb
        └── reset_password.rb

spec/
├── models/                              # 33 model specs
├── services/                            # 46 service specs
└── requests/                            # 5 request specs
```

## 🔐 Authentication Flow

### Login
1. User submits email/password to `/session`
2. Backend validates credentials
3. Returns JWT token (24h) + refresh token (30d)
4. Frontend stores tokens in localStorage
5. Automatic token refresh every 20 hours

### Token Refresh
1. Frontend detects token near expiration
2. Sends refresh token to `/session/refresh`
3. Backend validates refresh token
4. Returns new JWT + new refresh token
5. Old refresh token is revoked

### Logout
1. User clicks logout
2. Frontend sends DELETE to `/session` with JWT
3. Backend revokes all user's refresh tokens
4. Frontend clears tokens from localStorage

## 🎨 UI Components

This template includes shadcn/ui components:

- **dashboard-01**: Full dashboard layout with sidebar, charts, and data tables
- **login-03**: Beautiful login page design
- All shadcn/ui primitives (Button, Card, Input, Table, Badge, etc.)

Add more components:
```bash
npx shadcn@latest add [component-name]
```

## 🛠 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
RAILS_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### CORS

CORS is configured in `config/initializers/cors.rb`:
- Development: Allows localhost origins
- Production: Uses `ALLOWED_ORIGINS` environment variable

## 📝 API Endpoints

### Authentication
- `POST /session` - Login
- `DELETE /session` - Logout
- `POST /session/refresh` - Refresh JWT token

### Password Reset
- `POST /password/forgot` - Request password reset
- `GET /password/reset?token=xyz` - Show reset form
- `PUT /password/reset` - Update password

### User Management (Super Admin)
- `GET /admin/users` - List all users
- `POST /admin/users` - Create user
- `GET /admin/users/:id` - Show user
- `PATCH /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### Profile
- `GET /profile` - View own profile
- `PATCH /profile` - Update own profile

## 🚢 Deployment

### Production Checklist

1. Set environment variables:
   ```env
   RAILS_ENV=production
   SECRET_KEY_BASE=<your-secret>
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. Precompile assets:
   ```bash
   npm run build
   bundle exec rails assets:precompile
   ```

3. Run migrations:
   ```bash
   bundle exec rails db:migrate
   ```

4. Create initial super admin:
   ```bash
   bundle exec rails db:seed
   ```

### Security Considerations

- ✅ JWT tokens stored in localStorage (not cookies)
- ✅ Automatic token rotation
- ✅ CORS properly configured
- ✅ CSRF protection enabled
- ✅ SQL injection prevention via ActiveRecord
- ✅ Password validation (minimum 8 characters)
- ✅ Bcrypt for password hashing

## 🎯 What Makes This Template Different?

1. **Iframe-Safe**: JWT-only approach works in iframes (no third-party cookie issues)
2. **TDD from Start**: 84 passing tests covering all critical paths
3. **Modern Stack**: Latest Rails 8, React 19, TypeScript, Tailwind v4
4. **Production-Ready**: CORS, security headers, token refresh, pagination
5. **Beautiful UI**: shadcn/ui components with dark mode support
6. **Clean Architecture**: Service objects, concerns, proper separation
7. **Type-Safe**: TypeScript on frontend for better DX

## 📚 Learn More

- [Inertia.js Documentation](https://inertiajs.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Rails Guides](https://guides.rubyonrails.org)
- [Tailwind CSS](https://tailwindcss.com)
