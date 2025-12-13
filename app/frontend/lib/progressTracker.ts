import { router } from '@inertiajs/react'

interface LessonCompletionData {
  moduleType: 'grammar' | 'reading' | 'writing' | 'vocabulary'
  lessonId: string
  score?: number
  timeSpent?: number
}

interface ProgressResponse {
  success: boolean
  progress: {
    level: string
    daysActive: number
    lessonsCompleted: number
    vocabularyCount: number
    currentStreak: number
    longestStreak: number
  }
  new_achievements?: Array<{
    id: number
    type: string
    title: string
    description: string
    earnedAt: string
    icon: string
  }>
}

/**
 * Track lesson completion and update user progress
 * @param data Lesson completion data
 * @returns Promise with progress response
 */
export async function trackLessonCompletion(data: LessonCompletionData): Promise<ProgressResponse | null> {
  try {
    const token = localStorage.getItem('auth_token')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/learning/progress/complete_lesson', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        module_type: data.moduleType,
        lesson_id: data.lessonId,
        score: data.score,
        time_spent: data.timeSpent
      })
    })

    if (!response.ok) {
      console.error('Failed to track lesson completion:', response.statusText)
      return null
    }

    const result: ProgressResponse = await response.json()

    // Show achievement notifications if any new achievements earned
    if (result.new_achievements && result.new_achievements.length > 0) {
      showAchievementNotifications(result.new_achievements)
    }

    // Refresh the page data to show updated progress - reload full page to update all props
    router.reload()

    return result
  } catch (error) {
    console.error('Error tracking lesson completion:', error)
    return null
  }
}

/**
 * Track vocabulary learning
 * @param count Number of words learned
 * @returns Promise with progress response
 */
export async function trackVocabularyLearning(count: number): Promise<ProgressResponse | null> {
  try {
    const token = localStorage.getItem('auth_token')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
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
      console.error('Failed to track vocabulary learning:', response.statusText)
      return null
    }

    const result: ProgressResponse = await response.json()

    // Refresh the page data
    router.reload({ only: ['userProgress'] })

    return result
  } catch (error) {
    console.error('Error tracking vocabulary learning:', error)
    return null
  }
}

/**
 * Update user level
 * @param level New CEFR level (A1, A2, B1, B2, C1)
 * @returns Promise with progress response
 */
export async function updateUserLevel(level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'): Promise<ProgressResponse | null> {
  try {
    const token = localStorage.getItem('auth_token')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('/learning/progress/update_level', {
      method: 'POST',
      headers,
      body: JSON.stringify({ level })
    })

    if (!response.ok) {
      console.error('Failed to update user level:', response.statusText)
      return null
    }

    const result: ProgressResponse = await response.json()

    // Refresh the page data
    router.reload({ only: ['userProgress'] })

    return result
  } catch (error) {
    console.error('Error updating user level:', error)
    return null
  }
}

/**
 * Show achievement notifications
 * @param achievements Array of new achievements
 */
function showAchievementNotifications(achievements: Array<{ icon: string, title: string, description: string }>) {
  achievements.forEach((achievement, index) => {
    setTimeout(() => {
      // Create notification element
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg animate-in slide-in-from-right duration-300'
      notification.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-3xl">${achievement.icon}</span>
          <div>
            <div class="font-bold">Achievement Unlocked!</div>
            <div class="text-sm">${achievement.title}</div>
            <div class="text-xs opacity-90">${achievement.description}</div>
          </div>
        </div>
      `

      document.body.appendChild(notification)

      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.classList.add('animate-out', 'fade-out', 'slide-out-to-right')
        setTimeout(() => notification.remove(), 300)
      }, 5000)
    }, index * 500) // Stagger notifications
  })
}

/**
 * Calculate quiz score percentage
 * @param correct Number of correct answers
 * @param total Total number of questions
 * @returns Score as percentage (0-100)
 */
export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}
