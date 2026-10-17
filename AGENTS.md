# AGENTS.md

## Scopo

Questo repo è una vetrina statica per racconti audio di bambini, costruita con Next.js e React. L’obiettivo principale è mostrare una pagina iniziale con card audio, QR code e player audio, senza introdurre una logica backend complessa.

Usa il codice esistente come riferimento principale per ogni modifica: `app/page.jsx`, `components/AudioCard.jsx`, `components/StoryPlayer.jsx`, `data/audio.js` e `app/api/audio/[id]/route.js`.

## Architettura

- `app/page.jsx` è la pagina principale: renderizza hero text, navigazione sonora (`WaveNav`) e la griglia di card.
- `components/AudioCard.jsx` è il componente chiave della pagina. È un server component async e genera il QR code a partire dal link Google Drive.
- `components/StoryPlayer.jsx` è un client component che apre un modal/player audio con `audio` HTML e controlli di riproduzione.
- `components/WaveNav.jsx` usa `scrollIntoView()` per spostarsi tra le card.
- `components/Footer.jsx` usa i link social definiti in `data/social.js`.
- `app/api/audio/[id]/route.js` proxy una traccia audio da Google Drive tramite un endpoint `/api/audio/:id`, preservando `Range` e `Content-Range` per supportare la riproduzione.

## Flusso dei dati

- I contenuti principali sono centralizzati in `data/audio.js`.
- Ogni elemento dell'array `audio` ha il formato:

```js
{ nome, oggetto, titolo, link }
```

- `link` deve essere un URL Google Drive condivisibile. Il componente `AudioCard` estrae l'ID con `idDaLink(link)` e costruisce:
  - `url` per il QR code (`https://drive.google.com/file/d/{id}/view`)
  - `audioUrl` per il player (`/api/audio/{id}`)
- Se `link` è vuoto o non valido, la scheda mostra `QR code in arrivo`.
- I testi generali della pagina sono in `progetto` dentro `data/audio.js`.

## Convenzioni di sviluppo

- Mantieni la struttura semplice del progetto: dati statici in `data/`, componenti in `components/`, layout e routing in `app/`.
- Preferisci modifiche incremental e compatibili con la struttura attuale invece di introdurre nuove directory o servizi.
- Quando aggiungi una nuova storia, aggiorna `data/audio.js` e conserva l'ordine e i campi attuali.
- Quando cambi i colori visivi, usa la palette già definita in `components/coloreDi.js` e `AudioCard` per mantenere coerenza con `WaveNav` e le card.
- Per i link social, modifica `data/social.js` invece di hardcodare nuovi link direttamente nel footer.

## Pattern importanti

### Generazione QR code

`AudioCard` usa `qrcode` per generare un SVG server-side:

```js
const svg = await QRCode.toString(url, {
  type: "svg",
  margin: 2,
  errorCorrectionLevel: "M",
  color: { dark: "#12355B", light: "#FFFFFF" },
});
```

Non sostituire il flusso con client-side QR generation senza valutare il comportamento attuale; il progetto si basa su un rendering server-side per mantenere il comportamento e la compatibilità del QR.

### Streaming audio da Google Drive

`app/api/audio/[id]/route.js` valida l'ID con questa regex:

```js
const ID_FILE = /^[a-zA-Z0-9_-]+$/;
```

Prima di aggiungere nuove regole o adapter per altri provider, controlla se il progetto vuole continuare a usare Google Drive come fonte unica.

### Player audio

Il player è implementato in `components/StoryPlayer.jsx` con stato locale (`aperta`, `inRiproduzione`, `terminata`, `errore`).

- il pulsante `Ascolta la storia` apre il dialog overlay;
- `audio` usa `src={audioUrl}`;
- `onError` mostra un messaggio specifico per i file Google Drive non condivisi correttamente.

## Workflow

Esegui le operazioni standard del progetto da root:

```bash
npm install
npm run dev
npm run build
npm run start
```

- `npm run dev`: sviluppo locale su `http://localhost:3000`
- `npm run build`: build di produzione
- `npm run start`: avvio della build prodotta

## Output e modifiche consigliate

- Mantieni i testi in italiano, come nel resto del progetto.
- Quando aggiungi nuove storie, preferisci dati e contenuti statici in `data/audio.js` invece di creare altre fonti dati.
- Se lavori sulle card, assicurati che `id` e `href` continuino a matchare lo scroll di `WaveNav` (`bambino-1`, `bambino-2`, ...).
- Se modifichi il footer o i social, verifica `data/social.js` e la rendering di `Footer.jsx`.

## Integrazioni esterne

- `qrcode` per la generazione del QR code
- Google Drive come sorgente degli audio
- Next.js App Router (`app/`)

Non aggiungere nuove dipendenze o servizi esterni senza un motivo concreto e coerente con la struttura del progetto.

