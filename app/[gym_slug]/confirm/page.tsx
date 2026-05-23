'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import FlowShell, {
  FlowCard,
  FlowHeader,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { createClient } from '@/lib/supabase/client'
import type { Gym } from '@/lib/supabase'
import { MapPin, X } from 'lucide-react'

export default function ConfirmPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading } = useGym(gymSlug)
  const [otherGyms, setOtherGyms] = useState<Gym[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function loadOthers() {
      const supabase = createClient()
      const { data } = await supabase
        .from('gyms')
        .select('*')
        .neq('slug', gymSlug)
        .order('name')
      setOtherGyms(data || [])
    }
    loadOthers()
  }, [gymSlug])

  if (loading || !gym) return <LoadingScreen />

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <FlowHeader gym={gym} gymSlug={gymSlug} title="C'est bien cette salle ?" />

      <FlowCard className="mb-6">
        <div className="flex gap-3">
          <MapPin className="w-6 h-6 text-supr-orange flex-shrink-0" />
          <div>
            <h2 className="font-bold text-lg">{gym.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{gym.address}</p>
          </div>
        </div>
      </FlowCard>

      <div className="space-y-3">
        <PrimaryButton color={gym.primary_color} onClick={() => router.push(`/${gymSlug}/profile`)}>
          ✓ C&apos;est bien ça
        </PrimaryButton>
        <SecondaryButton onClick={() => setShowModal(true)}>
          ❌ Changer de salle
        </SecondaryButton>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-gray-900">Choisir une salle</h3>
              <button onClick={() => setShowModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="overflow-y-auto max-h-[50vh]">
              {otherGyms.map((g) => (
                <li key={g.slug}>
                  <button
                    className="w-full text-left px-4 py-4 hover:bg-gray-50 border-b text-gray-900"
                    onClick={() => router.push(`/${g.slug}/confirm`)}
                  >
                    <p className="font-semibold">{g.name}</p>
                    <p className="text-sm text-gray-500">{g.address}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </FlowShell>
  )
}
