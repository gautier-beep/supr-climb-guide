'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Home, GraduationCap, MapPin, Share2, ShoppingBag } from 'lucide-react'

export default function BottomNav() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const gymSlug = params.gym_slug as string

  if (!gymSlug) return null

  if (pathname?.includes('/admin') || pathname?.includes('/qr-code')) {
    return null
  }

  const isGymHome = pathname === `/${gymSlug}`

  const navItems = [
    {
      icon: Home,
      label: 'Accueil',
      href: `/${gymSlug}`,
      active: isGymHome,
    },
    {
      icon: GraduationCap,
      label: 'Apprendre',
      href: `/${gymSlug}/learn`,
      active: pathname?.includes('/learn'),
    },
    {
      icon: ShoppingBag,
      label: 'Boutique',
      href: `/${gymSlug}?tab=boutique`,
      active: isGymHome && typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('tab') === 'boutique'
        : false,
    },
    {
      icon: MapPin,
      label: 'Infos',
      href: `/${gymSlug}/gym`,
      active: pathname?.includes('/gym'),
    },
    {
      icon: Share2,
      label: 'Partager',
      href: `/${gymSlug}/share`,
      active: pathname?.includes('/share'),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-supr-border safe-area-bottom z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                item.active
                  ? 'text-supr-orange'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
