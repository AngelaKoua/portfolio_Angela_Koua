import { theme } from "@/lib/theme";

/**
 * La grande branche fleurie du haut de page.
 * Elle se dessine au chargement, puis feuilles, fleurs et bourgeons apparaissent.
 */

const MAIN = "M40 620 C 110 560, 160 470, 240 410 C 320 350, 400 330, 450 250 C 500 170, 540 100, 610 50";

const TWIGS = [
  { d: "M99 560 C 80 540, 66 516, 64 490", delay: 0.5, duration: 1 },
  { d: "M240 410 C 215 365, 185 330, 140 304", delay: 0.9, duration: 1.1 },
  { d: "M407 300 C 450 320, 490 350, 530 360", delay: 1.3, duration: 1.1 },
  { d: "M450 250 C 425 210, 405 170, 398 124", delay: 1.5, duration: 1.1 },
  { d: "M563 92 C 588 112, 600 140, 598 174", delay: 1.8, duration: 1 },
];

// x, y : position ; r : rotation ; s : taille ; dark : feuille foncée ; delay : apparition (s)
const LEAVES = [
  { x: 99, y: 560, r: -130, s: 1, dark: false, delay: 0.6 },
  { x: 99, y: 560, r: 25, s: 0.95, dark: true, delay: 0.7 },
  { x: 165, y: 481, r: 20, s: 1.1, dark: true, delay: 0.9 },
  { x: 160, y: 486, r: -115, s: 0.9, dark: false, delay: 1 },
  { x: 197, y: 350, r: -170, s: 0.8, dark: false, delay: 1.4 },
  { x: 334, y: 351, r: -100, s: 1, dark: false, delay: 1.2 },
  { x: 334, y: 351, r: 35, s: 1.1, dark: true, delay: 1.3 },
  { x: 470, y: 334, r: 70, s: 0.85, dark: true, delay: 1.9 },
  { x: 417, y: 189, r: -175, s: 0.75, dark: false, delay: 2 },
  { x: 501, y: 170, r: -150, s: 0.9, dark: false, delay: 1.6 },
  { x: 501, y: 170, r: 10, s: 0.9, dark: true, delay: 1.7 },
  { x: 563, y: 92, r: -120, s: 0.8, dark: false, delay: 1.9 },
];

// cornflower : devient un bleuet quand la palette est en style "poppy"
const FLOWERS = [
  { x: 138, y: 302, s: 1.4, delay: 1.9, cornflower: true },
  { x: 534, y: 362, s: 1.9, delay: 2.3, cornflower: false },
  { x: 598, y: 178, s: 0.95, delay: 2.6, cornflower: true },
];

const POPPY_MODE = theme.flowerStyle === "poppy";

const BUDS = [
  { x: 64, y: 486, r: -20, s: 1.05, delay: 1.4 },
  { x: 612, y: 46, r: 40, s: 0.9, delay: 2.2 },
  { x: 398, y: 120, r: 0, s: 1.3, delay: 2.4 },
];

export default function HeroBranch() {
  return (
    <svg viewBox="0 0 640 640" role="img" aria-label="Illustration d’une branche fleurie qui pousse">
      <path d={MAIN} className="stem-lg draw" />

      {TWIGS.map((twig) => (
        <path
          key={twig.d}
          d={twig.d}
          className="twig draw"
          style={{ animationDelay: `${twig.delay}s`, animationDuration: `${twig.duration}s` }}
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

      {FLOWERS.map((flower, i) => (
        <g key={`flower-${i}`} transform={`translate(${flower.x} ${flower.y})`}>
          <g className="pop" style={{ animationDelay: `${flower.delay}s` }}>
            <use
              href={POPPY_MODE && flower.cornflower ? "#fl-cornflower" : "#fl-flower"}
              transform={`scale(${flower.s})`}
            />
          </g>
        </g>
      ))}

      {BUDS.map((bud, i) => (
        <g key={`bud-${i}`} transform={`translate(${bud.x} ${bud.y})`}>
          <g className="pop" style={{ animationDelay: `${bud.delay}s` }}>
            <use href="#fl-bud" transform={`rotate(${bud.r}) scale(${bud.s})`} />
          </g>
        </g>
      ))}
    </svg>
  );
}
