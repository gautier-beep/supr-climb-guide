'use client'

import SafeImage from './SafeImage'

interface CoverImageProps {
  src: string
  alt: string
  className?: string
  height?: 'sm' | 'md' | 'lg'
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
  overlay = true,
}: CoverImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${heights[height]} ${className}`}>
      <SafeImage
        src={src}
        alt={alt}
        fallbackClassName="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 via-black to-black"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 pointer-events-none" />
      )}
    </div>
  )
}
