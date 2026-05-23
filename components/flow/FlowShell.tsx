'use client'

import type { Gym } from '@/lib/supabase'
import GymLogo from '@/components/GymLogo'

interface FlowShellProps {
  gym: Gym
  gymSlug: string
  children: React.ReactNode
  className?: string
}

export default function FlowShell({
  gym,
  gymSlug,
  children,
  className = '',
}: FlowShellProps) {
  const bg = gym.secondary_color || '#1a1a2e'

  return (
    <div
      className={`min-h-screen max-w-md mx-auto ${className}`}
      style={{
        background: `linear-gradient(165deg, ${bg} 0%, #000000 55%)`,
      }}
    >
      <div className="px-4 py-6">{children}</div>
    </div>
  )
}

export function FlowHeader({
  gym,
  gymSlug,
  title,
  subtitle,
}: {
  gym: Gym
  gymSlug: string
  title?: string
  subtitle?: string
}) {
  return (
    <div className="text-center mb-6">
      <GymLogo
        slug={gymSlug}
        name={gym.name}
        logoUrl={gym.logo_url}
        primaryColor={gym.primary_color}
        size="md"
      />
      {title && <h1 className="text-2xl font-bold text-white mt-4">{title}</h1>}
      {subtitle && <p className="text-gray-300 text-sm mt-2">{subtitle}</p>}
    </div>
  )
}

export function FlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white text-gray-900 shadow-lg rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
  color,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  color?: string
  className?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-white rounded-xl px-6 py-4 font-bold text-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 ${className}`}
      style={{ backgroundColor: color || 'var(--primary-color, #FF6B35)' }}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-transparent border-2 border-white/30 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-white/10 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange" />
    </div>
  )
}
