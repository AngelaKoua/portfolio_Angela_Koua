"use client";

import { useCallback, useState } from "react";
import type { Project } from "@/content/portfolio";
import FlowerIcon from "./FlowerIcon";
import GardenRow from "./GardenRow";
import styles from "./Garden.module.css";

export default function Garden({ projects }: { projects: Project[] }) {
  // Le premier projet est déjà en fleur à l’arrivée
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const allOpen = projects.length > 0 && projects.every((_, i) => open.has(i));

  const bloom = useCallback(
    (index: number) => {
      setOpen((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      setInteracted(true);
      setFocusIndex(index);
      setAnnouncement(`Le projet ${projects[index]?.title ?? ""} a éclos.`);
    },
    [projects],
  );

  const toggleAll = () => {
    setInteracted(true);
    setFocusIndex(null);
    if (allOpen) {
      setOpen(new Set());
      setAnnouncement("Tous les projets se sont refermés.");
    } else {
      setOpen(new Set(projects.map((_, i) => i)));
      setAnnouncement("Tous les projets ont éclos.");
    }
  };

  return (
    <section id="jardin" className={styles.garden} aria-labelledby="jardin-titre">
      <svg
        className={styles.edge}
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0 H1440 V12 C 1320 4, 1200 18, 1060 10 C 920 2, 800 18, 660 12 C 520 6, 400 20, 260 12 C 160 6, 70 16, 0 10 Z" />
      </svg>

      <div className={styles.intro}>
        <p className="hand-note">Réalisations</p>
        <h2 id="jardin-titre" className="section-title">
          Mes projets au fil du temps
        </h2>
        <p className={styles.lead}>
          Une sélection de projets représentatifs de mon travail. Cliquez sur un bourgeon pour découvrir chaque projet en détail.
        </p>
        <button type="button" className="btn btn-ghost" onClick={toggleAll}>
          <FlowerIcon />
          {allOpen ? "Afficher tous les projets" : "Masquer les projets"}
        </button>
      </div>

      <div className={styles.sprout} aria-hidden="true">
        <svg width="200" height="80" viewBox="0 0 200 80" focusable="false">
          <path
            d="M100 80 C 100 62, 97 46, 101 32 C 104 20, 100 12, 94 13 C 89 14, 90 21, 95 20"
            className="stem-thin"
          />
          <use href="#fl-leaf" transform="translate(100 58) rotate(-35) scale(0.55)" />
        </svg>
      </div>

      <ol className={styles.list}>
        {projects.map((project, index) => (
          <GardenRow
            key={`${project.title}-${index}`}
            project={project}
            index={index}
            isOpen={open.has(index)}
            shouldFocus={focusIndex === index}
            bloomDelay={interacted ? 0 : 1.1}
            onBloom={bloom}
          />
        ))}
      </ol>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
