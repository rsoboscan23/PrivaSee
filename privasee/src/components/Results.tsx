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
  const scorePercent = Math.round((score / totalQuestions) * 100)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Evo što ste predali</h1>
          <p className="mt-2 text-sm text-gray-500">
            Ovo je sve što je tipična web stranica prikupila u zadnjih nekoliko minuta.
          </p>
        </div>

        {/* Quiz score */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Rezultat kviza
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-700">
              {score}/{totalQuestions}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {scorePercent}% točnih odgovora
              </p>
              <p className="text-sm text-gray-500">
                {score === totalQuestions
                  ? 'Odlično! Dobro poznajete digitalnu privatnost.'
                  : score >= 3
                    ? 'Solidno znanje — ali uvijek ima prostora za više.'
                    : 'Vrijedi pročitati više o digitalnoj privatnosti!'}
              </p>
            </div>
          </div>
        </div>

        {/* Cookie consents */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Što ste prihvatili klikom na cookie banner
          </h2>
          {consents.accepted ? (
            <ul className="space-y-2">
              {consentLabels.map(({ key, label }) => (
                <li key={key} className="flex items-center gap-2 text-sm text-gray-800">
                  <span className="text-red-500">✓</span>
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Odabrali ste samo nužne kolačiće. Dobra odluka — ali rijetko tko
              to odabere.
            </p>
          )}
        </div>

        {/* Personal data */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Osobni podaci koje ste upisali
          </h2>
          <dl className="space-y-2 text-sm">
            {[
              { label: 'Ime i prezime', value: userData.name || '—' },
              { label: 'Email', value: userData.email || '—' },
              { label: 'Datum rođenja', value: userData.birthDate || '—' },
              { label: 'Grad', value: userData.city || '—' },
              { label: 'Zanimanje', value: userData.occupation || '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            Na pravoj web stranici, ovi podaci mogu biti prodani trećim stranama,
            korišteni za ciljano oglašavanje ili pohranjeni godinama.
          </p>
        </div>

        {/* Dark patterns */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Dark paterni koje smo koristili
          </h2>
          <ul className="space-y-4">
            {darkPatterns.map(pattern => (
              <li key={pattern.name}>
                <p className="text-sm font-semibold text-gray-900">{pattern.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{pattern.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Educational message */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white">
          <h2 className="mb-2 text-base font-semibold">Što možete učiniti?</h2>
          <ul className="space-y-1 text-sm text-blue-100">
            <li>• Uvijek pročitajte što prihvaćate na cookie bannerima</li>
            <li>• Koristite preglednik s ugrađenom blokadom trackera (Firefox, Brave)</li>
            <li>• Redovito brišite kolačiće i pregledavajte postavke privatnosti</li>
            <li>• Znate da imate pravo zatražiti brisanje vaših podataka (GDPR čl. 17)</li>
          </ul>
        </div>

        <button
          onClick={onRestart}
          className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Počni iznova
        </button>
      </div>
    </div>
  )
}
