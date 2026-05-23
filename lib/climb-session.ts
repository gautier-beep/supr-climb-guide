import { createClient } from '@/lib/supabase/client'
import {
  CIRCUIT_TIMER_KEY,
  ClimbSession,
  SESSION_STORAGE_KEY,
  SessionBadge,
} from '@/lib/climb-types'
import { CIRCUITS } from '@/lib/circuits'

const supabase = createClient()

export const POINTS = {
  route: 10,
  circuit: 50,
  badge: 25,
  perfect: 100,
  social: 20,
} as const

export function getStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SESSION_STORAGE_KEY)
}

export function setStoredSessionId(id: string) {
  localStorage.setItem(SESSION_STORAGE_KEY, id)
}

export function clearStoredSessionId() {
  localStorage.removeItem(SESSION_STORAGE_KEY)
  localStorage.removeItem(CIRCUIT_TIMER_KEY)
}

export function startCircuitTimer() {
  if (!localStorage.getItem(CIRCUIT_TIMER_KEY)) {
    localStorage.setItem(CIRCUIT_TIMER_KEY, Date.now().toString())
  }
}

export function getCircuitElapsedSeconds(): number {
  const start = localStorage.getItem(CIRCUIT_TIMER_KEY)
  if (!start) return 0
  return Math.floor((Date.now() - Number(start)) / 1000)
}

export function resetCircuitTimer() {
  localStorage.removeItem(CIRCUIT_TIMER_KEY)
}

export async function fetchSession(sessionId: string): Promise<ClimbSession | null> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error || !data) return null

  const expires = new Date(data.expires_at)
  if (expires < new Date()) {
    clearStoredSessionId()
    return null
  }

  return data as ClimbSession
}

export async function createSession(
  gymSlug: string,
  userName: string,
  userLevel: string
): Promise<ClimbSession | null> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 10)

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      gym_slug: gymSlug,
      user_name: userName,
      user_level: userLevel,
      expires_at: expiresAt.toISOString(),
      points_earned: 0,
      circuit_completed: 0,
      routes_completed: 0,
      routes_total: 0,
      total_duration: 0,
      perfect_run: true,
      shared_social: false,
    })
    .select()
    .single()

  if (error || !data) {
    console.error('createSession', error)
    return null
  }

  setStoredSessionId(data.id)
  return data as ClimbSession
}

export async function addPoints(sessionId: string, amount: number) {
  const session = await fetchSession(sessionId)
  if (!session) return

  const { data, error } = await supabase
    .from('sessions')
    .update({ points_earned: (session.points_earned || 0) + amount })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) console.error('addPoints', error)
  return data as ClimbSession | null
}

export async function unlockBadge(
  sessionId: string,
  badgeType: string
): Promise<SessionBadge | null> {
  const { data: existing } = await supabase
    .from('badges')
    .select('id')
    .eq('session_id', sessionId)
    .eq('badge_type', badgeType)
    .maybeSingle()

  if (existing) return null

  const { data, error } = await supabase
    .from('badges')
    .insert({ session_id: sessionId, badge_type: badgeType })
    .select()
    .single()

  if (error) {
    console.error('unlockBadge', error)
    return null
  }

  await addPoints(sessionId, POINTS.badge)
  return data as SessionBadge
}

export async function recordRouteProgress(
  sessionId: string,
  circuitNumber: number,
  routeNumber: number,
  completed: boolean,
  skipped: boolean
) {
  await supabase.from('routes_progress').insert({
    session_id: sessionId,
    circuit_number: circuitNumber,
    route_number: routeNumber,
    completed,
    skipped,
  })

  if (completed) {
    await addPoints(sessionId, POINTS.route)
  }

  if (skipped) {
    const session = await fetchSession(sessionId)
    if (session?.perfect_run) {
      await supabase
        .from('sessions')
        .update({ perfect_run: false })
        .eq('id', sessionId)
    }
  }
}

export async function completeCircuit(
  sessionId: string,
  circuitNumber: number,
  stats: {
    routesCompleted: number
    routesTotal: number
    durationSeconds: number
    hadSkips: boolean
  }
) {
  const session = await fetchSession(sessionId)
  if (!session) return null

  let points = session.points_earned + POINTS.circuit
  const perfectRun = !stats.hadSkips

  if (perfectRun) {
    points += POINTS.perfect
  }

  const { data, error } = await supabase
    .from('sessions')
    .update({
      circuit_completed: Math.max(session.circuit_completed || 0, circuitNumber),
      routes_completed: stats.routesCompleted,
      routes_total: stats.routesTotal,
      total_duration: stats.durationSeconds,
      perfect_run: perfectRun,
      points_earned: points,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) {
    console.error('completeCircuit', error)
    return null
  }

  const badges: string[] = []
  if (circuitNumber === 1) badges.push('first_circuit')
  if (circuitNumber === 2) badges.push('circuit_2')
  if (circuitNumber === 3) badges.push('circuit_3')
  if (perfectRun) badges.push('perfect_run')
  if (stats.durationSeconds < 15 * 60) badges.push('fast')

  for (const b of badges) {
    await unlockBadge(sessionId, b)
  }

  return data as ClimbSession
}

export async function markSocialShared(sessionId: string) {
  const session = await fetchSession(sessionId)
  if (!session || session.shared_social) return session

  const { data, error } = await supabase
    .from('sessions')
    .update({
      shared_social: true,
      points_earned: (session.points_earned || 0) + POINTS.social,
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) console.error('markSocialShared', error)
  return data as ClimbSession | null
}

export async function fetchSessionBadges(sessionId: string): Promise<SessionBadge[]> {
  const { data } = await supabase
    .from('badges')
    .select('*')
    .eq('session_id', sessionId)
    .order('unlocked_at', { ascending: true })

  return (data || []) as SessionBadge[]
}

export function getCircuitRouteCount(circuitNumber: number): number {
  return CIRCUITS[circuitNumber]?.length ?? 10
}

export const BADGE_LABELS: Record<string, string> = {
  apprentice: 'Apprenti',
  first_circuit: 'Premier circuit',
  perfect_run: 'Sans faute',
  fast: 'Rapide (< 15 min)',
  circuit_2: 'Circuit 2',
  circuit_3: 'Circuit 3',
}
