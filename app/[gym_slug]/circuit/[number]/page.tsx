'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import { useClimbSession } from '@/hooks/useClimbSession'
import { getCircuitMeta, getCircuitTip } from '@/lib/i18n'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { CIRCUITS, difficultyStars, formatDuration } from '@/lib/circuits'
import {
  completeCircuit,
  getCircuitElapsedSeconds,
  getStoredSessionId,
  recordRouteProgress,
  resetCircuitTimer,
  startCircuitTimer,
} from '@/lib/climb-session'

export default function CircuitPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const circuitNumber = Number(params.number)
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const { t, language } = useTranslation(gymSlug, gym?.language)

  const routes = CIRCUITS[circuitNumber] || []
  const meta = getCircuitMeta(language, circuitNumber)
  const [routeIndex, setRouteIndex] = useState(0)
  const [skippedCount, setSkippedCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (routeIndex === 0) {
      resetCircuitTimer()
      startCircuitTimer()
    }
  }, [circuitNumber])

  useEffect(() => {
    const timer = setInterval(() => setElapsed(getCircuitElapsedSeconds()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!CIRCUITS[circuitNumber]) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black bg-supr-cream">
        {t('circuit.invalid')}
      </div>
    )
  }

  if (gymLoading || sessionLoading || !gym) return <LoadingScreen />

  const current = routes[routeIndex]
  const total = routes.length
  const progress = ((routeIndex + (celebrating ? 1 : 0)) / total) * 100
  const tip = getCircuitTip(language, circuitNumber, routeIndex)

  const finishCircuit = async (finalSkipped: number, finalCompleted: number) => {
    const sid = getStoredSessionId()
    if (!sid) return
    setBusy(true)
    const duration = getCircuitElapsedSeconds()
    await completeCircuit(sid, circuitNumber, {
      routesCompleted: finalCompleted,
      routesTotal: total,
      durationSeconds: duration,
      hadSkips: finalSkipped > 0,
    })
    router.push(`/${gymSlug}/celebration?circuit=${circuitNumber}`)
  }

  const advance = async (completed: boolean, skipped: boolean) => {
    const sid = getStoredSessionId()
    if (!sid || !current) return

    await recordRouteProgress(sid, circuitNumber, current.number, completed, skipped)

    let newSkipped = skippedCount
    let newCompleted = completedCount
    if (skipped) newSkipped += 1
    if (completed) newCompleted += 1

    if (routeIndex >= total - 1) {
      await finishCircuit(newSkipped, newCompleted)
      return
    }

    if (completed) {
      setCelebrating(true)
      setTimeout(() => {
        setCelebrating(false)
        setRouteIndex(routeIndex + 1)
        setSkippedCount(newSkipped)
        setCompletedCount(newCompleted)
      }, 800)
    } else {
      setRouteIndex(routeIndex + 1)
      setSkippedCount(newSkipped)
      setCompletedCount(newCompleted)
    }
  }

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <div className="mb-4">
        <div className="flex items-center justify-between text-black mb-2">
          <span className="font-bold">
            {t('circuit.header', {
              emoji: meta.emoji,
              number: circuitNumber,
              label: meta.label,
            })}
          </span>
          <span className="text-sm font-mono">{formatDuration(elapsed)}</span>
        </div>
        <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: meta.color }}
          />
        </div>
        <p className="text-xs text-black mt-1">
          {t('circuit.routeProgress', { current: routeIndex + 1, total })}
        </p>
      </div>

      {celebrating && (
        <div className="text-center py-4 animate-bounce text-4xl">{t('circuit.pointsCelebration')}</div>
      )}

      <FlowCard className={celebrating ? 'opacity-50' : ''}>
        <p className="text-sm text-black mb-1">{t('circuit.difficulty')}</p>
        <p className="text-amber-500 text-lg mb-4">{difficultyStars(current.difficulty)}</p>

        <div className="bg-gray-200 rounded-xl h-40 flex items-center justify-center mb-4">
          {current.image ? (
            <img src={current.image} alt="" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-black font-semibold">
              {t('circuit.routeLabel', { number: current.number })}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-black">{t('circuit.coachTip')}</p>
        <p className="text-lg font-semibold text-black mb-4">{tip}</p>

        <p className="text-sm text-black bg-stone-50 rounded-lg p-3">{t('circuit.objective')}</p>
      </FlowCard>

      <div className="mt-6 space-y-3">
        <PrimaryButton
          color={gym.primary_color}
          disabled={busy || celebrating}
          onClick={() => advance(true, false)}
        >
          {t('circuit.success')}
        </PrimaryButton>
        <SecondaryButton disabled={busy || celebrating} onClick={() => advance(false, true)}>
          {t('circuit.skip')}
        </SecondaryButton>
      </div>
    </FlowShell>
  )
}
