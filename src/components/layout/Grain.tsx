/**
 * Grain — A fixed, full-screen SVG noise overlay.
 *
 * Sits above all content at z-50 with pointer-events: none so it
 * never blocks interaction. The fractalNoise filter adds microscopic
 * film-grain texture to every pixel, transforming the flat digital
 * screen into a cinematic surface.
 */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
