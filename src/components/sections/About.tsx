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
        gsap.set(para, { opacity: 0.2, scale: 0.92, y: 150 });

        // Animate IN as it enters the center zone
        ScrollTrigger.create({
          trigger: para,
          start: "top 85%",
          end: "top 40%",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Ease in: 0.2 → 1 opacity, 0.92 → 1 scale, move up 150px
            gsap.set(para, {
              opacity: 0.2 + progress * 0.8,
              scale: 0.92 + progress * 0.08,
              y: 150 - progress * 150,
            });
          },
        });

        // Animate OUT as it reaches the heading line
        ScrollTrigger.create({
          trigger: para,
          start: "top 30%",
          end: "top 10%",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Ease out: 1 → 0.15 opacity, 1 → 0.9 scale, move up another 150px
            gsap.set(para, {
              opacity: 1 - progress * 0.85,
              scale: 1 - progress * 0.1,
              y: 0 - progress * 150,
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
        <div className="glow-orb absolute top-1/4 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9] blur-[40px]" />
        <div className="glow-orb absolute top-1/2 right-1/4 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33] blur-[60px]" />
        <div className="glow-orb absolute top-1/4 right-1/4 h-[30vw] w-[30vw] rounded-full bg-void blur-[80px]" />
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky portrait — pinned while text scrolls */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div
                className="aspect-[3/4] w-full overflow-hidden rounded-3xl"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
              >
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
              <div className="lg:sticky lg:top-20 lg:z-10 lg:pb-8">
                <h2 className="block about-heading font-serif text-4xl md:text-6xl uppercase leading-[0.95] tracking-tighter text-terra mb-12 rounded-sm backdrop-blur-3xl p-2 lg:p-0">
                  INTELLIGENT BY DESIGN
                </h2>
              </div>

              {/* Scrollable paragraph carousel */}
              <div className="flex flex-col gap-4 lg:pt-2">
                <p className="about-para font-sans font-light text-sm md:text-base leading-relaxed mb-8 text-canvas transition-transform duration-250">
                  I am Muhammad Arslan, an AI Engineer and Full-Stack Developer
                  currently completing my degree in Artificial Intelligence at
                  Mehran University of Engineering and Technology. I architect
                  Ai system solutions with the rigorous discipline of data
                  science and the fluid pace of modern web engineering.
                </p>
                <p className="about-para font-sans font-light text-sm md:text-base leading-relaxed mb-8 text-canvas transition-transform duration-250">
                  My practice focuses heavily on data optimization and system
                  integration. My work lives at the intersection of logic and
                  aesthetic. Whether designing ETL data pipelines that reduce
                  redundancy, managing full-stack architectures as Web Master
                  for AIC MUET, or engineering RAG-based AI agents with custom
                  guardrails for bussinesses to reduce hallucination rates and
                  actually be useful, I design backend systems to perform
                  reliably under extreme conditions and scale efficiently.
                </p>
                <p className="about-para font-sans font-light text-sm md:text-base leading-relaxed mb-8 text-canvas transition-transform duration-250">
                  From developing secure fintech platforms for clients to
                  implementing live spatial Geolocation systems, I build
                  software that values mathematical precision, performance
                  security, and uncompromising design.
                </p>
                <p className="about-para font-sans font-light text-sm md:text-base leading-relaxed mb-8 text-canvas transition-transform duration-250">
                  This is a practice built on mathematical restraint,
                  intentional design, and the belief that true intelligence
                  elegantly hides its own complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
