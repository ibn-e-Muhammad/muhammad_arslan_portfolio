"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";
import Section from "../layout/Section";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] w-full rounded-sm bg-oatmeal" />
            </div>
          </div>
          <div ref={rightColumnRef} className="lg:col-span-7">
            <div className="space-y-8">
              <h2 className="about-reveal font-serif text-4xl lg:text-6xl">
                An Editorial Approach to Digital Craft
              </h2>
              <div
                className="space-y-8 text-ink/80 leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                <p className="about-reveal">
                  I design interfaces with the discipline of print and the pace
                  of cinema. Every grid, margin, and typographic decision is
                  tuned to make space for the story.
                </p>
                <p className="about-reveal">
                  The work lives in contrast—soft textures against sharp
                  structure, quiet moments against bold statements—always
                  calibrated for elegance and clarity.
                </p>
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
