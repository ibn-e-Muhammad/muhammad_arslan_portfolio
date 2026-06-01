"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../layout/Container";
import type { Project } from "@/lib/types";

/* ── Fallback gradient cards when fewer than 4 projects ── */
const FALLBACK_CARDS = [
  { title: "AI Systems", gradient: "from-[#0292b7] to-[#064e6e]" },
  { title: "Web Architecture", gradient: "from-[#8A3A33] to-[#5a1f1a]" },
  { title: "Data Pipelines", gradient: "from-[#1C1A19] to-[#3a3634]" },
  { title: "Full-Stack", gradient: "from-[#0292b7] to-[#8A3A33]" },
];

export default function Hero({ projects = [] }: { projects?: Project[] }) {
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

  const [cardsState, setCardsState] = useState(cards);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCardsState((prev) => {
        const newCards = [...prev];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ── Scroll parallax ── */
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityContent = useTransform(scrollY, [0, 1000], [1, 0]);

  const yStack = useTransform(scrollY, [0, 1000], [0, 180]);
  const opacityStack = useTransform(scrollY, [0, 1000], [1, 0]);

  const scrollToProjects = () => {
    const el = document.querySelector("[data-section='projects']");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-oatmeal"
      data-section="hero"
    >
      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{
            x: ["-10%", "20%", "-20%", "10%", "-10%"],
            y: ["-10%", "20%", "0%", "-20%", "-10%"],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/2 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9]/[0.80] blur-[40px]"
        />
        <motion.div
          animate={{
            x: ["20%", "-10%", "20%", "-20%", "20%"],
            y: ["20%", "-20%", "10%", "-10%", "20%"],
            scale: [1, 1.1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/4 right-1/2 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33]/[0.70] blur-[60px]"
        />
        <motion.div
          animate={{
            x: ["-20%", "30%", "-10%", "20%", "-20%"],
            y: ["-20%", "30%", "-10%", "20%", "-20%"],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-[#FFFDD0]/25 blur-[40px]"
        />
      </div>

      <Container className="relative flex min-h-[100svh] items-center pt-24 pb-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — Copy ── */}
          <motion.div
            style={{ y: yContent, opacity: opacityContent }}
            className="hero-content-wrapper order-2 flex flex-col gap-5 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="hero-badge flex items-center gap-2 w-fit rounded-full border border-ink/10 bg-oatmeal px-4 py-2"
            >
              <span className="h-3 w-3 rounded-full bg-[#10b962ff] animate-flicker" />
              <span className="font-sans text-base font-medium text-ink/90">
                Available for Inquiries
              </span>
            </motion.div>

            {/* Main tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.48, ease: "easeOut" }}
              className="hero-title font-serif font-semibold leading-[0.95] tracking-[-0.2rem] text-[3.5rem] md:text-7xl lg:text-[5.5rem]"
            >
              <span className="block text-ink">I enjoy engineering</span>
              <span className="block font-black text-terra">intelligent</span>
              <span className="block text-ink">systems.</span>
            </motion.h1>

            {/* Name + role */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.66, ease: "easeOut" }}
              className="hero-name pt-4 font-sans text-xs md:text-base text-ink/70"
            >
              I&apos;m Arslan, an AI Engineer building scalable, autonomous, and
              intelligent systems. Specializing in neural architecture
              integration, robust backend pipelines, and interactive full-stack
              infrastructure.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.84, ease: "easeOut" }}
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
            </motion.button>
          </motion.div>

          {/* ── Right — Card Stack ── */}
          <motion.div
            style={{ y: yStack, opacity: opacityStack }}
            className="hero-stack-wrapper order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div
              className="relative h-[250px] w-[380px] md:h-[320px] md:w-[500px] lg:h-[380px] lg:w-[600px] mt-8 lg:mt-0"
              style={{ perspective: "1200px" }}
            >
              {cardsState.map((card, idx) => (
                <motion.div
                  key={card.title}
                  layout
                  initial={false}
                  animate={{
                    zIndex: cardsState.length - idx,
                    x: idx * 36,
                    y: isMounted ? idx * -24 : 80,
                    scale: isMounted ? 1 - idx * 0.05 : 0.9,
                    opacity: isMounted ? 1 - idx * 0.12 : 0,
                  }}
                  transition={{
                    duration: isMounted ? 0.6 : 1.6,
                    delay: isMounted ? 0 : 0.5 + idx * 0.12,
                    ease: "easeOut",
                  }}
                  className="hero-card absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-void shadow-2xl ring-1 ring-ink/20"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ── Laptop Top Bezel + Camera ── */}
                  <div className="relative z-10 flex h-3.5 shrink-0 items-center justify-center w-full bg-void md:h-5">
                    <div className="relative flex h-1 w-1 items-center justify-center rounded-full bg-canvas/20 md:h-1.5 md:w-1.5">
                      <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-[1px]" />
                    </div>
                  </div>

                  {/* ── Screen Content ── */}
                  <div className="relative flex-1 w-full overflow-hidden bg-ink">
                    {/* Inner screen shadow/glare for hardware realism */}
                    <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-canvas/5" />
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.08]" />

                    {card.type === "project" ? (
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        priority={true}
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 380px, 600px"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-end bg-gradient-to-br ${card.gradient} p-6`}
                      >
                        <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-canvas/70">
                          {card.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Laptop Bottom Chin ── */}
                  <div className="relative z-10 flex h-4 shrink-0 items-center justify-center w-full border-t border-canvas/5 bg-void md:h-6">
                    <div className="h-[2px] w-6 rounded-full bg-canvas/10 md:w-10 md:h-[3px]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
