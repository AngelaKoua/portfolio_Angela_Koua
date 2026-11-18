import styles from "./FallingPetals.module.css";

/** Quelques pétales qui tombent doucement sur l’illustration (désactivés si l’utilisateur réduit les animations). */
const PETALS = [
  { left: 30, w: 14, h: 10, light: false, duration: 11, delay: -2 },
  { left: 48, w: 11, h: 8, light: true, duration: 13, delay: -6 },
  { left: 62, w: 15, h: 11, light: false, duration: 10, delay: -4.5 },
  { left: 76, w: 12, h: 9, light: true, duration: 12, delay: -9 },
  { left: 88, w: 13, h: 10, light: false, duration: 14, delay: -1 },
  { left: 96, w: 10, h: 7, light: true, duration: 11.5, delay: -7.5 },
  { left: 56, w: 9, h: 7, light: false, duration: 15, delay: -11 },
];

export default function FallingPetals() {
  return (
    <div className={styles.petals} aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className={styles.petal}
          style={{
            left: `${petal.left}%`,
            width: petal.w,
            height: petal.h,
            background: petal.light ? "var(--flower-light)" : "var(--flower)",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
