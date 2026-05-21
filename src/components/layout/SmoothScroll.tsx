"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stopLenis = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    const startLenis = () => {
      if (lenisRef.current) return;

      lenisRef.current = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      };

      rafIdRef.current = requestAnimationFrame(raf);
    };

    const handleMotionPreference = () => {
      if (mediaQuery.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionPreference);
      stopLenis();
    };
  }, []);

  return <>{children}</>;
}
