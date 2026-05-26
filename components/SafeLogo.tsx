'use client'

import { useState } from 'react'

interface SafeLogoProps {
  src: string
  alt: string
  name: string
  color?: string
  className?: string
  boxClassName?: string
  /** Fond clair (crème/blanc) — texte et bordures noirs */
  variant?: 'light' | 'dark'
}

function LetterMark({
  name,
  color,
  boxClassName,
  variant,
}: {
  name: string
  color: string
  boxClassName: string
  variant: 'light' | 'dark'
}) {
  const isLight = variant === 'light'
  return (
    <div
      className={`${boxClassName} flex-shrink-0 rounded-lg flex items-center justify-center text-xl font-black border ${
        isLight
          ? 'text-black border-stone-200 bg-stone-50'
          : 'text-white border-white/10'
      }`}
      style={!isLight ? { backgroundColor: color } : undefined}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default function SafeLogo({
  src,
  alt,
  name,
  color = '#14b8a6',
  className = 'max-h-12 max-w-full object-contain',
  boxClassName = 'h-16 w-20',
  variant = 'light',
}: SafeLogoProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(() =>
    src ? 'loading' : 'error'
  )

  const isLight = variant === 'light'

  if (!src || status === 'error') {
    return (
      <LetterMark name={name} color={color} boxClassName={boxClassName} variant={variant} />
    )
  }

  return (
    <div
      className={`${boxClassName} flex-shrink-0 relative flex items-center justify-center rounded-lg p-2 overflow-hidden ${
        isLight
          ? 'bg-white border border-stone-200'
          : 'bg-black/60 border border-white/10'
      }`}
    >
      {status === 'loading' && (
        <LetterMark
          name={name}
          color={color}
          boxClassName="absolute inset-0 rounded-lg border-0"
          variant={variant}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} relative z-10 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}
