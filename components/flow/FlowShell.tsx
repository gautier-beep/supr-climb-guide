'use client'

import type { Gym } from '@/lib/supabase'
import GymLogo from '@/components/GymLogo'

const DEFAULT_MINT = '#14b8a6'

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
  const accent = gym.primary_color || DEFAULT_MINT

  return (
    <div
      className={`min-h-screen max-w-md mx-auto bg-supr-cream text-black ${className}`}
      style={
        {
          '--flow-accent': accent,
        } as React.CSSProperties
      }
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
        primaryColor={gym.primary_color || DEFAULT_MINT}
        size="md"
      />
      {title && <h1 className="text-2xl font-bold text-black mt-4">{title}</h1>}
      {subtitle && <p className="text-black text-sm mt-2">{subtitle}</p>}
    </div>
  )
}

export function FlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white text-black shadow-sm border border-supr-border rounded-2xl p-6 ${className}`}>
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
      className={`w-full text-white rounded-xl px-6 py-4 font-bold text-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 shadow-sm ${className}`}
      style={{ backgroundColor: color || 'var(--primary-color, #14b8a6)' }}
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
      className={`w-full bg-white border-2 border-black/15 text-black rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-stone-50 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-supr-cream text-black">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-mint" />
    </div>
  )
}
