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
    name: 'Usmjeravanje (Nudging) ',
    description:
    '"Prihvati i zatvori" je veći, obojeniji i na istaknutom mjestu. "Saznajte više" je manji, sive boje i vizualno potisnuta opcija. Dizajn nije slučajan. Namjerno te guraju prema jednom izboru.'
  },
  {
    name: 'Lažna nužnost',
    description:
    'Forma je tražila tvoje ime, email i grad "za personalizaciju kviza." Kviz ne treba ništa od toga. Tražili su podatke jer mogu — ne jer moraju.'

  },
  {
    name: 'Skriveni opseg',
    description:
      'Realno, nisi ni znao/la da prihvaćaš dijeljenje podataka s 1065 reklamnih partnera dok to nisi vidio/la ovdje.'
  },
  {
    name: 'Nema odbijanja',
    description:
    'Nije postojala opcija "Odbij sve." Mogao/la si ili prihvatiti — ili tražiti zakopanu alternativu u postavkama. Odbiti je moguće, samo nije brzo ni intuitivno.'
  },
]

const consentLabels: { key: keyof CookieConsents; label: string; description: string }[] = [
  {
    key: 'analytics',
    label: 'Analitički kolačići',
    description:
      'Prate sve što radiš na stranici: što klikćeš, koliko dugo gledaš, gdje se zaustaviš. Tvoje ponašanje postaje podatkovna točka.',
  },
  {
    key: 'marketing',
    label: 'Marketinški kolačići',
    description:
      'Prate te po internetu. Ona tenisica koju si gledao/la na jednoj stranici? Pratit će te danima svuda.',
  },
  {
    key: 'profiling',
    label: 'Kolačići za profiliranje',
    description:
      'Od svih tih podataka grade digitalni portret tebe: tvoje navike, interesi, vjerojatni prihodi, raspoloženje. Nisi korisnik — ti si proizvod.',
  },
  {
    key: 'partnerSharing',
    label: 'Dijeljenje s 1065 partnera',
    description:
      'Tvoj profil nije ostao na toj jednoj stranici. Upravo je poslan na više od tisuću tvrtki koje nikad nisi čuo/la, a koje sada znaju tko si.',
  },
]

const totalQuestions = questions.length

export default function Results({ consents, userData, score, onRestart }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const scorePercent = Math.round((score / totalQuestions) * 100)
  const disabledConsentLabels = consentLabels.filter(({ key }) => !consents[key])
  const allOptionalDisabled = disabledConsentLabels.length === consentLabels.length

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
      content: allOptionalDisabled ? (
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-emerald-400/45 bg-emerald-950/20 p-4 sm:p-5">
          <h3 className="mb-3 text-center text-lg font-bold text-emerald-200 sm:text-2xl">
            Odlično! Isključili ste opcionalne kolačiće.
          </h3>
          <p className="mb-4 text-center text-sm text-emerald-100 sm:text-base">
            Uspješno ste ugasili sve kategorije koje nisu nužne za rad stranice.
          </p>
          <ul className="mx-auto max-w-2xl list-disc space-y-2 pl-5 text-left marker:text-emerald-300">
            {disabledConsentLabels.map(({ key, label }) => (
              <li key={key} className="text-sm font-semibold text-emerald-100 sm:text-base">
                {label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-red-400/50 bg-red-950/20 p-4 sm:p-5">
          <h3 className="mb-4 w-full text-center text-lg font-bold leading-tight text-red-200 sm:mb-5 sm:text-2xl">
            Što ste sve prihvatili klikom na "Prihvati i zatvori"
          </h3>
          <div className="rounded-xl p-3">
            <ul className="mx-auto max-w-2xl list-disc space-y-2.5 pl-5 text-left marker:text-red-300">
              {consentLabels.map(({ key, label, description }) => (
                <li key={key} className="text-sm leading-6 text-red-100 sm:text-base">
                  <span className="inline align-middle font-semibold">{label}</span>
                  <p className="mt-1 text-xs text-red-200 sm:text-sm">{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
      title: 'Trikovi koje smo koristili',
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
            <li>• Koristite privatni način pregledavanja kad ne želite ostaviti trag</li>
            <li>• Provjerite koje ste privole dali i povucite ih ako više ne želite</li>
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
                    <div className="max-h-[52dvh] w-full overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible sm:pr-0">
                      {card.content}
                    </div>
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
