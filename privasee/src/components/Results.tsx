import { useState, type TouchEvent } from 'react'
import type { CookieConsents, UserData } from '../types'

type Props = {
  consents: CookieConsents
  userData: UserData
  score: number
  onRestart: () => void
}

const darkPatterns = [
  {
    name: 'Naranging (Nudging)',
    description:
      '"Prihvati sve" je veći, obojeniji i na istaknutom mjestu. "Samo nužni" je manji, sive boje i vizualno potisnuta opcija.',
  },
  {
    name: 'Lažna nužnost',
    description:
      'Forma tvrdi da su vaši osobni podaci potrebni za "personalizaciju kviza". Kviz ne treba nijedan od tih podataka.',
  },
  {
    name: 'Skriveni opseg',
    description:
      'Niste znali da prihvaćate dijeljenje podataka s 47 reklamnih partnera dok to niste vidjeli ovdje.',
  },
  {
    name: 'Nema odbijanja',
    description:
      'Na cookie banneru nije postojala opcija "Odbij sve" — samo prihvaćanje ili skrivena alternativa.',
  },
]

const consentLabels: { key: keyof CookieConsents; label: string }[] = [
  { key: 'analytics', label: 'Analitički kolačići' },
  { key: 'marketing', label: 'Marketinški kolačići' },
  { key: 'profiling', label: 'Kolačići za profiliranje' },
  { key: 'partnerSharing', label: 'Dijeljenje s 47 reklamnih partnera' },
]

const totalQuestions = 5

export default function Results({ consents, userData, score, onRestart }: Props) {
  const [activeCard, setActiveCard] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const scorePercent = Math.round((score / totalQuestions) * 100)

  const cards = [
    {
      title: 'Rezultat kviza',
      content: (
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2e8473] bg-[#0a2b27] text-2xl font-bold text-[#8dffe8]">
            {score}/{totalQuestions}
          </div>
          <div>
            <p className="text-lg font-semibold text-[#eaf0f7]">{scorePercent}% točnih odgovora</p>
            <p className="text-sm text-[#8f9bb0]">
              {score === totalQuestions
                ? 'Odlično! Dobro poznajete digitalnu privatnost.'
                : score >= 3
                  ? 'Solidno znanje — ali uvijek ima prostora za više.'
                  : 'Vrijedi pročitati više o digitalnoj privatnosti!'}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Što ste prihvatili klikom na cookie banner',
      content: consents.accepted ? (
        <ul className="space-y-2">
          {consentLabels.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-2 text-sm text-[#d8e1ef]">
              <span className="text-[#14d9b3]">✓</span>
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#8f9bb0]">
          Odabrali ste samo nužne kolačiće. Dobra odluka — ali rijetko tko to odabere.
        </p>
      ),
    },
    {
      title: 'Osobni podaci koje ste upisali',
      content: (
        <>
          <dl className="space-y-2 text-sm">
            {[
              { label: 'Ime i prezime', value: userData.name || '—' },
              { label: 'Email', value: userData.email || '—' },
              { label: 'Datum rođenja', value: userData.birthDate || '—' },
              { label: 'Grad', value: userData.city || '—' },
              { label: 'Zanimanje', value: userData.occupation || '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-[#8f9bb0]">{label}</dt>
                <dd className="font-medium text-[#eaf0f7]">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg border border-amber-300/30 bg-amber-900/20 p-3 text-xs text-amber-200">
            Na pravoj web stranici, ovi podaci mogu biti prodani trećim stranama, korišteni za ciljano
            oglašavanje ili pohranjeni godinama.
          </p>
        </>
      ),
    },
    {
      title: 'Dark paterni koje smo koristili',
      content: (
        <ul className="space-y-4">
          {darkPatterns.map(pattern => (
            <li key={pattern.name}>
              <p className="text-sm font-semibold text-[#eaf0f7]">{pattern.name}</p>
              <p className="mt-0.5 text-sm text-[#8f9bb0]">{pattern.description}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Što možete učiniti?',
      content: (
        <div className="rounded-2xl border border-[#1f6458] bg-[#0a2b27] p-5 text-[#d2fff5]">
          <ul className="space-y-1 text-sm text-[#a7eede]">
            <li>• Uvijek pročitajte što prihvaćate na cookie bannerima</li>
            <li>• Koristite preglednik s ugrađenom blokadom trackera (Firefox, Brave)</li>
            <li>• Redovito brišite kolačiće i pregledavajte postavke privatnosti</li>
            <li>• Znate da imate pravo zatražiti brisanje vaših podataka (GDPR čl. 17)</li>
          </ul>
        </div>
      ),
    },
  ]

  function goNext() {
    setActiveCard(current => Math.min(current + 1, cards.length - 1))
  }

  function goPrev() {
    setActiveCard(current => Math.max(current - 1, 0))
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null)
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return
    const endX = event.changedTouches[0]?.clientX
    if (typeof endX !== 'number') return
    const deltaX = endX - touchStartX
    if (deltaX > 50) goNext()
    if (deltaX < -50) goPrev()
    setTouchStartX(null)
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-2">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-[#eaf0f7]">Evo što ste predali</h1>
          <p className="mt-2 text-sm text-[#8f9bb0]">
            Ovo je sve što je tipična web stranica prikupila u zadnjih nekoliko minuta.
          </p>
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-3xl border border-[#1b2a38] bg-[#0b1118]/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8f9bb0]">
              {cards[activeCard].title}
            </h2>
            <span className="text-xs text-[#708199]">
              {activeCard + 1} / {cards.length}
            </span>
          </div>

          <div className="min-h-[180px]">{cards[activeCard].content}</div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={activeCard === 0}
              className="rounded-lg border border-[#2a3a4e] px-4 py-2 text-xs font-medium text-[#8e9bb1] transition hover:border-[#3d526b] hover:text-[#a7b4c8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Prethodno
            </button>
            <p className="text-center text-xs text-[#708199]">Povucite udesno za sljedeću karticu</p>
            <button
              onClick={goNext}
              disabled={activeCard === cards.length - 1}
              className="rounded-lg bg-[#14d9b3] px-4 py-2 text-xs font-semibold text-[#031914] transition hover:bg-[#26e9c3] disabled:cursor-not-allowed disabled:bg-[#355b56] disabled:text-[#9abdb6]"
            >
              Sljedeće →
            </button>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full rounded-xl border border-[#2d4057] bg-[#0f1822] px-6 py-3 text-sm font-medium text-[#d2dced] transition hover:border-[#4a617d] hover:bg-[#122031] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/70"
        >
          Počni iznova
        </button>
      </div>
    </div>
  )
}
