import type { QuizQuestion } from '../types'

export const questions: QuizQuestion[] = [
  {
    question: 'Što je GDPR?',
    options: [
      'Globalni direktorat za zaštitu prava',
      'Europska uredba o zaštiti osobnih podataka',
      'Vrsta internetskog protokola',
      'Naziv za cookie banner sustav',
    ],
    correctIndex: 1,
  },
  {
    question: 'Koliko dugo web stranice smiju čuvati vaše osobne podatke?',
    options: [
      'Zauvijek, ako ste jednom dali pristanak',
      'Točno 2 godine od prvog posjeta',
      'Samo onoliko dugo koliko je nužno za svrhu prikupljanja',
      'Do 5 godina, po europskom zakonu',
    ],
    correctIndex: 2,
  },
  {
    question: 'Što podrazumijeva "pravo na zaborav" (pravo na brisanje)?',
    options: [
      'Pravo da zamolite web stranicu da izbriše vaše kolačiće',
      'Pravo da tražite brisanje svojih osobnih podataka iz baze tvrtke',
      'Pravo da se vaša povijest pretraživanja automatski briše svaki tjedan',
      'Pravo na anonimno pregledavanje interneta',
    ],
    correctIndex: 1,
  },
  {
    question: 'Koje od navedenog su posebne kategorije osobnih podataka koje GDPR posebno štiti?',
    options: [
      'Ime, email i datum rođenja',
      'Broj telefona i kućna adresa',
      'Zdravstveni podaci, vjersko uvjerenje i biometrijski podaci',
      'Povijest kupnje i omiljene web stranice',
    ],
    correctIndex: 2,
  },
  {
    question: 'Što su kolačići (cookies) treće strane?',
    options: [
      'Kolačići koje postavlja web stranica koju posjećujete',
      'Kolačići koji se brišu kada zatvorite preglednik',
      'Kolačići koje postavljaju vanjski servisi (npr. reklamne mreže) na tuđim stranicama',
      'Šifrirana verzija standardnih kolačića',
    ],
    correctIndex: 2,
  },
]
