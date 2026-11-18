"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/portfolio";
import { projectPageHref } from "@/lib/projects";
import FlowerIcon from "./FlowerIcon";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
  isOpen: boolean;
  shouldFocus: boolean;
  tilt: "left" | "right";
  onBloom: () => void;
};

export default function ProjectCard({ project, isOpen, shouldFocus, tilt, onBloom }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Quand un projet éclot, on place le focus sur son titre (utile au clavier et aux lecteurs d’écran)
  useEffect(() => {
    if (isOpen && shouldFocus) {
      titleRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, shouldFocus]);

  const isExternal = project.href?.startsWith("http") ?? false;
  const cardClass = `${styles.card} ${tilt === "right" ? styles.tiltRight : styles.tiltLeft}`;

  return (
    <article className={cardClass}>
      <span className={`${styles.tape} ${styles.tapeLeft}`} aria-hidden="true" />
      <span className={`${styles.tape} ${styles.tapeRight}`} aria-hidden="true" />

      {isOpen ? (
        <div className={`${styles.content} appear`}>
          <div className={styles.media}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? ""}
                fill
                sizes="(max-width: 860px) 100vw, 420px"
                className={styles.image}
              />
            ) : (
              <svg
                className={styles.sprig}
                viewBox="0 0 120 120"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M60 112 C 58 90, 62 70, 60 46" className="twig" />
                <use href="#fl-leaf" transform="translate(60 88) rotate(-40) scale(0.7)" />
                <use href="#fl-leaf2" transform="translate(60 74) rotate(-145) scale(0.65)" />
                <use href="#fl-flower" transform="translate(60 40) scale(1.1)" />
              </svg>
            )}
          </div>

          <p className={styles.harvest}>Réalisé en {project.year}</p>
          <h3 ref={titleRef} tabIndex={-1} className={styles.title}>
            {project.title}
          </h3>
          <p className={styles.desc}>{project.description}</p>

          <div className={styles.meta}>
            {project.tags.length > 0 && (
              <ul className={styles.tags} aria-label="Catégories">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <div className={styles.actions}>
              <Link
                href={projectPageHref(project)}
                className={styles.detailsBtn}
                aria-label={`Description du projet ${project.title}`}
              >
                Description
              </Link>
              {project.href && (
                <a
                  href={project.href}
                  className={styles.link}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Voir le projet
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.content} ${styles.budContent} appear`}>
          <h3 className="sr-only">{project.title}</h3>
          <p className={styles.budText}>Un projet à découvrir…</p>
          <p className={styles.desc}>Cliquez pour afficher le détail de ce projet.</p>
          <button type="button" className="btn btn-ghost" onClick={onBloom}>
            <FlowerIcon />
            Ouvrir le projet
          </button>
        </div>
      )}
    </article>
  );
}
