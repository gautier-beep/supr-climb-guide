'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-supr-cream flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-black mb-2">Une erreur est survenue</h1>
        <p className="text-black mb-6 text-sm">
          Recharge la page ou réessaie dans quelques instants.
        </p>
        <button
          onClick={() => reset()}
          className="bg-supr-mint text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
