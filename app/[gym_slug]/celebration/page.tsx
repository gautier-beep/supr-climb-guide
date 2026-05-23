'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useClimbSession } from '@/hooks/useClimbSession'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { BADGE_LABELS, fetchSessionBadges } from '@/lib/climb-session'
import { formatDuration, getLevelProgress } from '@/lib/circuits'
import type { SessionBadge } from '@/lib/climb-types'
import { getCircuitRouteCount } from '@/lib/climb-session'

function CelebrationContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const gymSlug = params.gym_slug as string
  const circuit = Number(searchParams.get('circuit') || '1')
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading, refresh } = useClimbSession(gymSlug, { required: true })
  const [badges, setBadges] = useState<SessionBadge[]>([])

  useEffect(() => {
    if (session?.id) {
      fetchSessionBadges(session.id).then(setBadges)
      refresh()
    }
  }, [session?.id])

  if (gymLoading || sessionLoading || !gym || !session) return <LoadingScreen />

  const total = session.routes_total || getCircuitRouteCount(circuit)
  const completed = session.routes_completed || total
  const duration = session.total_duration || 0
  const avg = total > 0 ? Math.round(duration / total) : 0
  const levelPct = getLevelProgress(circuit)

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <div className="text-center mb-6">
        <div className="text-6xl animate-bounce mb-2">🎊</div>
        <h1 className="text-3xl font-black text-white">Bravo {session.user_name} !</h1>
        <p className="text-gray-300 mt-2">Circuit {circuit} terminé</p>
      </div>

      <FlowCard className="mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {completed}/{total}
            </p>
            <p className="text-xs text-gray-500">Voies réussies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatDuration(duration)}</p>
            <p className="text-xs text-gray-500">Temps total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatDuration(avg)}</p>
            <p className="text-xs text-gray-500">Moy. / voie</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-supr-orange">{session.points_earned} pts</p>
            <p className="text-xs text-gray-500">Points gagnés</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Niveau débutant</span>
            <span>{levelPct}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${levelPct}%` }}
            />
          </div>
        </div>

        {badges.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Badges débloqués</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.id}
                  className="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium"
                >
                  🏅 {BADGE_LABELS[b.badge_type] || b.badge_type}
                </span>
              ))}
            </div>
          </div>
        )}
      </FlowCard>

      <div className="space-y-3">
        <PrimaryButton
          color={gym.primary_color}
          onClick={() => router.push(`/${gymSlug}/photobooth?circuit=${circuit}`)}
        >
          📸 Photobooth &amp; Partage
        </PrimaryButton>
        {circuit < 3 && (
          <SecondaryButton onClick={() => router.push(`/${gymSlug}/circuit/${circuit + 1}`)}>
            → Circuit {circuit + 1}
          </SecondaryButton>
        )}
        <SecondaryButton onClick={() => router.push(`/${gymSlug}/leaderboard`)}>
          🏆 Voir classement
        </SecondaryButton>
      </div>
    </FlowShell>
  )
}

export default function CelebrationPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CelebrationContent />
    </Suspense>
  )
}
