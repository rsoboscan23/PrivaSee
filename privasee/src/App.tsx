import { useState } from 'react'
import type { Step, CookieConsents, UserData } from './types'
import CookieBanner from './components/CookieBanner'
import PersonalDataForm from './components/PersonalDataForm'
import Quiz from './components/Quiz'
import Results from './components/Results'

const defaultConsents: CookieConsents = {
  accepted: false,
  analytics: false,
  marketing: false,
  profiling: false,
  partnerSharing: false,
}

const defaultUserData: UserData = {
  name: '',
  email: '',
  birthDate: '',
  city: '',
  occupation: '',
}

export default function App() {
  const [step, setStep] = useState<Step>('cookie')
  const [consents, setConsents] = useState<CookieConsents>(defaultConsents)
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [score, setScore] = useState(0)

  function handleCookieAccept(accepted: CookieConsents) {
    setConsents(accepted)
    setStep('form')
  }

  function handleFormSubmit(data: UserData) {
    setUserData(data)
    setStep('quiz')
  }

  function handleQuizComplete(finalScore: number) {
    setScore(finalScore)
    setStep('results')
  }

  function handleRestart() {
    setConsents(defaultConsents)
    setUserData(defaultUserData)
    setScore(0)
    setStep('cookie')
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-[#eaf0f7]">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#14d9b3]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-[#1d9eff]/10 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-8">
        {step === 'cookie' && (
          <div className="relative w-full">
            <div className="pointer-events-none opacity-80 blur-[3px]">
              <PersonalDataForm onSubmit={() => {}} />
            </div>
            <CookieBanner onAccept={handleCookieAccept} />
          </div>
        )}
        {step === 'form' && <PersonalDataForm onSubmit={handleFormSubmit} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && (
          <Results
            consents={consents}
            userData={userData}
            score={score}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
