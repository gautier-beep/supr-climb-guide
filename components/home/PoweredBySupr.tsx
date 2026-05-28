'use client'

import Link from 'next/link'
import SuprLogo from '@/components/SuprLogo'

export default function PoweredBySupr() {
  return (
    <footer className="px-5 pb-12 pt-4">
      <div className="border-t border-border pt-8">
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-5">
          Partenaire technique des salles
        </p>
        <Link href="/about-supr" className="mx-auto flex max-w-[200px] flex-col items-center gap-2.5 group">
          <span className="text-[11px] text-ink-muted group-hover:text-ink transition-colors">
            Propulse par
          </span>
          <SuprLogo
            variant="dark"
            className="max-h-7 opacity-80 group-hover:opacity-100 transition-opacity"
            boxClassName="h-7"
          />
        </Link>
      </div>
    </footer>
  )
}
