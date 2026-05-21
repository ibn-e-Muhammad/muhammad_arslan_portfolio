"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";
import heroPortrait from "../../assets/images/hero_profile_pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Dynamic Jellyfish motion for Orbs ─────────── */
      gsap.utils.toArray<HTMLElement>(".glow-orb").forEach((orb, i) => {
        gsap.to(orb, {
          x: () => gsap.utils.random(-400, 400),
          y: () => gsap.utils.random(-400, 400),
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

      /* ── Heading reveal ────────────────────────────── */
      gsap.fromTo(
        ".about-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* ── Paragraph carousel — each paragraph gets its
           own ScrollTrigger that scales/fades based on
           its position in the viewport ─────────────── */
      const paragraphs = gsap.utils.toArray<HTMLElement>(".about-para");

      paragraphs.forEach((para) => {
        // Start: fully dimmed, slightly smaller, and shifted down
        gsap.set(para, { opacity: 0.2, scale: 0.92, y: 120 });

        // Animate IN as it enters the center zone
        ScrollTrigger.create({
          trigger: para,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Ease in: 0.2 → 1 opacity, 0.92 → 1 scale, move up 120px
            gsap.set(para, {
              opacity: 0.2 + progress * 0.8,
              scale: 0.92 + progress * 0.08,
              y: 120 - progress * 120,
            });
          },
        });

        // Animate OUT as it leaves the center zone upward
        ScrollTrigger.create({
          trigger: para,
          start: "top 40%",
          end: "top -5%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Ease out: 1 → 0.15 opacity, 1 → 0.9 scale, move up another 120px
            gsap.set(para, {
              opacity: 1 - progress * 0.85,
              scale: 1 - progress * 0.1,
              y: 0 - progress * 120,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-void text-canvas py-section-gap"
    >
      {/* ── Blurred ambient orbs — liquid haze background ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="glow-orb absolute top-1/4 left-1/2 h-[50vw] w-[50vw] rounded-full bg-terra blur-[60px]" />
        <div className="glow-orb absolute top-1/2 right-1/4 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33] blur-[60px]" />
        <div className="glow-orb absolute top-1/4 right-1/4 h-[30vw] w-[30vw] rounded-full bg-void blur-[80px]" />
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky portrait — pinned while text scrolls */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl">
                <Image
                  src={heroPortrait}
                  alt="Muhammad Arslan — portrait"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>

          {/* Right — Sticky heading + scrolling paragraph carousel */}
          <div ref={textTrackRef} className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {/* Sticky heading — stays pinned alongside portrait */}
              <div className="lg:sticky lg:top-24 lg:z-10 lg:pb-8">
                <h2 className="block about-heading font-serif lg:text-4xl lg:text-6xl leading-tight p-2 text-canvas transition-colors duration-500 hover:text-terra rounded-sm backdrop-blur-3xl">
                  An Editorial Approach to Digital Craft
                </h2>
              </div>

              {/* Scrollable paragraph carousel */}
              <div className="flex flex-col gap-12 lg:pt-4">
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  I design interfaces with the discipline of print and the pace
                  of cinema. Every grid, margin, and typographic decision is
                  tuned to make space for the story.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  The work lives in contrast—soft textures against sharp
                  structure, quiet moments against bold statements—always
                  calibrated for elegance and clarity.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  Every project begins with understanding the narrative—the
                  emotional arc, the pacing, the visual grammar that turns a
                  functional interface into something you remember.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  The tools change, the frameworks evolve, but the craft stays
                  constant: obsessive attention to whitespace, typographic
                  rhythm, and the weight of every visual decision.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  From cinematic scroll experiences to refined editorial
                  layouts, each piece is designed to feel like opening a
                  beautifully bound book—deliberate, immersive, and worth
                  lingering on.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  I believe the best digital work carries the same
                  intentionality as the best physical design—where nothing
                  exists by accident, and every detail earns its place on the
                  page.
                </p>
                <p
                  className="about-para text-canvas/70 leading-relaxed transition-transform duration-100"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  Collaboration is essential to this process. The best outcomes
                  emerge when ambition meets restraint, when bold creative
                  vision is tempered by thoughtful technical execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
