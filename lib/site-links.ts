export const globalPocLinks = [
  { href: '/', label: 'Accueil SUPR' },
] as const

/** Liens outils V1 / proof of concept — par salle */
export function getGymPocLinks(slug: string) {
  return [
    { href: `/${slug}`, label: 'Landing QR' },
    { href: `/${slug}/admin`, label: 'Admin' },
    { href: `/${slug}/qr-code`, label: 'QR Code' },
    { href: `/${slug}/hub`, label: 'Hub salle' },
  ] as const
}
