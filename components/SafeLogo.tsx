'use client'

import { useState } from 'react'

interface SafeLogoProps {
  src: string
  alt: string
  name: string
  color?: string
  className?: string
  boxClassName?: string
}

function LetterMark({
  name,
  color,
  boxClassName,
}: {
  name: string
  color: string
  boxClassName: string
}) {
  return (
    <div
      className={`${boxClassName} flex-shrink-0 rounded-lg flex items-center justify-center text-xl font-black text-white border border-white/10`}
      style={{ backgroundColor: color }}
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
  color = '#FF6B35',
  className = 'max-h-12 max-w-full object-contain',
  boxClassName = 'h-16 w-20',
}: SafeLogoProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(() =>
    src ? 'loading' : 'error'
  )

  if (!src || status === 'error') {
    return <LetterMark name={name} color={color} boxClassName={boxClassName} />
  }

  return (
    <div
      className={`${boxClassName} flex-shrink-0 relative flex items-center justify-center bg-black/60 rounded-lg p-2 border border-white/10 overflow-hidden`}
    >
      {status === 'loading' && (
        <LetterMark name={name} color={color} boxClassName="absolute inset-0 rounded-lg border-0" />
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
