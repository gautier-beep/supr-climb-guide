/** Photos & visuels — Unsplash (escalade / salles) */
export const images = {
  hero: 'https://images.unsplash.com/photo-1522163186832-c4fabaed25c0?w=1200&q=80',
  learn: 'https://images.unsplash.com/photo-1564760055775-d263b8f73347?w=800&q=80',
  holds: 'https://images.unsplash.com/photo-1599059813006-112e04fa2b94?w=800&q=80',
  worldCup: 'https://images.unsplash.com/photo-1515526832075-ef1b06c3313a?w=800&q=80',
  community: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
  boutique: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
}

export const gymVisuals: Record<
  string,
  { cover: string; emoji: string; label: string }
> = {
  'bloc-en-stock': {
    cover: 'https://images.unsplash.com/photo-1564760055775-d263b8f73347?w=600&q=80',
    emoji: '🟠',
    label: 'Bloc',
  },
  'bloc-shop': {
    cover: 'https://images.unsplash.com/photo-1599059813006-112e04fa2b94?w=600&q=80',
    emoji: '🟢',
    label: 'Shop',
  },
  'boulder-space': {
    cover: 'https://images.unsplash.com/photo-1522163186832-c4fabaed25c0?w=600&q=80',
    emoji: '🔵',
    label: 'Boulder',
  },
}

export const tutorialThumbnails = {
  basics: [
    'https://images.unsplash.com/photo-1564760055775-d263b8f73347?w=400&q=80',
    'https://images.unsplash.com/photo-1599059813006-112e04fa2b94?w=400&q=80',
    'https://images.unsplash.com/photo-1522163186832-c4fabaed25c0?w=400&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80',
    'https://images.unsplash.com/photo-1515526832075-ef1b06c3313a?w=400&q=80',
  ],
  techniques: [
    'https://images.unsplash.com/photo-1599059813006-112e04fa2b94?w=400&q=80',
    'https://images.unsplash.com/photo-1564760055775-d263b8f73347?w=400&q=80',
    'https://images.unsplash.com/photo-1522163186832-c4fabaed25c0?w=400&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80',
    'https://images.unsplash.com/photo-1515526832075-ef1b06c3313a?w=400&q=80',
  ],
}

export function getGymVisual(slug: string) {
  return (
    gymVisuals[slug] ?? {
      cover: images.hero,
      emoji: '🧗',
      label: slug.slice(0, 2).toUpperCase(),
    }
  )
}
