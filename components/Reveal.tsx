"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/** Ajoute la classe .in-view à son contenu quand il entre dans l’écran (pour lancer les animations). */
export default function Reveal({
  children,
  className = "",
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  return (
    <div ref={ref} className={`${className} ${inView ? "in-view" : ""}`.trim()}>
      {children}
    </div>
  );
}
