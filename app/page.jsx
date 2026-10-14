import AudioCard from "../components/AudioCard";
import Footer from "../components/Footer";
import WaveNav from "../components/WaveNav";
import { audio, progetto } from "../data/audio";

export default function Home() {
  return (
    <main>
      <header className="hero">
        <p className="sotto">
          {progetto.classe}, {progetto.anno}
        </p>
        <h1>{progetto.titolo}</h1>
        <p className="intro">{progetto.introduzione}</p>
        <p className="intro descrizione">{progetto.descrizione}</p>

        <WaveNav
          audio={audio}
          ariaLabel="Navigazione rapida alle storie dei bambini"
        />
      </header>

      <section className="griglia" aria-label="Gli audio dei bambini">
        {audio.map((a, i) => (
          <AudioCard key={a.nome || i} indice={i} {...a} />
        ))}
      </section>

      <Footer audioLength={audio.length} />
    </main>
  );
}
