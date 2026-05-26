'use client'

import ImageFallback from './ImageFallback'
import SafeImage from './SafeImage'

interface GymCoverProps {
  name: string
  color?: string
  coverUrl?: string
  className?: string
}

/** Fond de carte salle — photo ou couleur unie */
export default function GymCover({
  name,
  color = '#14b8a6',
  coverUrl,
  className = 'absolute inset-0',
}: GymCoverProps) {
  if (coverUrl) {
    return (
      <>
        <SafeImage
          src={coverUrl}
          alt={name}
          className={`${className} w-full h-full object-cover`}
          fallbackClassName={`${className} flex items-center justify-center overflow-hidden bg-supr-mint-light`}
          accentColor={color}
          iconClassName="w-10 h-10 text-black/15"
        />
        <span className="sr-only">{name}</span>
      </>
    )
  }

  return (
    <>
      <ImageFallback
        className={`${className} flex items-center justify-center overflow-hidden bg-supr-mint-light`}
        color={color}
        iconClassName="w-10 h-10 text-black/15"
      />
      <span className="sr-only">{name}</span>
    </>
  )
}
