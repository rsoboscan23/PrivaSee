export type Step = 'cookie' | 'form' | 'quiz' | 'results'

export type CookieConsents = {
  accepted: boolean
  analytics: boolean
  marketing: boolean
  profiling: boolean
  partnerSharing: boolean
}

export type UserData = {
  name: string
  email: string
  birthDate: string
  city: string
  occupation: string
}

export type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
}
