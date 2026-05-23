'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { supabase, Gym, ShopItem } from '@/lib/supabase'
import { GraduationCap, MapPin, Mountain, Share2, ShoppingBag } from 'lucide-react'
import ShopSection from '@/components/ShopSection'
import GymLogo from '@/components/GymLogo'
import GymCover from '@/components/GymCover'

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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange" />
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
    <div className="min-h-screen bg-black max-w-md mx-auto">
      <div className="relative h-44">
        <GymCover name={gym.name} color={gym.primary_color || '#FF6B35'} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
          <GymLogo slug={gymSlug} name={gym.name} logoUrl={gym.logo_url} primaryColor={gym.primary_color} size="lg" />
          <h1 className="text-xl font-bold text-white mt-2">{gym.name}</h1>
        </div>
      </div>
      <div className="px-4 py-6 space-y-3">
        <button
          onClick={() => router.push(`/${gymSlug}`)}
          className="w-full py-3 bg-supr-orange text-white font-bold rounded-xl"
        >
          Parcours initiation V1 🚀
        </button>
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => router.push(item.href)}
            className="w-full bg-supr-surface border border-supr-border rounded-2xl p-4 text-left"
            style={{ borderLeftWidth: 4, borderLeftColor: item.color }}
          >
            <div className="flex items-center gap-3">
              <div style={{ color: item.color }}>{item.icon}</div>
              <div>
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-xs text-gray-400">{item.subtitle}</p>
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
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <GymHubContent />
    </Suspense>
  )
}
