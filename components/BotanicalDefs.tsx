import { mix, stamenColor, theme } from "@/lib/theme";

/**
 * Formes botaniques réutilisables (feuilles, fleur, bourgeon, bleuet).
 * On les déclare une seule fois puis on les appelle partout avec <use href="#fl-..." />.
 *
 * Toutes les fleurs tiennent dans un cercle d’environ 29,5 de rayon, centré sur l’origine,
 * pour que positions et animations (transform-origin: center) restent justes.
 */

const LEAF = "M0 0 C 10 -13, 30 -15, 46 0 C 30 15, 10 13, 0 0 Z";
const VEIN = "M3 0 C 16 -1, 30 -1, 43 0";
const OUTER_PETALS = [0, 72, 144, 216, 288];
const INNER_PETALS = [36, 108, 180, 252, 324];
const EDGE = theme.dark ? "rgba(0, 0, 0, 0.25)" : "rgba(40, 30, 60, 0.2)";

/** Point à une distance r de l’origine, angle en degrés (0 = vers le haut). Arrondi pour un SVG stable. */
function polar(r: number, angle: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  const round = (v: number) => Math.round(v * 100) / 100;
  return { x: round(r * Math.sin(rad)), y: round(-r * Math.cos(rad)) };
}

const range = (count: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + (360 / count) * i);

/* ---------- Coquelicot ---------- */

/** Grand pétale arrondi, bord supérieur légèrement ondulé (froissé). Pointe vers le haut. */
const POPPY_PETAL =
  "M0 0 C -9 -2, -18 -10, -17.5 -20 C -17 -26, -11 -29.6, -6 -27.6 " +
  "C -3 -29.8, 3 -29.8, 6 -27.6 C 11 -29.6, 17 -26, 17.5 -20 C 18 -10, 9 -2, 0 0 Z";
/** Plis du pétale froissé. */
const POPPY_FOLDS = [
  "M-1 -6 C -4 -13, -8 -18, -11 -24",
  "M0 -6 C 0 -14, -1 -20, 0 -26",
  "M1 -6 C 4 -13, 8 -18, 11 -24",
];
const POPPY_BACK = mix(theme.flower, "#000000", 0.12);

/* ---------- Bleuet ---------- */

/** Fleuron en entonnoir, extrémité dentelée. Pointe vers le haut. */
const CORNFLOWER_PETAL =
  "M-1.6 -7 C -3 -13, -5.5 -20, -7.5 -25.5 L -5.2 -24.6 L -4.6 -28.6 L -2.4 -25.8 L 0 -29.5 " +
  "L 2.4 -25.8 L 4.6 -28.6 L 5.2 -24.6 L 7.5 -25.5 C 5.5 -20, 3 -13, 1.6 -7 Z";
const CORNFLOWER_INNER =
  "M-1.2 -4 C -2.4 -8, -4 -12, -5 -16 L -2.6 -15 L 0 -18 L 2.6 -15 L 5 -16 C 4 -12, 2.4 -8, 1.2 -4 Z";
const CORNFLOWER_COLOR = theme.btn;
const CORNFLOWER_DEEP = mix(theme.btn, "#000000", 0.2);
const CORNFLOWER_VEIN = mix(theme.btn, "#ffffff", 0.35);
const CORNFLOWER_HEART = mix(theme.btn, "#000000", 0.45);
const CORNFLOWER_STAMEN = stamenColor(CORNFLOWER_HEART, theme.stem);

