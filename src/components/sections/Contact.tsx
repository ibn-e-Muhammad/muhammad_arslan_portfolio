"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Contact() {
  const textRef = useRef<HTMLDivElement | null>(null);
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

  /* ── Magnetic hover ──────────────────────────── */
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) * 0.08;
      const offsetY = (e.clientY - centerY) * 0.08;

      x.set(Math.max(-25, Math.min(25, offsetX)));
      y.set(Math.max(-25, Math.min(25, offsetY)));
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-section="contact"
      className="relative min-h-screen bg-oatmeal text-ink flex flex-col justify-between px-8 py-12 md:px-16 md:py-16 lg:px-28 lg:py-24 overflow-hidden"
    >
      {/* ── Ambient orbs — light theme ─────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{
            x: ["-10%", "20%", "-20%", "10%", "-10%"],
            y: ["-10%", "20%", "0%", "-20%", "-10%"],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/4 left-1/2 h-[50vw] w-[50vw] rounded-full bg-[#0293b7c9]/[0.12] blur-[40px]"
        />
        <motion.div
          animate={{
            x: ["20%", "-10%", "20%", "-20%", "20%"],
            y: ["20%", "-20%", "10%", "-10%", "20%"],
            scale: [1, 1.1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/2 right-1/4 h-[55vw] w-[55vw] rounded-full bg-[#8A3A33]/[0.08] blur-[60px]"
        />
        <motion.div
          animate={{
            x: ["-20%", "30%", "-10%", "20%", "-20%"],
            y: ["-20%", "30%", "-10%", "20%", "-20%"],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="glow-orb absolute top-1/4 right-1/4 h-[30vw] w-[30vw] rounded-full bg-oatmeal blur-[80px]"
        />
      </div>

      {/* ── Ambient glow ────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[40vw] w-[40vw] rounded-full bg-terra/[0.04] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[50vw] w-[50vw] rounded-full bg-[#8A3A33]/[0.03] blur-[120px]" />
      </div>

      {/* ── Top label — availability badge ──────── */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#10b962] animate-flicker" />
          <p className="text-xs uppercase tracking-widest font-sans text-ink/60 font-medium">
            Available for Inquiries
          </p>
        </div>
      </div>

      {/* ── Central statement — magnetic ────────── */}
      <div className="relative z-10">
        <motion.div
          style={{ x, y }}
          ref={textRef}
          className="flex flex-col gap-6"
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.95] text-ink">
            <span className="block">Let&apos;s build</span>
            <span className="block">something timeless.</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-ink/50 max-w-lg leading-relaxed">
            In 15 minutes, I&apos;ll pinpoint things standing between your
            product &amp; its first users.
          </p>

          {/* CTA Button — matches Hero "View Projects" style exactly */}
          <motion.a
            href="https://cal.com/muhammad-arslan-g/15min"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cta-btn group mt-2 flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3.5 md:px-8 md:py-4 text-canvas transition-shadow hover:shadow-xl hover:shadow-ink/20"
          >
            <span className="cta-btn-text-wrapper w-[170px] text-left">
              <span className="cta-text cta-text-primary font-sans text-sm font-medium tracking-wide">
                Book a free 5-min call
              </span>
              <span className="cta-text cta-text-secondary font-sans text-sm font-medium tracking-wide">
                Let&apos;s get started
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
          </motion.a>
        </motion.div>
      </div>

      {/* ── Footer ─────────────────────────────── */}
      <div className="relative flex flex-col gap-6 text-xs uppercase tracking-widest font-sans text-ink/50 md:flex-row md:items-center md:justify-between">
        <span className="font-medium">Local time: {localTime}</span>

        <div className="flex gap-6 md:gap-8">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/muhammad-arslan-g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-300 hover:text-terra"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/923116683784"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-300 hover:text-terra"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/ibn-e-Muhammad/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-300 hover:text-terra"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/_muhammad__arslan_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-300 hover:text-terra"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </a>
        </div>

        <span className="font-medium">
          &copy; {new Date().getFullYear()} Muhammad Arslan
        </span>
      </div>
    </section>
  );
}
