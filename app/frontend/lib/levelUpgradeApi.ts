import authService from './auth'

const API_BASE = '/learning/progress'

export interface ModuleCompletionStatus {
  completed: number
  required: number
  complete: boolean
  passed_exam?: boolean
}

export interface UpgradeEligibility {
  eligible: boolean
  current_level: string
  next_level: string | null
  completion_status: {
    grammar: ModuleCompletionStatus
    reading: ModuleCompletionStatus
    writing: ModuleCompletionStatus
    vocabulary: ModuleCompletionStatus
  }
  overall_percentage: number
}

export interface Achievement {
  id: number
  type: string
  title: string
  description: string
  earned_at: string
  icon: string | null
}

export interface UpgradeResult {
  success: boolean
  new_level: string
  previous_level: string
  achievement: Achievement | null
}

export async function checkUpgradeEligibility(): Promise<UpgradeEligibility> {
  const token = authService.getToken()

  const response = await fetch(`${API_BASE}/upgrade_eligibility`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to check upgrade eligibility')
  }

  return response.json()
}

export async function performLevelUpgrade(toLevel: string): Promise<UpgradeResult> {
  const token = authService.getToken()

  const response = await fetch(`${API_BASE}/upgrade`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ to_level: toLevel })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to upgrade level')
  }

  return response.json()
}
