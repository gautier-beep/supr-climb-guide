'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function getBackFallback(pathname: string): string {
  if (pathname === '/') return '/'
  const gymMatch = pathname.match(/^\/([^/]+)/)
  if (!gymMatch) return '/'

  const slug = gymMatch[1]
  const rest = pathname.slice(slug.length + 1)

  if (!rest || rest === '/') return '/'
  if (rest === '/confirm') return `/${slug}`
  if (rest === '/profile') return `/${slug}/confirm`
  if (rest === '/tutorial') return `/${slug}/profile`
  if (rest.startsWith('/circuit/')) return `/${slug}/tutorial`
  if (rest === '/celebration') return `/${slug}`
  if (rest === '/photobooth') return `/${slug}/celebration`
  if (rest === '/leaderboard') return `/${slug}/photobooth`
  if (rest === '/reminder') return `/${slug}/leaderboard`

  return `/${slug}/hub`
}

export default function PageNavArrows() {
  const router = useRouter()
  const pathname = usePathname() || '/'

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    router.push(getBackFallback(pathname))
  }

  const handleForward = () => {
    if (typeof window !== 'undefined') {
      window.history.forward()
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-supr-cream/95 backdrop-blur-md border-b border-supr-border"
      aria-label="Navigation historique"
    >
      <div className="max-w-md mx-auto flex items-center justify-between px-2 h-12">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-black hover:bg-stone-100 transition-colors"
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
        </button>

        <span className="text-[10px] text-black uppercase tracking-wider truncate px-2 max-w-[50%]">
          {pathname === '/' ? 'SUPR' : pathname.replace(/^\//, '').split('/').pop()}
        </span>

        <button
          type="button"
          onClick={handleForward}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-black hover:bg-stone-100 transition-colors"
          aria-label="Page suivante"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  )
}
