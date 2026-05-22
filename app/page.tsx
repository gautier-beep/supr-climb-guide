'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { MapPin, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { suprStats, SUPR_SITE_URL } from '@/lib/supr-content'

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
          <img
            src="/supr-logo.png"
            alt="SUPR"
            className="mx-auto mb-6 h-12 w-auto opacity-80"
          />
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
          <img
            src="/supr-logo.png"
            alt="SUPR Climbing"
            className="mx-auto mb-6 h-16 w-auto object-contain"
          />
          <p className="text-gray-400 text-lg">
            Ton compagnon pour apprendre à grimper en salle
          </p>
          <p className="text-xs text-gray-600 mt-2 uppercase tracking-widest">
            Official World Climbing products supplier
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-supr-orange">{suprStats.holds}</div>
            <div className="text-[10px] text-gray-500 uppercase">Holds</div>
          </div>
          <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">{suprStats.macros}</div>
            <div className="text-[10px] text-gray-500 uppercase">Macros</div>
          </div>
          <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">{suprStats.volumes}</div>
            <div className="text-[10px] text-gray-500 uppercase">Volumes</div>
          </div>
        </div>

        <Link
          href="/about-supr"
          className="block mb-8 bg-supr-surface border border-supr-border rounded-2xl p-5 hover:border-supr-orange/50 transition-all group"
        >
          <p className="font-bold text-lg text-white mb-1 group-hover:text-supr-orange transition-colors">
            SUP&apos;R — Groupe, consulting & World Climbing
          </p>
          <p className="text-gray-400 text-sm">
            Level up. Plus que des prises — un mindset.
          </p>
        </Link>

        <a
          href={SUPR_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-500 hover:text-supr-orange transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          supr-holds-production.up.railway.app
        </a>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-supr-orange" />
            <h2 className="text-lg font-bold text-white">Apprendre à grimper</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Choisis ta salle pour les tutos, le mur débutant et ton profil grimpeur.
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

          {gyms.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {gyms.map((gym) => (
                <button
                  key={gym.id}
                  onClick={() => router.push(`/${gym.slug}`)}
                  className="bg-supr-surface border border-supr-border rounded-xl p-3 flex flex-col items-center gap-2 hover:border-supr-orange/50 transition-all"
                >
                  {gym.logo_url ? (
                    <img
                      src={gym.logo_url}
                      alt={gym.name}
                      className="h-10 w-full object-contain"
                    />
                  ) : (
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: gym.primary_color || '#FF6B35' }}
                    >
                      {gym.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 text-center leading-tight line-clamp-2">
                    {gym.name}
                  </span>
                </button>
              ))}
            </div>
          )}

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
                      <div className="flex-shrink-0 h-16 w-20 flex items-center justify-center bg-black/40 rounded-lg p-2">
                        <img
                          src={gym.logo_url}
                          alt={gym.name}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-shrink-0 h-16 w-16 rounded-lg flex items-center justify-center text-xl font-bold text-white"
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
          <p>© 2026 SUP&apos;R Climbing. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  )
}
