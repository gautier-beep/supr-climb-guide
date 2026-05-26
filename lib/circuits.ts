export interface CircuitRoute {
  number: number
  difficulty: number
  image: string | null
}

export const CIRCUITS: Record<number, CircuitRoute[]> = {
  1: [
    { number: 1, difficulty: 1, image: null },
    { number: 2, difficulty: 1, image: null },
    { number: 3, difficulty: 1, image: null },
    { number: 4, difficulty: 2, image: null },
    { number: 5, difficulty: 2, image: null },
    { number: 6, difficulty: 2, image: null },
    { number: 7, difficulty: 2, image: null },
    { number: 8, difficulty: 3, image: null },
    { number: 9, difficulty: 3, image: null },
    { number: 10, difficulty: 3, image: null },
  ],
  2: [
    { number: 1, difficulty: 2, image: null },
    { number: 2, difficulty: 2, image: null },
    { number: 3, difficulty: 2, image: null },
    { number: 4, difficulty: 3, image: null },
    { number: 5, difficulty: 3, image: null },
    { number: 6, difficulty: 3, image: null },
    { number: 7, difficulty: 3, image: null },
    { number: 8, difficulty: 4, image: null },
    { number: 9, difficulty: 4, image: null },
    { number: 10, difficulty: 4, image: null },
  ],
  3: [
    { number: 1, difficulty: 3, image: null },
    { number: 2, difficulty: 3, image: null },
    { number: 3, difficulty: 4, image: null },
    { number: 4, difficulty: 4, image: null },
    { number: 5, difficulty: 4, image: null },
    { number: 6, difficulty: 4, image: null },
    { number: 7, difficulty: 5, image: null },
    { number: 8, difficulty: 5, image: null },
  ],
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
