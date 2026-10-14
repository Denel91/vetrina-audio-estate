"use client";

import { coloreDi } from "./coloreDi";

export default function WaveNav({ audio, ariaLabel = "Navigazione rapida alle storie dei bambini" }) {
  const scrollToCard = (id) => {
    const card = document.getElementById(id);
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="onde" aria-label={ariaLabel}>
      {audio.map((a, i) => {
        const id = `bambino-${i + 1}`;

        return (
          <a
            key={a.nome || i}
            href={`#${id}`}
            aria-label={`Vai alla scheda di ${a.nome}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToCard(id);
            }}
            style={{
              background: coloreDi(i),
              height: `${40 + ((i * 37) % 50)}px`,
            }}
          />
        );
      })}
    </nav>
  );
}
