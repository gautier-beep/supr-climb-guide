'use client'

import { useState } from 'react'
import ImageFallback from './ImageFallback'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  iconClassName?: string
  accentColor?: string
}

export default function SafeImage({
  src,
  alt,
  className = 'absolute inset-0 w-full h-full object-cover',
  fallbackClassName = 'absolute inset-0 flex items-center justify-center bg-stone-100',
  iconClassName = 'w-10 h-10 text-black/20',
  accentColor,
}: SafeImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(() =>
    src ? 'loading' : 'error'
  )

  if (!src || status === 'error') {
    return (
      <ImageFallback
        className={fallbackClassName}
        iconClassName={iconClassName}
        color={accentColor}
      />
    )
  }

  return (
    <>
      {status === 'loading' && (
        <ImageFallback
          className={fallbackClassName}
          iconClassName={iconClassName}
          color={accentColor}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </>
  )
}
