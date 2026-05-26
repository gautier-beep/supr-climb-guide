'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { supabase, Gym, ShopItem } from '@/lib/supabase'
import { GraduationCap, MapPin, Mountain, Share2, ShoppingBag } from 'lucide-react'
import ShopSection from '@/components/ShopSection'
import GymLogo from '@/components/GymLogo'
import GymCover from '@/components/GymCover'
import { getGymVisual } from '@/lib/visual-assets'

type Tab = 'accueil' | 'boutique'

function GymHubContent() {
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
        const { data: itemsData } = await supabase
          .from('gym_shop_items')
          .select('*')
          .eq('gym_id', data.id)
          .eq('available', true)
        setShopItems(itemsData || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadGym()
  }, [gymSlug])

  if (loading || !gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-supr-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-mint" />
      </div>
    )
  }

  const navItems = [
    { icon: <GraduationCap className="w-6 h-6" />, title: 'APPRENDRE', subtitle: 'Tutos', href: `/${gymSlug}/learn`, color: gym.primary_color },
    { icon: <MapPin className="w-6 h-6" />, title: gym.name.toUpperCase(), subtitle: 'Infos', href: `/${gymSlug}/gym`, color: gym.secondary_color },
    { icon: <Mountain className="w-6 h-6" />, title: 'DÉCOUVRIR', subtitle: 'Escalade', href: `/${gymSlug}/discover`, color: '#10B981' },
    { icon: <Share2 className="w-6 h-6" />, title: 'PARTAGER', subtitle: 'Stories', href: `/${gymSlug}/share`, color: '#8B5CF6' },
  ]

  return (
    <div className="min-h-screen bg-supr-cream text-black max-w-md mx-auto">
      <div className="relative h-44">
        <GymCover
          name={gym.name}
          color={gym.primary_color || '#14b8a6'}
          coverUrl={getGymVisual(gymSlug).cover}
        />
      </div>
      <div className="flex flex-col items-center px-4 py-5 bg-supr-cream border-b border-supr-border">
        <GymLogo slug={gymSlug} name={gym.name} logoUrl={gym.logo_url} primaryColor={gym.primary_color} size="lg" />
        <h1 className="text-xl font-bold text-black mt-2">{gym.name}</h1>
      </div>
      <div className="px-4 py-6 space-y-3">
        <button
          onClick={() => router.push(`/${gymSlug}`)}
          className="w-full py-3 bg-supr-mint text-white font-bold rounded-xl"
        >
          Parcours initiation V1 🚀
        </button>
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push(item.href)}
            className="w-full bg-white border border-supr-border rounded-2xl p-4 text-left"
            style={{ borderLeftWidth: 4, borderLeftColor: item.color }}
          >
            <div className="flex items-center gap-3">
              <div className="text-black">{item.icon}</div>
              <div>
                <p className="font-bold text-black text-sm">{item.title}</p>
                <p className="text-xs text-black">{item.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
        {activeTab === 'boutique' && <ShopSection gym={gym} shopItems={shopItems} />}
      </div>
    </div>
  )
}

export default function GymHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-supr-cream" />}>
      <GymHubContent />
    </Suspense>
  )
}
