# Product Specs

## Product Overview

**Learning Kyrgyz is Easy** - A comprehensive language learning application designed to help users master the Kyrgyz language through adaptive lessons, AI-powered assistance, and personalized content recommendations.

## Core Features (Level 1 - Quick Prototype)

### 1. Public Registration & Onboarding

**User Registration (No Invitation Required)**
- Public registration form accessible to anyone
- Required fields: Name, Email, Password, Password Confirmation
- Optional field: Country (dropdown selection)
- Form validation with clear error messages
- Automatic login after successful registration
- Redirect to language selection after registration

**Language Selection**
- First-time user experience showing interface language choice
- Two options: Russian (Русский) or English
- Large, clear buttons with flag icons
- Language preference stored for entire user journey
- All UI text, explanations, and feedback respect chosen language
- Kyrgyz content remains in Kyrgyz (examples, exercises, readings)

**Level Assessment Choice**
- User chooses how to start their learning journey:
  1. **Take Placement Test** - Complete 20-question assessment (15-20 minutes)
  2. **Start from Scratch** - Begin at A1 level with no prior knowledge
- Clear descriptions of each option
- "Start from Scratch" option marked as recommended for complete beginners
- Bilingual interface (Russian/English)
- Users can retake placement test later from profile settings

**Adaptive Placement Test (20 Questions)**
- One question at a time with progress indicator
- 20 questions covering 5 CEFR levels (A1, A2, B1, B2, C1)
- Questions randomly selected from pool of 75 comprehensive questions
- Diverse question types: grammar, vocabulary, comprehension, error identification
- Multiple choice format with 4 options per question
- Answer options randomized for each question
- All questions and answers available in both Russian and English
- Adaptive difficulty (simulated in Level 1)
- Final score calculation determines user's level
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

**Top Section - Content Recommendations**
- Rotating banner with Kyrgyz content suggestions
- Recommendations based on user's level:
  - Books, fairy tales, short stories
  - Music (traditional and modern Kyrgyz songs)
  - Films and documentaries
  - News articles and podcasts
  - YouTube videos
- Safe, culturally neutral content
- Auto-rotation every 5 seconds
- Manual navigation with indicator dots

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

   **Total Content**: 52 lessons + 5 comprehensive final tests (165 total questions)
   - Icon: BookOpen
   - Color: Blue

2. **Reading & Comprehension Module** ✅ **ACTIVE**
   - Practice reading Kyrgyz texts and improve comprehension
   - Reading texts for all levels (A1-C1) with comprehension questions
   - A1: Simple descriptions and personal information
   - A2: Folk tales and simple narratives
   - B1: News articles and cultural content
   - B2: Analytical articles on complex topics
   - C1: Literary essays and advanced texts
   - Multiple choice questions (A1-B1) and open-ended questions (B2-C1)
   - Instant feedback with scoring for multiple choice questions
   - Bilingual interface (Russian/English)
   - Icon: FileText
   - Color: Green

3. **Writing Module** ✅ **ACTIVE**
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

**Bottom Navigation**
1. **AI Assistant Chat**
   - Ask grammar questions
   - Practice Kyrgyz conversation
   - Get instant explanations
   - Check pronunciation
   - Icon: MessageSquare
   - Status: Coming Soon

2. **Technical Support**
   - Submit bug reports
   - Suggest improvements
   - Request feature enhancements
   - Get help
   - Icon: Wrench
   - Status: Coming Soon

### 3. Multi-Language Support

**Strict Language Rules**
- User selects interface language at onboarding (Russian or English)
- ALL system messages, UI text, explanations, feedback in chosen language
- NEVER mix interface languages
- Kyrgyz used ONLY for:
  - Example sentences
  - Vocabulary words
  - Reading texts
  - Grammar examples
  - Exercise content

