"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Section from "../layout/Section";
import Container from "../layout/Container";
import projectsBg from "../../assets/images/background_projects.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "arcadia",
    title: "Arcadia",
    category: "Digital Experience",
    year: "2024",
  },
  {
    id: "lumina",
    title: "Lumina",
    category: "Brand System",
    year: "2023",
  },
  {
    id: "nocturne",
    title: "Nocturne",
    category: "Interactive Story",
    year: "2022",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Cinematic parallax on project images ──────── */
      const wrappers = gsap.utils.toArray<HTMLElement>(".project-media");

      wrappers.forEach((wrapper) => {
        const image = wrapper.querySelector<HTMLElement>(".project-img");
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -30 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 2.5,
            },
          },
        );
      });

      /* ── Staggered reveal for project info rows ───── */
      gsap.utils.toArray<HTMLElement>(".project-info").forEach((info) => {
        gsap.fromTo(
          info,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: info,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className="relative overflow-hidden">
      {/* ── Section background image ──────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={projectsBg}
          alt=""
          fill
          className="object-cover opacity-[0.2]"
          placeholder="blur"
        />
      </div>

      <Container>
        <div className="flex flex-col gap-section-gap">
          {/* Section heading */}
          <div className="text-center">
            <h2
              className="hero-title font-serif text-terra"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Selected Works
            </h2>
          </div>

          {/* Project entries */}
          <div className="flex flex-col">
            {projects.map((project) => (
              <article
                key={project.id}
                className="relative mb-20 md:mb-40 flex min-h-[50vh] md:min-h-[80vh] flex-col justify-center"
              >
                {/* Cinematic project poster — oatmeal placeholder with parallax */}
                <div className="project-media mb-4 w-full aspect-[4/3] md:aspect-[21/9] bg-oatmeal relative overflow-hidden rounded-sm">
                  <div className="project-img h-[180%] w-full bg-oatmeal" />
                </div>

                {/* Project info — stacks on mobile, row on desktop */}
                <div className="project-info flex flex-col gap-3 pt-2 pb-8 md:gap-4 md:pb-10 md:flex-row md:items-end md:justify-between border-b border-ink/10">
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-widest text-ink/60">
                    <span className="font-sans">{project.category}</span>
                    <span className="font-sans text-ink/30">—</span>
                    <span className="font-sans">{project.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
