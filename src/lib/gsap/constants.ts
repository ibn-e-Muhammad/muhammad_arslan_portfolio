export const MOTION = {
  duration: 1.2,
  durationFast: 0.8,
  ease: "power3.out",
  easeSpring: "elastic.out(1, 0.75)",
} as const;

export const revealConfig = () => ({
  y: 100,
  autoAlpha: 0,
  ease: MOTION.ease,
  duration: MOTION.duration,
});
