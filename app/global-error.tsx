'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Erreur critique</h1>
          <p className="text-gray-400 mb-6 text-sm">
            L&apos;application a rencontré un problème. Recharge la page.
          </p>
          <button
            onClick={() => reset()}
            className="bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
