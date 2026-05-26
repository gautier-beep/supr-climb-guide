'use client'

import SafeImage from './SafeImage'

interface CoverImageProps {
  src: string
  alt: string
  className?: string
  height?: 'sm' | 'md' | 'lg'
  /** Dégradé sombre sur la photo — désactivé par défaut (thème crème) */
  overlay?: boolean
}

const heights = {
  sm: 'h-28',
  md: 'h-40',
  lg: 'h-52',
}

export default function CoverImage({
  src,
  alt,
  className = '',
  height = 'md',
  overlay = false,
}: CoverImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${heights[height]} ${className}`}>
      <SafeImage
        src={src}
        alt={alt}
        fallbackClassName="absolute inset-0 flex items-center justify-center bg-stone-100"
      />
    </div>
  )
}
