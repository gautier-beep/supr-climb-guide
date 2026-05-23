'use client'

import SafeLogo from './SafeLogo'

interface SuprLogoProps {
  className?: string
  boxClassName?: string
}

export default function SuprLogo({
  className = 'max-h-14 max-w-full object-contain',
  boxClassName = 'h-14 w-auto min-w-[3rem]',
}: SuprLogoProps) {
  return (
    <SafeLogo
      src="/supr-logo.png"
      alt="SUPR Climbing"
      name="SUPR"
      color="#FF6B35"
      className={className}
      boxClassName={boxClassName}
    />
  )
}
