"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Section from "../layout/Section";
import Container from "../layout/Container";
import projectsBg from "../../assets/images/background_projects.png";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image_url: string | null;
  link: string | null;
  description: string | null;
};

export default function Projects({ projects }: { projects: Project[] }) {
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
              My Works
            </h2>
          </div>

          {/* Project entries */}
          <div className="flex flex-col">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article
                  key={project.id}
                  className="relative mb-20 md:mb-40 flex min-h-[50vh] md:min-h-[80vh] flex-col justify-center"
                >
                  {/* Cinematic project poster with parallax */}
                  <div className="project-media mb-4 w-full aspect-[4/3] md:aspect-[21/9] bg-oatmeal relative overflow-hidden rounded-sm">
                    {project.image_url ? (
                      <div className="project-img h-[180%] w-full relative">
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    ) : (
                      <div className="project-img h-[180%] w-full bg-oatmeal" />
                    )}
                  </div>

                  {/* Project info */}
                  <div className="project-info flex flex-col gap-3 pt-2 pb-8 md:gap-4 md:pb-10 border-b border-ink/10">
                    {/* Title + Meta row */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <h3 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-widest text-ink/60">
                        <span className="font-sans">{project.category}</span>
                        <span className="font-sans text-ink/30">—</span>
                        <span className="font-sans">{project.year}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {project.description && (
                      <p className="max-w-2xl text-sm md:text-base leading-relaxed text-ink/60 font-sans">
                        {project.description}
                      </p>
                    )}

                    {/* Live link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest font-sans text-terra transition-colors hover:text-terra/70"
                      >
                        <span>See Live Project</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-ink/40 py-20 font-sans">
                Projects coming soon.
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
