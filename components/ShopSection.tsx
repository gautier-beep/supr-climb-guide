'use client'

import { Package, ShoppingBag } from 'lucide-react'
import { supabase, Gym, ShopItem } from '@/lib/supabase'
import SafeImage from './SafeImage'

interface ShopSectionProps {
  gym: Gym
  shopItems: ShopItem[]
}

export default function ShopSection({ gym, shopItems }: ShopSectionProps) {
  if (shopItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-12 h-12 text-black mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-black mb-2">Boutique bientôt disponible</h3>
        <p className="text-black text-sm">
          Les produits de {gym.name} arrivent prochainement.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-black mb-6 text-sm">
        Commande via l&apos;app, récupère au comptoir en 5 minutes !
      </p>
      <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item) => (
          <div key={item.id} className="bg-white border border-supr-border rounded-xl overflow-hidden">
            <div className="relative h-32 bg-stone-100">
              {item.image_url ? (
                <SafeImage
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                  fallbackClassName="w-full h-32 flex items-center justify-center bg-stone-100"
                  iconClassName="w-8 h-8 text-black"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-supr-mint-light">
                  <Package className="w-10 h-10 text-supr-mint" />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-black text-sm mb-1">{item.name}</h3>
              <div className="flex items-center justify-between">
                {item.promo_price ? (
                  <div>
                    <span className="text-sm text-black line-through">{item.price}€</span>
                    <span className="ml-2 text-lg font-bold text-supr-mint-dark">{item.promo_price}€</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-black">{item.price}€</span>
                )}
              </div>
              <button
                className="w-full mt-3 bg-supr-mint text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-colors"
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
