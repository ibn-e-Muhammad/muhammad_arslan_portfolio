"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [".hero-title", ".hero-body"],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-glow",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.2,
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        },
      );

      // Parallax movement on scroll (Y translation only)
      gsap.to([`.hero-title`, `.hero-image`], {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });

      // Separate opacity fade only when hero reaches top
      gsap.to([`.hero-title`, `.hero-image`], {
        opacity: 0.2,
        duration: 0.75,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: "top 10%",
          scrub: 0,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-terra rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="pointer-events-none fixed -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terra/30 to-transparent blur-3xl opacity-20" />
      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-12">
            <p className="text-sm uppercase tracking-[0.2em] text-ink/60">
              Cinematic. Editorial. Precise.
            </p>
            <h1
              className="hero-title relative z-10 leading-[0.95]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block">Creative</span>
              <span className="block">Developer</span>
            </h1>
            <p className="hero-body relative z-10 max-w-xl text-ink/70">
              Crafting immersive digital experiences with a focus on atmosphere,
              restraint, and detail.
            </p>
          </div>
          <div className="flex justify-end lg:justify-end">
            <div className="hero-image aspect-[3/4] w-[70%] max-w-sm rounded-3xl bg-oatmeal" />
          </div>
        </div>
      </Container>
    </section>
  );
}
