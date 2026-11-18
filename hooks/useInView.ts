"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renvoie `inView: true` la première fois que l’élément entre dans l’écran.
 * Sert à lancer la pousse des tiges et l’apparition des feuilles au scroll.
 */
export function useInView<T extends Element>(threshold = 0.2, rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
}
