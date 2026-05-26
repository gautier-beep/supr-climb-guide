'use client'

import { Mountain } from 'lucide-react'

interface ImageFallbackProps {
  className?: string
  iconClassName?: string
  color?: string
}

/** Placeholder visuel — fond uni, sans dégradé */
export default function ImageFallback({
  className = 'absolute inset-0 flex items-center justify-center bg-stone-100',
  iconClassName = 'w-10 h-10 text-black/20',
  color,
}: ImageFallbackProps) {
  const style = color
    ? { backgroundColor: `${color}18` }
    : undefined

  return (
    <div className={className} style={style} aria-hidden>
      <Mountain className={iconClassName} strokeWidth={1.5} />
    </div>
  )
}
