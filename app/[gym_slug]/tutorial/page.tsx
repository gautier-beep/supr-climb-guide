'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useClimbSession } from '@/hooks/useClimbSession'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { unlockBadge, getStoredSessionId } from '@/lib/climb-session'

const SLIDES = [
  {
    title: 'Sécurité',
    text: "Avant de grimper, vérifie la zone de réception et attends que personne ne soit en dessous.",
    quiz: {
      question: "Que faire si quelqu'un grimpe au-dessus ?",
      options: ["Je grimpe quand même", "J'attends qu'il descende", 'Je crie'],
      correct: 1,
    },
  },
  {
    title: 'Prises',
    text: 'Utilise tes pieds autant que tes mains ! Pousse avec les jambes.',
    quiz: {
      question: 'Quelle partie fatigue le moins ?',
      options: ['Les bras', 'Les jambes', 'Les doigts'],
      correct: 1,
    },
  },
  {
    title: 'Objectif',
    text: "Pour valider une voie, monte jusqu'à la prise finale et tiens-la 3 secondes.",
    quiz: null,
  },
  {
    title: 'Circuits',
    text: 'Suis les couleurs ! 🟢 Facile, 🟡 Moyen, 🔴 Difficile',
    quiz: null,
  },
  {
    title: 'Conseils',
    text: 'Repose-toi, respire, et amuse-toi !',
    quiz: null,
  },
]

export default function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const [index, setIndex] = useState(0)
  const [quizError, setQuizError] = useState(false)
  const [finishing, setFinishing] = useState(false)

  const slide = SLIDES[index]
  const progress = ((index + 1) / SLIDES.length) * 100

  const goNext = async () => {
    if (index < SLIDES.length - 1) {
      setIndex(index + 1)
      setQuizError(false)
      return
    }
    setFinishing(true)
    const sid = getStoredSessionId()
    if (sid) await unlockBadge(sid, 'apprentice')
    router.push(`/${gymSlug}/circuit/1`)
  }

  const handleQuiz = (choice: number) => {
    if (!slide.quiz) return
    if (choice === slide.quiz.correct) {
      setQuizError(false)
      goNext()
    } else {
      setQuizError(true)
    }
  }

  if (gymLoading || sessionLoading || !gym) return <LoadingScreen />

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Tuto {index + 1}/{SLIDES.length}</span>
          <span>{session?.user_name}</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <FlowCard>
        <h2 className="text-xl font-bold mb-3">{slide.title}</h2>
        <p className="text-gray-700 leading-relaxed">{slide.text}</p>

        {slide.quiz && (
          <div className="mt-6 space-y-2">
            <p className="font-semibold text-gray-900">{slide.quiz.question}</p>
            {slide.quiz.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleQuiz(i)}
                className="w-full text-left border border-gray-200 rounded-xl p-3 hover:bg-gray-50 text-gray-900 transition-colors"
              >
                {opt}
              </button>
            ))}
            {quizError && (
              <p className="text-sm text-red-600">Pas tout à fait — réessaie !</p>
            )}
          </div>
        )}
      </FlowCard>

      <div className="mt-6 space-y-3">
        {!slide.quiz && (
          <PrimaryButton color={gym.primary_color} onClick={goNext} disabled={finishing}>
            {index < SLIDES.length - 1 ? 'Suivant →' : 'Commencer le circuit 1 🟢'}
          </PrimaryButton>
        )}
        {index > 0 && (
          <SecondaryButton onClick={() => setIndex(index - 1)}>← Retour</SecondaryButton>
        )}
      </div>
    </FlowShell>
  )
}
