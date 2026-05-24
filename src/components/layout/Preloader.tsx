"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Preloader() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  const animatedValue = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const animateToValue = useCallback((target: number) => {
    if (tweenRef.current) tweenRef.current.kill();
    const proxy = { value: animatedValue.current };
    tweenRef.current = gsap.to(proxy, {
      value: Math.min(target, 100),
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(proxy.value);
        animatedValue.current = proxy.value;
        if (counterRef.current) counterRef.current.textContent = String(rounded);
        if (lineRef.current) lineRef.current.style.width = `${proxy.value}%`;
      },
    });
  }, []);

  const triggerExit = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(".preloader-content", {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power3.inOut",
    });

    tl.to(
      wrapperRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "-=0.2",
    );
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_DISPLAY_MS = 1500;

    let fontsReady = false;
    let windowLoaded = false;
    let totalImages = 0;
    let loadedImages = 0;

    const computeProgress = () => {
      const parts: number[] = [];

      // Image loading progress (weight: 60%)
      if (totalImages > 0) {
        parts.push((loadedImages / totalImages) * 60);
      } else {
        parts.push(60);
      }

      // Fonts ready (weight: 20%)
      if (fontsReady) parts.push(20);
      else parts.push(0);

      // Window loaded (weight: 20%)
      if (windowLoaded) parts.push(20);
      else parts.push(0);

      return parts.reduce((a, b) => a + b, 0);
    };

    const checkComplete = () => {
      const progress = computeProgress();
      animateToValue(progress);

      if (fontsReady && windowLoaded && loadedImages >= totalImages) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

        // Animate to 100 then exit
        animateToValue(100);
        setTimeout(() => {
          triggerExit();
        }, remaining + 600); // 600ms for the tween to reach 100
      }
    };

    // Track images (ignore lazy loaded ones)
    const images = Array.from(document.images).filter(
      (img) => img.loading !== "lazy"
    );
    totalImages = images.length;
    loadedImages = images.filter((img) => img.complete).length;

    images.forEach((img) => {
      if (img.complete) return;
      const onDone = () => {
        loadedImages++;
        checkComplete();
      };
      img.addEventListener("load", onDone, { once: true });
      img.addEventListener("error", onDone, { once: true });
    });

    // Track fonts
    document.fonts.ready.then(() => {
      fontsReady = true;
      checkComplete();
    });

    // Track window load
    if (document.readyState === "complete") {
      windowLoaded = true;
    } else {
      window.addEventListener(
        "load",
        () => {
          windowLoaded = true;
          checkComplete();
        },
        { once: true },
      );
    }

    // Initial check
    checkComplete();
  }, [animateToValue, triggerExit]);

  if (done) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
    >
      {/* ── Subtle ambient orb ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terra/[0.06] blur-[120px]" />
      </div>

      {/* ── Centered content ── */}
      <div className="preloader-content relative flex flex-col items-center">
        {/* Percentage */}
        <div className="flex items-start" style={{ fontFamily: "var(--font-mono)" }}>
          <span
            ref={counterRef}
            className="text-[8rem] md:text-[10rem] font-bold tracking-tight text-ink/80 leading-none"
          >
            0
          </span>
          <span className="mt-6 text-3xl md:text-4xl font-bold text-ink/40">
            %
          </span>
        </div>

        {/* Progress line */}
        <div className="mt-4 h-[1px] w-64 md:w-80 bg-ink/10">
          <div
            ref={lineRef}
            className="h-full bg-ink transition-[width] duration-300 ease-out"
            style={{ width: "0%" }}
          />
        </div>

        {/* Subtext */}
        <p className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans text-ink/40 font-medium">
          Crafting your experience
        </p>
      </div>
    </div>
  );
}
