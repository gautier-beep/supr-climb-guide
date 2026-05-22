'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { supabase, Gym, ShopItem } from '@/lib/supabase'
import { GraduationCap, MapPin, Mountain, Share2, ShoppingBag } from 'lucide-react'
import ShopSection from '@/components/ShopSection'

type Tab = 'accueil' | 'boutique'

function GymHomeContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const gymSlug = params.gym_slug as string

  const tabParam = searchParams.get('tab')
  const activeTab: Tab = tabParam === 'boutique' ? 'boutique' : 'accueil'

  const [gym, setGym] = useState<Gym | null>(null)
  const [shopItems, setShopItems] = useState<ShopItem[]>([])
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

        if (data?.primary_color) {
          document.documentElement.style.setProperty('--primary-color', data.primary_color)
        }

        const { data: itemsData } = await supabase
          .from('gym_shop_items')
          .select('*')
          .eq('gym_id', data.id)
          .eq('available', true)

        setShopItems(itemsData || [])

        void supabase.from('analytics_events').insert({
          gym_id: data.id,
          event_type: 'page_view',
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

  const setTab = (tab: Tab) => {
    if (tab === 'boutique') {
      router.push(`/${gymSlug}?tab=boutique`)
    } else {
      router.push(`/${gymSlug}`)
    }
  }

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

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-2">Salle non trouvée</h1>
          <p className="text-gray-400">Cette salle n&apos;existe pas ou n&apos;est pas encore configurée.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 text-supr-orange font-semibold hover:underline"
          >
            Retour à SUPR
          </button>
        </div>
      </div>
    )
  }

  const navItems = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'APPRENDRE À GRIMPER',
      subtitle: 'Les bases, puis la suite avec l\'app',
      href: `/${gymSlug}/learn`,
      color: gym.primary_color,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: gym.name.toUpperCase(),
      subtitle: 'Infos & horaires',
      href: `/${gymSlug}/gym`,
      color: gym.secondary_color,
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "DÉCOUVRIR L'ESCALADE",
      subtitle: 'Histoire, outdoor, communauté',
      href: `/${gymSlug}/discover`,
      color: '#10B981',
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'PARTAGER MA SESSION',
      subtitle: 'Stories Instagram',
      href: `/${gymSlug}/share`,
      color: '#8B5CF6',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-supr-border">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          {gym.logo_url && (
            <img
              src={gym.logo_url}
              alt={gym.name}
              className="h-20 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue chez {gym.name} !
          </h1>
          <p className="text-lg text-gray-400 mb-4">{gym.welcome_message}</p>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-500 hover:text-supr-orange transition-colors"
          >
            ← Toutes les salles SUPR
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex border-b border-supr-border mt-2">
          <button
            onClick={() => setTab('accueil')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'accueil'
                ? 'text-supr-orange border-supr-orange'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => setTab('boutique')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'boutique'
                ? 'text-supr-orange border-supr-orange'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Boutique
          </button>
        </div>

        {activeTab === 'accueil' ? (
          <div className="py-6 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.href)}
                className="w-full bg-supr-surface border border-supr-border rounded-2xl hover:border-supr-orange/40 transition-all p-6 text-left group"
                style={{ borderLeftWidth: '4px', borderLeftColor: item.color }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                  <div className="text-gray-600 group-hover:text-supr-orange group-hover:translate-x-1 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-supr-orange" />
              <h2 className="text-2xl font-bold text-white">Boutique {gym.name}</h2>
            </div>
            <ShopSection gym={gym} shopItems={shopItems} />
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <a
          href="https://instagram.com/supr.climbing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Suivez SUPR Climbing
        </a>
        <p className="text-xs text-gray-600 mt-6">
          Propulsé par <span className="font-bold text-supr-orange">SUPR</span>
        </p>
      </div>
    </div>
  )
}

export default function GymHomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange" />
        </div>
      }
    >
      <GymHomeContent />
    </Suspense>
  )
}
