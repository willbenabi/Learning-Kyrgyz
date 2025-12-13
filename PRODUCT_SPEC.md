# Product Specs

## Product Overview

**Berkut** - A comprehensive language learning application designed to help users master the Kyrgyz language through adaptive lessons, AI-powered assistance, and personalized content recommendations.

## Core Features (Level 1 - Quick Prototype)

### 1. Public Registration & Onboarding

**User Registration (No Invitation Required)**

- Public registration form accessible to anyone
- Required fields: Name, Email, Password, Password Confirmation
- Optional fields:
  - Country (dropdown selection)
- Form validation with clear error messages (client and server-side)
- Password requirements: minimum 8 characters
- Email uniqueness validation
- Automatic login after successful registration with JWT tokens
- Redirect to language selection after registration

**Language Selection**
- First-time user experience showing interface language choice
- Two options: Russian (Русский) or English
- Large, clear buttons with flag icons
- Language preference stored for entire user journey
- All UI text, explanations, and feedback respect chosen language
- Kyrgyz content remains in Kyrgyz (examples, exercises, readings)
- **Mobile-Optimized Language Switcher** ✅ **NEW**
  - Desktop: EN/RU toggle buttons in page headers for quick switching
  - Mobile: Language selector moved to user profile dropdown menu
  - Available alongside Theme setting in profile settings
  - Prevents text overlap issues on small screens
  - Seamless language switching across all pages

**Level Selection Path**
- After language selection, users choose how to begin their learning journey
- Three comprehensive options with clear descriptions:
  1. **I Know My Level** - Manually select proficiency level (A1-C1)
  2. **Take Placement Test** - Complete comprehensive 40-question assessment (15-20 minutes)
  3. **Start from Scratch** - Begin at A1 level (recommended for complete beginners)
- Bilingual interface (Russian/English)
- Users can retake placement test or change level later from profile settings

**Manual Level Selection**
- Interactive cards for each CEFR level (A1, A2, B1, B2, C1)
- Each level displays:
  - Color-coded badge
  - Level title and description
  - Detailed proficiency explanation
- Visual selection feedback with checkmark
- Confirmation required before proceeding

**Comprehensive Placement Test (40 Questions)**
- One question at a time with progress indicator
- 40 questions covering all 5 CEFR levels (8 questions per level)
- Questions organized by level: A1, A2, B1, B2, C1
- Diverse question types: grammar, vocabulary, comprehension, sentence completion
- Multiple choice format with 4 options per question
- Questions in Kyrgyz with bilingual answer options (Russian/English)
- Optional instruction text for specific questions

**Test Flexibility Options:**
- **Skip Question**: Users can skip questions they don't know without penalty
- **Finish Early**: Complete test at any time after answering first question
- Early finish shows detected level and option to continue or accept result
- Skipped questions don't affect level determination

**Level Determination Algorithm:**
- Linear progression based on highest correctly answered question
- Questions 1-8 (correct) → A1 level
- Questions 9-16 (correct) → A2 level
- Questions 17-24 (correct) → B1 level
- Questions 25-32 (correct) → B2 level
- Questions 33-40 (correct) → C1 level
- Level assigned based on highest question number answered correctly
- Test duration: 15-20 minutes (can be shorter with early finish)
- Results stored for diagnostics

**AI Diagnostics Results**
- Display of determined level (A1-C1) with large badge
- Level name and description in chosen language
- Comprehensive diagnostic summary:
  - Strengths (what user does well)
  - Weaknesses (areas needing improvement)
  - Grammar focus topics
  - Recommended reading level
  - Vocabulary focus areas
  - Personalized recommendations
- Expandable mistakes section showing:
  - Each incorrect answer
  - Correct answer
  - Question details
- "Start Learning" button to proceed to dashboard

### 2. Main Learning Dashboard

