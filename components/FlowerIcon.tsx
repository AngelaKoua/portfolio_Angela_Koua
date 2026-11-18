/** Petite fleur décorative utilisée dans les boutons et le logo. */
export default function FlowerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
      <use href="#fl-flower" transform="scale(0.5)" />
    </svg>
  );
}