function ClassicFlower() {
  return (
    <g id="fl-flower">
      {OUTER_PETALS.map((angle) => (
        <ellipse
          key={`o${angle}`}
          cx={0}
          cy={-14}
          rx={10}
          ry={15}
          fill={theme.flower}
          stroke={EDGE}
          strokeWidth={0.8}
          transform={`rotate(${angle})`}
        />
      ))}
      {INNER_PETALS.map((angle) => (
        <ellipse
          key={`i${angle}`}
          cx={0}
          cy={-9}
          rx={6}
          ry={9}
          fill={theme.flowerLight}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={6} fill={theme.heart} />
      <circle cx={-2} cy={-1.5} r={1.2} fill={theme.stamen} />
      <circle cx={2} cy={1} r={1.2} fill={theme.stamen} />
      <circle cx={1.5} cy={-2.6} r={1} fill={theme.stamen} />
    </g>
  );
}

function PoppyFlower() {
  // Deux pétales en arrière-plan (un peu plus sombres), deux devant.
  const petals = [
    { angle: 0, fill: POPPY_BACK },
    { angle: 180, fill: POPPY_BACK },
    { angle: 90, fill: theme.flower },
    { angle: 270, fill: theme.flower },
  ];
  return (
    <g id="fl-flower">
      {petals.map(({ angle, fill }) => (
        <g key={`p${angle}`} transform={`rotate(${angle})`}>
          <path d={POPPY_PETAL} fill={fill} stroke={EDGE} strokeWidth={0.8} />
          {POPPY_FOLDS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={theme.flowerLight}
              strokeWidth={0.8}
              strokeLinecap="round"
              opacity={0.5}
            />
          ))}
        </g>
      ))}
      <circle r={5.5} fill={theme.heart} />
      {range(16).map((angle) => {
        const from = polar(3.2, angle);
        const to = polar(8.6, angle);
        const tip = polar(9.3, angle);
        return (
          <g key={`s${angle}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={theme.stamen}
              strokeWidth={0.45}
              strokeLinecap="round"
              opacity={0.9}
            />
            <circle cx={tip.x} cy={tip.y} r={0.85} fill={theme.stamen} />
          </g>
        );
      })}
      <circle r={2.8} fill={theme.heart} />
      {range(6).map((angle) => {
        const end = polar(2.3, angle);
        return (
          <line
            key={`r${angle}`}
            x1={0}
            y1={0}
            x2={end.x}
            y2={end.y}
            stroke={theme.stamen}
            strokeWidth={0.4}
            strokeLinecap="round"
            opacity={0.6}
          />
        );
      })}
    </g>
  );
}

function Cornflower() {
  return (
    <g id="fl-cornflower">
      {range(10).map((angle) => (
        <g key={`o${angle}`} transform={`rotate(${angle})`}>
          <path d={CORNFLOWER_PETAL} fill={CORNFLOWER_COLOR} stroke={EDGE} strokeWidth={0.6} />
          <path
            d="M0 -8 C 0 -15, 0 -21, 0 -26"
            fill="none"
            stroke={CORNFLOWER_VEIN}
            strokeWidth={0.6}
            strokeLinecap="round"
            opacity={0.6}
          />
        </g>
      ))}
      {range(10, 18).map((angle) => (
        <path
          key={`i${angle}`}
          d={CORNFLOWER_INNER}
          fill={CORNFLOWER_DEEP}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={5} fill={CORNFLOWER_HEART} />
      <circle r={0.9} fill={CORNFLOWER_STAMEN} />
      {range(7).map((angle) => {
        const p = polar(2.8, angle);
        return <circle key={`s${angle}`} cx={p.x} cy={p.y} r={0.8} fill={CORNFLOWER_STAMEN} />;
      })}
    </g>
  );
}

export default function BotanicalDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>
        <g id="fl-leaf">
          <path d={LEAF} fill={theme.leaf} />
          <path d={VEIN} fill="none" stroke={theme.leaf2} strokeWidth={1} opacity={0.6} />
        </g>

        <g id="fl-leaf2">
          <path d={LEAF} fill={theme.leaf2} />
          <path d={VEIN} fill="none" stroke={theme.leaf} strokeWidth={1} opacity={0.5} />
        </g>

        {theme.flowerStyle === "poppy" ? <PoppyFlower /> : <ClassicFlower />}

        <Cornflower />

        <g id="fl-bud">
          <path d="M0 8 L0 16" fill="none" stroke={theme.stem} strokeWidth={2} strokeLinecap="round" />
          <path
            d="M0 -22 C 10 -14, 11 -2, 0 6 C -11 -2, -10 -14, 0 -22 Z"
            fill={theme.flower}
            stroke={EDGE}
            strokeWidth={0.8}
          />
          <path
            d="M0 -19 C 5 -12, 5 -3, 1 3"
            fill="none"
            stroke={theme.flowerLight}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path d="M0 8 C -9 4, -12 -5, -8 -12 C -4 -4, -1 2, 0 8 Z" fill={theme.leaf2} />
          <path d="M0 8 C 9 4, 12 -5, 8 -12 C 4 -4, 1 2, 0 8 Z" fill={theme.leaf2} />
        </g>
      </defs>
    </svg>
  );
}
