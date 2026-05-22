'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Camera, Share2 } from 'lucide-react'
import { supabase, Gym } from '@/lib/supabase'

const templates = [
  {
    id: 'first-climb',
    title: 'First Climb Ever 🚀',
    emoji: '🚀',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'new-grade',
    title: 'New Grade Unlocked 🎯',
    emoji: '🎯',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'grind',
    title: 'Session Grind 💪',
    emoji: '💪',
    color: 'from-orange-500 to-red-500',
  },
]

export default function SharePage() {
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
      } catch (error) {
        console.error('Error loading gym:', error)
      } finally {
        setLoading(false)
      }
    }
    loadGym()
  }, [gymSlug])

  const handleShare = async (templateId: string) => {
    if (gym) {
      await supabase.from('analytics_events').insert({
        gym_id: gym.id,
        event_type: 'instagram_share',
        session_id: Math.random().toString(36).substring(7),
      })
    }

    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    alert(
      `📸 Partage Instagram\n\n1. Fais une capture d'écran de ta session\n2. Ouvre Instagram Stories\n3. Ajoute ton emoji "${template.emoji}"\n4. Mentionne @${gym?.instagram_handle || gymSlug}\n5. Hashtag #SUPRClimbing\n\n✨ Génération automatique disponible en v1.1 !`
    )
  }

  if (loading) {
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
          <h1 className="text-xl font-bold text-white">Partager ma session</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Stories Instagram</h2>
          </div>
          <p className="text-purple-100">
            Choisis un template, personnalise-le, et partage ta session sur Instagram !
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Choisis ton template</h3>

          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleShare(template.id)}
              className="w-full bg-supr-surface border border-supr-border rounded-2xl hover:border-supr-orange/40 transition-all p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}
                >
                  {template.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-400">
                    Template avec logo de ta salle + hashtags
                  </p>
                </div>
                <Share2 className="w-6 h-6 text-gray-600 group-hover:text-supr-orange transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-supr-surface border border-supr-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Aperçu</h3>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl aspect-[9/16] max-w-[280px] mx-auto p-6 text-white flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-2">🚀</div>
              <h4 className="text-2xl font-bold mb-2">First Climb Ever!</h4>
              <p className="text-purple-100 text-sm">J&apos;ai grimpé mes premiers blocs aujourd&apos;hui</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 text-sm">
                #{gymSlug} #SUPRClimbing #Bouldering
              </div>
              <div className="text-xs text-purple-100">Powered by SUPR</div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Le logo de ta salle apparaîtra sur la story finale
          </p>
        </div>

        <div className="bg-supr-surface border border-blue-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-white">💡 Astuce :</strong> Partage régulièrement tes sessions pour
            inspirer d&apos;autres grimpeurs et suivre ta progression !
          </p>
        </div>
      </div>
    </div>
  )
}
