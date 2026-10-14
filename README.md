# Vetrina Audio Estate

Una piccola applicazione web realizzata con Next.js per presentare storie di bambini raccontate attraverso audio e QR code.

## Badges

![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![QR Code](https://img.shields.io/badge/QR-Code-2D9CDB)

## Features

- Presentazione visiva delle storie dei bambini in una vetrina moderna.
- Navigazione rapida tra le schede tramite barre sonore.
- Scroll fluido verso la scheda corretta al click.
- Generazione automatica di QR code a partire da link audio.
- Layout responsive pensato per desktop e mobile.
- Footer dedicato con link social e informazioni sul progetto.
- Favicon e metadata SEO migliorate per una presentazione più completa.
- Struttura modulare e facile da estendere con nuovi contenuti.

Il progetto mostra una pagina iniziale con titolo, introduzione, una barra sonora di accesso rapido e una griglia di schede. Ogni scheda contiene un QR code che porta a un file audio associato, generato automaticamente a partire da un link Google Drive.

## Obiettivo del progetto

Il sito ha lo scopo di:

- presentare una raccolta di storie di bambini legate all’estate;
- rendere ogni storia accessibile tramite QR code;
- offrire una navigazione semplice e visiva tra le schede;
- mantenere un design moderno, pulito e scolastico.

## Stack tecnologica

- Next.js 16
- React 19
- JavaScript
- QRCode generator (`qrcode`)

## Funzionalità principali

- pagina iniziale con testo introduttivo e descrizione del progetto;
- navigazione rapida tramite barre sonore;
- scorrimento fluido verso la scheda corretta;
- generazione server-side di QR code a partire da link esterni;
- layout responsive per desktop e mobile;
- footer con link social e informazioni sul progetto;
- favicon personalizzato;
- metadata SEO e Open Graph configurate per la pagina.

## Struttura del progetto

```text
vetrina-audio-estate/
├── app/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── AudioCard.jsx
│   ├── Footer.jsx
│   ├── WaveNav.jsx
│   └── coloreDi.js
├── data/
│   ├── audio.js
│   └── social.js
├── package.json
├─ README.md
└── ...
```

## File principali

### `app/page.jsx`
Contiene la pagina principale della vetrina. Qui vengono renderizzati:

- messaggio introduttivo del progetto;
- navigazione sonora;
- lista delle card audio;
- footer finale.

### `components/AudioCard.jsx`
Rappresenta la singola scheda audio. In questa parte si:

- estraggono dati dal link Google Drive;
- normalizzano l’URL;
- generano il QR code con `qrcode`;
- renderizzano la card con titolo, nome e link.

### `components/WaveNav.jsx`
Componente client che gestisce la navigazione rapida alle schede, con scroll fluido verso la scheda corretta.

### `components/Footer.jsx`
Componente dedicato al pie di pagina, separato dal contenuto principale per maggiore pulizia e manutenzione.

### `data/audio.js`
Contiene l’array di dati con:

- nome del bambino;
- link audio;
- titolo e oggetto, quando disponibili;
- informazioni del progetto.

### `data/social.js`
Contiene la configurazione dei link social da mostrare nel footer.

### `app/globals.css`
File di stile principale del progetto. Include:

- palette colori;
- tipografia;
- layout generale;
- stile delle card;
- layout del footer;
- responsive behavior.

## Requisiti

Per avviare il progetto è necessario avere installato:

- Node.js (versione consigliata: 18+ o superiore)
- npm

## Installazione

1. Clona il repository
2. Apri una finestra del terminale nella cartella del progetto
3. Esegui:

```bash
npm install
```

## Esecuzione in sviluppo

Per avviare l’applicazione in modalità sviluppo:

```bash
npm run dev
```

Poi apri nel browser:

```text
http://localhost:3000
```

## Build di produzione

Per creare la versione ottimizzata per produzione:

```bash
npm run build
```

Per avviare la build prodotta:

```bash
npm run start
```

## SEO e social preview

Il progetto include metadata di base per:

- titolo della pagina;
- descrizione;
- parole chiave;
- Open Graph;
- Twitter card;
- favicon personalizzato.

Questo aiuta a migliorare la presentazione del sito su browser e social network.

## Note importanti

- La generazione dei QR code avviene in ambiente server tramite la libreria `qrcode`.
- I link audio sono pensati per essere Google Drive, ma possono essere adattati ad altri provider.
- Il componente `WaveNav` usa JavaScript client-side per lo scroll fluido verso le schede.

## Possibili sviluppi futuri

- aggiunta di immagini personali per i bambini;
- pagine singole per ogni storia;
- filtro per nome o classe;
- supporto multilingua;
- supporto a più formati audio;
- miglioramento del caricamento e ottimizzazione dei QR.

## Licenza

Questo progetto è stato sviluppato come applicazione personale/progettuale e può essere adattato e ulteriormente sviluppato in base alle esigenze del progetto.

## Conclusione

Questo progetto è una piccola ma completa applicazione Next.js rivolta a una pubblicazione scolastica, con forte attenzione a:

- leggibilità;
- accessibilità;
- velocità di uso;
- presentazione dei contenuti;
- design moderno e curato.

Se vuoi, in futuro puoi estenderlo con un backend, una gestione CMS o una raccolta dati più strutturata.
