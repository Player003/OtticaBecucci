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

Hero (sfondo: Duomo di Firenze) · Numeri/Stats · Chi siamo · Servizi · **Tipi di
lenti** · **Carosello montature** · Marche (marquee) · Banner stile · Promozioni ·
Dove siamo / Contatti (mappa con consenso) · Banner Firenze · Footer.

Elementi interattivi: contatori animati, carosello di montature (frecce, dots,
swipe, autoplay), marquee marche, animazioni allo scroll, pulsante "torna su",
banner cookie e mappa caricata solo dopo il consenso.

## Come modificare i contenuti

- **Testi:** modificare direttamente `index.html` (IT) e `en/index.html` (EN).
- **Promozioni:** cercare il commento `NOTA PER IL TITOLARE` / `NOTE TO OWNER`
  e aggiornare titoli, percentuali e scadenze. **Le offerte attuali sono di
  esempio e vanno aggiornate.**
- **Orari, telefono, email, indirizzo:** presenti nelle sezioni "Contatti",
  nel footer e nel blocco dati strutturati `application/ld+json` (aggiornare
  in entrambe le lingue se cambiano).

## Immagini e crediti

Le fotografie (hero Duomo di Firenze, skyline, montature del carosello, foto
"chi siamo", banner stile) sono **foto royalty-free di [Unsplash](https://unsplash.com/license)**,
scaricate e ospitate localmente in `assets/images/`. La licenza Unsplash ne
consente l'uso gratuito anche commerciale; l'attribuzione non è obbligatoria ma
gradita.

I **tipi di lenti** (`assets/images/lenses/*.svg`) e il logo/favicon sono
illustrazioni vettoriali realizzate su misura.

### Da sostituire con materiale reale (consigliato)

| File | Uso | Note |
|------|-----|------|
| `assets/images/frame-*.jpg` | Carosello montature | Sostituire con foto reali dei modelli in vendita |
| `assets/images/hero.jpg` | Sfondo hero (Firenze) | Opzionale: una foto propria del negozio/vetrina |
| `assets/images/about.jpg` | Sezione "Chi siamo" | Opzionale: foto del titolare/team |
| `assets/images/og-image.svg` | Anteprima social | Esportare in `.jpg`/`.png` (gli SVG non sempre vengono renderizzati dai social) |

## Cookie e privacy (GDPR)

Il sito usa **solo cookie tecnici**. Non sono presenti analytics o tracciamenti.
La **mappa di Google** (terza parte che può installare cookie) viene caricata
**solo dopo il consenso** tramite il banner cookie; in caso di rifiuto resta un
link per aprire Google Maps in una nuova scheda. La scelta è salvata in
`localStorage`. Per una piena conformità si consiglia di collegare una pagina di
**Cookie/Privacy Policy** completa al link "Maggiori informazioni" del banner.

## SEO e buone pratiche incluse

- HTML semantico, un solo `<h1>` per pagina, gerarchia di heading corretta.
- Meta `title`/`description`, `canonical`, **hreflang** (it / en / x-default).
- **Open Graph** e **Twitter Card**.
- Dati strutturati **schema.org `Optician`** (indirizzo, geo, telefono, orari).
- `robots.txt` + `sitemap.xml`.
- Accessibilità: skip link, `aria-label`, focus visibile, contrasto, supporto a
  `prefers-reduced-motion`.
- Performance: CSS/JS propri e leggeri, JS `defer`, immagini `loading="lazy"`
  con `width`/`height` per evitare layout shift, mappa caricata on-demand.
- Privacy: nessun cookie di terze parti prima del consenso (mappa Google gated).

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

### GitHub Pages (automatico)

Il repository include il workflow `.github/workflows/deploy-pages.yml` che pubblica
il sito su GitHub Pages a ogni push. **Serve un solo passaggio manuale una tantum**
(il token automatico delle Actions non ha i permessi per attivare Pages da solo):

1. Vai su **Settings → Pages** del repository.
2. In **Build and deployment → Source**, seleziona **GitHub Actions**.
3. Riesegui il workflow *"Deploy to GitHub Pages"* dalla scheda **Actions**
   (oppure fai un nuovo push).

Al termine, il sito sarà online su **https://player003.github.io/OtticaBecucci/**
(IT) e **/OtticaBecucci/en/** (EN). Per usare il dominio reale `otticabecucci.it`,
impostare un *Custom domain* in Settings → Pages e aggiornare i record DNS.

## Da completare (a cura del titolare)

- [ ] Sostituire le immagini placeholder con foto reali.
- [ ] Aggiornare le promozioni attive.
- [ ] Inserire i link reali ai social (Facebook / Instagram) nel footer.
- [ ] Verificare le coordinate `geo` (lat/long) esatte del negozio.
- [ ] (Opzionale) Collegare un form di contatto tramite servizio esterno (es. Formspree).
