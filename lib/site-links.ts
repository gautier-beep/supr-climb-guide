export const globalPocLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about-supr', label: 'A propos SUPR' },
] as const

/** Liens outils V1 / proof of concept — par salle */
export function getGymPocLinks(slug: string) {
  return [
    { href: `/${slug}`, label: 'Landing QR' },
    { href: `/${slug}/confirm`, label: 'Confirm' },
    { href: `/${slug}/profile`, label: 'Profil' },
    { href: `/${slug}/tutorial`, label: 'Tutoriel' },
    { href: `/${slug}/circuit/1`, label: 'Circuit 1' },
    { href: `/${slug}/beginner-wall`, label: 'Beginner wall' },
    { href: `/${slug}/learn`, label: 'Learn' },
    { href: `/${slug}/hub`, label: 'Hub salle' },
    { href: `/${slug}/gym`, label: 'Fiche salle' },
    { href: `/${slug}/discover`, label: 'Discover' },
    { href: `/${slug}/leaderboard`, label: 'Leaderboard' },
    { href: `/${slug}/share`, label: 'Share' },
    { href: `/${slug}/photobooth`, label: 'Photobooth' },
    { href: `/${slug}/celebration`, label: 'Celebration' },
    { href: `/${slug}/reminder`, label: 'Reminder' },
    { href: `/${slug}/qr-code`, label: 'QR Code' },
    { href: `/${slug}/admin`, label: 'Admin' },
  ] as const
}
