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
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="mb-6">
          <a 
            href="https://instagram.com/supr.climbing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Suivez SUPR Climbing
          </a>
        </div>
        
        <a 
          href="https://suprclimbing.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-supr-orange transition-colors"
        >
          <p className="text-sm mb-1">Propulsé par <span className="font-bold text-supr-orange">SUPR</span></p>
          <p className="text-xs">© 2026 SUPR Climbing. Tous droits réservés.</p>
        </a>
      </div>
    </div>
  )
}
