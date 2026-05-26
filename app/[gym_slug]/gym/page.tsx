'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { MapPin, Clock, Instagram } from 'lucide-react'
import GymLogo from '@/components/GymLogo'

export default function GymPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string

  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: gymData, error: gymError } = await supabase
          .from('gyms')
          .select('*')
          .eq('slug', gymSlug)
          .single()

        if (gymError) throw gymError
        setGym(gymData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
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
      <div className="border-b border-supr-border bg-supr-cream">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-black">{gym.name}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="bg-white border border-supr-border rounded-2xl p-8 flex justify-center">
          <GymLogo
            slug={gymSlug}
            name={gym.name}
            logoUrl={gym.logo_url}
            primaryColor={gym.primary_color}
            size="lg"
          />
        </div>

        <section className="bg-white border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-black mb-6">Informations pratiques</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-supr-mint flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-1">Adresse</h3>
                <p className="text-black">{gym.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-supr-mint flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Horaires</h3>
                <div className="space-y-1 text-sm text-black">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium text-black">10h - 23h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi - Dimanche</span>
                    <span className="font-medium text-black">9h - 22h</span>
                  </div>
                </div>
              </div>
            </div>

            {gym.instagram_handle && (
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-supr-mint flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-2">Suivez-nous</h3>
                  <a
                    href={`https://instagram.com/${gym.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>@{gym.instagram_handle}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <button
          onClick={() => router.push(`/${gymSlug}?tab=boutique`)}
          className="w-full bg-white border border-supr-border rounded-2xl p-4 text-left hover:border-supr-mint/40 transition-all"
        >
          <p className="text-black font-semibold">Voir la boutique →</p>
          <p className="text-black text-sm">Commander depuis l&apos;onglet Boutique de l&apos;accueil</p>
        </button>

        <section className="bg-white border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Système de cotation</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500" />
              <span className="text-black">
                <strong className="text-black">Vert</strong> - Débutant (V0-V1)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500" />
              <span className="text-black">
                <strong className="text-black">Bleu</strong> - Facile (V2-V3)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500" />
              <span className="text-black">
                <strong className="text-black">Rouge</strong> - Moyen (V4-V5)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black border border-stone-400" />
              <span className="text-black">
                <strong className="text-black">Noir</strong> - Difficile (V6+)
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Règles de courtoisie</h2>
          <ul className="space-y-2 text-black">
            <li>• Un grimpeur par zone à la fois</li>
            <li>• Respecte les autres grimpeurs</li>
            <li>• Pas de chaussures sur les tapis</li>
            <li>• Magnésie dans un sac, pas en vrac</li>
            <li>• Nettoie tes prises avec une brosse</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
