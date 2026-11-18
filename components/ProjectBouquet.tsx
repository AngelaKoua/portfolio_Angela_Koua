import { theme } from "@/lib/theme";
import Reveal from "./Reveal";

/**
 * Petit bouquet qui sort de derrière la carte d’un projet.
 * Les tiges partent du coin bas droit (caché sous la carte) et s’ouvrent vers le haut à gauche ;
 * on le fait pivoter en CSS pour le placer à un autre coin.
 */

const STEMS = [
  { d: "M200 200 C 175 150, 135 100, 72 62", delay: 0.1 },
  { d: "M200 200 C 150 182, 100 168, 42 150", delay: 0.25 },
  { d: "M200 200 C 192 140, 172 82, 152 34", delay: 0.4 },
];

const LEAVES = [
  { x: 150, y: 122, r: -150, s: 0.85, dark: false, delay: 0.7 },
  { x: 120, y: 92, r: -95, s: 0.75, dark: true, delay: 0.8 },
  { x: 100, y: 170, r: 165, s: 0.8, dark: true, delay: 0.9 },
  { x: 178, y: 104, r: -60, s: 0.7, dark: false, delay: 1 },
  { x: 70, y: 157, r: -150, s: 0.6, dark: false, delay: 1.05 },
];

const POPPY_MODE = theme.flowerStyle === "poppy";

export default function ProjectBouquet({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className} threshold={0.1}>
      <svg viewBox="0 0 220 220" width="100%" height="100%" aria-hidden="true" focusable="false">
        {STEMS.map((stem) => (
          <path
            key={stem.d}
            d={stem.d}
            className="twig draw"
            style={{ animationDelay: `${stem.delay}s`, animationDuration: "1.2s" }}
          />
        ))}

        {LEAVES.map((leaf, i) => (
          <g key={`leaf-${i}`} transform={`translate(${leaf.x} ${leaf.y})`}>
            <g className="pop" style={{ animationDelay: `${leaf.delay}s` }}>
              <use
                href={leaf.dark ? "#fl-leaf2" : "#fl-leaf"}
                transform={`rotate(${leaf.r}) scale(${leaf.s})`}
              />
            </g>
          </g>
        ))}

        <g transform="translate(70 60)">
          <g className="pop" style={{ animationDelay: "1.2s" }}>
            <use href="#fl-flower" transform="scale(1.25)" />
          </g>
        </g>
        <g transform="translate(40 150)">
          <g className="pop" style={{ animationDelay: "1.4s" }}>
            <use href={POPPY_MODE ? "#fl-cornflower" : "#fl-flower"} transform="scale(0.85)" />
          </g>
        </g>
        <g transform="translate(152 32)">
          <g className="pop" style={{ animationDelay: "1.55s" }}>
            <use href="#fl-bud" transform="rotate(-15) scale(1.05)" />
          </g>
        </g>
      </svg>
    </Reveal>
  );
}
