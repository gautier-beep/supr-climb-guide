'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym, ShopItem } from '@/lib/supabase'
import { ArrowLeft, MapPin, Clock, Instagram, ShoppingBag } from 'lucide-react'

export default function GymPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  
  const [gym, setGym] = useState<Gym | null>(null)
  const [shopItems, setShopItems] = useState<ShopItem[]>([])
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

        const { data: itemsData } = await supabase
          .from('gym_shop_items')
          .select('*')
          .eq('gym_id', gymData.id)
          .eq('available', true)

        setShopItems(itemsData || [])
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/${gymSlug}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{gym.name}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Logo */}
        {gym.logo_url && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <img 
              src={gym.logo_url} 
              alt={gym.name}
              className="h-32 mx-auto object-contain"
            />
          </div>
        )}

        {/* Informations pratiques */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-supr-orange flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                <p className="text-gray-600">{gym.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-supr-orange flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Horaires</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">10h - 23h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi - Dimanche</span>
                    <span className="font-medium">9h - 22h</span>
                  </div>
                </div>
              </div>
            </div>

            {gym.instagram_handle && (
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-supr-orange flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Suivez-nous</h3>
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

        {/* Boutique */}
        {shopItems.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-supr-orange" />
              <h2 className="text-2xl font-bold text-gray-900">Boutique</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Commande via l'app, récupère au comptoir en 5 minutes !
            </p>

            <div className="grid grid-cols-2 gap-4">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden">
                  {item.image_url && (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      {item.promo_price ? (
                        <div>
                          <span className="text-sm text-gray-400 line-through">{item.price}€</span>
                          <span className="ml-2 text-lg font-bold text-supr-orange">{item.promo_price}€</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">{item.price}€</span>
                      )}
                    </div>
                    <button 
                      className="w-full mt-3 bg-supr-orange text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      onClick={() => {
                        // Track shop click
                        supabase.from('analytics_events').insert({
                          gym_id: gym.id,
                          event_type: 'shop_click',
                          session_id: Math.random().toString(36).substring(7)
                        })
                        alert('Paiement bientôt disponible ! 🚀')
                      }}
                    >
                      Commander
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Système de cotation */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Système de cotation</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
              <span className="text-gray-900"><strong>Vert</strong> - Débutant (V0-V1)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
              <span className="text-gray-900"><strong>Bleu</strong> - Facile (V2-V3)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500"></div>
              <span className="text-gray-900"><strong>Rouge</strong> - Moyen (V4-V5)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black"></div>
              <span className="text-gray-900"><strong>Noir</strong> - Difficile (V6+)</span>
            </div>
          </div>
        </section>

        {/* Règles */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Règles de courtoisie</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Un grimpeur par zone à la fois</li>
            <li>• Respecte les autres grimpeurs</li>
            <li>• Pas de chaussures sur les tapis</li>
            <li>• Magnésie dans un sac, pas en vrac</li>
            <li>• Nettoie tes prises avec une brosse</li>
          </ul>
        </section>

        {/* SUPR Branding */}
        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Cette app est propulsée par SUPR</h3>
          <p className="text-orange-100 mb-4">
            Découvre nos prises et solutions pour salles d'escalade
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://suprclimbing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Voir le site SUPR
            </a>
            <a
              href="https://instagram.com/supr.climbing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @supr.climbing
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
