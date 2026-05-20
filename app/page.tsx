'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { MapPin, GraduationCap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function SuprHomePage() {
  const router = useRouter()
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGyms() {
      try {
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .order('name')

        if (error) throw error
        setGyms(data || [])
      } catch (error) {
        console.error('Error loading gyms:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGyms()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="text-supr-orange">SUPR</span> Climb Guide
          </h1>
          <p className="text-gray-400 text-lg">
            Ton compagnon pour apprendre à grimper en salle
          </p>
        </div>

        <Link
          href="/about-supr"
          className="block mb-8 bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-5 text-white hover:opacity-95 transition-opacity"
        >
          <p className="font-bold text-lg mb-1">Découvrir SUPR Climbing</p>
          <p className="text-orange-100 text-sm">Prises, solutions et innovation pour les salles</p>
        </Link>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-supr-orange" />
            <h2 className="text-lg font-bold text-white">Apprendre à grimper</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Choisis ta salle pour accéder aux tutos, les bases et la suite avec l&apos;app SUPR.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-supr-orange" />
            <h2 className="text-lg font-bold text-white">
              Nos salles partenaires
              {gyms.length > 0 && (
                <span className="text-gray-500 font-normal text-sm ml-2">({gyms.length})</span>
              )}
            </h2>
          </div>

          {gyms.length === 0 ? (
            <div className="bg-supr-surface border border-supr-border rounded-2xl p-8 text-center">
              <p className="text-gray-400">Aucune salle configurée pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {gyms.map((gym) => (
                <button
                  key={gym.id}
                  onClick={() => router.push(`/${gym.slug}`)}
                  className="w-full bg-supr-surface border border-supr-border rounded-2xl p-5 text-left hover:border-supr-orange/50 transition-all group"
                  style={{ borderLeftWidth: '4px', borderLeftColor: gym.primary_color || '#FF6B35' }}
                >
                  <div className="flex items-center gap-4">
                    {gym.logo_url ? (
                      <img
                        src={gym.logo_url}
                        alt={gym.name}
                        className="h-14 w-14 object-contain rounded-lg bg-black/50 p-1"
                      />
                    ) : (
                      <div
                        className="h-14 w-14 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                        style={{ backgroundColor: gym.primary_color || '#FF6B35' }}
                      >
                        {gym.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{gym.name}</h3>
                      {gym.welcome_message && (
                        <p className="text-sm text-gray-400 truncate">{gym.welcome_message}</p>
                      )}
                      {gym.address && (
                        <p className="text-xs text-gray-500 mt-1 truncate">{gym.address}</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-supr-orange transition-colors flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 text-center text-gray-500 text-xs">
          <p>© 2026 SUPR Climbing. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  )
}
