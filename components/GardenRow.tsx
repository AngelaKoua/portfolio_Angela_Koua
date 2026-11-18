"use client";

import type { Project } from "@/content/portfolio";
import { useInView } from "@/hooks/useInView";
import ProjectCard from "./ProjectCard";
import styles from "./GardenRow.module.css";

/** Tronçon de tige (dessiné pour une carte à gauche, retourné en miroir pour une carte à droite). */
const STEM = "M100 0 C 86 110, 114 210, 100 300 C 90 370, 110 430, 100 480";
const TWIG = "M104 262 C 76 252, 46 234, 30 200";

const LEAVES = [
  { x: 97, y: 72, r: -150, s: 0.85, dark: false, delay: 0.3 },
  { x: 101, y: 132, r: -25, s: 0.9, dark: true, delay: 0.5 },
  { x: 62, y: 240, r: -105, s: 0.7, dark: false, delay: 1.1 },
  { x: 98, y: 362, r: 20, s: 0.9, dark: true, delay: 0.9 },
  { x: 102, y: 420, r: -160, s: 0.8, dark: false, delay: 1.2 },
];

/** Feuilles de la tige sur téléphone, sous le bourgeon (repère : 60 px de large). */
const MOBILE_LEAVES = [
  { x: 30, y: 104, r: -40, s: 0.6, dark: false, delay: 0.5 },
  { x: 30, y: 128, r: -150, s: 0.55, dark: true, delay: 0.7 },
  { x: 31, y: 158, r: -30, s: 0.5, dark: true, delay: 0.9 },
];

type Props = {
  project: Project;
  index: number;
  isOpen: boolean;
  shouldFocus: boolean;
  /** Délai avant l’éclosion de la fleur quand la ligne apparaît (en secondes). */
  bloomDelay: number;
  onBloom: (index: number) => void;
};

export default function GardenRow({ project, index, isOpen, shouldFocus, bloomDelay, onBloom }: Props) {
  const { ref, inView } = useInView<HTMLLIElement>(0.25);
  const isRight = index % 2 === 1;
  const handleBloom = () => onBloom(index);

  const rowClass = [styles.row, isRight ? styles.right : "", inView ? "in-view" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li ref={ref} className={rowClass}>
      <div className={styles.cardCell}>
        <ProjectCard
          project={project}
          isOpen={isOpen}
          shouldFocus={shouldFocus}
          tilt={isRight ? "right" : "left"}
          onBloom={handleBloom}
        />
      </div>

      <div className={styles.stemCell}>
        <svg
          className={styles.stemSvg}
          width="200"
          height="480"
          viewBox="0 0 200 480"
          aria-hidden="true"
          focusable="false"
        >
          <path d={STEM} className="stem draw" style={{ animationDuration: "1.6s" }} />
          <path d={TWIG} className="twig draw" style={{ animationDelay: "0.7s", animationDuration: "1s" }} />
          {LEAVES.map((leaf, i) => (
            <g key={i} transform={`translate(${leaf.x} ${leaf.y})`}>
              <g className="pop" style={{ animationDelay: `${leaf.delay}s` }}>
                <use
                  href={leaf.dark ? "#fl-leaf2" : "#fl-leaf"}
                  transform={`rotate(${leaf.r}) scale(${leaf.s})`}
                />
              </g>
            </g>
          ))}
        </svg>

        {/* Version téléphone : une tige verticale continue, à gauche des cartes */}
        <svg
          className={styles.stemMobile}
          viewBox="0 0 60 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M30 0 C 25 30, 35 60, 30 100"
            className="stem draw"
            vectorEffect="non-scaling-stroke"
            style={{ animationDuration: "1.6s" }}
          />
        </svg>
        <svg
          className={styles.leavesMobile}
          width="60"
          height="170"
          viewBox="0 0 60 170"
          aria-hidden="true"
          focusable="false"
        >
          {MOBILE_LEAVES.map((leaf, i) => (
            <g key={i} transform={`translate(${leaf.x} ${leaf.y})`}>
              <g className="pop" style={{ animationDelay: `${leaf.delay}s` }}>
                <use
                  href={leaf.dark ? "#fl-leaf2" : "#fl-leaf"}
                  transform={`rotate(${leaf.r}) scale(${leaf.s})`}
                />
              </g>
            </g>
          ))}
        </svg>

        {isOpen ? (
          <div className={styles.flower} aria-hidden="true">
            <svg
              className="bloom-in"
              style={{ animationDelay: `${bloomDelay}s` }}
              width="80"
              height="80"
              viewBox="-40 -40 80 80"
              focusable="false"
            >
              <use href="#fl-flower" transform="scale(1.35)" />
            </svg>
          </div>
        ) : (
          <div className={`${styles.budWrap} pop`} style={{ animationDelay: "1.1s" }}>
            <button
              type="button"
              className={styles.bud}
              onClick={handleBloom}
              aria-label={`Faire éclore le projet ${project.title}`}
            >
              <svg width="64" height="64" viewBox="-32 -32 64 64" aria-hidden="true" focusable="false">
                <circle r={28} className={styles.halo} />
                <use href="#fl-bud" transform="translate(0 6) scale(1.5)" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={styles.spacer} aria-hidden="true" />
    </li>
  );
}
