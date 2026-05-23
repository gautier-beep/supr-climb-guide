'use client'

import { Mountain } from 'lucide-react'

interface ImageFallbackProps {
  className?: string
  iconClassName?: string
  color?: string
}

/** Placeholder visuel — jamais d’icône « image cassée » du navigateur */
export default function ImageFallback({
  className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-supr-orange/30 to-black',
  iconClassName = 'w-10 h-10 text-white/25',
  color,
}: ImageFallbackProps) {
  const style = color
    ? { background: `linear-gradient(145deg, ${color}44 0%, #0a0a0a 100%)` }
    : undefined

  return (
    <div className={className} style={style} aria-hidden>
      <Mountain className={iconClassName} strokeWidth={1.5} />
    </div>
  )
}