**Translation Coverage**
- Registration page
- Language selection screen
- Placement test (questions remain in English/Russian, testing Kyrgyz)
- Diagnostics results
- Dashboard interface
- Module descriptions
- Progress labels

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
6. **Redirected to placement test** → Takes 20-question adaptive test
7. **Test completes** → Redirected to diagnostics page
8. **Views results** → Sees level, strengths, weaknesses, recommendations
9. **Clicks "Start Learning"** → Arrives at main dashboard
10. **Explores dashboard** → Sees modules, progress, recommendations
11. **Clicks any Learning Module** → Views content based on level (Grammar, Reading, Writing, or Vocabulary)
12. **Selects content** → Studies lessons, reads texts, practices writing, or learns vocabulary

### Returning User Journey

1. **User visits landing page** → Clicks "Log In"
2. **Enters credentials** → Logs in
3. **Redirected to dashboard** → Continues learning

## Technical Implementation (Level 1)

### Frontend Pages Created

- `app/frontend/pages/Auth/Register.tsx` - Public registration form
- `app/frontend/pages/Onboarding/LanguageSelection.tsx` - Language choice
- `app/frontend/pages/Onboarding/PlacementTest.tsx` - Adaptive 20-question test
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

### Data Storage (Level 1)

All data is stored in **localStorage** for this prototype:
- `interface_language` - User's chosen UI language (en/ru)
- `test_results` - Placement test answers, score, and determined level

### Mock Data

**Placement Test Questions:**
- 75 comprehensive questions total (20 A1, 15 A2, 15 B1, 15 B2, 15 C1)
- Diverse question types: multiple choice grammar, synonym/antonym, sentence completion, error identification, reading comprehension
- Questions based on authentic Kyrgyz language patterns and real-world usage
- Full bilingual support (Russian and English for both questions and answers)
- Test randomly selects 20 questions from the pool for each user
- Options randomized on each load

**Diagnostics:**
- Level-specific strengths, weaknesses, and recommendations
- Available in both English and Russian
- Grammar topics tailored to each level
- Reading and vocabulary recommendations

**Dashboard:**
- Mock progress data (days active, lessons, vocabulary, badges)
- Level-appropriate content recommendations
- Module placeholders with "Coming Soon" badges

## Success Criteria (Level 1 - Met)

✅ **Registration Working:**
- Users can register without invitation
- Form validates all fields correctly
- Clear error messages for validation failures
- Auto-login after successful registration
- Redirect to language selection works

✅ **Language Selection Working:**
- Two clear language options (Russian/English)
- Selection stored and respected throughout app
- Redirect to placement test works

✅ **Placement Test Working:**
- 20 questions display correctly
- One question at a time with progress indicator
- Answer selection works
- Questions and answers randomized
- Level calculated based on score (A1-C1)
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

## TODO NEXT

### Level 2 Enhancements (Full Backend)

When ready to upgrade to Level 2, implement:

#### Database & Persistence
- [ ] Add language_preference column to users table
- [ ] Add kyrgyz_level column to users table
- [ ] Create TestResult model with user association
- [ ] Create UserProgress model to track stats
- [ ] Store test answers and questions in database
- [ ] Persist language preference and level

#### Real Authentication
- [ ] Update registration to create actual User records
- [ ] Generate real JWT tokens for registered users
- [ ] Implement proper session management
- [ ] Update onboarding controllers to save to database

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
- [ ] Integrate AkylAI for chat assistant
- [ ] Implement AI-powered diagnostics
- [ ] Add AI writing feedback
- [ ] Enable conversation practice with AI

#### Additional Features
- [ ] Content recommendation algorithm based on user behavior
- [ ] Progress tracking and analytics
- [ ] Achievement badges system
- [ ] Daily vocabulary notifications
- [ ] Leaderboards for vocabulary quizzes

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

*This specification documents the current Level 1 prototype of the Learning Kyrgyz application. The complete user registration and onboarding flow is functional with mock data, ready for user testing and feedback.*
