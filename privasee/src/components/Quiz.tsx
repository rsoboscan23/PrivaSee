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
    const base = 'w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors focus:outline-none'
    if (!answered) {
      return selectedOption === index
        ? `${base} border-blue-500 bg-blue-50 text-blue-900`
        : `${base} border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50`
    }
    if (index === question.correctIndex) {
      return `${base} border-green-500 bg-green-50 text-green-900`
    }
    if (index === selectedOption && selectedOption !== question.correctIndex) {
      return `${base} border-red-400 bg-red-50 text-red-900`
    }
    return `${base} border-gray-200 bg-white text-gray-400`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
            <span>Pitanje {currentIndex + 1} od {questions.length}</span>
            <span>{Math.round(progress)}% završeno</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
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
            <div className={`mt-4 rounded-lg p-3 text-sm ${
              selectedOption === question.correctIndex
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}>
              {selectedOption === question.correctIndex
                ? '✓ Točno!'
                : `✗ Netočno. Točan odgovor: ${question.options[question.correctIndex]}`}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {!answered
              ? 'Potvrdi odgovor'
              : isLast
                ? 'Vidi rezultate'
                : 'Sljedeće pitanje →'}
          </button>
        </div>
      </div>
    </div>
  )
}
