# PrivaSee
Project about privacy of personal information.
<img width="1920" height="1080" alt="POP_Soboscan_Vusic_v2" src="https://github.com/user-attachments/assets/9184873b-14c6-4eb0-867d-c7d01dd3935b" />
# Privacy Awareness Quiz App

Edukativna web aplikacija koja demonstrira koliko jednostavno korisnici predaju osobne podatke i prihvaćaju uvjete bez čitanja.

---

## O projektu

Aplikacija simulira tipičan tok modernih web stranica — cookie banner, formu za "personalizaciju" i kviz — a zatim korisniku na kraju prikaže sve što je prihvatio i predao. Cilj je podizanje svjesnosti o digitalnoj privatnosti kroz interaktivno iskustvo.

---

## Ekrani i funkcionalnosti

### 1. Cookie banner
- Prikazuje se odmah pri ulasku i blokira sadržaj stranice (modal overlay)
- Gumb **"Prihvaćam sve"** vizualno dominira — veći, obojen, na istaknutom mjestu
- Gumb **"Samo nužni kolačići"** je namjerno teže uočljiv (outline stil, siva boja)
- Nema gumba "Odbij sve" niti lako dostupnih postavki privatnosti
- Prihvaćanjem se bilježe privole: analitika, marketing, profiliranje, dijeljenje s partnerima
- Bez interakcije s bannerom — aplikacija se ne može koristiti

### 2. Forma osobnih podataka
- Prikazuje se odmah nakon bannera kao obavezan korak
- Polja: ime i prezime, email, datum rođenja, grad, zanimanje
- Predstavlja se korisniku kao nužna "personalizacija kviza"
- Validacija obaveznih polja: ime, email, datum rođenja
- Podaci ostaju lokalno u aplikaciji, ne šalju se na server

### 3. Kviz o digitalnoj privatnosti
- 5 pitanja s višestrukim izborom (4 ponuđena odgovora)
- Jedno pitanje prikazano odjednom s progress barom
- Nije moguće preskočiti pitanje bez odabira odgovora
- Bodovanje: 1 bod po točnom odgovoru
- Teme: GDPR, kolačići, pravo na zaborav, čuvanje podataka, posebne kategorije podataka

### 4. Ekran rezultata
- Prikazuje rezultat kviza (X / 5 točnih odgovora)
- Lista svega što je korisnik prihvatio klikom na cookie banner
- Prikaz svih osobnih podataka koje je korisnik upisao u formu
- Edukativna poruka o tome što web stranice rade s tim podacima
- Pregled dark patterna korištenih u aplikaciji
- Gumb za ponovni pokretanje od početka

---

## Dark paterni koje aplikacija demonstrira

| Dark pattern | Implementacija |
|---|---|
| **Naranging** | "Prihvati sve" je vizualno dominantan, "Samo nužni" je potisnut |
| **Lažna nužnost** | Forma tvrdi da su osobni podaci potrebni za personalizaciju kviza |
| **Skriveni opseg** | Korisnik ne zna što točno prihvaća dok ne vidi ekran rezultata |
| **Nema odbijanja** | Ne postoji opcija "Odbij sve" na cookie banneru |

