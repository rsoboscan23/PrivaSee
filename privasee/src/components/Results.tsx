import { useEffect, useState } from 'react'
import type { CookieConsents, UserData } from '../types'
import { questions } from '../data/quiz'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './ui/carousel'

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
  { key: 'partnerSharing', label: 'Dijeljenje s 1065 partnera' },
]

const totalQuestions = questions.length

export default function Results({ consents, userData, score, onRestart }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const scorePercent = Math.round((score / totalQuestions) * 100)

  const cards = [
    {
      title: 'Rezultat kviza',
      content: (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#3abfa4] bg-[#0a2b27] text-3xl font-extrabold text-[#8dffe8] shadow-[0_0_40px_rgba(20,217,179,0.25)] sm:h-28 sm:w-28 sm:text-5xl">
            {score}/{totalQuestions}
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-[#eaf0f7] sm:text-5xl">{scorePercent}%</p>
            <p className="mt-1 text-lg font-semibold text-[#d6e5fb] sm:text-xl">točnih odgovora</p>
            <p className="mt-2 text-sm text-[#8f9bb0] sm:text-base">
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
      title: 'Prihvatili ste kolačiće? Evo sve što ste nam dali',
      content: consents.accepted ? (
        <div className="mx-auto w-full max-w-3xl"> 
          <div className="rounded-2xl border border-red-400/50 bg-red-950/20 p-4 sm:p-5"> 
          <h3 className="mb-4 w-full text-center text-lg font-bold leading-tight text-[#eaf0f7] sm:mb-5 sm:text-2xl, text-red-200">
            Što ste sve prihvatili klikom na "Prihvati i zatvori"
          </h3>
          
            <div className="rounded-xl p-3">
              <ul className="list-disc list-inside space-y-2.5 text-center marker:text-red-300">
                {consentLabels.map(({ key, label }) => (
                  <li key={key} className="text-sm font-semibold text-red-100 sm:text-base">
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="mx-auto max-w-3xl text-center text-sm text-[#8f9bb0] sm:text-base">
          Odabrali ste samo nužne kolačiće. Dobra odluka — ali rijetko tko to odabere.
        </p>
      ),
    },
    {
      title: 'Osobni podaci koje ste upisali',
      content: (
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/50 bg-red-950/20 p-4 sm:p-5">
          <p className="mb-4 text-center text-sm font-semibold text-red-200 sm:text-base">
            Podijelili ste osobne podatke koji mogu izravno otkriti vaš identitet.
          </p>
          <ul className="space-y-3">
            {[
              { label: 'Ime i prezime', value: userData.name || '—' },
              { label: 'Email', value: userData.email || '—' },
              { label: 'Datum rođenja', value: userData.birthDate || '—' },
              { label: 'Grad', value: userData.city || '—' },
              { label: 'Zanimanje', value: userData.occupation || '—' },
            ].map(({ label, value }) => (
              <li key={label} className="flex items-center justify-center gap-2 text-center text-sm text-red-100 sm:text-base">
                <span className="font-semibold text-red-300">{label}:</span>
                <span className="break-all">{value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-red-200 sm:text-sm">
            Na stvarnim web stranicama ovakvi se podaci mogu dijeliti s trećim stranama, koristiti za
            ciljano oglašavanje i čuvati znatno dulje nego što očekujete.
          </p>
        </div>
      ),
    },
    {
      title: 'Dark paterni koje smo koristili',
      content: (
        <ul className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {darkPatterns.map(pattern => (
            <li key={pattern.name} className="rounded-xl border border-[#1f3042] bg-[#0f1822] p-3 text-center sm:p-4">
              <p className="text-base font-semibold text-[#eaf0f7] sm:text-lg">{pattern.name}</p>
              <p className="mt-1.5 text-sm leading-6 text-[#8f9bb0] sm:mt-2 sm:text-base sm:leading-7">{pattern.description}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Što možete učiniti?',
      content: (
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#1f6458] bg-[#0a2b27] p-4 text-[#d2fff5] sm:p-6">
          <ul className="space-y-2 text-center text-sm text-[#a7eede] sm:text-base">
            <li>• Uvijek pročitajte što prihvaćate na cookie bannerima</li>
            <li>• Koristite preglednik s ugrađenom blokadom trackera (Firefox, Brave)</li>
            <li>• Redovito brišite kolačiće i pregledavajte postavke privatnosti</li>
            <li>• Znate da imate pravo zatražiti brisanje vaših podataka (GDPR čl. 17)</li>
          </ul>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  return (
    <div className="mx-auto w-full max-w-4xl py-2">
      <div className="space-y-6"> 

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: false }}
          className="relative overflow-hidden rounded-3xl border border-[#1b2a38] bg-[#0b1118]/95 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-6"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#14d9b3]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#1d9eff]/10 blur-3xl" />

          <CarouselContent>
            {cards.map(card => (
              <CarouselItem key={card.title}>
                <div className="flex h-full flex-col">
                  <div className="mb-3 flex items-start justify-between gap-2 px-2 py-1 sm:mb-4 sm:items-center sm:gap-3 sm:px-3 sm:py-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8f9bb0] sm:text-base">
                      {card.title}
                    </h2>
                    <span className="rounded-md bg-[#0f1822] px-2 py-1 text-xs text-[#708199] sm:px-2.5">
                      {current} / {count || cards.length}
                    </span>
                  </div>
                  <div className="flex min-h-[180px] flex-1 items-center justify-center p-3 sm:min-h-[300px] sm:p-4">
                    {card.content}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#1b2937]">
            <div
              className="h-full rounded-full bg-[#14d9b3] transition-all duration-300"
              style={{ width: `${((current || 1) / (count || cards.length)) * 100}%` }}
            />
          </div>

          <p className="mt-4 text-center text-xs font-medium text-[#9eb4cf] sm:mt-6 sm:text-sm">
            <span className="inline-block animate-pulse text-[#14d9b3]">⟶</span> Povuci udesno i otkrij što si još podijelio
          </p>
        </Carousel>

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
