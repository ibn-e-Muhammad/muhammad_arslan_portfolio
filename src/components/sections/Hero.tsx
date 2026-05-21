import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terra/30 to-transparent blur-3xl opacity-20" />
      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-10">
            <p className="text-sm uppercase tracking-[0.2em] text-ink/60">
              Cinematic. Editorial. Precise.
            </p>
            <h1
              className="leading-[0.9]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block">Creative</span>
              <span className="block">Developer</span>
            </h1>
            <p className="max-w-xl text-ink/70">
              Crafting immersive digital experiences with a focus on atmosphere,
              restraint, and detail.
            </p>
          </div>
          <div className="flex justify-end lg:justify-end">
            <div className="aspect-[3/4] w-[70%] max-w-sm rounded-3xl bg-oatmeal shadow-[0_25px_80px_rgba(0,0,0,0.15)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
