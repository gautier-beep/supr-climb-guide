'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
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
      <h1 className="text-2xl font-bold text-white text-center mb-2">🏆 Classement</h1>
      <p className="text-center text-gray-400 text-sm mb-6">Cette semaine — {gym.name}</p>

      <FlowCard className="p-0 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {rows.length === 0 ? (
            <li className="p-6 text-center text-gray-500">Pas encore de scores cette semaine.</li>
          ) : (
            rows.map((row, i) => {
              const rank = row.rank ?? i + 1
              const isMe = row.user_name === session.user_name
              return (
                <li
                  key={`${row.user_name}-${rank}`}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    isMe ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 flex-shrink-0">{isMe ? '📍' : rankLabel(rank)}</span>
                    <span className="truncate">{row.user_name}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="block">{row.circuits_completed} circuit{row.circuits_completed > 1 ? 's' : ''}</span>
                    <span className="text-xs opacity-70">{row.points} pts</span>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </FlowCard>

      {userRank > 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">
          Ta position : #{userRank}
        </p>
      )}

      <div className="mt-6">
        <PrimaryButton color={gym.primary_color} onClick={() => router.push(`/${gymSlug}/reminder`)}>
          Continuer →
        </PrimaryButton>
      </div>
    </FlowShell>
  )
}
