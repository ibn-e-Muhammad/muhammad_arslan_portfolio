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

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      /* ── Simple fade-in for each paragraph ─────────── */
      const paragraphs = gsap.utils.toArray<HTMLElement>(".about-para");
      paragraphs.forEach((para) => {
        gsap.fromTo(
          para,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: para,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ── Image reveal ─────────────────────────────── */
      gsap.fromTo(
        ".about-image",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-void text-canvas py-section-gap"
      data-section="about"
    >
      {/* ── Blurred ambient orbs ── */}
       <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="glow-orb absolute top-1/2 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9]/[0.70] blur-[40px]" />
        <div className="glow-orb absolute top-1/4 right-1/2 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33]/[0.50] blur-[60px]" />
        <div className="glow-orb absolute top-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-void blur-[40px]" />
      </div>

      <Container>
        {/* ── Full-width editorial heading ── */}
        <h2 className="about-heading font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-16">
          <span className="block text-canvas/50">
            A modern engineer&apos;s approach
          </span>
          <span className="block text-canvas">
            to building great systems.
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* ── Left — Portrait with info ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              {/* Image Assembly */}
              <div className="about-image relative aspect-square w-full md:w-10/12 lg:w-full mt-6 md:mt-8 lg:mt-0">
                {/* Background Solid Offset Block */}
                <div className="absolute -bottom-5 -right-5 h-full w-full bg-[#8A3A33] z-0" />
                
                {/* Top Badge Tag */}
                <div className="absolute -top-4 -left-4 md:-left-6 z-20 border-2 border-void bg-canvas px-3 py-1.5 font-sans text-sm md:text-base font-bold tracking-tight text-void shadow-[4px_4px_0_rgba(138, 58, 51, 1)]">
                  Beyond a Mind&apos;s edge
                </div>

                {/* Main Image Container (Square) */}
                <div className="relative z-10 h-full w-full overflow-hidden bg-void ring-1 ring-canvas/20">
                  <Image
                    src={heroPortrait}
                    alt="Muhammad Arslan — portrait"
                    className="h-full w-full object-cover object-top"
                    placeholder="blur"
                  />
                </div>
              </div>

              {/* Name + title */}
              <p className="mt-4 pt-4 font-sans font-semibold text-canvas text-base">
                Muhammad Arslan
              </p>
              <p className="font-sans text-sm text-canvas/50">
                AI Engineer → building intelligent systems
              </p>

              {/* Social icons */}
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/muhammad-arslan-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas/10 text-canvas/60 transition-colors hover:bg-terra/20 hover:text-terra"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/ibn-e-Muhammad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas/10 text-canvas/60 transition-colors hover:bg-terra/20 hover:text-terra"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/_muhammad__arslan_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas/10 text-canvas/60 transition-colors hover:bg-terra/20 hover:text-terra"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right — Text content ── */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-2">
              <p className="about-para font-sans font-normal text-base md:text-lg leading-[1.75] mb-8 text-canvas/80">
                I am Muhammad Arslan, an AI Engineer and Full-Stack Developer
                currently completing my degree in Artificial Intelligence at
                Mehran University of Engineering and Technology. I architect
                Ai system solutions with the rigorous discipline of data
                science and the fluid pace of modern web engineering.
              </p>
              <p className="about-para font-sans font-normal text-base md:text-lg leading-[1.75] mb-8 text-canvas/80">
                My practice focuses heavily on data optimization and system
                integration. My work lives at the intersection of logic and
                aesthetic. Whether designing ETL data pipelines that reduce
                redundancy, managing full-stack architectures as Web Master
                for AIC MUET, or engineering RAG-based AI agents with custom
                guardrails for businesses to reduce hallucination rates and
                actually be useful, I design backend systems to perform
                reliably under extreme conditions and scale efficiently.
              </p>
              <p className="about-para font-sans font-normal text-base md:text-lg leading-[1.75] mb-8 text-canvas/80">
                From developing secure fintech platforms for clients to
                implementing live spatial Geolocation systems, I build
                software that values mathematical precision, performance
                security, and uncompromising design.
              </p>
              <p className="about-para font-sans text-base md:text-lg leading-[1.75] mb-8">
                <span className="block font-semibold text-canvas">
                  Good work is quiet. Bad work is loud.
                </span>
                <span className="block mt-2 font-normal text-canvas/80">
                  This is a practice built on mathematical restraint,
                  intentional design, and the belief that true intelligence
                  elegantly hides its own complexity.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
