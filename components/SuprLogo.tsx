'use client'

import SafeLogo from './SafeLogo'

interface SuprLogoProps {
  className?: string
  boxClassName?: string
  variant?: 'light' | 'dark'
}

export default function SuprLogo({
  className = 'max-h-14 max-w-full object-contain',
  boxClassName = 'h-14 w-auto min-w-[3rem]',
  variant = 'light',
}: SuprLogoProps) {
  const src = variant === 'light' ? '/supr-logo-wb.png' : '/supr-logo.png'

  return (
    <SafeLogo
      src={src}
      alt="SUPR Climbing"
      name="SUPR"
      color="#000000"
      className={className}
      boxClassName={boxClassName}
      variant={variant}
    />
  )
}
