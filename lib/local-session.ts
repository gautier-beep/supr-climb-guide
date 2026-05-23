import type { ClimbSession, SessionBadge } from '@/lib/climb-types'

const LOCAL_SESSION_KEY = 'climb_session_data'
const LOCAL_BADGES_KEY = 'climb_session_badges'
const LOCAL_ROUTES_KEY = 'climb_session_routes'

export function isLocalSessionId(id: string): boolean {
  return id.startsWith('local_')
}

export function loadLocalSession(): ClimbSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as ClimbSession
    if (new Date(session.expires_at) < new Date()) {
      clearLocalSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function saveLocalSession(session: ClimbSession) {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session))
}

export function clearLocalSession() {
  localStorage.removeItem(LOCAL_SESSION_KEY)
  localStorage.removeItem(LOCAL_BADGES_KEY)
  localStorage.removeItem(LOCAL_ROUTES_KEY)
}

export function createLocalSession(
  gymSlug: string,
  userName: string,
  userLevel: string
): ClimbSession {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 10)

  return {
    id: `local_${crypto.randomUUID()}`,
    gym_slug: gymSlug,
    user_name: userName,
    user_level: userLevel,
    expires_at: expiresAt.toISOString(),
    points_earned: 0,
    circuit_completed: 0, // local only; DB uses null until first circuit done
    routes_completed: 0,
    routes_total: 0,
    total_duration: 0,
    perfect_run: true,
    completed_at: null,
    shared_social: false,
  }
}

export function loadLocalBadges(sessionId: string): SessionBadge[] {
  try {
    const raw = localStorage.getItem(LOCAL_BADGES_KEY)
    const all = raw ? (JSON.parse(raw) as SessionBadge[]) : []
    return all.filter((b) => b.session_id === sessionId)
  } catch {
    return []
  }
}

export function addLocalBadge(sessionId: string, badgeType: string): SessionBadge | null {
  const badges = loadLocalBadges(sessionId)
  if (badges.some((b) => b.badge_type === badgeType)) return null

  const badge: SessionBadge = {
    id: `local_b_${crypto.randomUUID()}`,
    session_id: sessionId,
    badge_type: badgeType,
    unlocked_at: new Date().toISOString(),
  }

  const raw = localStorage.getItem(LOCAL_BADGES_KEY)
  const all = raw ? (JSON.parse(raw) as SessionBadge[]) : []
  all.push(badge)
  localStorage.setItem(LOCAL_BADGES_KEY, JSON.stringify(all))
  return badge
}

export function recordLocalRoute(
  sessionId: string,
  circuitNumber: number,
  routeNumber: number,
  completed: boolean,
  skipped: boolean
) {
  const raw = localStorage.getItem(LOCAL_ROUTES_KEY)
  const all = raw ? JSON.parse(raw) : []
  all.push({ session_id: sessionId, circuit_number: circuitNumber, route_number: routeNumber, completed, skipped })
  localStorage.setItem(LOCAL_ROUTES_KEY, JSON.stringify(all))
}
