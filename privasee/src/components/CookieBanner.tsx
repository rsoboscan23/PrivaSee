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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-2xl rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:mx-4">
        <div className="mb-4 flex items-start gap-3">
          <span className="text-2xl">🍪</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Ova web stranica koristi kolačiće
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Koristimo kolačiće kako bismo poboljšali vaše iskustvo, analizirali
              promet i personalizirali sadržaj. Klikom na "Prihvaćam sve"
              pristajete na korištenje svih kolačića opisanih u našoj{' '}
              <button className="text-blue-600 underline hover:text-blue-800">
                Politici privatnosti
              </button>
              .
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-lg bg-gray-50 p-4 text-xs text-gray-500 space-y-1">
          <p>✓ Nužni kolačići — uvijek aktivni</p>
          <p>✓ Analitički kolačići — mjerenje posjeta i ponašanja korisnika</p>
          <p>✓ Marketinški kolačići — personalizirano oglašavanje</p>
          <p>✓ Kolačići za profiliranje — izgradnja korisničkog profila</p>
          <p>✓ Dijeljenje s partnerima — Metas, Googles, i 47 reklamnih partnera</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={handleAcceptAll}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:flex-1"
          >
            Prihvaćam sve
          </button>
          <button
            onClick={handleNecessaryOnly}
            className="w-full rounded-lg border border-gray-300 px-6 py-3 text-xs font-normal text-gray-400 hover:border-gray-400 hover:text-gray-500 focus:outline-none sm:w-auto"
          >
            Samo nužni kolačići
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-400">
          Možete promijeniti postavke u bilo kojem trenutku u postavkama preglednika.
        </p>
      </div>
    </div>
  )
}
