'use client'

import { ShoppingBag } from 'lucide-react'
import { supabase, Gym, ShopItem } from '@/lib/supabase'

interface ShopSectionProps {
  gym: Gym
  shopItems: ShopItem[]
}

export default function ShopSection({ gym, shopItems }: ShopSectionProps) {
  if (shopItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Boutique bientôt disponible</h3>
        <p className="text-gray-400 text-sm">
          Les produits de {gym.name} arrivent prochainement.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-gray-400 mb-6 text-sm">
        Commande via l&apos;app, récupère au comptoir en 5 minutes !
      </p>
      <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item) => (
          <div key={item.id} className="bg-supr-surface border border-supr-border rounded-xl overflow-hidden">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-3">
              <h3 className="font-semibold text-white text-sm mb-1">{item.name}</h3>
              <div className="flex items-center justify-between">
                {item.promo_price ? (
                  <div>
                    <span className="text-sm text-gray-500 line-through">{item.price}€</span>
                    <span className="ml-2 text-lg font-bold text-supr-orange">{item.promo_price}€</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-white">{item.price}€</span>
                )}
              </div>
              <button
                className="w-full mt-3 bg-supr-orange text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                onClick={() => {
                  supabase.from('analytics_events').insert({
                    gym_id: gym.id,
                    event_type: 'shop_click',
                    session_id: Math.random().toString(36).substring(7),
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
    </div>
  )
}
