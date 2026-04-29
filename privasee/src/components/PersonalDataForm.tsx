import { useState } from 'react'
import type { UserData } from '../types'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './ui/field'
import { Input } from './ui/input'
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
          <form onSubmit={handleSubmit} noValidate>
            <FieldSet>
              <FieldLegend>Osnovni podaci</FieldLegend>
              <FieldDescription className="text-sm leading-6 text-[#8f9bb0]">
                Ova polja služe za personalizaciju pitanja i prikaz rezultata.
              </FieldDescription>

              <FieldGroup className="mt-5">
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="name">Ime i prezime *</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="npr. Ana Horvat"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    className={errors.name ? 'border-red-400/80 bg-red-950/20' : ''}
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email adresa *</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="npr. ana@email.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    className={errors.email ? 'border-red-400/80 bg-red-950/20' : ''}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                <Field data-invalid={!!errors.birthDate}>
                  <FieldLabel htmlFor="birthDate">Datum rođenja *</FieldLabel>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    aria-invalid={!!errors.birthDate}
                    className={errors.birthDate ? 'border-red-400/80 bg-red-950/20' : ''}
                  />
                  {errors.birthDate && <FieldError>{errors.birthDate}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="city">Grad</FieldLabel>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="npr. Zagreb"
                    value={form.city}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="occupation">Zanimanje</FieldLabel>
                  <Input
                    id="occupation"
                    name="occupation"
                    type="text"
                    placeholder="npr. Studentica"
                    value={form.occupation}
                    onChange={handleChange}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#14d9b3] px-6 py-3 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/70"
            >
              Nastavi na kviz →
            </button>
          </form>
        </div>

    </div>
  )
}
