'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import FlowShell, { FlowHeader, LoadingScreen, PrimaryButton } from '@/components/flow/FlowShell'
import { createClient } from '@/lib/supabase/client'

export default function GymLandingPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading } = useGym(gymSlug)

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
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 text-center">
        <div>
          <h1 className="text-xl font-bold mb-2">Salle non trouvée</h1>
          <button onClick={() => router.push('/')} className="text-supr-orange mt-4">
            Retour accueil SUPR
          </button>
        </div>
      </div>
    )
  }

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <div className="min-h-[80vh] flex flex-col justify-center">
        <FlowHeader
          gym={gym}
          gymSlug={gymSlug}
          title={`Bienvenue chez ${gym.name} !`}
          subtitle={gym.welcome_message || 'Prêt·e pour ton initiation au bloc ?'}
        />
        <div className="mt-8 space-y-4">
          <PrimaryButton onClick={handleStart} color={gym.primary_color}>
            Commencer mon initiation 🚀
          </PrimaryButton>
          <p className="text-center text-xs text-gray-400">
            Parcours guidé · 3 circuits · ~30 min
          </p>
        </div>
      </div>
    </FlowShell>
  )
}
