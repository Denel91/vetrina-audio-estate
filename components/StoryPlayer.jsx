"use client";

import { useEffect, useRef, useState } from "react";

export default function StoryPlayer({ nome, oggetto, titolo, audioUrl, accent }) {
  const [aperta, setAperta] = useState(false);
  const [terminata, setTerminata] = useState(false);
  const [inRiproduzione, setInRiproduzione] = useState(false);
  const [errore, setErrore] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (!aperta) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setAperta(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      audioRef.current?.pause();
      setInRiproduzione(false);
    };
  }, [aperta]);

  const apri = () => {
    setTerminata(false);
    setErrore("");
    setInRiproduzione(false);
    setAperta(true);
  };

  const avviaAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setErrore("");
    setInRiproduzione(true);

    try {
      await audio.play();
    } catch {
      setInRiproduzione(false);
      setErrore("Non è stato possibile avviare l'audio. Usa il pulsante play del player.");
    }
  };

  const fermaAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setInRiproduzione(false);
    setTerminata(false);
  };

  return (
    <>
      <button
        type="button"
        className="ascolta"
        style={{ "--accent": accent }}
        onClick={apri}
      >
        <span aria-hidden="true">▶</span>
        Ascolta la storia
      </button>

      {aperta && (
        <div
          className="player-overlay"
        >
          <section
            className="player"
            role="dialog"
            aria-modal="true"
            aria-labelledby="player-titolo"
          >
            <button
              type="button"
              className="player-chiudi"
              onClick={() => setAperta(false)}
              aria-label="Chiudi il player"
            >
              ×
            </button>

            <div className="player-copertina" style={{ "--accent": accent }}>
              <span className="player-sole" aria-hidden="true">☀</span>
              <span className="player-onda" aria-hidden="true">〰</span>
              <span className="player-etichetta">Una storia d&apos;estate</span>
            </div>

            <p className="player-sopratitolo">La storia di {nome}</p>
            <h2 id="player-titolo">{titolo || `Il racconto di ${nome}`}</h2>
            {oggetto && <p className="player-oggetto">Oggetto: {oggetto}</p>}

            <div className={`player-onda-audio ${terminata ? "is-finita" : ""}`} aria-hidden="true">
              {Array.from({ length: 21 }, (_, index) => (
                <i key={index} />
              ))}
            </div>

            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              preload="metadata"
              onEnded={() => {
                setTerminata(true);
                setInRiproduzione(false);
              }}
              onPlay={() => {
                setTerminata(false);
                setInRiproduzione(true);
                setErrore("");
              }}
              onPause={() => setInRiproduzione(false)}
              onError={() => {
                setInRiproduzione(false);
                setErrore("Questo file non è raggiungibile. Controlla che la condivisione Google Drive sia impostata su “Chiunque abbia il link”.");
              }}
            >
              Il tuo browser non supporta la riproduzione audio.
            </audio>

            <button
              type="button"
              className="avvia-audio"
              onClick={inRiproduzione ? fermaAudio : avviaAudio}
              aria-label={inRiproduzione ? "Ferma la storia" : "Avvia la storia"}
            >
              {inRiproduzione ? "■ Stop" : "▶ Avvia ascolto"}
            </button>

            {errore && (
              <p className="player-errore" role="alert">
                {errore}
              </p>
            )}

            {terminata && (
              <div className="player-finale" role="status">
                <span aria-hidden="true">✦</span>
                <strong>Hai ascoltato una storia della classe!</strong>
                <span aria-hidden="true">✦</span>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
