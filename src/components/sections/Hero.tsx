"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";
import heroPortrait from "../../assets/images/hero_profile_pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Entry reveal — targets INNER elements only ── */
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

      /* ── 2. Liquid gooey orbs — continuous float ─────── */
      gsap.to(".glow-orb", {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        scale: () => gsap.utils.random(0.8, 1.4),
        duration: 8,
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
      });

      /* ── 3. Scroll-out — targets WRAPPER divs only ──── */
      gsap.to(".hero-content-wrapper", {
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

      gsap.to(".hero-image-wrapper", {
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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* ── Hidden SVG gooey filter definition ──────────── */}
      <svg className="absolute hidden h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="25"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -20"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Liquid gooey background ────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40 mix-blend-multiply"
        style={{ filter: "url(#goo)" }}
      >
        <div className="glow-orb absolute top-1/3 left-1/3 h-[35vw] w-[35vw] rounded-full bg-terra" />
        <div className="glow-orb absolute top-1/2 right-1/3 h-[30vw] w-[30vw] rounded-full bg-[#8A3A33]" />
        <div className="glow-orb absolute bottom-1/3 left-1/2 h-[40vw] w-[40vw] rounded-full bg-[#D4A373]" />
      </div>

      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Left — Copy */}
          <div className="hero-content-wrapper flex flex-col gap-8">
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

          {/* Right — Portrait */}
          <div className="hero-image-wrapper flex justify-end">
            <div className="hero-image aspect-[3/4] w-[70%] max-w-sm overflow-hidden rounded-3xl">
              <Image
                src={heroPortrait}
                alt="Muhammad Arslan — portrait"
                className="h-full w-full object-cover"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
