/** Chemins du parcours V1 — masquer BottomNav sur ces routes */
export const V1_FLOW_SEGMENTS = [
  'confirm',
  'profile',
  'tutorial',
  'circuit',
  'celebration',
  'photobooth',
  'leaderboard',
  'reminder',
] as const

export function isV1FlowPath(pathname: string | null): boolean {
  if (!pathname) return false
  return V1_FLOW_SEGMENTS.some((seg) => pathname.includes(`/${seg}`))
}
