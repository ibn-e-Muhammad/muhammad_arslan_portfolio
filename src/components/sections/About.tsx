"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Container from "../layout/Container";
import Section from "../layout/Section";
import heroPortrait from "../../assets/images/hero_profile_pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Staggered reveal for right-column text ─────── */
      /*    Uses toggleActions (no scrub) so the tween     */
      /*    plays once and reverses cleanly on scroll-back */
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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* ── No conflicting scrub fade-out on the same     */
      /*    elements. The text reveals cleanly and stays.  */
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef}>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky portrait — pinned while text scrolls */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-oatmeal">
                <Image
                  src={heroPortrait}
                  alt="Muhammad Arslan — portrait"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>

          {/* Scrollable text column */}
          <div ref={rightColumnRef} className="lg:col-span-7">
            <div className="flex flex-col gap-10">
              <h2 className="about-reveal font-serif text-4xl lg:text-6xl leading-tight text-terra">
                An Editorial Approach to Digital Craft
              </h2>
              <div
                className="flex flex-col gap-8 text-ink/80 leading-relaxed"
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
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature.
                </p>
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature.
                </p>
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Beatae pariatur voluptate
                  eveniet voluptatibus, voluptatem, ratione quia dolor, hic
                  inventore voluptates necessitatibus dolore ullam quibusdam
                  nulla mollitia amet explicabo? Vitae nobis dolores vel
                  corporis hic cupiditate non facere esse quisquam quia. Odio,
                  accusamus. Iusto, porro impedit.
                </p>
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Inventore aliquam eum,
                  saepe quo modi aut alias rerum iste debitis? Odit?
                  Necessitatibus, voluptate. Voluptas, doloremque. Doloribus,
                  consequatur. Voluptas, doloremque. Doloribus, consequatur.
                </p>
                <p className="about-reveal">
                  This is a practice built on restraint, intent, and the belief
                  that atmosphere is a product feature. Lorem ipsum dolor, sit
                  amet consectetur adipisicing elit. Pariatur debitis eaque id.
                  Debitis eos asperiores quo excepturi sapiente dolore soluta!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
