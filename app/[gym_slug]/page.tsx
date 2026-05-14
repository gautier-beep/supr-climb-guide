'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { GraduationCap, MapPin, Mountain, Share2 } from 'lucide-react'

export default function GymHomePage() {
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
        
        // Update CSS variable for primary color
        if (data?.primary_color) {
          document.documentElement.style.setProperty('--primary-color', data.primary_color)
        }
        
        // Track page view
        await supabase.from('analytics_events').insert({
          gym_id: data.id,
          event_type: 'page_view',
          session_id: Math.random().toString(36).substring(7)
        })
      } catch (error) {
        console.error('Error loading gym:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGym()
  }, [gymSlug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Salle non trouvée</h1>
          <p className="text-gray-600">Cette salle n'existe pas ou n'est pas encore configurée.</p>
        </div>
      </div>
    )
  }

  const navItems = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'APPRENDRE À GRIMPER',
      subtitle: 'Tutos vidéo pour débuter',
      href: `/${gymSlug}/learn`,
      color: gym.primary_color
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: gym.name.toUpperCase(),
      subtitle: 'Infos, horaires & boutique',
      href: `/${gymSlug}/gym`,
      color: gym.secondary_color
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: 'DÉCOUVRIR L\'ESCALADE',
      subtitle: 'Histoire, outdoor, communauté',
      href: `/${gymSlug}/discover`,
      color: '#10B981'
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'PARTAGER MA SESSION',
      subtitle: 'Stories Instagram',
      href: `/${gymSlug}/share`,
      color: '#8B5CF6'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          {gym.logo_url && (
            <img 
              src={gym.logo_url} 
              alt={gym.name}
              className="h-20 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue chez {gym.name} !
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {gym.welcome_message}
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span>Propulsé par</span>
            <span className="font-semibold text-supr-orange">SUPR</span>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.href)}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group"
            style={{ borderLeft: `4px solid ${item.color}` }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.subtitle}
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>© 2026 SUPR Climbing. Tous droits réservés.</p>
      </div>
    </div>
  )
}
