import type { QuizQuestion } from '../types'

export const questions: QuizQuestion[] = [
  {
    question:
      'Tvoj prijatelj objavi sliku s tvojeg rođendana na Instagramu i tagira te bez pitanja. Imaš li pravo tražiti da je ukloni?',
    options: [
      'Ne, jer je to njegova slika i može raditi s njom što želi',
      'Ne, jer si bio/bila na javnom događaju',
      'Da, imaš pravo na brisanje osobnih podataka',
      'Samo ako ti je lice jasno vidljivo',
    ],
    correctIndex: 2,
    incorrectExplanation:
      'Vlasništvo nad fotografijom (autorsko pravo) i pravo na privatnost su dvije različite stvari — može biti njegova slika, a opet kršiti tvoju privatnost. Privatni rođendan nije "javni događaj" u smislu koji bi uklonio pravo na privatnost. Pravo na brisanje ne ovisi o tome koliko je lice vidljivo — tag sam po sebi stvara osobni podatak.',
  },
  {
    question:
      'Tvrtka prikuplja tvoju e-mail adresu za dostavu narudžbe. Smiju li je nakon toga koristiti i za slanje reklamnih emailova?',
    options: [
      'Da, jer su već dobili tvoje podatke',
      'Da, ako je napisano negdje u uvjetima sitnim slovima',
      'Smiju, ali samo jednom',
      'Ne, podaci prikupljeni u jednu svrhu ne smiju se koristiti u drugu bez nove privole',
    ],
    correctIndex: 3,
    incorrectExplanation:
      'Dobivanje podataka za jedan cilj ne daje automatsko pravo na sve ostale svrhe — to je načelo ograničavanja svrhe. Sitna slova u uvjetima ne mogu zamijeniti valjanu i jasnu privolu za marketing — privola mora biti posebna i izričita, ne zakopana. "Samo jednom" je izmišljeno pravilo bez GDPR temelja.',
  },
  {
    question:
      'Restoran želi postaviti kamere u toaletima u svrhu sprečavanja nezgoda. Je li to dopušteno?',
    options: [
      'Da, vlasnik može nadzirati vlastite prostorije',
      'Da, ako postavi natpis o videonadzoru',
      'Ne, prava ispitanika nadilaze interes vlasnika',
      'Dopušteno samo u radnom vremenu',
    ],
    correctIndex: 2,
    incorrectExplanation:
      'Vlasništvo nad prostorom ne daje automatski pravo nadzora — interesi moraju biti odvagnuti. Natpis o videonadzoru ne može "legalizirati" inače nezakonitu obradu. Radno vrijeme ne mijenja apsolutnu zabranu kamera u sanitarnim prostorima.',
  },
  {
    question:
      'Vozač ugradio dash-cam zbog eventualne prometne nesreće. Smije li kamera stalno snimati promet i prolaznike?',
    options: [
      'Da, jer je cilj zaštita u nesreći',
      'Ne, stalno snimanje prolaznika ne može se opravdati potencijalnom nesrećom',
      'Da, javna cesta je javni prostor',
      'Samo na autocestama',
    ],
    correctIndex: 1,
    incorrectExplanation:
      'Cilj (zaštita u nesreći) mora biti proporcionalan sredstvima — stalno masovno snimanje nije proporcionalno zaštiti od "teoretske" nesreće. Javnost prostora ne ukida pravo na privatnost. Vrsta ceste (autocesta vs. lokalna) nije relevantni pravni kriterij.',
  },
  {
    question:
      'Registriraš se na streaming servis i traže od tebe i vjersku orijentaciju. Kažu da je privola "nužna za pristup filmovima". Je li ta privola valjana?',
    options: [
      'Ako je napisano u uvjetima korištenja onda je valjana',
      'Web stranice smiju tražiti što žele',
      'Da, ako sam/a označiš kućicu',
      'Ne, to je "vezana privola" i nije slobodna',
    ],
    correctIndex: 3,
    incorrectExplanation:
      'Označavanje kućice nije dovoljno — privola mora biti slobodna. Ako odbijanje znači da ne možeš koristiti uslugu, privola nije slobodna, već iznuđena. Web stranice ne smiju tražiti bilo što — posebno ne osjetljive podatke bez valjane osnove. Uvjeti korištenja ne mogu legalizirati nezakonitu prisilu.',
  },
  {
    question:
      'Tvoja škola želi uvesti sustav prepoznavanja lica za evidenciju dolazaka učenika. Je li to u redu?',
    options: [
      'Škola ima pravo znati tko dolazi, to je u redu',
      'Da, ukoliko roditelji potpišu suglasnost',
      'Ne, bez iznimno jakog opravdanja',
      'Ako se podaci brišu svaki dan, onda je valjan zahtjev',
    ],
    correctIndex: 2,
    incorrectExplanation:
      'Pravo škole da zna tko dolazi može se ostvariti mnogo manje invazivnim metodama (kartica, potpis) — biometrija mora biti nužna, ne samo praktična. Roditeljski potpis ne može legalizirati obradu koja nema valjanu pravnu osnovu, posebno za djecu. Brisanje podataka svaki dan ne rješava problem nezakonitosti same obrade — problem je u tome što se biometrija uopće koristi, ne samo koliko dugo se čuva.',
  },
]
