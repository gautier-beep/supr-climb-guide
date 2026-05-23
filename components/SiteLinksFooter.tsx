'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wrench } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getGymPocLinks, globalPocLinks } from '@/lib/site-links'

function LinkItem({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        active
          ? 'text-supr-orange font-medium'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )
}

export default function SiteLinksFooter() {
  const pathname = usePathname()
  const [gyms, setGyms] = useState<{ slug: string; name: string }[]>([])

  useEffect(() => {
    async function loadGyms() {
      const { data } = await supabase.from('gyms').select('slug, name').order('name')
      setGyms(data || [])
    }
    loadGyms()
  }, [])

  if (gyms.length === 0) return null

  return (
    <footer className="border-t border-supr-border bg-black mt-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-supr-orange" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wide">
            Outils V1 — proof of concept
          </h2>
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">Général</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {globalPocLinks.map((link) => (
                <li key={link.href}>
                  <LinkItem
                    href={link.href}
                    label={link.label}
                    active={pathname === link.href}
                  />
                </li>
              ))}
            </ul>
          </section>

          {gyms.map((gym) => (
            <section key={gym.slug}>
              <h3 className="text-xs font-semibold text-gray-500 mb-2">{gym.name}</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {getGymPocLinks(gym.slug).map((link) => (
                  <li key={link.href}>
                    <LinkItem
                      href={link.href}
                      label={link.label}
                      active={pathname === link.href}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-5">
          © 2026 SUP&apos;R Climbing — PoC
        </p>
      </div>
    </footer>
  )
}
