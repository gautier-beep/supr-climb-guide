'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import {
  MapPin,
  GraduationCap,
  ChevronRight,
  ExternalLink,
  CircleDot,
  Box,
  LayoutGrid,
  Users,
  Award,
} from 'lucide-react'
import Link from 'next/link'
import { suprStats, SUPR_SITE_URL } from '@/lib/supr-content'
import { images } from '@/lib/visual-assets'
import CoverImage from '@/components/CoverImage'
import GymCover from '@/components/GymCover'
import GymLogo from '@/components/GymLogo'
import SuprLogo from '@/components/SuprLogo'

export default function SuprHomePage() {
  const router = useRouter()
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGyms() {
      try {
        const { data, error } = await supabase.from('gyms').select('*').order('name')
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
          <SuprLogo className="max-h-12 mx-auto mb-6 opacity-80" boxClassName="h-12 mx-auto" />
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <CoverImage src={images.hero} alt="Escalade en salle" height="lg" className="rounded-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
            <SuprLogo className="max-h-14 mb-3 drop-shadow-lg" boxClassName="h-14 mx-auto" />
            <p className="text-gray-300 text-center text-sm max-w-xs">
              Ton compagnon pour apprendre à grimper en salle
            </p>
            <p className="text-[10px] text-supr-orange mt-2 uppercase tracking-widest font-semibold">
              Official World Climbing products supplier
            </p>
          </div>
        </div>

        <div className="px-4 py-8 space-y-8">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
              <CircleDot className="w-5 h-5 text-supr-orange mx-auto mb-1" />
              <div className="text-xl font-bold text-supr-orange">{suprStats.holds}</div>
              <div className="text-[10px] text-gray-500 uppercase">Holds</div>
            </div>
            <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
              <Box className="w-5 h-5 text-white mx-auto mb-1" />
              <div className="text-xl font-bold text-white">{suprStats.macros}</div>
              <div className="text-[10px] text-gray-500 uppercase">Macros</div>
            </div>
            <div className="bg-supr-surface border border-supr-border rounded-xl p-3 text-center">
              <LayoutGrid className="w-5 h-5 text-white mx-auto mb-1" />
              <div className="text-xl font-bold text-white">{suprStats.volumes}</div>
              <div className="text-[10px] text-gray-500 uppercase">Volumes</div>
            </div>
          </div>

          <Link
            href="/about-supr"
            className="block bg-supr-surface border border-supr-border rounded-2xl overflow-hidden hover:border-supr-orange/50 transition-all group"
          >
            <div className="flex">
              <div className="w-28 flex-shrink-0 relative min-h-[72px] bg-gradient-to-br from-supr-orange/40 to-black flex items-center justify-center">
                <Users className="w-10 h-10 text-supr-orange/60" />
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-supr-orange" />
                  <p className="font-bold text-white group-hover:text-supr-orange transition-colors text-sm">
                    Groupe & consulting
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <p className="text-gray-400 text-xs">World Climbing supplier</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 self-center mr-3 group-hover:text-supr-orange" />
            </div>
          </Link>

          <a
            href={SUPR_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-supr-orange transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            supr-holds-production.up.railway.app
          </a>

          <section>
            <CoverImage src={images.learn} alt="Apprendre à grimper" height="sm" className="mb-4" />
            <div className="flex items-center gap-2 mb-2">
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
                    className="bg-supr-surface border border-supr-border rounded-xl overflow-hidden hover:border-supr-orange/50 transition-all text-left"
                  >
                    <div className="h-16 relative">
                      <GymCover
                        name={gym.name}
                        color={gym.primary_color || '#FF6B35'}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-1">
                        <GymLogo
                          slug={gym.slug}
                          name={gym.name}
                          logoUrl={gym.logo_url}
                          primaryColor={gym.primary_color}
                          size="sm"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center py-2 px-1 leading-tight line-clamp-2">
                      {gym.name}
                    </p>
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
                    className="w-full bg-supr-surface border border-supr-border rounded-2xl overflow-hidden hover:border-supr-orange/50 transition-all group text-left"
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: gym.primary_color || '#FF6B35',
                    }}
                  >
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 relative min-h-[88px]">
                        <GymCover
                          name={gym.name}
                          color={gym.primary_color || '#FF6B35'}
                        />
                      </div>
                      <div className="flex items-center gap-3 flex-1 p-4 min-w-0">
                        <GymLogo
                          slug={gym.slug}
                          name={gym.name}
                          logoUrl={gym.logo_url}
                          primaryColor={gym.primary_color}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white truncate">{gym.name}</h3>
                          {gym.welcome_message && (
                            <p className="text-xs text-gray-400 truncate">{gym.welcome_message}</p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-supr-orange flex-shrink-0" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <footer className="text-center text-gray-500 text-xs pb-4">
            <p>© 2026 SUP&apos;R Climbing. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
