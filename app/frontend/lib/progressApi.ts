// Progress API helper for Level 2 (backend-based)

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type ModuleType = 'grammar' | 'reading' | 'writing' | 'vocabulary'

export interface Achievement {
  id: number
  type: string
  title: string
  description: string
  earnedAt: string
  icon?: string
}

export interface LessonCompletion {
  id: number
  moduleType: ModuleType
  lessonId: string
  completedAt: string
  score: number | null
  timeSpent: number | null
}

export interface UserProgress {
  level: Level
  daysActive: number
  lessonsCompleted: number
  vocabularyCount: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  achievements: Achievement[]
  lessonsByModule: Record<ModuleType, number>
  recentLessons: LessonCompletion[]
  completedLessonIds: Record<ModuleType, string[]>
  stats: {
    today: number
    thisWeek: number
    thisMonth: number
  }
}

function getCsrfToken(): string {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
}

// Get user progress
export async function getUserProgress(): Promise<UserProgress> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/learning/progress', {
    headers
  })

  if (!response.ok) {
    throw new Error('Failed to fetch progress')
  }

  return response.json()
}

// Complete a lesson
export async function completeLesson(
  lessonId: string,
  moduleType: ModuleType,
  score?: number,
  timeSpent?: number
): Promise<{ success: boolean; progress: UserProgress; new_achievements?: Achievement[] }> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': getCsrfToken()
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/learning/progress/complete_lesson', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      lesson_id: lessonId,
      module_type: moduleType,
      score,
      time_spent: timeSpent
    })
  })

  if (!response.ok) {
    throw new Error('Failed to complete lesson')
  }

  return response.json()
}

// Add vocabulary words
export async function addVocabulary(count: number): Promise<{ success: boolean; progress: UserProgress }> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': getCsrfToken()
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/learning/progress/add_vocabulary', {
    method: 'POST',
    headers,
    body: JSON.stringify({ count })
  })

  if (!response.ok) {
    throw new Error('Failed to add vocabulary')
  }

  return response.json()
}

// Update user level
export async function updateUserLevel(newLevel: Level): Promise<{ success: boolean; progress: UserProgress }> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': getCsrfToken()
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/learning/progress/update_level', {
    method: 'POST',
    headers,
    body: JSON.stringify({ level: newLevel })
  })

  if (!response.ok) {
    throw new Error('Failed to update level')
  }

  return response.json()
}

// Check if lesson is completed (client-side cache)
let progressCache: UserProgress | null = null

export async function isLessonCompleted(lessonId: string, moduleType?: ModuleType): Promise<boolean> {
  if (!progressCache) {
    progressCache = await getUserProgress()
  }

  // Use completedLessonIds for accurate check
  if (moduleType && progressCache.completedLessonIds[moduleType]) {
    return progressCache.completedLessonIds[moduleType].includes(lessonId)
  }

  // Fallback to checking all modules
  return Object.values(progressCache.completedLessonIds).some(ids => ids.includes(lessonId))
}

// Get completed lessons for a module
export function getCompletedLessons(moduleType: ModuleType): string[] {
  if (!progressCache) return []
  return progressCache.completedLessonIds[moduleType] || []
}

// Refresh cache
export async function refreshProgressCache(): Promise<UserProgress> {
  progressCache = await getUserProgress()
  return progressCache
}

// Clear cache (for logout)
export function clearProgressCache() {
  progressCache = null
}
