'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import { useClimbSession } from '@/hooks/useClimbSession'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
} from '@/components/flow/FlowShell'
import { createClient } from '@/lib/supabase/client'
import type { LeaderboardRow } from '@/lib/climb-types'

function rankLabel(rank: number): string {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

export default function LeaderboardPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const { t } = useTranslation(gymSlug, gym?.language)
  const [rows, setRows] = useState<LeaderboardRow[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('leaderboard_weekly')
        .select('*')
        .eq('gym_slug', gymSlug)
        .order('points', { ascending: false })
        .limit(20)

      if (error) {
        console.error('leaderboard', error)
        return
      }
      setRows(
        (data || []).map((r, i) => ({
          ...r,
          rank: i + 1,
        }))
      )
    }
    load()
  }, [gymSlug])

  if (gymLoading || sessionLoading || !gym || !session) return <LoadingScreen />

  const userRank = rows.findIndex((r) => r.user_name === session.user_name) + 1

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <h1 className="text-2xl font-bold text-black text-center mb-2">{t('leaderboard.title')}</h1>
      <p className="text-center text-black text-sm mb-6">
        {t('leaderboard.subtitle', { gym: gym.name })}
      </p>

      <FlowCard className="p-0 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {rows.length === 0 ? (
            <li className="p-6 text-center text-black">{t('leaderboard.empty')}</li>
          ) : (
            rows.map((row, i) => {
              const rank = row.rank ?? i + 1
              const isMe = row.user_name === session.user_name
              const circuitLabel =
                row.circuits_completed > 1
                  ? t('leaderboard.circuitMany', { count: row.circuits_completed })
                  : t('leaderboard.circuitOne', { count: row.circuits_completed })
              return (
                <li
                  key={`${row.user_name}-${rank}`}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    isMe ? 'bg-stone-100 text-black font-semibold' : 'text-black'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 flex-shrink-0">{isMe ? '📍' : rankLabel(rank)}</span>
                    <span className="truncate">{row.user_name}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="block">{circuitLabel}</span>
                    <span className="text-xs opacity-70">
                      {t('leaderboard.points', { points: row.points })}
                    </span>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </FlowCard>

      {userRank > 0 && (
        <p className="text-center text-black text-sm mt-4">
          {t('leaderboard.yourRank', { rank: userRank })}
        </p>
      )}

      <div className="mt-6">
        <PrimaryButton color={gym.primary_color} onClick={() => router.push(`/${gymSlug}/reminder`)}>
          {t('leaderboard.continue')}
        </PrimaryButton>
      </div>
    </FlowShell>
  )
}
