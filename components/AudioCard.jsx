import QRCode from "qrcode";
import StoryPlayer from "./StoryPlayer";

const COLORI = ["#FFC233", "#5ED1C6", "#FF8FA3", "#B7A8FF"];

// Estrae l'ID del file da un link di condivisione di Google Drive.
// Funziona con link tipo:
//   https://drive.google.com/file/d/ID/view?usp=sharing
//   https://drive.google.com/open?id=ID
export function idDaLink(link) {
  if (!link) return null;
  const m = link.match(/\/d\/([\w-]+)/) || link.match(/[?&]id=([\w-]+)/);
  return m ? m[1] : null;
}

export function coloreDi(indice) {
  return COLORI[indice % COLORI.length];
}

// Genera il QR code (SVG) sul server, senza JavaScript lato visitatore.
async function creaQr(url) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#12355B", light: "#FFFFFF" },
  });
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default async function AudioCard({ indice, nome, oggetto, titolo, link }) {
  const id = idDaLink(link);
  // Link accorciato alla forma standard: il QR code resta più semplice da inquadrare.
  const url = id ? `https://drive.google.com/file/d/${id}/view` : link;
  const audioUrl = id ? `/api/audio/${id}` : link;
  const qr = url ? await creaQr(url) : null;

  return (
    <article
      id={`bambino-${indice + 1}`}
      className="card"
      style={{ "--accent": coloreDi(indice) }}
    >
      <header className="card-testa">
        <h2>{nome}</h2>
        {oggetto && <p>Oggetto: {oggetto}</p>}
      </header>

      <div className="card-corpo">
        {titolo && <p className="titolo-storia">{titolo}</p>}

        {qr ? (
          <>
            <StoryPlayer
              nome={nome}
              oggetto={oggetto}
              titolo={titolo}
              audioUrl={audioUrl}
              accent={coloreDi(indice)}
            />
            <a
              className="qr"
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Apri l'audio di ${nome}`}
            >
              <img src={qr} alt={`QR code per ascoltare l'audio di ${nome}`} />
            </a>
            <a className="scarica" href={qr} download={`qr-${nome}.svg`}>
              Scarica il QR code
            </a>
          </>
        ) : (
          <p className="attesa">QR code in arrivo</p>
        )}
      </div>
    </article>
  );
}
