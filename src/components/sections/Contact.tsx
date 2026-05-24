"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import ContactModal from "./ContactModal";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLAnchorElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");

  /* ── Live clock ──────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      setLocalTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Magnetic hover ──────────────────────────── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.08;
    const offsetY = (e.clientY - centerY) * 0.08;

    gsap.to(textRef.current, {
      x: Math.max(-25, Math.min(25, offsetX)),
      y: Math.max(-25, Math.min(25, offsetY)),
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-section="contact"
        className="relative min-h-screen bg-void text-canvas flex flex-col justify-between px-8 py-12 md:px-16 md:py-16 lg:px-28 lg:py-24 overflow-hidden"
      >
        {/* ── Blurred ambient orbs — liquid haze background ── */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="glow-orb absolute top-1/4 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9] blur-[40px]" />
          <div className="glow-orb absolute top-1/2 right-1/4 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33] blur-[60px]" />
          <div className="glow-orb absolute top-1/4 right-1/4 h-[30vw] w-[30vw] rounded-full bg-void blur-[80px]" />
        </div>

        {/* ── Ambient glow ────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 h-[40vw] w-[40vw] rounded-full bg-terra/[0.05] blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[50vw] w-[50vw] rounded-full bg-[#8A3A33]/[0.04] blur-[120px]" />
        </div>

        {/* Top label */}
        <div className="relative">
          <p className="text-xs uppercase tracking-widest font-sans text-canvas/60">
            Get in touch
          </p>
        </div>

        {/* Central statement — magnetic */}
        <div className="relative z-10">
          <a
            ref={textRef}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="block cursor-pointer font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.95] transition-colors duration-500 hover:text-terra"
          >
            <span className="block">Let&apos;s build</span>
            <span className="block">something timeless.</span>
          </a>
        </div>

        {/* Footer info */}
        <div className="relative flex flex-col gap-6 text-xs uppercase tracking-widest font-sans text-canvas/60 md:flex-row md:items-center md:justify-between">
          <span>Local time: {localTime}</span>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/muhammad-arslan-g"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-terra"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/923116683784"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-terra"
            >
              WhatsApp
            </a>
            <a
              href="https://github.com/ibn-e-Muhammad/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-terra"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/_muhammad__arslan_/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-terra"
            >
              Instagram
            </a>
          </div>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </section>

      {/* ── Contact Modal ──────────────────────── */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
