import { useState } from 'react'
import { questions } from '../data/quiz'

type Props = {
  onComplete: (score: number) => void
}

export default function Quiz({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100

  function handleSelect(index: number) {
    if (answered) return
    setSelectedOption(index)
  }

  function handleNext() {
    if (selectedOption === null) return

    const isCorrect = selectedOption === question.correctIndex
    const newScore = isCorrect ? score + 1 : score

    if (!answered) {
      setAnswered(true)
      setScore(newScore)
      return
    }

    if (isLast) {
      onComplete(newScore)
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedOption(null)
      setAnswered(false)
    }
  }

  function getOptionStyle(index: number): string {
    const base = 'w-full rounded-xl border px-4 py-3 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/50'
    if (!answered) {
      return selectedOption === index
        ? `${base} border-[#14d9b3] bg-[#07211f] text-[#d9fff6]`
        : `${base} border-[#26374a] bg-[#0f1822] text-[#c8d2e2] hover:border-[#14d9b3]/40 hover:bg-[#132231]`
    }
    if (index === question.correctIndex) {
      return `${base} border-[#14d9b3] bg-[#0a2b27] text-[#d4fff4]`
    }
    if (index === selectedOption && selectedOption !== question.correctIndex) {
      return `${base} border-red-400/80 bg-red-950/30 text-red-200`
    }
    return `${base} border-[#253447] bg-[#0f1822] text-[#6d7b8e]`
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-[#8f9bb0]">
            <span>Pitanje {currentIndex + 1} od {questions.length}</span>
            <span>{Math.round(progress)}% završeno</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#1b2937]">
            <div
              className="h-2 rounded-full bg-[#14d9b3] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      <div className="rounded-3xl border border-[#1b2a38] bg-[#0b1118]/90 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur">
          <h2 className="font-display mb-6 text-xl font-semibold text-[#eaf0f7]">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={getOptionStyle(index)}
              >
                <span className="mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <div className={`mt-4 rounded-xl p-4 text-sm ${
              selectedOption === question.correctIndex
                ? 'border border-[#1e6357] bg-[#0a2b27] text-[#cffff3]'
                : 'border border-red-400/70 bg-red-950/45 text-red-100 shadow-[0_0_0_1px_rgba(248,113,113,0.22)]'
            }`}>
              {selectedOption === question.correctIndex
                ? '✓ Točno!'
                : (
                  <div className="space-y-2"> 
                    <p className="rounded-lg text-red-100">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-red-300">
                        Zašto je odgovor netočan
                      </span>
                      {question.incorrectExplanation}
                    </p>
                  </div>
                )}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="mt-6 w-full rounded-xl bg-[#14d9b3] px-6 py-3 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/70 disabled:cursor-not-allowed disabled:bg-[#355b56] disabled:text-[#9abdb6]"
          >
            {!answered
              ? 'Potvrdi odgovor'
              : isLast
                ? 'Vidi rezultate'
                : 'Sljedeće pitanje →'}
          </button>
        </div>
    </div>
  )
}
