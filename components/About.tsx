import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { about, profile } from "@/content/portfolio";
import Reveal from "./Reveal";
import styles from "./About.module.css";

/** La tige du jardin plonge dans la terre et se transforme en racines. */
const ROOTS = [
  "M120 30 C 116 70, 96 100, 58 128 C 44 138, 34 150, 28 168",
  "M120 30 C 126 72, 146 102, 180 124 C 194 134, 204 150, 208 166",
  "M120 32 C 118 80, 124 130, 118 186",
];

const ROOTLETS = [
  "M112 62 C 98 74, 84 78, 66 78",
  "M130 68 C 144 78, 160 82, 176 80",
  "M119 120 C 108 132, 100 146, 96 160",
  "M121 140 C 132 150, 138 162, 140 176",
  "M58 128 C 50 120, 40 116, 30 116",
  "M180 124 C 190 116, 200 114, 212 116",
];

/** La photo n’est affichée que si le fichier existe bien dans /public. */
const hasPhoto = about.photo !== "" && existsSync(join(process.cwd(), "public", about.photo));

export default function About() {
  return (
    <section id="racines" className={styles.about} aria-labelledby="racines-titre">
      <svg
        className={styles.ground}
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0 H1440 V10 C 1300 18, 1180 4, 1040 12 C 900 20, 780 6, 640 14 C 500 22, 380 6, 240 12 C 140 16, 60 8, 0 14 Z" />
      </svg>

      <Reveal className={styles.rootsWrap}>
        <svg
          className={styles.roots}
          width="240"
          height="200"
          viewBox="0 0 240 200"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M120 0 C 120 12, 120 22, 120 34" className="stem" />
          {ROOTS.map((d, i) => (
            <path
              key={d}
              d={d}
              className="root draw"
              style={{ animationDelay: `${0.1 + i * 0.15}s`, animationDuration: "1.6s" }}
            />
          ))}
          {ROOTLETS.map((d, i) => (
            <path
              key={d}
              d={d}
              className="root-sm draw"
              style={{ animationDelay: `${0.8 + i * 0.1}s`, animationDuration: "1s" }}
            />
          ))}
        </svg>
      </Reveal>

      <div className={styles.grid}>
        <div className={styles.heading}>
          <p className="hand-note">à propos</p>
          <h2 id="racines-titre" className="section-title">
            Qui je suis
          </h2>
        </div>
        {hasPhoto && (
          <figure className={styles.portrait}>
            <div className={styles.frame}>
              <Image
                src={about.photo}
                alt={about.photoAlt}
                fill
                sizes="(max-width: 860px) 220px, 280px"
                className={styles.photo}
              />
            </div>
            <svg
              className={styles.sprig}
              viewBox="0 0 90 90"
              aria-hidden="true"
              focusable="false"
            >
              <use href="#fl-leaf2" transform="translate(30 62) rotate(-160) scale(0.9)" />
              <use href="#fl-leaf" transform="translate(30 62) rotate(-25) scale(1)" />
              <use href="#fl-flower" transform="translate(30 62) scale(0.62)" />
            </svg>
          </figure>
        )}
        <div className={`${styles.body} ${hasPhoto ? "" : styles.bodyAlone}`}>
          <p>{about.text}</p>
          {profile.cvUrl && (
            <a href={profile.cvUrl} className="btn btn-line" download>
              Télécharger mon CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
