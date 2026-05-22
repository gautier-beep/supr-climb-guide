'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { ArrowLeft, MapPin, Clock, Instagram } from 'lucide-react'

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
          <h1 className="text-xl font-bold text-white">{gym.name}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {gym.logo_url && (
          <div className="bg-supr-surface border border-supr-border rounded-2xl p-8 text-center">
            <img src={gym.logo_url} alt={gym.name} className="h-32 mx-auto object-contain" />
          </div>
        )}

        <section className="bg-supr-surface border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Informations pratiques</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-supr-orange flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Adresse</h3>
                <p className="text-gray-400">{gym.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-supr-orange flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Horaires</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium text-white">10h - 23h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi - Dimanche</span>
                    <span className="font-medium text-white">9h - 22h</span>
                  </div>
                </div>
              </div>
            </div>

            {gym.instagram_handle && (
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-supr-orange flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Suivez-nous</h3>
                  <a
                    href={`https://instagram.com/${gym.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
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
          className="w-full bg-supr-surface border border-supr-border rounded-2xl p-4 text-left hover:border-supr-orange/40 transition-all"
        >
          <p className="text-white font-semibold">Voir la boutique →</p>
          <p className="text-gray-400 text-sm">Commander depuis l&apos;onglet Boutique de l&apos;accueil</p>
        </button>

        <section className="bg-supr-surface border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Système de cotation</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500" />
              <span className="text-gray-300">
                <strong className="text-white">Vert</strong> - Débutant (V0-V1)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500" />
              <span className="text-gray-300">
                <strong className="text-white">Bleu</strong> - Facile (V2-V3)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500" />
              <span className="text-gray-300">
                <strong className="text-white">Rouge</strong> - Moyen (V4-V5)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black border border-gray-600" />
              <span className="text-gray-300">
                <strong className="text-white">Noir</strong> - Difficile (V6+)
              </span>
            </div>
          </div>
        </section>

        <section className="bg-supr-surface border border-supr-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Règles de courtoisie</h2>
          <ul className="space-y-2 text-gray-400">
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
