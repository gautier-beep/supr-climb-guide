'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function GymError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams()
  const gymSlug = params.gym_slug as string

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-supr-cream flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-black mb-2">Erreur de chargement</h1>
        <p className="text-black mb-6 text-sm">
          Impossible d&apos;afficher cette page pour le moment.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="bg-supr-mint text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-colors"
          >
            Réessayer
          </button>
          {gymSlug && (
            <Link
              href={`/${gymSlug}`}
              className="text-black hover:text-supr-mint text-sm transition-colors underline"
            >
              Retour à la salle
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
