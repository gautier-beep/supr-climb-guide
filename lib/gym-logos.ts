/**
 * Logos officiels trouvés sur les sites des salles (mai 2026).
 * Fichiers locaux dans /public/gyms/ + URLs distantes de secours.
 */
export const gymLogos: Record<
  string,
  { local: string; remote: string; source: string }
> = {
  'bloc-en-stock': {
    local: '/gyms/bloc-en-stock.png',
    remote:
      'https://bloc-en-stock.fr/wp-content/uploads/2022/04/Groupe-2.png',
    source: 'https://bloc-en-stock.fr/',
  },
  'bloc-shop': {
    local: '/gyms/bloc-shop.png',
    remote:
      'https://blocshop.com/wp-content/uploads/2024/08/cropped-colored_back_2025.png',
    source: 'https://blocshop.com/',
  },
  // "Boulder Space" en base ≈ pas de salle trouvée avec ce nom exact.
  // Logo Space Bloc (Annecy) utilisé en attendant — à remplacer si besoin.
  'boulder-space': {
    local: '/gyms/boulder-space.svg',
    remote: 'https://www.spacebloc.fr/assets/images/logoSpaceBloc.svg',
    source: 'https://www.spacebloc.fr/ (Space Bloc — Annecy)',
  },
}

export function getGymLogoUrl(slug: string, dbLogoUrl?: string | null): string {
  const official = gymLogos[slug]
  if (official) return official.local
  if (dbLogoUrl && !dbLogoUrl.includes('placeholder.com')) return dbLogoUrl
  return ''
}
