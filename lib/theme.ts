import type { CSSProperties } from "react";

/**
 * Les palettes du portfolio.
 * Pour changer toute l’ambiance du site, modifie simplement `activePalette` plus bas.
 */
/** Style des fleurs : "classic" (fleur à cinq pétales) ou "poppy" (coquelicots et bleuets). */
export type FlowerStyle = "classic" | "poppy";

export type Palette = {
  name: string;
  /** Style des fleurs dessinées. "classic" par défaut. */
  flowerStyle?: FlowerStyle;
  /** À mettre à true pour les palettes à fond sombre. */
  dark?: boolean;
  bg: string;
  ink: string;
  stem: string;
  leaf: string;
  leaf2: string;
  flower: string;
  flowerLight: string;
  heart: string;
  btn: string;
  btnText: string;
};

export const palettes = {
  rosePoudreSauge: {
    name: "Rose poudré & sauge",
    bg: "#F5F0E6", ink: "#2E2B22", stem: "#5B4632", leaf: "#8EA27A", leaf2: "#6E8A5E",
    flower: "#D4877F", flowerLight: "#EBB7AE", heart: "#D9A441", btn: "#3F5236", btnText: "#F5F0E6",
  },
  terracottaOlivier: {
    name: "Terracotta & olivier",
    bg: "#F3E9DC", ink: "#2F2A22", stem: "#6B4A2F", leaf: "#8C8F4E", leaf2: "#676B36",
    flower: "#C8673F", flowerLight: "#E8A47E", heart: "#E3B448", btn: "#5A5E2C", btnText: "#F3E9DC",
  },
  lavandeEucalyptus: {
    name: "Lavande & eucalyptus",
    bg: "#F2F1EE", ink: "#2B2D33", stem: "#5C5348", leaf: "#9DB5A8", leaf2: "#6F8F82",
    flower: "#9A86C2", flowerLight: "#C9BCE0", heart: "#E6C35C", btn: "#3E5A52", btnText: "#F2F1EE",
  },
  botaniqueSombre: {
    name: "Botanique sombre", dark: true,
    bg: "#14251E", ink: "#F1EBDD", stem: "#A88A62", leaf: "#4F7A5A", leaf2: "#3B6148",
    flower: "#E8735A", flowerLight: "#F4A98C", heart: "#F2C14E", btn: "#E8B04B", btnText: "#14251E",
  },
  jardinDeNuit: {
    name: "Jardin de nuit", dark: true,
    bg: "#141B33", ink: "#EDEAF4", stem: "#8C8AA8", leaf: "#4E6A7F", leaf2: "#38536A",
    flower: "#F3EFE6", flowerLight: "#D9D3F0", heart: "#F2D16B", btn: "#F2D16B", btnText: "#141B33",
  },
  cerisierVermillon: {
    name: "Cerisier & vermillon",
    bg: "#F7F4EF", ink: "#1F1D1B", stem: "#2A2522", leaf: "#9AAE84", leaf2: "#78906A",
    flower: "#F2C4CE", flowerLight: "#FBE3E8", heart: "#C8423A", btn: "#B8372F", btnText: "#FFFFFF",
  },
  prairieEte: {
    name: "Prairie d’été", flowerStyle: "poppy",
    bg: "#F6EFD9", ink: "#2C2A1F", stem: "#5F6B34", leaf: "#93A157", leaf2: "#6E7D3E",
    flower: "#D9442E", flowerLight: "#F08C6E", heart: "#2A2A2A", btn: "#3D5A8C", btnText: "#FFFFFF",
  },
  pecheMenthe: {
    name: "Pêche & menthe",
    bg: "#FFF6EE", ink: "#2D2A28", stem: "#7A5C48", leaf: "#9CCBB4", leaf2: "#6FA88E",
    flower: "#F5A97F", flowerLight: "#FBD3B8", heart: "#E8B23A", btn: "#2F6B57", btnText: "#FFF6EE",
  },
  cyanotype: {
    name: "Cyanotype", dark: true,
    bg: "#1F4A78", ink: "#F2F5F8", stem: "#E8EEF4", leaf: "#C9D8E8", leaf2: "#A9C0D8",
    flower: "#FFFFFF", flowerLight: "#DCE7F2", heart: "#9FB8D3", btn: "#F2F5F8", btnText: "#1F4A78",
  },
} satisfies Record<string, Palette>;

