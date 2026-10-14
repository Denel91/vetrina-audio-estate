import { socialLinks } from "../data/social";

export default function Footer({ audioLength }) {
  return (
    <footer className="piede" aria-label="Footer del progetto">
      <div className="piede-testo">
        <span className="piede-segnale" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>

        <p>
          {audioLength} storie raccontate dai bambini della classe © <span>Daniele Di Salvo</span>
        </p>
      </div>

      <div className="piede-creatore" aria-label="Profilo e social del creatore">
        <div className="social-links" aria-label="Link ai social media di Daniele Di Salvo">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label={item.label}
            >
              <item.icon aria-hidden="true" className="social-icon" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
