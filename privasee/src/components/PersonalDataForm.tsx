import { useState } from 'react'
import type { UserData } from '../types'




type Props = {
  onSubmit: (data: UserData) => void
}

type Errors = Partial<Record<keyof UserData, string>>

export default function PersonalDataForm({ onSubmit }: Props) {
  const [form, setForm] = useState<UserData>({
    name: '',
    email: '',
    birthDate: '',
    city: '',
    occupation: '',
  })
  const [errors, setErrors] = useState<Errors>({})

  function validate(): boolean {
    const newErrors: Errors = {}
    if (!form.name.trim()) newErrors.name = 'Ime i prezime su obavezni.'
    if (!form.email.trim()) {
      newErrors.email = 'Email je obavezan.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Unesite valjanu email adresu.'
    }
    if (!form.birthDate) newErrors.birthDate = 'Datum rođenja je obavezan.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-[#eaf0f7]">
            Personalizacija kviza
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#8f9bb0]">
            Da bismo prilagodili kviz vašem profilu, trebamo nekoliko osnovnih
            podataka. Sva polja označena s * su obavezna.
          </p>
        </div>

      <div className="rounded-3xl border border-[#1b2a38] bg-[#0b1118]/90 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field
              label="Ime i prezime *"
              name="name"
              type="text"
              placeholder="npr. Ana Horvat"
              value={form.name}
              error={errors.name}
              onChange={handleChange}
            />
            <Field
              label="Email adresa *"
              name="email"
              type="email"
              placeholder="npr. ana@email.com"
              value={form.email}
              error={errors.email}
              onChange={handleChange}
            />
            <Field
              label="Datum rođenja *"
              name="birthDate"
              type="date"
              value={form.birthDate}
              error={errors.birthDate}
              onChange={handleChange}
            />
            <Field
              label="Grad"
              name="city"
              type="text"
              placeholder="npr. Zagreb"
              value={form.city}
              onChange={handleChange}
            />
            <Field
              label="Zanimanje"
              name="occupation"
              type="text"
              placeholder="npr. Studentica"
              value={form.occupation}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#14d9b3] px-6 py-3 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/70"
            >
              Nastavi na kviz →
            </button>
          </form>
        </div>

      <p className="mt-4 text-center text-xs text-[#6f7b8f]">
          Vaši podaci koriste se isključivo za personalizaciju kviza i neće biti
          dijeljeni s trećim stranama.*
        </p>
    </div>
  )
}

type FieldProps = {
  label: string
  name: string
  type: string
  placeholder?: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({ label, name, type, placeholder, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[#b5c0d1]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#eaf0f7] placeholder:text-[#607089] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/60 ${
          error ? 'border-red-400/80 bg-red-950/20' : 'border-[#2a3a4e] bg-[#0f1822]'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  )
}
