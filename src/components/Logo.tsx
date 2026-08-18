/**
 * Touchmark Descience wordmark.
 *
 * Two files from the parent brand: the colour lockup for paper backgrounds and
 * the white version for ink backgrounds and photographic headers. The mark is
 * never recoloured - it is the parent company's asset.
 */
export default function Logo({ variant = "color" }: { variant?: "color" | "white" }) {
  return (
    <img
      className="brand-logo"
      src={variant === "white" ? "/brand/touchmark-logo-white.svg" : "/brand/touchmark-logo.png"}
      alt="Touchmark Descience"
      width={1842}
      height={384}
    />
  );
}
