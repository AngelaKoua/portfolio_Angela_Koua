import { profile } from "@/content/portfolio";
import FlowerIcon from "./FlowerIcon";
import NavMenu from "./NavMenu";
import styles from "./Header.module.css";

/**
 * `home` : préfixe des liens. Vide sur la page d’accueil ("#jardin"),
 * "/" sur les autres pages pour revenir aux sections de l’accueil ("/#jardin").
 */
export default function Header({ home = "" }: { home?: string }) {
  return (
    <header id="top" className={styles.header}>
      <div className={styles.inner}>
        <a href={home ? `${home}#top` : "#top"} className={styles.brand}>
          <FlowerIcon size={30} />
          <span>{profile.firstName}</span>
        </a>
        <NavMenu
          links={[
            { href: `${home}#jardin`, label: "Projets" },
            { href: `${home}#racines`, label: "A propos" },
            { href: `${home}#contact`, label: "Contact" },
          ]}
        />
      </div>
    </header>
  );
}
