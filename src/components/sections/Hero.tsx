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
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          delay: 0.3,
          ease: "power3.out",
        },
      );

      /* ── 2. Ambient blurred orbs — Dynamic Jellyfish motion ── */
      gsap.utils.toArray<HTMLElement>(".glow-orb").forEach((orb, i) => {
        gsap.to(orb, {
          x: () => gsap.utils.random(-300, 300),
          y: () => gsap.utils.random(-300, 300),
          scaleX: () => gsap.utils.random(0.6, 1.5),
          scaleY: () => gsap.utils.random(0.6, 1.5),
          rotation: () => gsap.utils.random(-90, 90),
          duration: () => gsap.utils.random(2, 6),
          ease: "sine.inOut",
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      /* ── 3. Scroll-out — targets WRAPPER divs only ──── */
      /*    Wrapper is a separate parent so the scrub tween
            never fights the load reveal on inner children. */
      gsap.to(".hero-content-wrapper", {
        y: 250,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-image-wrapper", {
        y: 150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* ── Blurred ambient orbs — liquid haze background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="glow-orb absolute bottom-1/4 left-1/4 h-[50vw] w-[50vw] rounded-full bg-terra blur-[60px]" />
        <div className="glow-orb absolute top-1/2 right-1/4 h-[40vw] w-[40vw] rounded-full bg-oatmeal blur-[80px]" />
        <div className="glow-orb absolute top-1/4 left-1 h-[55vw] w-[55vw] rounded-full bg-[#8a3a33da] blur-[60px]" />
      </div>

      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left — Copy */}
          <div className="hero-content-wrapper flex flex-col gap-8">
            <p className="hero-tag text-sm uppercase tracking-[0.2em] text-ink/60">
              Cinematic. Editorial. Precise.
            </p>
            <h1
              className="hero-title relative z-10 leading-[1.05]"
              style={{ fontSize: "var(--text-hero)" }}
            >
              <span className="block">Creative</span>
              <span className="block">Developer</span>
            </h1>
            <p className="hero-body relative z-10 mt-2 max-w-xl text-lg leading-relaxed text-ink/70">
              Crafting immersive digital experiences with a focus on atmosphere,
              restraint, and detail.
            </p>
          </div>

          {/* Right — Portrait with blurred hue shadow */}
          <div className="hero-image-wrapper flex justify-end">
            <div className="hero-image relative w-[85%] max-w-md">
              {/* Blurred hue glow behind the portrait */}
              <div className="absolute -inset-8 rounded-full bg-terra/30 blur-[60px]" />
              <div className="absolute -inset-12 translate-x-4 translate-y-6 rounded-full bg-[#8A3A33]/20 blur-[80px]" />
              {/* Actual portrait */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
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
        </div>
      </Container>
    </section>
  );
}
