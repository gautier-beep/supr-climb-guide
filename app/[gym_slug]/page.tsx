'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import FlowShell, { FlowHeader, LoadingScreen, PrimaryButton } from '@/components/flow/FlowShell'
import { createClient } from '@/lib/supabase/client'

export default function GymLandingPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading } = useGym(gymSlug)
  const { t } = useTranslation(gymSlug, gym?.language)

  const handleStart = async () => {
    if (gym) {
      const supabase = createClient()
      void supabase.from('analytics_events').insert({
        gym_id: gym.id,
        event_type: 'page_view',
        session_id: Math.random().toString(36).slice(2),
      })
    }
    router.push(`/${gymSlug}/confirm`)
  }

  if (loading) return <LoadingScreen />

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-supr-cream text-black px-4 text-center">
        <div>
          <h1 className="text-xl font-bold mb-2">{t('landing.notFound')}</h1>
          <button onClick={() => router.push('/')} className="text-black font-medium mt-4 underline">
            {t('landing.backHome')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      {gymSlug === 'demo' && (
        <div className="bg-amber-200 text-black p-2 text-center text-sm -mx-4 -mt-4 mb-4 rounded-lg border border-amber-300">
          {t('landing.demoBanner')}
        </div>
      )}
      <div className="min-h-[80vh] flex flex-col justify-center">
        <FlowHeader
          gym={gym}
          gymSlug={gymSlug}
          title={t('landing.welcome', { name: gym.name })}
          subtitle={gym.welcome_message || t('landing.defaultSubtitle')}
        />
        <div className="mt-8 space-y-4">
          <PrimaryButton onClick={handleStart} color={gym.primary_color}>
            {t('landing.start')}
          </PrimaryButton>
          <p className="text-center text-xs text-black">{t('landing.meta')}</p>
        </div>
      </div>
    </FlowShell>
  )
}
