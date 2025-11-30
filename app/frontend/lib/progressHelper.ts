// Progress tracking helper for Level 1 (localStorage-based)

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type ModuleType = 'grammar' | 'reading' | 'writing' | 'vocabulary'

export interface LessonProgress {
  lessonId: string
  moduleType: ModuleType
  level: Level
  completedAt: string
  score?: number
}

export interface Achievement {
  id: string
  type: 'first_lesson' | 'streak_3' | 'streak_7' | 'streak_30' | 'lessons_10' | 'lessons_50' | 'words_100' | 'words_500' | 'level_complete' | 'perfect_score'
  earnedAt: string
  title: { en: string, ru: string }
  description: { en: string, ru: string }
}

export interface UserProgress {
  level: Level
  completedLessons: LessonProgress[]
  vocabularyCount: number
  achievements: Achievement[]
  currentStreak: number
  lastActivityDate: string
}

const PROGRESS_KEY = 'user_progress'

// Get all user progress
export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(PROGRESS_KEY)
  if (stored) {
    return JSON.parse(stored)
  }

  // Default progress
  const userLevel = (localStorage.getItem('user_level') || 'A1') as Level
  return {
    level: userLevel,
    completedLessons: [],
    vocabularyCount: 0,
    achievements: [],
    currentStreak: 0,
    lastActivityDate: ''
  }
}

// Save progress
function saveProgress(progress: UserProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

// Mark lesson as completed
export function completeLesson(lessonId: string, moduleType: ModuleType, score?: number): Achievement[] {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]

  // Check if already completed
  const alreadyCompleted = progress.completedLessons.some(l => l.lessonId === lessonId)
  if (alreadyCompleted) {
    return [] // Already completed, no new achievements
  }

  // Add lesson
  progress.completedLessons.push({
    lessonId,
    moduleType,
    level: progress.level,
    completedAt: new Date().toISOString(),
    score
  })

  // Update streak
  updateStreak(progress, today)

  // Check for achievements
  const newAchievements = checkAchievements(progress, { lessonId, moduleType, score })

  saveProgress(progress)
  return newAchievements
}

// Add vocabulary words
export function addVocabulary(count: number): Achievement[] {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]

  progress.vocabularyCount += count
  updateStreak(progress, today)

  const newAchievements = checkAchievements(progress, { vocabularyAdded: count })
  saveProgress(progress)
  return newAchievements
}

// Update user level
export function updateUserLevel(newLevel: Level) {
  const progress = getUserProgress()
  const oldLevel = progress.level
  progress.level = newLevel
  localStorage.setItem('user_level', newLevel)

  const newAchievements = checkAchievements(progress, { levelUp: { from: oldLevel, to: newLevel } })
  saveProgress(progress)
  return newAchievements
}

// Update streak
function updateStreak(progress: UserProgress, today: string) {
  if (!progress.lastActivityDate) {
    progress.currentStreak = 1
    progress.lastActivityDate = today
    return
  }

  const lastDate = new Date(progress.lastActivityDate)
  const todayDate = new Date(today)
  const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Same day, no change
    return
  } else if (diffDays === 1) {
    // Consecutive day
    progress.currentStreak++
  } else {
    // Streak broken
    progress.currentStreak = 1
  }

  progress.lastActivityDate =today
}

