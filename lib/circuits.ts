export interface CircuitRoute {
  number: number
  difficulty: number
  tip: string
  image: string | null
}

export const CIRCUITS: Record<number, CircuitRoute[]> = {
  1: [
    { number: 1, difficulty: 1, tip: 'Garde tes hanches près du mur', image: null },
    { number: 2, difficulty: 1, tip: 'Utilise tes pieds !', image: null },
    { number: 3, difficulty: 1, tip: 'Respire calmement', image: null },
    { number: 4, difficulty: 2, tip: 'Cherche le meilleur appui', image: null },
    { number: 5, difficulty: 2, tip: 'Fléchis les genoux', image: null },
    { number: 6, difficulty: 2, tip: 'Regarde où tu vas', image: null },
    { number: 7, difficulty: 2, tip: 'Tends les bras pour reposer', image: null },
    { number: 8, difficulty: 3, tip: 'Transfert de poids', image: null },
    { number: 9, difficulty: 3, tip: 'Engage ton corps entier', image: null },
    { number: 10, difficulty: 3, tip: 'Tu y es presque !', image: null },
  ],
  2: [
    { number: 1, difficulty: 2, tip: 'Technique avant force', image: null },
    { number: 2, difficulty: 2, tip: 'Pivote tes hanches', image: null },
    { number: 3, difficulty: 2, tip: 'Regarde loin devant', image: null },
    { number: 4, difficulty: 3, tip: 'Équilibre dynamique', image: null },
    { number: 5, difficulty: 3, tip: 'Engage tes abdos', image: null },
    { number: 6, difficulty: 3, tip: 'Petits pas progressifs', image: null },
    { number: 7, difficulty: 3, tip: 'Repose-toi avant', image: null },
    { number: 8, difficulty: 4, tip: 'Cherche les appuis cachés', image: null },
    { number: 9, difficulty: 4, tip: 'Coordination pieds-mains', image: null },
    { number: 10, difficulty: 4, tip: 'Dernier effort !', image: null },
  ],
  3: [
    { number: 1, difficulty: 3, tip: 'Observe bien le mur', image: null },
    { number: 2, difficulty: 3, tip: 'Planifie ta séquence', image: null },
    { number: 3, difficulty: 4, tip: 'Précision des placements', image: null },
    { number: 4, difficulty: 4, tip: 'Contrôle ta descente', image: null },
    { number: 5, difficulty: 4, tip: 'Respiration profonde', image: null },
    { number: 6, difficulty: 4, tip: 'Confiance en toi', image: null },
    { number: 7, difficulty: 5, tip: 'Mouvement explosif', image: null },
    { number: 8, difficulty: 5, tip: 'Gainage maximal', image: null },
  ],
}

export const CIRCUIT_META: Record<
  number,
  { label: string; emoji: string; color: string }
> = {
  1: { label: 'Facile', emoji: '🟢', color: '#22c55e' },
  2: { label: 'Moyen', emoji: '🟡', color: '#eab308' },
  3: { label: 'Difficile', emoji: '🔴', color: '#ef4444' },
}

export function getLevelProgress(circuit: number): number {
  if (circuit === 1) return 20
  if (circuit === 2) return 40
  return 60
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function difficultyStars(n: number): string {
  return '★'.repeat(Math.min(n, 5)) + '☆'.repeat(Math.max(0, 5 - n))
}
