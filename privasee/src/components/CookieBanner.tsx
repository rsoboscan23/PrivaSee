import type { CookieConsents } from '../types'

type Props = {
  onAccept: (consents: CookieConsents) => void
}

export default function CookieBanner({ onAccept }: Props) {
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

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-[#1c2a38] bg-[#0b1118]/95 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur sm:p-8">
      <div className="mb-6 flex items-start gap-3">
          <span className="text-2xl text-[#14d9b3]">●</span>
          <div>
            <h2 className="font-display text-xl font-semibold text-[#eaf0f7]">
              Ova web stranica koristi kolačiće
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#95a1b4]">
              Koristimo kolačiće kako bismo poboljšali vaše iskustvo, analizirali
              promet i personalizirali sadržaj. Klikom na "Prihvaćam sve"
              pristajete na korištenje svih kolačića opisanih u našoj{' '}
              <button className="text-[#14d9b3] underline decoration-[#14d9b3]/60 underline-offset-4 hover:text-[#6cf2d8]">
                Politici privatnosti
              </button>
              .
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-1 rounded-2xl border border-[#1b2935] bg-[#0f1822] p-4 text-xs text-[#95a1b4]">
          <p>✓ Nužni kolačići — uvijek aktivni</p>
          <p>✓ Analitički kolačići — mjerenje posjeta i ponašanja korisnika</p>
          <p>✓ Marketinški kolačići — personalizirano oglašavanje</p>
          <p>✓ Kolačići za profiliranje — izgradnja korisničkog profila</p>
          <p>✓ Dijeljenje s partnerima — Metas, Googles, i 47 reklamnih partnera</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={handleAcceptAll}
            className="w-full rounded-xl bg-[#14d9b3] px-6 py-3 text-sm font-semibold text-[#031914] transition hover:bg-[#26e9c3] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/70 sm:w-auto sm:flex-1"
          >
            Prihvaćam sve
          </button>
          <button
            onClick={handleNecessaryOnly}
            className="w-full rounded-xl border border-[#2a3a4e] px-6 py-3 text-xs font-medium text-[#748098] transition hover:border-[#3b4f67] hover:text-[#97a5bc] focus:outline-none sm:w-auto"
          >
            Samo nužni kolačići
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-[#6f7b8f]">
          Možete promijeniti postavke u bilo kojem trenutku u postavkama preglednika.
        </p>
    </div>
  )
}
