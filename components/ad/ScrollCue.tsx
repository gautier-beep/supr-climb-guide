'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function ScrollCueVertical({
  label,
  onActivate,
}: {
  label: string
  onActivate?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      className="flex flex-col items-center gap-2 group"
      aria-label={label}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/90">{label}</span>
      <motion.span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/10 backdrop-blur-sm"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5 text-white" />
      </motion.span>
    </button>
  )
}

export function ScrollCueHorizontal() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 bottom-3 z-10 flex w-16 items-center justify-end pr-1">
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream via-cream/80 to-transparent" />
      <motion.span
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-mineral/30 bg-white shadow-lift"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronRight className="h-4 w-4 text-mineral" />
      </motion.span>
    </div>
  )
}
