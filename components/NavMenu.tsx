"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Header.module.css";

type NavLink = { href: string; label: string };

/**
 * Navigation principale.
 * Sur grand écran : liens en ligne dans l’en-tête.
 * Sur téléphone : une icône ronde sur le côté, qui ouvre un panneau glissant depuis la droite.
 */
export default function NavMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    // Focus sur le premier lien, Échap pour fermer, page bloquée derrière le panneau
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={styles.menu}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.toggleIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        aria-hidden="true"
        onClick={close}
      />

      <nav
        ref={navRef}
        id={navId}
        aria-label="Navigation principale"
        className={`${styles.nav} ${open ? styles.open : ""}`}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <svg className={styles.navSprig} viewBox="0 0 120 70" aria-hidden="true" focusable="false">
          <path d="M60 68 C 60 54, 58 42, 60 28" className="twig" />
          <use href="#fl-leaf" transform="translate(60 52) rotate(-30) scale(0.6)" />
          <use href="#fl-leaf2" transform="translate(60 46) rotate(-150) scale(0.55)" />
          <use href="#fl-flower" transform="translate(60 24) scale(0.7)" />
        </svg>
      </nav>
    </div>
  );
}