**Daily Video Recommendations** ✅ **FULLY IMPLEMENTED (Level 2)**
- Curated video content system with admin management
- 4-5 videos per request, randomized from database
- Level-based filtering (A1-C1 CEFR levels)
- 24-hour no-repeat logic (same video won't show twice in 24h)
- All content in Kyrgyz language with translations

**Frontend Features:**
- Automatic API fetching based on user's current level
- Video cards with YouTube thumbnails and descriptions
- Category badges (tutorial, conversation, grammar, vocabulary, culture, music, news)
- Refresh button to get new random recommendations
- Direct external links to YouTube videos
- Bilingual interface (EN/RU)
- Error handling and loading states
- Responsive 3-column grid layout

**Admin Management Interface:**
- Full CRUD operations for video recommendations
- Filter by level (A1-C1) and status (active/inactive)
- Search in titles and descriptions
- Toggle active/inactive status
- Pagination (20 items per page)
- Comprehensive form validation
- Audit trail for all changes
- Accessible at `/admin/video_recommendations`

**Public API Endpoint:**
- `GET /api/daily-recommendations?level=A1&count=5`
- No authentication required (public access)
- Returns JSON with level, date, and recommendations array
- Count parameter: min 1, max 10, default 5
- Smart selection algorithm: active videos only, not shown in 24h, random order

**Database Structure:**
- VideoRecommendation model with 40+ seeded videos
- Fields: level, title, description, video_url, thumbnail_url, category, active, last_shown_at
- Indexed on level, active, last_shown_at for performance
- URL format validation for video and thumbnail URLs
- Level inclusion validation (A1-C1 only)

**Content Distribution:**
- A1: 10 videos (alphabet, greetings, numbers, family, colors, food, simple sentences, daily words, cartoons)
- A2: 10 videos (shopping, doctor visits, transport, fairy tales, grammar, restaurants, nature, professions, music)
- B1: 8 videos (culture, news, literature, grammar, tourism, games, food culture)
- B2: 6 videos (language evolution, history, literature, dialects, economy, theater)
- C1: 6 videos (Manas epic, philosophy, linguistics, ethnography, academic conferences)

**Status**: ✅ **COMPLETE** - Full end-to-end video recommendation system

**AI-Powered Daily Recommendations** ✅ **FULLY ENHANCED (Level 2)**

- **Curated content system** with exactly **3 recommendations per day** for each CEFR level (A1-C1)
- Daily recommendations selected randomly from curated resource pools
- Updated every 24 hours at 00:00 UTC via automated rake tasks
- Three content types: reading, listening, watching
- **10 resource types**: Song, Article, Video, Podcast, Book, Film, Series, Story, Game, Website

**Enhanced Visual Display:**

- **Thumbnail previews** for YouTube videos and visual content
- **Dual badge system**: Content type (Reading/Listening/Watching) + Resource type (Song/Video/Film/etc.)
- Prominent purple gradient card on main dashboard
- **Collapsible interface** with expand/collapse toggle
- YouTube thumbnail format: `https://i.ytimg.com/vi/{video_id}/mqdefault.jpg`
- Fallback gradient backgrounds when thumbnails unavailable
- Icon overlays on thumbnails indicating content type
- Enhanced card layout with visual hierarchy
- External links to recommended resources
- Bilingual translations for all resource types (EN/RU)
- Loading states and error handling

**Curated Resource Distribution:**

- **A1 (9 resources)**: Video (5), Song (1), Film (1), Series (1), Game (1)
  - Topics: Alphabet, fairy tales, colors, numbers, simple grammar, phonetics
  - Examples: Кыргызский алфавит в песне, Мультфильм "Манас", Загадки на кыргызском

- **A2 (10 resources)**: Story (2), Video (3), Website (1), Song (3)
  - Topics: Folk tales, proverbs, grammar courses, traditional music, health lessons
  - Examples: Кыргызские народные сказки, Пословицы и скороговорки, Современная кыргызская музыка

- **B1 (9 resources)**: Story (1), Video (3), Song (3), Article (1), Book (1)
  - Topics: Audio storybooks, video lessons, national anthem, interesting facts, PDF books
  - Examples: Гимн Кыргызстана, Интересные факты о Кыргызстане, Кыргызские народные сказки (PDF)

- **B2/C1 (13 resources)**: Article (1), Series (4), Film (5), Book (3), Website (1)
  - Topics: Sputnik news, films (Полчан, Ханбийке, Буйиш), literature (Айтматов, Манас epic, Осмонов poetry)
  - Examples: Произведения Чынгыза Айтматова, Эпос "Манас", Электронная библиотека Okuma.kg

**Automation & Scheduling:**

- Four automated rake tasks running daily:
  - `rake a1_recommendations:generate`
  - `rake a2_recommendations:generate`
  - `rake b1_recommendations:generate`
  - `rake b2_c1_recommendations:generate`
- Each task selects 3 random items from its resource pool
- Resources include YouTube videos, songs, articles, books, websites
- All descriptions condensed to 1-2 sentences for quick scanning

**Public API Endpoint:**

- `GET /api/ai-recommendations?level=A1`
- Returns JSON with exactly 3 recommendations
- Fields: id, type, resource_type, title, description, url, thumbnail_url, generated_at
- No authentication required
- Filterable by level and date

**Database Structure:**

- `daily_recommendations` table with enhanced fields
- Core fields: level, date, content_type, title, description, url
- **New fields**: resource_type, thumbnail_url
- Indexed on (level, date) for performance
- Validations:
  - CEFR levels (A1-C1)
  - Content types (reading/listening/watching)
  - Resource types (Song, Article, Video, Podcast, Book, Film, Series, Story, Game, Website)

**Status**: ✅ **COMPLETE** - Enhanced curated recommendations with thumbnails, resource type badges, and exactly 3 items per day

**Learning Modules (4 Cards)**
1. **Grammar Module** ✅ **FULLY IMPLEMENTED**
   - Master Kyrgyz grammar rules through comprehensive structured lessons across all CEFR levels

   **Complete Curriculum Structure:**
   - **A1 Level**: 14 lessons + final test (35 questions)
     - 6 Syntax lessons: Sentence structure, subjects, predicates, word order (SOV), sentence types, secondary parts
     - 8 Morphology lessons: Parts of speech, plural formation, 5 noun cases, personal pronouns

   - **A2 Level**: 11 lessons + final test (35 questions)
     - Complex sentences, subordinate clauses, purpose/comparative clauses
     - Past/future tense, possessive suffixes, genitive/instrumental cases
     - Present continuous, verb negation

   - **B1 Level**: 11 lessons + final test (35 questions)
     - Conditional sentences, modal verbs, perfect tense, relative clauses
- Passive/causative/reciprocal/reflexive voices
     - Reported speech, concessive clauses, desiderative mood

   - **B2 Level**: 8 lessons + final test (30 questions)
     - Unreal conditionals, evidentiality (-птыр/-птир), presumptive mood (экен)
     - Complex temporal clauses, optative mood, correlative conjunctions
     - Converbs (verbal adverbs), nominalization

   - **C1 Level**: 8 lessons + final test (30 questions)
     - Literary/archaic constructions, participial constructions
     - Complex causal clauses, diminutive/augmentative forms
     - Discourse markers, aspectual verb constructions
     - Elliptical/inverted constructions, idiomatic expressions

   **Lesson Features:**
   - Each lesson includes detailed bilingual theory (English/Russian)
   - Multiple examples with Kyrgyz text, translations, and explanations
   - Vocabulary word banks for each lesson
   - 2-5 quiz questions per lesson with instant feedback
   - Final tests include comprehensive review with detailed explanations
   - **Completion Tracking** ✅ **NEW**
     - Completed lessons marked with green background and checkmark badge
     - Visual progress indicator shows which lessons are done
     - Completion status persists across sessions
     - Real-time UI updates when lessons are completed

   **Final Comprehensive Exam** ✅ **FULLY IMPLEMENTED (Level 3)**

   Users can test their overall grammar knowledge with comprehensive exams after completing all lessons for their level:

   - **Exam Structure**: 35 random questions per attempt covering all grammar topics
   - **Question Format**: Multiple choice with 4 bilingual options (English/Russian)
   - **Question Pool**: 175 total questions (35 per level: A1-C1)
   - **Categories**: Questions cover both Syntax and Morphology topics
   - **Unlock Logic**: Must complete all lessons in current level before taking exam
   - **Scoring**: 0-100% score with 70% passing threshold
   - **Timing**: Optional timer tracks time spent on exam
   - **Multiple Attempts**: Users can retake exams to improve their score
   - **Progress Tracking**: Best score and attempt count displayed

   **Exam Taking Experience:**

   - Start screen shows best score and previous attempts
   - One question per screen with progress indicator (Question X of 35)
   - Answer tracking shows how many questions have been answered
   - Navigation buttons to move between questions
   - Submit confirmation if questions remain unanswered
   - Timer displays elapsed time during exam

   **Results Display:**

   - Overall score with pass/fail status (70% threshold)
   - Congratulations message for passing, encouragement for failing
   - Category breakdown showing performance in Syntax vs Morphology
   - Detailed review of incorrect answers with:
     - User's selected answer
     - Correct answer highlighted
     - Explanation for each question
   - Best score badge when achieving new personal best
   - Retake button to attempt exam again
   - Time spent displayed in results

   **Database Schema:**

   - `grammar_exams` table: Stores user attempts with scores, timestamps, answers
   - `grammar_exam_questions` table: Question bank with bilingual options
   - All questions in Kyrgyz with English/Russian answer translations
   - Indexed for performance on user_id, level, attempted_at

   **Total Content**: 52 lessons + 5 comprehensive final tests (195 questions) + 175 exam questions (35 per level)
   - Icon: BookOpen
   - Color: Blue
   - Status: ✅ **100% COMPLETE** - All levels A1-C1 fully implemented including comprehensive exams

2. **Reading & Comprehension Module** ✅ **FULLY IMPLEMENTED**
   - Practice reading Kyrgyz texts and improve comprehension
   - **50 comprehensive reading texts across all CEFR levels (A1-C1)**

   **A1 Level (10 texts)**: Simple descriptions and personal information
   - Topics: Objects, people, family, market, weather, room, animals, daily routine, colors, numbers
   - 2-3 multiple choice questions per text

   **A2 Level (10 texts)**: Folk tales and simple narratives
   - Topics: Traditional fables, health dialogue, seasons, travel, food, moral tales, school stories, practical situations, hobbies
   - 4-5 multiple choice questions per text

   **B1 Level (10 texts)**: News articles and cultural content
   - Topics: Art exhibitions, national games, education reform, epic legends, eco-tourism, youth employment, handicrafts, public transportation, mountain safety, international cuisine
   - 6 multiple choice questions per text

   **B2 Level (10 texts)**: Analytical articles on complex topics
   - Topics: Climate change, language preservation, digital economy, youth migration, social media, traditional vs modern medicine, entrepreneurship, gender equality, urban/rural development
   - 5 open-ended analytical questions per text

   **C1 Level (10 texts)**: Literary essays and advanced academic texts
   - Topics: Literary legacy, nomadic philosophy, linguistic identity, postcolonial discourse, epistemology, epic narratives, sociolinguistics, cultural memory, political rhetoric, intertextuality
   - 5 open-ended critical analysis questions per text

   **Module Features:**
   - Multiple choice questions (A1-B1) with instant feedback and scoring
   - Open-ended questions (B2-C1) for deep analytical responses
   - Bilingual titles and descriptions (English/Russian)
   - All texts in authentic Kyrgyz with appropriate vocabulary for each level
   - Icon: FileText
   - Color: Green
   - Status: ✅ **100% COMPLETE** - All 50 texts implemented across all levels

3. **Writing Module** ✅ **FULLY IMPLEMENTED**
   - Improve Kyrgyz writing skills through structured prompts
   - Writing prompts for all levels (A1-C1) with support materials
   - A1: Simple sentences about family, food, daily routine (3 prompts)
   - A2: Short notes and descriptions (2 prompts)
   - B1: Connected text on familiar topics (2 prompts)
   - B2: Essays and analytical writing (2 prompts)
   - C1: Complex analytical essays (2 prompts)
   - Word banks for A1-A2 levels to support vocabulary
   - Writing templates for beginner levels
   - Guidelines and evaluation criteria for each prompt
   - Auto-save functionality to localStorage
   - Word count tracking with progress indicator
   - **AI-Powered Writing Evaluation** ✅ **NEW**
     - Evaluate user's Kyrgyz text using Google Gemini AI
     - Four scoring criteria (0-100): Grammar, Topic Relevance, Vocabulary, Structure
     - Grammar error detection with corrections and explanations
     - Improvement suggestions tailored to user's level
     - "Check with AI" button with loading state
     - Comprehensive results display with color-coded score badges
     - All feedback in interface language (English/Russian)
     - Helps users identify mistakes and learn proper Kyrgyz writing
   - Bilingual interface (Russian/English)
   - Icon: PenTool
   - Color: Purple

4. **Vocabulary Builder Module** ✅ **ACTIVE**
   - Expand Kyrgyz vocabulary through thematic word sets
   - Vocabulary topics organized by level with target word counts
   - A1: 500-600 words (Greetings, Family, Numbers, Food - 4 topics)
   - A2: 1000-1200 words (Health, Weather - 2 topics)
   - B1: 2000-2200 words (Education, Work - 2 topics)
   - B2: 4000-4500 words (Politics & Society - 1 topic)
   - C1: 6000-8000+ words (Academic & Literary Language - 1 topic)
   - Two learning modes: Flashcards and Quiz
   - Flashcard mode with show/hide translation and examples
   - Quiz mode with multiple choice questions and instant feedback
   - Progress tracking through vocabulary sets
   - Score tracking in quiz mode
   - Audio pronunciation support (UI ready)
   - Bilingual interface (Russian/English)
   - Icon: BookMarked
   - Color: Orange

**Progress Tracking Widget**
- Current level badge (A1-C1)
- Days active streak (with flame icon)
- Lessons completed counter
- Words learned counter
- Badges earned (with trophy icon)
- "View Details" button links to comprehensive progress page

**Comprehensive Progress Page** ✅ **ENHANCED**
- **Module-Specific Progress Bars** ✅ **NEW**
  - Visual progress bars for each learning module (Grammar, Reading, Writing, Vocabulary)
  - Shows completed lessons vs. total lessons per module
  - Percentage completion displayed
  - Automatically updates from localStorage (Level 1) or database (Level 2+)
  - Helps users see which modules need more practice
- Overview cards with key metrics (level, streaks, lessons, vocabulary, badges)
- Achievement showcase with earned badges
- Recent activity feed with lesson history
- Statistics breakdown (today/week/month)
- Last activity date tracking
- Bilingual interface (English/Russian)

**Level-Based Recommendations System** ✅ **FULLY IMPLEMENTED**

Personalized content recommendations automatically adapt to user's current CEFR level (A1-C2):

- **Three Content Categories:**
  - **Listening**: Songs, podcasts, audiobooks, radio programs, dialogues
  - **Reading**: Books, articles, news, stories, literature
  - **Watching**: Cartoons, movies, documentaries, TV programs, cultural content

- **Level-Specific Recommendations:**
  - **A1 (Beginner)**: Children's songs, illustrated books, simple cartoons like "Керемет көч"
  - **A2 (Elementary)**: Folk tales, simplified news, family movies
  - **B1 (Intermediate)**: Current news, films with subtitles, short novels
  - **B2 (Upper Intermediate)**: Contemporary literature, opinion articles, documentary series
  - **C1 (Advanced)**: Classical poetry, academic lectures, Manas epic, theater performances
  - **C2 (Mastery)**: Old texts, literary criticism, festival films, complex discussions

- **Display Features:**
  - Prominent display on main dashboard
  - Collapsible view with toggle button (hidden by default)
  - Button text: "View Recommendations" / "Hide Recommendations"
  - Level description explaining current proficiency
  - Rich resource cards with thumbnails, titles, descriptions, and external links
  - Responsive 3-column grid layout for each category
  - Interactive cards with hover effects and transitions
  - Direct external links to resources (YouTube, news sites, books, podcasts)
  - Content type badges (Song, Book, Video, Film, Article, Podcast, News)
  - Thumbnail images with fallback handling
  - ExternalLink icon for easy identification of clickable resources
  - Bilingual content (English/Russian)
  - Automatic updates when user advances to new level
  - Curated content appropriate for each proficiency stage

- **Specific Resources by Level:**
  - **A1**: "Керемет көч" cartoon, children's songs, Forvo audio dictionary, fairy tales, cooking videos
  - **A2**: Азаттык Radio news, Kyrgyz folk tales audiobooks, Kaktus Media culture articles, Kyrgyz vlogs
  - **B1**: Биринчи радио programs, 24.kg news portal, "Курманжан Датка" film, KTRK national TV
  - **B2**: Азаттык discussion programs, "Джамиля" by Айтматов, Kloop.kg analytical articles, nature documentaries
  - **C1**: Academic seminars, Манас epic (full version), "Ак кеме" (1976 film), "Первый учитель", theater recordings
  - **C2**: Dialect recordings, old Kyrgyz texts (Arabic script), film festival cinema, parliamentary broadcasts

**Interactive Support Features** ✅ **FULLY IMPLEMENTED**

1. **AI Assistant Chat Modal** ✅ **FULLY IMPLEMENTED (Level 3)** (OpenAI Integration)
   - Real-time AI-powered chat using OpenAI GPT-4
   - **Strict Kyrgyz-only responses** - AI always responds in Kyrgyz regardless of user's input language
   - Adaptive conversation complexity based on user's CEFR level (A1-C2)
   - Practice conversations in Kyrgyz with instant AI feedback
   - Ask grammar questions and get detailed explanations in Kyrgyz
   - Request word/phrase explanations with examples
   - Context-aware responses optimized for language learning
   - **Persistent Chat History** - All conversations automatically saved to database
   - Message history with user/assistant bubbles
   - Timestamps for each message
   - Auto-scroll to latest message
   - Loading states with typing animation
   - Bilingual interface (English/Russian)
   - Icon: MessageSquare
   - Opens via bottom navigation card
   - Authentication required for chat history persistence

   **AI Behavior Rules:**
   - Always responds in Kyrgyz language only
   - Uses proper Kyrgyz orthography (ө, ү, ң, э, etc.)
   - No transliteration or Russian borrowings
   - Adjusts language complexity to user's level:
     - A1-A2: Short simple phrases, basic vocabulary
     - B1-B2: Natural speech, clear explanations
     - C1-C2: Advanced vocabulary, complex constructions
   - Friendly, supportive, motivating tone

   **Allowed Functions:**
   - Grammar explanations
   - Word/phrase/expression analysis
   - Example sentences
   - Light text correction
   - Help with assignments, reading, writing, vocabulary
   - Material recommendations within user's level
   - Conversational practice

   **Security Restrictions:**
   - Never responds in other languages
   - Never reveals code, database structure, or internal mechanisms
   - Never provides backend/API technical details
   - Never generates unsafe content

   **Chat History Persistence:**
   - Conversations automatically saved to database with user scoping
   - New conversation created when modal opens (for authenticated users)
   - All user and assistant messages saved in real-time
   - Conversation titles auto-generated from first user message
   - Messages stored chronologically with timestamps
   - Users can view and manage their conversation history
   - Secure API endpoints (authentication required):
     - GET `/ai/chat_conversations` - List user's conversations
     - GET `/ai/chat_conversations/:id` - Get conversation with messages
     - POST `/ai/chat_conversations` - Create new conversation
     - POST `/ai/chat_conversations/:id/add_message` - Save message
     - DELETE `/ai/chat_conversations/:id` - Delete conversation
   - Database schema:
     - `chat_conversations` table: user_id, title, last_message_at
     - `chat_messages` table: conversation_id, role, content, created_at
     - Indexed for performance on user_id and created_at

   **Technical Implementation:**
   - OpenAI API integration with OpenAI-compatible format
   - System prompt with comprehensive Kyrgyz language rules
   - User level integration for adaptive responses
   - Comprehensive test coverage (17 service + 16 request + 14 model + 27 API specs = 74 total)
   - Powered by OpenAI (https://api.openai.com/)

   **Status**: ✅ **COMPLETE** - Full integration with strict Kyrgyz-only AI assistant and persistent chat history

2. **Technical Support Messaging System** ✅ **FULLY IMPLEMENTED (Level 2)**
   - Users can submit support messages with subject and detailed message
   - Messages saved to database and sent to admin interface
   - Form validation with error handling
   - Success confirmation: "We will definitely look into this problem"
   - Bilingual support form (English/Russian)
   - Icon: Wrench
   - Opens via bottom navigation card

   **Admin Management Interface:**
   - Dedicated Support section in admin sidebar
   - Real-time unread message count badge on Support menu item
   - Support messages dashboard with three stat cards:
     - Total messages received
     - Unread messages (highlighted in orange)
     - Read messages
   - Full message list with:
     - Status badges (Unread/Read)
     - User information (name and email)
     - Message subject and timestamp
     - Orange highlighting for unread messages
   - Click to view full message in modal dialog
   - Auto-mark as read when viewing message
   - Manual mark as read button
   - Delete messages functionality
   - Pagination for large message volumes
   - Message viewing dialog shows:
     - Full subject and message content
     - Sender details
     - Timestamp

   **Database Structure:**
   - SupportMessage model with validations and scopes
   - Fields: subject (max 255 chars), message, status (unread/read), read_at timestamp
   - Indexed on status and read_at for performance
   - Associated with User (belongs_to)
   - Audit trail for all changes
   - Ransackable for search/filtering

   **Status**: ✅ **COMPLETE** - Full end-to-end support ticket system with admin management

### 3. Bilingual Interface System ✅ **FULLY IMPLEMENTED (Level 1)**

**Complete Interface Language Support:**

The application provides a fully bilingual interface supporting English and Russian, allowing users to interact with the platform in their preferred language while learning Kyrgyz.

**Language Selection Flow:**

- **Initial Selection**: New visitors see a dedicated language selection page when first visiting the application
- **Two Options**: English (EN) and Russian (RU) with clear flag icons and descriptions in both languages
- **Persistent Choice**: Selected language stored in localStorage and applied across all sessions
- **Easy Switching**: Language switcher component available on:
  - Landing page (top navigation bar)
  - Login page (top-right corner)
  - Register page (top-right corner)
  - Profile settings page (with radio button selector and instant reload)

**Translation Coverage:**

- ✅ **Public Pages**: Landing page, Login page, Register page, Language selection page
- ✅ **Form Validation**: All error messages and placeholders translated
- ✅ **Navigation**: Headers, buttons, links in user's chosen language
- ✅ **Profile Settings**: Language selector with descriptions in both languages
- ✅ **User Flow**: Language choice persists from landing → registration → onboarding → dashboard

**Strict Language Separation:**

- **Interface Language**: All system messages, UI text, explanations, and feedback in chosen language (EN or RU)
- **Learning Content**: Kyrgyz used ONLY for:
  - Example sentences and vocabulary words
  - Reading texts and comprehension passages
  - Grammar examples and exercises
  - Writing prompts and quiz content
  - AI chat responses (strict Kyrgyz-only)
- **No Mixing**: Interface never mixes English and Russian within the same view

**Technical Implementation:**

- **Component-Level Translations**: Each page includes translation objects with EN/RU keys
- **Dynamic Language Detection**: useEffect hook reads localStorage on component mount
- **Instant Updates**: Language changes trigger page reload to apply new translations
- **Form Schema Localization**: Zod validation messages translated based on selected language
- **Route Configuration**: Language selection at root → Landing page at /home

**User Experience:**

- Clear visual language indicators (EN/RU buttons)
- Smooth transitions between language selections
- Consistent language usage throughout entire user journey
- No page required to select language again after initial choice
- Profile settings allow changing language preference anytime

**Status**: ✅ **COMPLETE** - Full bilingual interface with persistent language selection and comprehensive translation coverage

### 4. Enhanced Landing Page

**Hero Section**
- Headline: "Master the Kyrgyz Language With Ease"
- Subheadline: Personalized learning journey description
- CTA Buttons: "Start Learning Free" and "Sign In"

**Features Section**
- Adaptive Learning: Placement test and personalized lessons
- AI-Powered Assistance: Chat for practice and help
- Complete Curriculum: All four learning modules

**Navigation**
- Logo: "Learning Kyrgyz"
- Buttons: "Get Started" (register) and "Log In"

## User Workflows

### Complete Onboarding Journey

1. **User visits landing page** → Sees "Get Started" button
2. **Clicks Get Started** → Redirected to registration page
3. **Fills registration form** → Name, email, password, country
4. **Submits form** → Automatic login
5. **Redirected to language selection** → Chooses Russian or English
6. **Redirected to level selection** → Three options:
   - **Option A: Know My Level** → Manually select from A1-C1 → Dashboard
   - **Option B: Take Test** → Complete 40-question placement test → Diagnostics → Dashboard
   - **Option C: Start from Scratch** → Automatically set to A1 → Dashboard
7. **Arrives at main dashboard** → Sees modules, progress, recommendations
8. **Clicks any Learning Module** → Views content based on level (Grammar, Reading, Writing, or Vocabulary)
9. **Selects content** → Studies lessons, reads texts, practices writing, or learns vocabulary

### Returning User Journey

1. **User visits landing page** → Clicks "Log In"
2. **Enters credentials** → Logs in
3. **Redirected to dashboard** → Continues learning

## Technical Implementation (Level 1)

### Frontend Pages Created

- `app/frontend/pages/Auth/Register.tsx` - Public registration form
- `app/frontend/pages/Onboarding/LanguageSelection.tsx` - Language choice
- `app/frontend/pages/Onboarding/LevelChoice.tsx` - Three-option level selection screen
- `app/frontend/pages/Onboarding/ManualLevelSelect.tsx` - Manual A1-C1 level selection
- `app/frontend/pages/Onboarding/PlacementTest.tsx` - Comprehensive 40-question test
- `app/frontend/pages/Onboarding/Diagnostics.tsx` - Results and recommendations
- `app/frontend/pages/Learning/Dashboard.tsx` - Main learning interface
- `app/frontend/pages/Learning/Grammar.tsx` - Grammar lessons viewer with exercises
- `app/frontend/pages/Learning/Reading.tsx` - Reading comprehension module with texts
- `app/frontend/pages/Learning/Writing.tsx` - Writing practice module with prompts
- `app/frontend/pages/Learning/Vocabulary.tsx` - Vocabulary builder with flashcards and quizzes
- `app/frontend/pages/Home/Landing.tsx` - Updated for Kyrgyz learning app

### Controllers Created

- `app/controllers/registrations_controller.rb` - Handles registration (mock data)
- `app/controllers/onboarding_controller.rb` - Handles onboarding flow (mock data)
- `app/controllers/learning_controller.rb` - Handles learning pages (mock data)

### Routes Added

```ruby
# Registration
GET  /register
POST /register

# Onboarding
GET  /onboarding/language
POST /onboarding/language
GET  /onboarding/level-choice
GET  /onboarding/manual-level-select
POST /onboarding/set-level
GET  /onboarding/placement-test
POST /onboarding/placement-test/results
GET  /onboarding/diagnostics

# Learning
GET  /learning/dashboard
GET  /learning/grammar
GET  /learning/reading
GET  /learning/writing
GET  /learning/vocabulary
```

### Data Storage (Level 3 - Production Ready)

User data is persisted in **SQLite database** (development) / **PostgreSQL** (production):

- **Users table**: email, encrypted_password (bcrypt), name, admin (boolean), created_at, updated_at
- **User Progress table**: user_id, level, days_active, lessons_completed, vocabulary_count, current_streak, longest_streak
- **Lesson Completions table**: user_id, module_type, lesson_id, completed_at, score, time_spent
- **Achievements table**: user_id, achievement_type, title, description, earned_at, metadata
- **Refresh Tokens table**: token_digest, expires_at, revoked_at (for JWT authentication)

### Authentication System

**JWT-based Authentication:**

- Secure token-based authentication (access token + refresh token)
- Access tokens for API requests
- Refresh tokens for session management (30-day expiration)
- Password encryption using bcrypt
- Automatic token refresh mechanism
- Token revocation on password change
- Tokens stored in localStorage for iframe compatibility

**User Accounts:**

- Unique email addresses (validated format)
- Secure password storage (minimum 8 characters, bcrypt encryption)
- Password reset functionality
- User invitation system for admins
- Admin flag for privileged access

### Admin Capabilities

**Admin Account:**

- Single admin account (zamankulovaazar@gmail.com)
- Admin-only menu items in sidebar (Users, Support, Audit Logs)
- User management interface at `/admin/users`
- Support message management at `/admin/support_messages`
- Audit log tracking at `/admin/audit_logs`
- Real-time unread support message badge in sidebar
- User tracking and activity monitoring via Audited gem

### Mock Data

**Placement Test Questions:**
- 40 comprehensive questions total (8 per level: A1, A2, B1, B2, C1)
- Diverse question types: multiple choice grammar, vocabulary, sentence completion, comprehension
- Questions in Kyrgyz with bilingual answer options (Russian/English)
- Questions based on authentic Kyrgyz language patterns and real-world usage
- Full bilingual support for answer options and optional instructions
- Level determination based on threshold algorithm (≥5/8 correct to pass)

**Diagnostics:**
- Level-specific strengths, weaknesses, and recommendations
- Available in both English and Russian
- Grammar topics tailored to each level
- Reading and vocabulary recommendations

**Dashboard:**
- Mock progress data (days active, lessons, vocabulary, badges)
- Level-appropriate content recommendations
- Module placeholders with "Coming Soon" badges

## Success Criteria (Level 3 - Production Ready - Met)

✅ **Registration & Authentication Working:**

- Users can register with persistent database storage
- Form validates all fields (client and server-side)
- Email uniqueness enforced with clear error messages
- Password minimum 8 characters requirement
- JWT token generation on successful registration
- Refresh token created with 30-day expiration
- Auto-login after successful registration
- Redirect to language selection works
- Admin account configured with database management access

✅ **Language Selection Working:**
- Two clear language options (Russian/English)
- Selection stored and respected throughout app
- Redirect to placement test works

✅ **Level Selection Working:**
- Three clear options after language selection
- Manual level selection with 5 interactive cards
- Each level card shows detailed proficiency description
- Visual feedback on selection

✅ **Placement Test Working:**
- 40 questions display correctly (8 per level)
- One question at a time with progress indicator
- Questions in Kyrgyz, answers bilingual
- Optional instruction text displays when present
- Smart level determination using threshold algorithm
- Test duration warning shown (15-20 minutes)
- Redirect to diagnostics works

✅ **Diagnostics Working:**
- Level badge displays prominently
- All diagnostic sections present (strengths, weaknesses, grammar, etc.)
- Text appears in user's chosen language
- Mistakes section expands/collapses
- "Start Learning" button redirects to dashboard

✅ **Dashboard Working:**
- All four module cards visible
- Content recommendations rotate automatically
- Progress widget displays mock data
- Bottom navigation cards present
- Layout responsive and clean

✅ **Multi-Language Support:**
- Russian and English translations complete
- UI respects language choice throughout
- Kyrgyz content appropriately used

✅ **Admin Features Working:**

- Admin menu items visible in sidebar (Users, Database, Audit Logs)
- Database management interface accessible
- SQL query execution (SELECT queries only)
- CSV/JSON export functionality
- Database statistics dashboard
- User management capabilities

✅ **Testing Coverage:**

- RSpec tests: 79 passing (User model, Auth services, Controllers)
- Vitest tests: 9 passing (Registration form component)
- E2E tests: Created with Playwright (Authentication flows)
- Full Level 3 production-ready test coverage

## TODO NEXT

### Content & Learning Modules Enhancement

When ready to enhance the learning experience:

#### Grammar Module
- [ ] Add interactive grammar exercises
- [ ] Implement progress tracking per topic
- [ ] Add detailed explanations for each grammar rule
- [ ] Create practice quizzes with instant feedback

#### Reading Module
- [ ] Add authentic Kyrgyz texts by level
- [ ] Implement vocabulary highlighting
- [ ] Add comprehension questions
- [ ] Track reading progress and time spent

#### Vocabulary Module
- [ ] Implement spaced repetition system
- [ ] Add vocabulary flashcards
- [ ] Create themed vocabulary sets
- [ ] Track mastery levels for each word

#### Writing Module
- [ ] Add writing prompts by level
- [ ] Implement AI-powered feedback
- [ ] Create structured writing exercises
- [ ] Track completed writing tasks

#### Module Implementation
- [ ] Build Grammar module with lessons from Google Docs
- [ ] Build Reading module with texts from Google Docs
- [ ] Build Writing module with prompts and AI feedback
- [ ] Build Vocabulary module with daily words
- [ ] Implement module navigation and progress tracking

#### Content Integration
- [ ] Parse grammar content from uploaded PDF
- [ ] Integrate questions from Google Doc spreadsheet
- [ ] Add reading texts from Google Doc
- [ ] Add writing prompts from Google Doc
- [ ] Add vocabulary lists from Google Doc and Tamgasoft dictionary

#### AI Features
- [ ] Integrate OpenAI for chat assistant
- [ ] Implement AI-powered diagnostics
- [ ] Add AI writing feedback
- [ ] Enable conversation practice with AI

#### Additional Features
- [ ] Content recommendation algorithm based on user behavior
- [ ] Progress tracking and analytics
- [ ] Achievement badges system
- [ ] Daily vocabulary notifications
- [ ] Leaderboards for vocabulary quizzes

### 5. User Progress Tracking System ✅ **FULLY IMPLEMENTED (Level 2)**

**Comprehensive Progress Tracking:**
- **UserProgress Model**: Tracks user level, total lessons completed, vocabulary count, daily activity, and streak data
- **LessonCompletion Model**: Records individual lesson completions with scores, time spent, and timestamps
- **Achievement Model**: Badge/reward system with 20+ achievement types

**Progress Statistics:**
- Current CEFR level (A1-C1)
- Current streak (consecutive days of activity)
- Longest streak achieved
- Total days active
- Total lessons completed across all modules
- Vocabulary words learned
- Achievements/badges earned

**Streak Tracking:**
- Automatic daily activity recording
- Consecutive day streak calculation
- Streak breaking and restart logic
- Visual flame icon indicator
- Motivation to maintain daily learning habits

**Achievement System (20+ Badges):**
- **Streak Achievements**: 3, 7, 14, 30, 100-day streaks
- **Lesson Milestones**: 10, 50, 100, 200 lessons completed
- **Module Completion**: Complete all lessons in a module or level
- **Vocabulary Milestones**: 100, 500, 1000 words learned
- **Perfect Scores**: Achieve perfect scores in lessons
- **Level Progression**: Advance to new CEFR levels
- **Special Badges**: First lesson, early bird, night owl

**Progress Page (/learning/progress):**
- Back button to return to main dashboard
- Overview cards showing all key metrics
- Module-specific progress bars (Grammar, Reading, Writing, Vocabulary)
- Statistics breakdown (today/week/month)
- Achievement showcase with icons and descriptions
- Recent activity feed with lesson history
- Last activity date tracking
- Visual progress indicators
- Bilingual interface (EN/RU)

**Dashboard Integration:**
- Real-time progress display on main dashboard
- 6-metric overview (Level, Streak, Days Active, Lessons, Words, Badges)
- "View Details" button to access full progress page
- Automatic data refresh after lesson completions

### 6. Level Upgrade System ✅ **FULLY IMPLEMENTED (Level 3)**

**Overview:**
Users can advance to the next CEFR level (A1→A2→B1→B2→C1) after completing all required lessons and passing the final grammar exam for their current level.

**Module Completion Requirements:**

*Note: Grammar count includes the final exam as the last lesson. Exam must be passed (score ≥70%) to count as complete.*

| Level | Grammar Lessons + Exam | Reading Texts | Writing Prompts | Vocabulary Topics |
|-------|------------------------|---------------|-----------------|-------------------|
| A1    | 15 (14 lessons + exam) | 10            | 3               | 4                 |
| A2    | 12 (11 lessons + exam) | 10            | 2               | 2                 |
| B1    | 12 (11 lessons + exam) | 10            | 2               | 2                 |
| B2    | 9 (8 lessons + exam)   | 10            | 2               | 1                 |
| C1    | 9 (8 lessons + exam)   | 10            | 2               | 1                 |

**Upgrade Flow:**
1. **Eligibility Check**: User completes all lessons for all 4 modules at their current level and passes final grammar exam (≥70%)
2. **Upgrade Prompt**: Two UI locations show upgrade availability:
   - **Top Banner**: Prominent celebration banner when eligible (shows once completed)
   - **Progress Card**: Always visible card showing module completion progress toward upgrade (e.g., "14/15" before exam, "15/15" after passing)
3. **Upgrade Action**: User clicks "Upgrade to [Level]" button
4. **Celebration Modal**: Modal displays with:
   - Confetti animation
   - Trophy icon with level progression badges (A1 → A2)
   - Achievement earned notification
   - List of newly unlocked content at next level
   - Motivational message
5. **Level Update**: User's level permanently upgraded in database
6. **Achievement Awarded**: Automatic achievement badge (e.g., "Upgraded to A2!")

**Backend Services:**
- **LevelUpgrade::CheckEligibility**: Validates all module completions and exam pass status
  - Returns: `eligible` (boolean), `completion_status` (per module), `overall_percentage`, `current_level`, `next_level`
  - Grammar completion counts passed exam (score ≥70%) as +1 toward total lesson requirement
  - Handles C1 edge case (highest level, no upgrade available)
- **LevelUpgrade::Upgrade**: Executes level upgrade after validation
  - Validates sequential progression (no level skipping)
  - Updates `user_progress.level`
  - Awards achievement
  - Returns: `success`, `new_level`, `previous_level`, `achievement` data

**Frontend Components:**
- **LevelUpgradeButton**: Two variants
  - `banner`: Shows prominent celebration banner when eligible
  - `card`: Shows detailed progress card with module completion bars
  - Displays per-module completion (X/Y lessons) where exam counts as final lesson when passed
  - Shows overall percentage progress
  - Bilingual (EN/RU)
- **LevelUpgradeCelebration**: Modal with confetti animation
  - Trophy icon with bounce animation
  - Level progression display (A1 → A2 badges)
  - Achievement card with icon and description
  - "What's New" section listing unlocked content
  - Continue button to close and start new level

**API Endpoints:**
- `GET /learning/progress/upgrade_eligibility`: Check if user is eligible to upgrade
- `POST /learning/progress/upgrade`: Execute level upgrade with validation

**Achievements:**
- `level_upgrade_a2`: "Upgraded to A2!" - Successfully completed all A1 modules
- `level_upgrade_b1`: "Upgraded to B1!" - Successfully completed all A2 modules
- `level_upgrade_b2`: "Upgraded to B2!" - Successfully completed all B1 modules
- `level_upgrade_c1`: "Upgraded to C1!" - Successfully completed all B2 modules

**Test Coverage:**
- **RSpec**: Service objects (CheckEligibility, Upgrade), controller endpoints (23 examples)
- **Vitest**: UI components (LevelUpgradeButton 23 tests, LevelUpgradeCelebration 20 tests)
- **Total**: 66 tests covering all level progressions, edge cases, and error states

**API Endpoints:**
- `POST /learning/progress/complete_lesson` - Record lesson completion
- `POST /learning/progress/add_vocabulary` - Track vocabulary learning
- `POST /learning/progress/update_level` - Update user CEFR level
- `GET /learning/progress` - View detailed progress statistics

**Frontend Helper (`progressTracker.ts`):**
```typescript
// Track lesson completion
await trackLessonCompletion({
  moduleType: 'grammar',
  lessonId: 'a1_lesson_1',
  score: 85,
  timeSpent: 120
})

// Track vocabulary learning
await trackVocabularyLearning(20)

// Update user level
await updateUserLevel('B1')
```

**Features:**
- Automatic achievement notifications with animations
- CSRF token handling
- Error handling and logging
- Progress data refresh after updates
- Module completion percentage calculation
- Score percentage calculation

**Database Tables:**
- `user_progresses` - One record per user with aggregate stats
- `lesson_completions` - One record per completed lesson (unique constraint)
- `achievements` - One record per earned achievement (unique per type)

**Auto-initialization:**
- UserProgress automatically created on user registration
- Default A1 level for new users
- Zero initial stats

**Status**: ✅ **COMPLETE** - Full backend implementation with database persistence, comprehensive UI, and frontend integration helpers

---

### Level 3 Enhancements (Production Ready)

When ready for production:
- [ ] Comprehensive test coverage (RSpec + Vitest + Playwright)
- [ ] Security audit and penetration testing
- [ ] Performance optimization
- [ ] Content moderation system
- [ ] Admin dashboard for content management
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] Mobile app considerations

---

*This specification documents the Learning Kyrgyz application with completed modules and progress tracking system. The user registration flow, comprehensive learning content (Grammar, Reading modules), and progress tracking are fully functional with database persistence.*
