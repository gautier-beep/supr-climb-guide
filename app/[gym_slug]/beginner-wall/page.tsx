'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { ArrowLeft, QrCode, CheckCircle2 } from 'lucide-react'
import { beginnerWallSteps, beginnerWallTips } from '@/lib/supr-content'

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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-supr-border sticky top-0 z-10 bg-black">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/${gymSlug}`)}
            className="p-2 hover:bg-supr-surface rounded-lg transition-colors text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Mur débutant SUP&apos;R</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {gym.logo_url && (
          <div className="flex justify-center py-2">
            <img src={gym.logo_url} alt={gym.name} className="h-12 object-contain" />
          </div>
        )}

        <div className="bg-gradient-to-br from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <QrCode className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-black mb-2">Bienvenue sur le mur débutant</h2>
          <p className="text-orange-100 text-sm">
            {gym.name} × SUP&apos;R — prises conçues pour débuter et progresser
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Comment grimper ton premier bloc</h2>
          <div className="space-y-3">
            {beginnerWallSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-3 bg-supr-surface border border-supr-border rounded-xl p-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supr-orange/20 text-supr-orange flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Équipement SUP&apos;R</h2>
          <div className="space-y-2">
            {beginnerWallTips.map((tip) => (
              <div key={tip.title} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-supr-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">{tip.title}</p>
                  <p className="text-xs text-gray-400">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={() => router.push(`/${gymSlug}/learn`)}
          className="w-full bg-supr-orange text-white font-semibold py-4 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Voir tous les tutos →
        </button>
      </div>
    </div>
  )
}
