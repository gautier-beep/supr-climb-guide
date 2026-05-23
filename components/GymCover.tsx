'use client'

import ImageFallback from './ImageFallback'

interface GymCoverProps {
  name: string
  color?: string
  className?: string
}

/** Fond de carte salle — dégradé couleur salle, sans URL externe */
export default function GymCover({
  name,
  color = '#FF6B35',
  className = 'absolute inset-0',
}: GymCoverProps) {
  return (
    <>
      <ImageFallback
        className={`${className} flex items-center justify-center overflow-hidden`}
        color={color}
        iconClassName="w-10 h-10 text-white/25"
      />
      <span className="sr-only">{name}</span>
    </>
  )
}
