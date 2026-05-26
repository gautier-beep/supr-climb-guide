'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { QrCode, CheckCircle2 } from 'lucide-react'
import { beginnerWallSteps, beginnerWallTips } from '@/lib/supr-content'
import GymCover from '@/components/GymCover'
import { getGymVisual } from '@/lib/visual-assets'
import GymLogo from '@/components/GymLogo'

export default function BeginnerWallPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string

  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGym() {
      try {
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .eq('slug', gymSlug)
          .single()

        if (error) throw error
        setGym(data)

        void supabase.from('analytics_events').insert({
          gym_id: data.id,
          event_type: 'beginner_wall_view',
          session_id: Math.random().toString(36).substring(7),
        })
      } catch (error) {
        console.error('Error loading gym:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGym()
  }, [gymSlug])

  if (loading || !gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-supr-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-mint" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-supr-cream">
      <div className="border-b border-supr-border bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-black">Mur débutant SUP&apos;R</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="relative h-28 rounded-2xl overflow-hidden">
          <GymCover
            name={gym.name}
            color={gym.primary_color || '#14b8a6'}
            coverUrl={getGymVisual(gymSlug).cover}
          />
        </div>
        <div className="flex items-center justify-center gap-3 -mt-2">
          <GymLogo
            slug={gymSlug}
            name={gym.name}
            logoUrl={gym.logo_url}
            primaryColor={gym.primary_color}
            size="md"
          />
          <div>
            <h2 className="text-lg font-black text-black">Mur débutant SUP&apos;R</h2>
            <p className="text-black text-xs">{gym.name}</p>
          </div>
        </div>

        <div className="bg-white border border-supr-border rounded-2xl p-6 text-black text-center">
          <QrCode className="w-12 h-12 mx-auto mb-3 text-supr-mint" />
          <p className="text-black text-sm">
            Scanne le QR sur le mur pour suivre ta progression
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Comment grimper ton premier bloc</h2>
          <div className="space-y-3">
            {beginnerWallSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-3 bg-white border border-supr-border rounded-xl p-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supr-orange/20 text-supr-mint flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-black text-sm">{item.title}</h3>
                  <p className="text-xs text-black mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Équipement SUP&apos;R</h2>
          <div className="space-y-2">
            {beginnerWallTips.map((tip) => (
              <div key={tip.title} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-supr-mint flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-black font-medium">{tip.title}</p>
                  <p className="text-xs text-black">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={() => router.push(`/${gymSlug}/learn`)}
          className="w-full bg-supr-mint text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-colors"
        >
          Voir tous les tutos →
        </button>
      </div>
    </div>
  )
}
