import type { CookieConsents } from '../types'
import { useState } from 'react'

type Props = {
  onAccept: (consents: CookieConsents) => void
}

const detailOptions = [
  {
    key: 'storageAccess',
    label: 'Pohrana i/ili pristup podacima na uređaju',
    consentKey: 'partnerSharing',
  },
  {
    key: 'profileAds',
    label: 'Kreiranje profila za personalizirano oglašavanje',
    consentKey: 'marketing',
  },
  {
    key: 'profileContent',
    label: 'Kreiranje profila za personaliziranje sadržaja',
    consentKey: 'profiling',
  },
  {
    key: 'deviceScan',
    label: 'Aktivno skeniranje karakteristika uređaja za identifikaciju',
    consentKey: 'analytics',
  },
  {
    key: 'preciseGeo',
    label: 'Korištenje preciznih geolokacijskih podataka',
    consentKey: 'analytics',
  },
  {
    key: 'improveServices',
    label: 'Razvoj i poboljšanje usluga',
    consentKey: 'analytics',
  },
  {
    key: 'audienceInsights',
    label: 'Razumijevanje publike kroz statistiku ili kombinacije podataka iz različitih izvora',
    consentKey: 'analytics',
  },
  {
    key: 'measureAds',
    label: 'Mjerenje performansi oglašavanja',
    consentKey: 'marketing',
  },
  {
    key: 'measureContent',
    label: 'Mjerenje performansi sadržaja',
    consentKey: 'analytics',
  },
  {
    key: 'limitedDataAds',
    label: 'Korištenje ograničenih podataka za odabir oglašavanja',
    consentKey: 'marketing',
  },
  {
    key: 'useProfileAds',
    label: 'Korištenje profila za odabir personaliziranog oglašavanja',
    consentKey: 'marketing',
  },
  {
    key: 'useProfileContent',
    label: 'Korištenje profila za odabir personaliziranog sadržaja',
    consentKey: 'profiling',
  },
  {
    key: 'limitedDataContent',
    label: 'Korištenje ograničenih podataka za odabir sadržaja',
    consentKey: 'profiling',
  },
] as const

const defaultDetailedConsents = Object.fromEntries(detailOptions.map((option) => [option.key, true])) as Record<
  (typeof detailOptions)[number]['key'],
  boolean
>

