'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Home, GraduationCap, MapPin, Share2 } from 'lucide-react'

export default function BottomNav() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const gymSlug = params.gym_slug as string

  const navItems = [
    {
      icon: Home,
      label: 'Accueil',
      href: `/${gymSlug}`,
      active: pathname === `/${gymSlug}`
    },
    {
      icon: GraduationCap,
      label: 'Apprendre',
      href: `/${gymSlug}/learn`,
      active: pathname?.includes('/learn')
    },
    {
      icon: MapPin,
      label: 'Ma salle',
      href: `/${gymSlug}/gym`,
      active: pathname?.includes('/gym')
    },
    {
      icon: Share2,
      label: 'Partager',
      href: `/${gymSlug}/share`,
      active: pathname?.includes('/share')
    }
  ]

  // Don't show on admin pages
  if (pathname?.includes('/admin') || pathname?.includes('/qr-code')) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50 md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                item.active 
                  ? 'text-supr-orange' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
