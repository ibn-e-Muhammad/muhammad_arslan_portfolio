"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Section from "../layout/Section";

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
      const wrappers = gsap.utils.toArray<HTMLElement>(".project-media");

      wrappers.forEach((wrapper) => {
        const image = wrapper.querySelector<HTMLImageElement>("img");
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef}>
      <div className="space-y-section-gap">
        <div className="text-center">
          <h2 className="font-serif" style={{ fontSize: "var(--text-h2)" }}>
            Selected Works
          </h2>
        </div>
        <div className="flex flex-col">
          {projects.map((project) => (
            <article
              key={project.id}
              className="relative mb-32 flex min-h-[80vh] flex-col justify-center"
            >
              <div className="project-media mb-8 w-full aspect-[4/3] md:aspect-[21/9] bg-oatmeal relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000"
                  alt={project.title}
                  className="h-[120%] w-full object-cover origin-top"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h3 className="font-serif text-4xl lg:text-6xl">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-ink/60">
                  <span className="font-sans">{project.category}</span>
                  <span className="font-sans">{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
