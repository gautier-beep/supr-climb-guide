'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import { useClimbSession } from '@/hooks/useClimbSession'
import { DATE_LOCALES } from '@/lib/i18n'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { clearStoredSessionId } from '@/lib/climb-session'

export default function ReminderPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const { t, language } = useTranslation(gymSlug, gym?.language)

  const handleFinish = () => {
    clearStoredSessionId()
    router.push(`/${gymSlug}`)
  }

  if (gymLoading || sessionLoading || !gym || !session) return <LoadingScreen />

  const expiresDate = new Date(session.expires_at).toLocaleDateString(DATE_LOCALES[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <h1 className="text-2xl font-bold text-black text-center mb-6">{t('reminder.title')}</h1>

      <FlowCard className="space-y-4 mb-6">
        <p className="text-black">{t('reminder.savedUntil', { date: expiresDate })}</p>
        <p className="text-sm text-black">
          {t('reminder.stats', {
            points: session.points_earned ?? 0,
            circuits: session.circuit_completed ?? 0,
          })}
        </p>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
          <p className="font-semibold text-black mb-1">{t('reminder.freeAccount')}</p>
          <p className="text-sm text-black">{t('reminder.freeAccountDesc')}</p>
          <button
            type="button"
            disabled
            className="mt-3 w-full py-2 rounded-lg bg-stone-200 text-black text-sm font-medium cursor-not-allowed"
          >
            {t('reminder.createAccount')}
          </button>
        </div>
      </FlowCard>

      <div className="space-y-3">
        <PrimaryButton color={gym.primary_color} onClick={handleFinish}>
          {t('reminder.finish')}
        </PrimaryButton>
        <SecondaryButton onClick={() => router.push(`/${gymSlug}/hub`)}>
          {t('reminder.exploreHub')}
        </SecondaryButton>
      </div>
    </FlowShell>
  )
}
