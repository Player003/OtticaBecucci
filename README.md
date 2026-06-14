# Ottica Becucci — Landing Page

Landing page moderna, bilingue (italiano / inglese) e ottimizzata per SEO per
**Ottica Becucci**, ottica a Firenze dal 1953.

Sito statico in **HTML / CSS / JavaScript vanilla**: nessun build, nessuna
dipendenza, massima velocità e portabilità.

## Struttura del progetto

```
.
├── index.html              # Landing in italiano (lingua predefinita)
├── en/index.html           # Landing in inglese
├── assets/
│   ├── css/styles.css      # Stili (mobile-first, variabili CSS)
│   ├── js/main.js          # Header sticky, menu mobile, scroll reveal, anno footer
│   └── images/             # Logo, favicon e immagini placeholder (SVG)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## Sezioni della pagina

Hero · Chi siamo · Servizi · Marche · Promozioni · Dove siamo / Contatti · Footer.

## Come modificare i contenuti

- **Testi:** modificare direttamente `index.html` (IT) e `en/index.html` (EN).
- **Promozioni:** cercare il commento `NOTA PER IL TITOLARE` / `NOTE TO OWNER`
  e aggiornare titoli, percentuali e scadenze. **Le offerte attuali sono di
  esempio e vanno aggiornate.**
- **Orari, telefono, email, indirizzo:** presenti nelle sezioni "Contatti",
  nel footer e nel blocco dati strutturati `application/ld+json` (aggiornare
  in entrambe le lingue se cambiano).

## Immagini da sostituire (placeholder → foto reali)

Le seguenti immagini sono segnaposto SVG e andrebbero sostituite con foto reali
ottimizzate (preferibilmente `.webp`):

| File | Uso | Dimensioni consigliate |
|------|-----|------------------------|
| `assets/images/hero.svg` | Sfondo hero | 1600×900 |
| `assets/images/store.svg` | Foto negozio (Chi siamo) | 600×450 |
| `assets/images/og-image.svg` | Anteprima social | 1200×630 (esportare in `.jpg`/`.png`) |

> Per l'anteprima social, molte piattaforme non renderizzano gli SVG: esportare
> `og-image` in `.jpg`/`.png` e aggiornare i meta `og:image` / `twitter:image`
> (e l'`image` del JSON-LD) di conseguenza. (Opzionale) aggiungere un
> `apple-touch-icon.png` 180×180 e il relativo `<link rel="apple-touch-icon">`.

## SEO e buone pratiche incluse

- HTML semantico, un solo `<h1>` per pagina, gerarchia di heading corretta.
- Meta `title`/`description`, `canonical`, **hreflang** (it / en / x-default).
- **Open Graph** e **Twitter Card**.
- Dati strutturati **schema.org `Optician`** (indirizzo, geo, telefono, orari).
- `robots.txt` + `sitemap.xml`.
- Accessibilità: skip link, `aria-label`, focus visibile, contrasto, supporto a
  `prefers-reduced-motion`.
- Performance: CSS/JS propri e leggeri, JS `defer`, immagini `loading="lazy"`,
  iframe mappa lazy.

## Anteprima locale

Trattandosi di un sito statico, basta aprire `index.html` nel browser. Per i
percorsi assoluti (es. `/assets/...`) è consigliato un piccolo server locale:

```bash
python3 -m http.server 8080
# poi apri http://localhost:8080/  (IT)  e  http://localhost:8080/en/  (EN)
```

## Pubblicazione

Il sito può essere ospitato su qualsiasi hosting statico (GitHub Pages, Netlify,
o lo spazio web attuale). Aggiornare il dominio in `canonical`, `hreflang`,
`og:url`, `sitemap.xml` e `robots.txt` se diverso da `https://www.otticabecucci.it`.

## Da completare (a cura del titolare)

- [ ] Sostituire le immagini placeholder con foto reali.
- [ ] Aggiornare le promozioni attive.
- [ ] Inserire i link reali ai social (Facebook / Instagram) nel footer.
- [ ] Verificare le coordinate `geo` (lat/long) esatte del negozio.
- [ ] (Opzionale) Collegare un form di contatto tramite servizio esterno (es. Formspree).