/** La palette utilisée par le site. */
export const activePalette: Palette = palettes.prairieEte;

/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const value = parseInt(full, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

/** Mélange deux couleurs hexadécimales (t = 0 : couleur a, t = 1 : couleur b). */
export function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return (
    "#" +
    ca
      .map((v, i) => Math.round(v + (cb[i] - v) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Luminance relative WCAG d’une couleur hexadécimale. */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Ratio de contraste WCAG entre deux couleurs (de 1 à 21). */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Couleur des étamines posées sur un cœur de fleur.
 * On garde la couleur préférée (la tige) si elle se détache assez du cœur (3:1, seuil WCAG
 * pour les éléments graphiques) ; sinon on prend une teinte claire ou foncée du cœur,
 * celle qui contraste le plus.
 */
export function stamenColor(heart: string, preferred: string): string {
  if (contrastRatio(preferred, heart) >= 3) return preferred;
  const light = mix("#ffffff", heart, 0.15);
  const dark = mix("#000000", heart, 0.25);
  return contrastRatio(light, heart) >= contrastRatio(dark, heart) ? light : dark;
}

export type Theme = Omit<Palette, "flowerStyle"> & {
  flowerStyle: FlowerStyle;
  /** Couleur des étamines, toujours contrastée avec le cœur. */
  stamen: string;
  muted: string;
  flowerDeep: string;
  card: string;
  border: string;
  soil: string;
  gardenBg: string;
  placeholder: string;
  placeholderInk: string;
};

/** Calcule les couleurs secondaires (textes discrets, cartes, terre...) à partir d’une palette. */
export function buildTheme(p: Palette): Theme {
  const dark = Boolean(p.dark);
  return {
    ...p,
    flowerStyle: p.flowerStyle ?? "classic",
    stamen: stamenColor(p.heart, p.stem),
    muted: mix(p.ink, p.bg, 0.24),
    flowerDeep: dark ? mix(p.flower, "#ffffff", 0.3) : mix(p.flower, "#000000", 0.45),
    card: dark ? mix(p.bg, "#ffffff", 0.06) : mix(p.bg, "#ffffff", 0.6),
    border: mix(p.bg, p.ink, 0.14),
    soil: mix(p.bg, p.leaf, dark ? 0.12 : 0.22),
    gardenBg: mix(p.bg, p.flowerLight, dark ? 0.08 : 0.3),
    placeholder: mix(p.bg, p.leaf, dark ? 0.2 : 0.28),
    placeholderInk: dark ? mix(p.leaf, "#ffffff", 0.45) : mix(p.leaf2, "#000000", 0.35),
  };
}

export const theme: Theme = buildTheme(activePalette);

/** Transforme le thème en variables CSS, injectées sur la balise <html>. */
export function themeCssVars(t: Theme): CSSProperties {
  return {
    "--bg": t.bg,
    "--ink": t.ink,
    "--muted": t.muted,
    "--stem": t.stem,
    "--leaf": t.leaf,
    "--leaf2": t.leaf2,
    "--flower": t.flower,
    "--flower-light": t.flowerLight,
    "--flower-deep": t.flowerDeep,
    "--heart": t.heart,
    "--btn": t.btn,
    "--btn-text": t.btnText,
    "--card": t.card,
    "--border": t.border,
    "--soil": t.soil,
    "--garden-bg": t.gardenBg,
    "--placeholder": t.placeholder,
    "--placeholder-ink": t.placeholderInk,
    colorScheme: t.dark ? "dark" : "light",
  } as CSSProperties;
}
