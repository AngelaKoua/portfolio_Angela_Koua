import { profile } from "@/content/portfolio";
import FallingPetals from "./FallingPetals";
import HeroBranch from "./HeroBranch";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titre">
      <div className={styles.text}>
        <p className="hand-note">{profile.heroNote}</p>
        <p className={styles.kicker}>
          {profile.firstName}, {profile.job}
        </p>
        <h1 id="hero-titre" className={styles.title}>
          {profile.headline} <em>{profile.headlineAccent}</em>
        </h1>
        <p className={styles.intro}>{profile.intro}</p>
        <div className={styles.actions}>
          <a href="#jardin" className="btn btn-primary">
            Explorer mes projets
          </a>
          <a href="#contact" className="btn btn-line">
            Me contacter
          </a>
        </div>
      </div>

      {/* La classe in-view lance l’animation de pousse dès le chargement */}
      <div className={`${styles.art} in-view`}>
        <HeroBranch />
        <FallingPetals />
      </div>
    </section>
  );
}
