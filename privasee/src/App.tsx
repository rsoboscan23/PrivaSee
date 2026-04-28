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
    <div className="min-h-screen bg-gray-50 font-sans">
      {step === 'cookie' && <CookieBanner onAccept={handleCookieAccept} />}
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
    </div>
  )
}
