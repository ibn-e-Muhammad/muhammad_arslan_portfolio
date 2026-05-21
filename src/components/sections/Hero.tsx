"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Entry reveal ─────────────────────────────── */
      gsap.fromTo(
        [".hero-tag", ".hero-title", ".hero-body"],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.25,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-image",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.6,
          delay: 0.3,
          ease: "power3.out",
        },
      );

      /* ── 2. Liquid ambient orbs — continuous float ──── */
      gsap.utils.toArray<HTMLElement>(".glow-orb").forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-150, 150)`,
          y: `random(-150, 150)`,
          duration: 8 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      /* ── 3. Scroll-out: slow sink + fade over 800px ── */
      gsap.to([".hero-title", ".hero-body", ".hero-tag"], {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          scrub: 1,
        },
      });

      gsap.to(".hero-image", {
        y: 60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Liquid ambient background ──────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="glow-orb absolute top-1/4 left-1/4 h-[50vw] w-[50vw] rounded-full bg-terra/30 blur-[100px]" />
        <div className="glow-orb absolute top-1/2 right-1/4 h-[40vw] w-[40vw] rounded-full bg-[#8A3A33]/20 blur-[120px]" />
        <div className="glow-orb absolute bottom-1/4 left-1/2 h-[60vw] w-[60vw] rounded-full bg-oatmeal/40 blur-[90px]" />
      </div>

      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Left — Copy */}
          <div className="flex flex-col gap-8">
            <p className="hero-tag text-sm uppercase tracking-[0.2em] text-ink/60">
              Cinematic. Editorial. Precise.
            </p>
            <h1
              className="hero-title relative z-10 leading-[1.05]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block text-terra">Creative</span>
              <span className="block">Developer</span>
            </h1>
            <p className="hero-body relative z-10 mt-2 max-w-xl text-lg leading-relaxed text-ink/70">
              Crafting immersive digital experiences with a focus on atmosphere,
              restraint, and detail.
            </p>
          </div>

          {/* Right — Portrait placeholder */}
          <div className="flex justify-end">
            <div className="hero-image aspect-[3/4] w-[70%] max-w-sm rounded-3xl bg-oatmeal" />
          </div>
        </div>
      </Container>
    </section>
  );
}
