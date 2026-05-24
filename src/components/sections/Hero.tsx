"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image_url: string | null;
  link: string | null;
  description: string | null;
};

/* ── Fallback gradient cards when fewer than 4 projects ── */
const FALLBACK_CARDS = [
  { title: "AI Systems", gradient: "from-[#0292b7] to-[#064e6e]" },
  { title: "Web Architecture", gradient: "from-[#8A3A33] to-[#5a1f1a]" },
  { title: "Data Pipelines", gradient: "from-[#1C1A19] to-[#3a3634]" },
  { title: "Full-Stack", gradient: "from-[#0292b7] to-[#8A3A33]" },
];

export default function Hero({ projects = [] }: { projects?: Project[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  /* ── Build 4 cards: real projects first, fallbacks to fill ── */
  const cards = Array.from({ length: 4 }, (_, i) => {
    const proj = projects[i];
    if (proj && proj.image_url) {
      return {
        type: "project" as const,
        title: proj.title,
        image: proj.image_url,
      };
    }
    const fb = FALLBACK_CARDS[i];
    return {
      type: "fallback" as const,
      title: fb.title,
      gradient: fb.gradient,
    };
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Entry reveal ── */
      gsap.fromTo(
        [".hero-badge", ".hero-title", ".hero-name", ".hero-cta"],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".hero-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      /* ── 2. Card stack auto-rotation ── */
      const cardEls = gsap.utils.toArray<HTMLElement>(".hero-card");
      if (cardEls.length > 1) {
        const rotateStack = () => {
          const front = cardEls[0];
          // Animate front card to back
          gsap.to(front, {
            scale: 0.85,
            opacity: 0.6,
            rotateY: -8,
            x: 40,
            zIndex: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              // Move DOM element to end
              if (stackRef.current && front.parentElement) {
                front.parentElement.appendChild(front);
              }
              // Re-index all cards
              const updated = gsap.utils.toArray<HTMLElement>(".hero-card");
              updated.forEach((card, idx) => {
                const zIdx = updated.length - idx;
                const offsetX = idx * 32;
                const offsetY = idx * -20;
                const scl = 1 - idx * 0.06;
                gsap.to(card, {
                  scale: scl,
                  opacity: 1 - idx * 0.15,
                  rotateY: 0,
                  x: offsetX,
                  y: offsetY,
                  zIndex: zIdx,
                  duration: 0.6,
                  ease: "power2.out",
                });
              });
              // Update the array reference
              cardEls.length = 0;
              cardEls.push(...updated);
            },
          });
        };

        // Set initial positions
        cardEls.forEach((card, idx) => {
          const zIdx = cardEls.length - idx;
          gsap.set(card, {
            zIndex: zIdx,
            x: idx * 32,
            y: idx * -20,
            scale: 1 - idx * 0.06,
            opacity: 1 - idx * 0.15,
          });
        });

        const interval = setInterval(rotateStack, 3500);
        return () => clearInterval(interval);
      }
    }, sectionRef);

    // Dynamic Jellyfish motion for Orbs
    const blobs = gsap.utils.toArray<HTMLElement>(".glow-orb");
    blobs.forEach((orb, i) => {
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

    return () => ctx.revert();
  }, []);

  /* ── Scroll parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-content-wrapper", {
        y: 300,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 2,
        },
      });

      gsap.to(".hero-stack-wrapper", {
        y: 180,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const el = document.querySelector("[data-section='projects']");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      data-section="hero"
    >
      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="glow-orb absolute top-1/2 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9]/[0.80] blur-[40px]" />
        <div className="glow-orb absolute top-1/4 right-1/2 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33]/[0.70] blur-[60px]" />
        <div className="glow-orb absolute top-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-[#FFFDD0]/25 blur-[40px]" />
      </div>

      <Container className="relative flex min-h-[100svh] items-center pt-24 pb-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — Copy ── */}
          <div className="hero-content-wrapper order-2 flex flex-col gap-5 lg:order-1">
            {/* Status badge */}
            <div className="hero-badge flex items-center gap-2 w-fit rounded-full border border-ink/10 bg-canvas px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#10b962ff] animate-flicker" />
              <span className="font-sans text-base font-medium text-ink/90">
                Available for Inquiries
              </span>
            </div>

            {/* Main tagline */}
            <h1 className="hero-title font-serif font-semibold leading-[0.95] tracking-[-0.2rem] text-[3.5rem] md:text-7xl lg:text-[5.5rem]">
              <span className="block text-ink">I enjoy engineering</span>
              <strong className="block font-black text-[#0293b7c9]">
                intelligent
              </strong>
              <span className="block text-ink">systems.</span>
            </h1>

            {/* Name + role */}
            <p className="hero-name pt-4 font-sans text-xs md:text-base text-ink/70">
              I&apos;m{" "}
              <strong className="font-semibold text-ink">Arslan</strong>, an AI
              Engineer building scalable, autonomous, and intelligent systems.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToProjects}
              className="hero-cta cta-btn group mt-2 flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3.5 md:px-8 md:py-4 text-canvas transition-shadow hover:shadow-xl hover:shadow-ink/20"
            >
              <span className="cta-btn-text-wrapper w-[110px] text-left">
                <span className="cta-text cta-text-primary font-sans text-sm font-medium tracking-wide">
                  View Projects
                </span>
                <span className="cta-text cta-text-secondary font-sans text-sm font-medium tracking-wide">
                  See My Work
                </span>
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-opacity group-hover:opacity-70"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>

          {/* ── Right — Card Stack ── */}
          <div className="hero-stack-wrapper order-1 flex justify-center lg:order-2 lg:justify-end">
            <div
              ref={stackRef}
              className="relative h-[220px] w-[350px] md:h-[280px] md:w-[460px] lg:h-[320px] lg:w-[540px] mt-8 lg:mt-0"
              style={{ perspective: "1200px" }}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="hero-card absolute inset-0 rounded-2xl border border-ink/[0.06] shadow-2xl overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {card.type === "project" ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      priority={true}
                      className="object-cover"
                      sizes="(max-width: 768px) 260px, 350px"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${card.gradient} flex items-end p-6`}
                    >
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-canvas/70 font-medium">
                        {card.title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
