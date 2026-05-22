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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Erreur de chargement</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Impossible d&apos;afficher cette page pour le moment.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
          >
            Réessayer
          </button>
          {gymSlug && (
            <Link
              href={`/${gymSlug}`}
              className="text-gray-400 hover:text-supr-orange text-sm transition-colors"
            >
              Retour à la salle
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
