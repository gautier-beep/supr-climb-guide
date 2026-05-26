'use client'

import { getGymLogoUrl } from '@/lib/gym-logos'
import SafeLogo from './SafeLogo'

interface GymLogoProps {
  slug: string
  name: string
  logoUrl?: string | null
  primaryColor?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

const sizes = {
  sm: { box: 'h-10 w-10', img: 'max-h-8' },
  md: { box: 'h-16 w-20', img: 'max-h-12' },
  lg: { box: 'h-20 w-24', img: 'max-h-16' },
}

export default function GymLogo({
  slug,
  name,
  logoUrl,
  primaryColor = '#14b8a6',
  size = 'md',
  variant = 'light',
}: GymLogoProps) {
  const s = sizes[size]
  const logoSrc = getGymLogoUrl(slug, logoUrl)

  return (
    <SafeLogo
      src={logoSrc}
      alt={name}
      name={name}
      color={primaryColor}
      className={`${s.img} max-w-full object-contain`}
      boxClassName={s.box}
      variant={variant}
    />
  )
}