// Check for new achievements
function checkAchievements(progress: UserProgress, context: any): Achievement[] {
  const newAchievements: Achievement[] = []

  // First lesson
  if (progress.completedLessons.length === 1 && !hasAchievement(progress, 'first_lesson')) {
    newAchievements.push(createAchievement('first_lesson'))
  }

  // Lesson milestones
  if (progress.completedLessons.length === 10 && !hasAchievement(progress, 'lessons_10')) {
    newAchievements.push(createAchievement('lessons_10'))
  }
  if (progress.completedLessons.length === 50 && !hasAchievement(progress, 'lessons_50')) {
    newAchievements.push(createAchievement('lessons_50'))
  }

  // Streak achievements
  if (progress.currentStreak === 3 && !hasAchievement(progress, 'streak_3')) {
    newAchievements.push(createAchievement('streak_3'))
  }
  if (progress.currentStreak === 7 && !hasAchievement(progress, 'streak_7')) {
    newAchievements.push(createAchievement('streak_7'))
  }
  if (progress.currentStreak === 30 && !hasAchievement(progress, 'streak_30')) {
    newAchievements.push(createAchievement('streak_30'))
  }

  // Vocabulary achievements
  if (progress.vocabularyCount >= 100 && !hasAchievement(progress, 'words_100')) {
    newAchievements.push(createAchievement('words_100'))
  }
  if (progress.vocabularyCount >= 500 && !hasAchievement(progress, 'words_500')) {
    newAchievements.push(createAchievement('words_500'))
  }

  // Perfect score
  if (context.score === 100 && !hasAchievement(progress, 'perfect_score')) {
    newAchievements.push(createAchievement('perfect_score'))
  }

  // Add to progress
  progress.achievements.push(...newAchievements)
  return newAchievements
}

function hasAchievement(progress: UserProgress, type: Achievement['type']): boolean {
  return progress.achievements.some(a => a.type === type)
}

function createAchievement(type: Achievement['type']): Achievement {
  const achievementData: Record<Achievement['type'], { title: { en: string, ru: string }, description: { en: string, ru: string } }> = {
    first_lesson: {
      title: { en: 'First Steps', ru: 'Первые шаги' },
      description: { en: 'Completed your first lesson', ru: 'Прошли первый урок' }
    },
    streak_3: {
      title: { en: '3 Day Streak', ru: 'Серия 3 дня' },
      description: { en: 'Learned for 3 days in a row', ru: 'Учились 3 дня подряд' }
    },
    streak_7: {
      title: { en: 'Week Warrior', ru: 'Недельный воин' },
      description: { en: 'Learned for 7 days in a row', ru: 'Учились 7 дней подряд' }
    },
    streak_30: {
      title: { en: 'Month Master', ru: 'Мастер месяца' },
      description: { en: 'Learned for 30 days in a row', ru: 'Учились 30 дней подряд' }
    },
    lessons_10: {
      title: { en: 'Fast Learner', ru: 'Быстрый ученик' },
      description: { en: 'Completed 10 lessons', ru: 'Прошли 10 уроков' }
    },
    lessons_50: {
      title: { en: 'Dedicated Student', ru: 'Преданный студент' },
      description: { en: 'Completed 50 lessons', ru: 'Прошли 50 уроков' }
    },
    words_100: {
      title: { en: 'Vocabulary Builder', ru: 'Строитель словаря' },
      description: { en: 'Learned 100 words', ru: 'Выучили 100 слов' }
    },
    words_500: {
      title: { en: 'Word Master', ru: 'Мастер слов' },
      description: { en: 'Learned 500 words', ru: 'Выучили 500 слов' }
    },
    level_complete: {
      title: { en: 'Level Complete', ru: 'Уровень пройден' },
      description: { en: 'Completed all lessons in a level', ru: 'Прошли все уроки уровня' }
    },
    perfect_score: {
      title: { en: 'Perfect Score', ru: 'Отличный результат' },
      description: { en: 'Got 100% on a test', ru: 'Получили 100% в тесте' }
    }
  }

  const data = achievementData[type]
  return {
    id: `${type}_${Date.now()}`,
    type,
    earnedAt: new Date().toISOString(),
    title: data.title,
    description: data.description
  }
}

// Check if lesson is completed
export function isLessonCompleted(lessonId: string): boolean {
  const progress = getUserProgress()
  return progress.completedLessons.some(l => l.lessonId === lessonId)
}

// Get completed lessons count by module
export function getCompletedLessonsCount(moduleType?: ModuleType): number {
  const progress = getUserProgress()
  if (!moduleType) {
    return progress.completedLessons.length
  }
  return progress.completedLessons.filter(l => l.moduleType === moduleType).length
}

// Get lessons for specific level and module
export function getCompletedLessonsForLevel(level: Level, moduleType: ModuleType): string[] {
  const progress = getUserProgress()
  return progress.completedLessons
    .filter(l => l.level === level && l.moduleType === moduleType)
    .map(l => l.lessonId)
}
