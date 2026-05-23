export type UserLevel = 'never' | 'few' | 'regular'

export interface ClimbSession {
  id: string
  gym_slug: string
  user_name: string
  user_level: UserLevel | string
  expires_at: string
  points_earned: number
  circuit_completed: number
  routes_completed: number
  routes_total: number
  total_duration: number
  perfect_run: boolean
  completed_at: string | null
  shared_social: boolean
  created_at?: string
}

export interface RouteProgress {
  id: string
  session_id: string
  circuit_number: number
  route_number: number
  completed: boolean
  skipped: boolean
}

export interface SessionBadge {
  id: string
  session_id: string
  badge_type: string
  unlocked_at: string
}

export interface LeaderboardRow {
  gym_slug: string
  user_name: string
  circuits_completed: number
  points: number
  rank?: number
}

export const SESSION_STORAGE_KEY = 'session_id'
export const CIRCUIT_TIMER_KEY = 'circuit_timer_start'
