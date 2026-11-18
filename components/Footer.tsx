import { profile } from "@/content/portfolio";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>Fait par {profile.firstName}</p>
        <a href="#top">Retour en haut</a>
      </div>
    </footer>
  );
}
