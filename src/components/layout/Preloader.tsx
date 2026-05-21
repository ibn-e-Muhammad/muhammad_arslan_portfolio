"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { value: 0 };

      /* ── Count 0 → 100 ───────────────────────────── */
      gsap.to(proxy, {
        value: 100,
        duration: 2.8,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.round(proxy.value),
            );
          }
        },
        onComplete: () => {
          /* ── Curtain drop ────────────────────────── */
          gsap.to(wrapperRef.current, {
            yPercent: -100,
            duration: 1.8,
            ease: "power4.inOut",
            onComplete: () => setDone(true),
          });
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void text-canvas"
    >
      {/* ── Terra hue backdrop ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terra/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[50vw] w-[50vw] rounded-full bg-[#8A3A33]/[0.06] blur-[100px]" />
      </div>

      {/* ── Counter ────────────────────────────────── */}
      <span
        ref={counterRef}
        className="relative font-sans text-8xl font-light tracking-tight text-canvas/70 md:text-9xl"
      >
        0
      </span>
    </div>
  );
}
