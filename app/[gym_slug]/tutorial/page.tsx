'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import { useClimbSession } from '@/hooks/useClimbSession'
import { getTranslationArray } from '@/lib/i18n'
import FlowShell, {
  FlowCard,
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { unlockBadge, getStoredSessionId } from '@/lib/climb-session'
import type fr from '@/lib/translations/fr.json'

type TutorialSlide = (typeof fr.tutorial.slides)[number]

export default function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const { t, language } = useTranslation(gymSlug, gym?.language)
  const [index, setIndex] = useState(0)
  const [quizError, setQuizError] = useState(false)
  const [finishing, setFinishing] = useState(false)

  const slides = useMemo(
    () => getTranslationArray<TutorialSlide>(language, 'tutorial.slides'),
    [language]
  )

  const slide = slides[index]
  const progress = slides.length > 0 ? ((index + 1) / slides.length) * 100 : 0

  const goNext = async () => {
    if (index < slides.length - 1) {
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
    if (!slide?.quiz) return
    if (choice === slide.quiz.correct) {
      setQuizError(false)
      goNext()
    } else {
      setQuizError(true)
    }
  }

  if (gymLoading || sessionLoading || !gym || !slide) return <LoadingScreen />

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-black mb-2">
          <span>{t('tutorial.progress', { current: index + 1, total: slides.length })}</span>
          <span>{session?.user_name}</span>
        </div>
        <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-supr-mint transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <FlowCard>
        <h2 className="text-xl font-bold mb-3">{slide.title}</h2>
        <p className="text-black leading-relaxed">{slide.text}</p>

        {slide.quiz && (
          <div className="mt-6 space-y-2">
            <p className="font-semibold text-black">{slide.quiz.question}</p>
            {slide.quiz.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleQuiz(i)}
                className="w-full text-left border border-stone-200 rounded-xl p-3 hover:bg-stone-50 text-black transition-colors"
              >
                {opt}
              </button>
            ))}
            {quizError && <p className="text-sm text-red-600">{t('tutorial.quizError')}</p>}
          </div>
        )}
      </FlowCard>

      <div className="mt-6 space-y-3">
        {!slide.quiz && (
          <PrimaryButton color={gym.primary_color} onClick={goNext} disabled={finishing}>
            {index < slides.length - 1 ? t('tutorial.next') : t('tutorial.startCircuit')}
          </PrimaryButton>
        )}
        {index > 0 && (
          <SecondaryButton onClick={() => setIndex(index - 1)}>{t('tutorial.back')}</SecondaryButton>
        )}
      </div>
    </FlowShell>
  )
}