export default function CookieBanner({ onAccept }: Props) {
  const [view, setView] = useState<'summary' | 'details'>('summary')
  const [detailedConsents, setDetailedConsents] = useState(defaultDetailedConsents)

  function handleAcceptAll() {
    onAccept({
      accepted: true,
      analytics: true,
      marketing: true,
      profiling: true,
      partnerSharing: true,
    })
  }

  function handleNecessaryOnly() {
    onAccept({
      accepted: false,
      analytics: false,
      marketing: false,
      profiling: false,
      partnerSharing: false,
    })
  }

  function handleDetailedSave() {
    const consentByType = {
      analytics: detailOptions
        .filter((option) => option.consentKey === 'analytics')
        .every((option) => detailedConsents[option.key]),
      marketing: detailOptions
        .filter((option) => option.consentKey === 'marketing')
        .every((option) => detailedConsents[option.key]),
      profiling: detailOptions
        .filter((option) => option.consentKey === 'profiling')
        .every((option) => detailedConsents[option.key]),
      partnerSharing: detailOptions
        .filter((option) => option.consentKey === 'partnerSharing')
        .every((option) => detailedConsents[option.key]),
    }

    onAccept({
      accepted: true,
      ...consentByType,
    })
  }

  function openDetails() {
    setDetailedConsents(defaultDetailedConsents)
    setView('details')
  }

  function handleToggleConsent(key: (typeof detailOptions)[number]['key']) {
    setDetailedConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-transparent p-3 sm:flex sm:items-center sm:justify-center sm:p-6">
      <div className="my-2 w-full max-w-3xl rounded-2xl border border-[#1e3041] bg-[#0b1118]/98 p-4 text-[#eaf0f7] shadow-[0_40px_100px_rgba(0,0,0,0.55)] sm:my-8 sm:p-8">
        <div>
          {view === 'summary' ? (
            <>
              <div className="mb-5 flex items-center justify-center gap-2 sm:mb-6">  
                <h2 className="font-display text-xl font-semibold tracking-wide text-[#eaf0f7] sm:text-3xl">
                  Upravljanje privatnošću
                </h2>
              </div>

              <p className="text-sm leading-6 text-[#95a1b4] sm:text-base">
                Više o našim Pravilima privatnosti te pravilima o korištenju kolačića možete pročitati{' '}
                <button className="text-[#14d9b3] underline decoration-[#14d9b3]/70 underline-offset-4 hover:text-[#6cf2d8]">
                  ovdje
                </button>
              </p>

              <p className="mt-4 text-sm leading-6 text-[#95a1b4] sm:text-base">
                Uz Vaš pristanak, mi i naši partneri koristimo{' '}
                <button className="text-[#14d9b3] underline decoration-[#14d9b3]/70 underline-offset-4 hover:text-[#6cf2d8]">
                  kolačiće
                </button>{' '}
                i slične tehnologije za pohranu, pristup i obradu osobnih podataka kao što su Vaša posjeta ovoj web stranici, IP adrese i identifikatori kolačića. Neki partneri mogu se oslanjati na legitimni poslovni interes. Svoj pristanak možete povući u bilo kojem trenutku klikom na{' '}
                <button className="text-[#14d9b3] underline decoration-[#14d9b3]/70 underline-offset-4 hover:text-[#6cf2d8]">
                  "Saznajte više"
                </button>{' '}
                ili u našim{' '}
                <button className="text-[#14d9b3] underline decoration-[#14d9b3]/70 underline-offset-4 hover:text-[#6cf2d8]">
                  Pravilima o privatnosti
                </button>
                .
              </p>

              <p className="mt-6 text-base font-semibold text-[#dfe7f2] sm:text-lg">
                Mi i naši partneri obrađujemo podatke kako slijedi:
              </p>
              <p className="mt-2 text-sm leading-6 text-[#95a1b4] sm:text-base">
                Personalizirano oglašavanje i sadržaj, mjerenje oglašavanja i sadržaja, uvid u publiku i razvoj usluga, Pohrana i/ili pristup podacima na uređaju, Precizni geolokacijski podaci i identifikacija putem skeniranja uređaja
              </p>

              <p className="mt-5 text-center text-sm text-[#14d9b3] sm:text-base">
                <button className="underline decoration-[#14d9b3]/70 underline-offset-4 hover:text-[#6cf2d8]">
                  Pogledajte listu naših 1065 partnera.
                </button>
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center">
                <button
                  onClick={openDetails}
                  className="w-full rounded-xl border border-[#2a3a4e] px-6 py-3.5 text-sm font-semibold text-[#8e9bb1] transition hover:border-[#3d526b] hover:text-[#a7b4c8] sm:w-auto sm:min-w-[240px]"
                >
                  Saznajte više
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full rounded-xl bg-[#14d9b3] px-7 py-3.5 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] sm:w-auto sm:min-w-[240px]"
                >
                  Prihvati i zatvori
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#eaf0f7] sm:text-2xl">
                    Upravljanje privolama
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-[#95a1b4] sm:text-sm sm:leading-6">
                    Mi i naši partneri koristimo kolačiće, pristupamo općim i neosjetljivim podacima s vašeg uređaja te ih upotrebljavamo kako bismo poboljšali naše proizvode i prilagodili oglase i druge sadržaje na ovoj web stranici. Možete prihvatiti sve ili dio tih postupaka. Kako biste saznali više o kolačićima, partnerima i načinu na koji upotrebljavamo vaše podatke te pregledali svoje mogućnosti ili ove postupke za svakog partnera, posjetite našu stranicu 
                  </p>
                </div>
                <button
                  onClick={() => setView('summary')}
                  className="rounded-md border border-[#2a3a4e] px-2 py-1 text-xs text-[#8e9bb1] hover:border-[#3d526b] hover:text-[#a7b4c8]"
                >
                  Natrag
                </button>
              </div>

              <div className="max-h-[42dvh] space-y-2 overflow-y-auto rounded-xl border border-[#1b2935] bg-[#0f1822] p-3 pr-2 sm:max-h-[48dvh] sm:p-4 sm:pr-3">
                {detailOptions.map((option) => (
                  <div
                    key={option.key}
                    className="flex flex-col items-start gap-2 rounded-lg border border-[#1f3042] bg-[#0b1118] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <p className="text-xs leading-5 text-[#dfe7f2] sm:text-sm sm:leading-6">{option.label}</p>
                    <button
                      onClick={() => handleToggleConsent(option.key)}
                      className={`w-full rounded-md px-3 py-1.5 text-xs font-semibold transition sm:w-auto sm:min-w-[88px] ${
                        detailedConsents[option.key]
                          ? 'bg-[#14d9b3] text-[#031914] hover:bg-[#26e9c3]'
                          : 'border border-[#2a3a4e] text-[#8e9bb1] hover:border-[#3d526b] hover:text-[#a7b4c8]'
                      }`}
                    >
                      {detailedConsents[option.key] ? 'Uključeno' : 'Isključeno'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-end">
                <button
                  onClick={handleNecessaryOnly}
                  className="w-full rounded-xl border border-[#2a3a4e] px-6 py-3.5 text-sm font-semibold text-[#8e9bb1] transition hover:border-[#3d526b] hover:text-[#a7b4c8] sm:w-auto sm:min-w-[180px]"
                >
                  Ne slažem se
                </button>
                <button
                  onClick={handleDetailedSave}
                  className="w-full rounded-xl bg-[#14d9b3] px-7 py-3.5 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] sm:w-auto sm:min-w-[180px]"
                >
                  Spremi i zatvori
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
