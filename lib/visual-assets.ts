/** Photos SUP'R — fichiers locaux dans public/images/supr */
const img = (name: string) => `/images/supr/${name}`

export const images = {
  hero: img('hero.png'),
  learn: img('learn.png'),
  holds: img('holds.png'),
  worldCup: img('world-cup.png'),
  community: img('community.png'),
  boutique: img('boutique.png'),
}

export const gymVisuals: Record<
  string,
  { cover: string; emoji: string; label: string }
> = {
  'bloc-en-stock': {
    cover: img('gym-bloc-en-stock.png'),
    emoji: '🟠',
    label: 'Bloc',
  },
  'bloc-shop': {
    cover: img('gym-bloc-shop.png'),
    emoji: '🟢',
    label: 'Shop',
  },
  'boulder-space': {
    cover: img('gym-boulder-space.png'),
    emoji: '🔵',
    label: 'Boulder',
  },
}

export const tutorialThumbnails = {
  basics: [
    img('tuto-01.png'),
    img('tuto-02.png'),
    img('tuto-03.png'),
    img('tuto-04.png'),
    img('tuto-05.png'),
  ],
  techniques: [
    img('tuto-06.png'),
    img('tuto-07.png'),
    img('tuto-08.png'),
    img('tuto-09.png'),
    img('tuto-10.png'),
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
