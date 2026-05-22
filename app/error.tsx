'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Une erreur est survenue</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Recharge la page ou réessaie dans quelques secondes.
        </p>
        <button
          onClick={() => reset()}
          className="bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
