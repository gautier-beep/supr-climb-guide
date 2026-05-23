'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useClimbSession } from '@/hooks/useClimbSession'
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

  const handleFinish = () => {
    clearStoredSessionId()
    router.push(`/${gymSlug}`)
  }

  if (gymLoading || sessionLoading || !gym || !session) return <LoadingScreen />

  const expiresDate = new Date(session.expires_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <h1 className="text-2xl font-bold text-white text-center mb-6">À bientôt ! 👋</h1>

      <FlowCard className="space-y-4 mb-6">
        <p className="text-gray-700">
          Tes stats sont sauvegardées jusqu&apos;au{' '}
          <strong className="text-gray-900">{expiresDate}</strong> (10 jours).
        </p>
        <p className="text-sm text-gray-500">
          {session.points_earned} points · {session.circuit_completed} circuit(s) complété(s)
        </p>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
          <p className="font-semibold text-gray-900 mb-1">Compte gratuit</p>
          <p className="text-sm text-gray-600">
            Crée un compte pour sauvegarder ta progression à vie (bientôt disponible).
          </p>
          <button
            type="button"
            disabled
            className="mt-3 w-full py-2 rounded-lg bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
          >
            Créer un compte (V1.1)
          </button>
        </div>
      </FlowCard>

      <div className="space-y-3">
        <PrimaryButton color={gym.primary_color} onClick={handleFinish}>
          ✓ Terminer ma session
        </PrimaryButton>
        <SecondaryButton onClick={() => router.push(`/${gymSlug}/hub`)}>
          Explorer le hub salle
        </SecondaryButton>
      </div>
    </FlowShell>
  )
}
