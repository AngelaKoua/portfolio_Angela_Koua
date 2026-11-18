import { contact, profile } from "@/content/portfolio";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-titre">
      <div className={styles.inner}>
        {/* Une graine qui germe quand on arrive en bas de page */}
        <Reveal>
          <svg className={styles.seed} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <path d="M10 94 C 40 88, 80 88, 110 94" className="soil" />
            <path d="M60 92 C 60 72, 58 58, 62 40" className="twig draw" style={{ animationDuration: "1.2s" }} />
            <g transform="translate(61 52)">
              <g className="pop" style={{ animationDelay: "0.9s" }}>
                <use href="#fl-leaf" transform="rotate(-35) scale(0.75)" />
              </g>
            </g>
            <g transform="translate(60 64)">
              <g className="pop" style={{ animationDelay: "1.1s" }}>
                <use href="#fl-leaf2" transform="rotate(-150) scale(0.7)" />
              </g>
            </g>
            <ellipse cx="60" cy="96" rx="13" ry="8" className={styles.seedShape} />
          </svg>
        </Reveal>

        <p className="hand-note">et maintenant ?</p>
        <h2 id="contact-titre" className={`section-title ${styles.title}`}>
          {contact.title}
        </h2>
        <p className={styles.text}>{contact.text}</p>

        <a href={`mailto:${profile.email}`} className="btn btn-primary">
          Écrire un message
        </a>
        <p className={styles.email}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>

        {profile.socials.length > 0 && (
          <ul className={styles.socials}>
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
