'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import { useClimbSession } from '@/hooks/useClimbSession'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { fetchSessionBadges } from '@/lib/climb-session'
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
  const { t } = useTranslation(gymSlug, gym?.language)
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
        <h1 className="text-3xl font-black text-black">
          {t('celebration.title', { name: session.user_name })}
        </h1>
        <p className="text-black mt-2">{t('celebration.circuitDone', { number: circuit })}</p>
      </div>

      <FlowCard className="mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-black">
              {completed}/{total}
            </p>
            <p className="text-xs text-black">{t('celebration.routesSuccess')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">{formatDuration(duration)}</p>
            <p className="text-xs text-black">{t('celebration.totalTime')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">{formatDuration(avg)}</p>
            <p className="text-xs text-black">{t('celebration.avgPerRoute')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">{session.points_earned} pts</p>
            <p className="text-xs text-black">{t('celebration.pointsEarned')}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-black mb-1">
            <span>{t('celebration.beginnerLevel')}</span>
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
            <p className="text-sm font-semibold text-black mb-2">{t('celebration.badgesUnlocked')}</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.id}
                  className="text-xs bg-stone-100 text-black px-3 py-1 rounded-full font-medium"
                >
                  🏅 {t(`celebration.badges.${b.badge_type}`) || b.badge_type}
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
          {t('celebration.photobooth')}
        </PrimaryButton>
        {circuit < 3 && (
          <SecondaryButton onClick={() => router.push(`/${gymSlug}/circuit/${circuit + 1}`)}>
            {t('celebration.nextCircuit', { number: circuit + 1 })}
          </SecondaryButton>
        )}
        <SecondaryButton onClick={() => router.push(`/${gymSlug}/leaderboard`)}>
          {t('celebration.leaderboard')}
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
