import type { SupportedLanguage } from './types'
import { isSupportedLanguage } from './types'
import fr from '@/lib/translations/fr.json'
import en from '@/lib/translations/en.json'
import es from '@/lib/translations/es.json'
import de from '@/lib/translations/de.json'
import it from '@/lib/translations/it.json'

export type TranslationDict = typeof fr

const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  fr,
  en,
  es,
  de,
  it,
}

const languageCache = new Map<string, SupportedLanguage>()

export function getCachedLanguage(gymSlug: string): SupportedLanguage | undefined {
  return languageCache.get(gymSlug)
}

export function setCachedLanguage(gymSlug: string, language: SupportedLanguage) {
  languageCache.set(gymSlug, language)
}

export function resolveLanguage(value: string | null | undefined): SupportedLanguage {
  if (value && isSupportedLanguage(value)) return value
  return 'fr'
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function translate(
  language: SupportedLanguage,
  key: string,
  vars?: Record<string, string | number>
): string {
  const dict = TRANSLATIONS[language] ?? TRANSLATIONS.fr
  let raw = getNestedValue(dict, key)
  if (raw === undefined) {
    raw = getNestedValue(TRANSLATIONS.fr, key)
  }
  if (typeof raw !== 'string') return key

  let value = raw
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return value
}

export function getTranslationArray<T>(language: SupportedLanguage, key: string): T[] {
  const dict = TRANSLATIONS[language] ?? TRANSLATIONS.fr
  const value = getNestedValue(dict, key) ?? getNestedValue(TRANSLATIONS.fr, key)
  return Array.isArray(value) ? (value as T[]) : []
}

export function getCircuitTip(
  language: SupportedLanguage,
  circuitNumber: number,
  routeIndex: number
): string {
  const tips =
    getNestedValue(TRANSLATIONS[language], `circuit.tips.${circuitNumber}`) ??
    getNestedValue(TRANSLATIONS.fr, `circuit.tips.${circuitNumber}`)
  if (!Array.isArray(tips)) return ''
  return (tips[routeIndex] as string) ?? ''
}

export function getCircuitMeta(
  language: SupportedLanguage,
  circuitNumber: number
): { label: string; emoji: string; color: string } {
  const colors: Record<number, string> = { 1: '#22c55e', 2: '#eab308', 3: '#ef4444' }
  const meta =
    getNestedValue(TRANSLATIONS[language], `circuit.meta.${circuitNumber}`) ??
    getNestedValue(TRANSLATIONS.fr, `circuit.meta.${circuitNumber}`)
  const fallback = { label: '', emoji: '' }
  const resolved = (meta as { label?: string; emoji?: string }) ?? fallback
  return {
    label: resolved.label ?? '',
    emoji: resolved.emoji ?? '',
    color: colors[circuitNumber] ?? '#22c55e',
  }
}

export const DATE_LOCALES: Record<SupportedLanguage, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
  de: 'de-DE',
  it: 'it-IT',
}
