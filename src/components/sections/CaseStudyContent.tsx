"use client";

import Image from "next/image";
import type { Project } from "@/lib/types";

interface CaseStudyContentProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyContent({
  project,
  onClose,
}: CaseStudyContentProps) {
  if (!project) return null;

  const hasFeatures =
    project?.case_study_features && project.case_study_features.length > 0;
  const hasHighlights =
    project?.highlights &&
    project.highlights.length > 0 &&
    project.highlights.some((h) => h.value);

  return (
    <>
      {/* ── Ambient orbs ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 h-[40vw] w-[40vw] rounded-full bg-terra/[0.15] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[50vw] w-[50vw] rounded-full bg-[#8A3A33]/[0.1] blur-[120px]" />
      </div>

      <div className="relative w-full h-full flex flex-col z-10">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink/60 transition-colors hover:bg-ink/15 hover:text-ink"
              aria-label="Close case study"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
        <div className="p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* ── Left: Device mockup ─────────────── */}
            <div className="flex flex-col gap-6">
              {/* Mockup frame */}
              <div className="relative rounded-2xl border border-ink/10 bg-white overflow-hidden shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/[0.06]">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="ml-4 h-5 flex-1 rounded-md bg-ink/[0.06]" />
                </div>
                {/* Screenshot */}
                <div className="relative aspect-[16/10] w-full bg-canvas/50">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-serif text-2xl text-ink/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights below mockup */}
              {hasHighlights && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  {project.highlights.slice(0, 3).map((highlight, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-ink/[0.06] bg-white p-3"
                    >
                      <p className="font-serif text-lg md:text-xl font-bold text-terra">
                        {highlight.value}
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-wider text-ink/40 mt-0.5">
                        {highlight.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Details ──────────────────── */}
            <div className="flex flex-col">
              {/* Case study label */}
              {project.case_study_label && (
                <span className="text-[10px] uppercase tracking-[0.25em] text-terra font-sans font-semibold border border-terra/30 rounded-full px-3 py-1 w-fit">
                  {project.case_study_label}
                </span>
              )}

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-3 leading-[1.05]">
                {project.title}
              </h2>

              {/* Tagline */}
              {project.tagline && (
                <p className="text-terra font-sans text-base mt-1.5">
                  {project.tagline}
                </p>
              )}

              {/* Tech stack */}
              {project.tech_stack && project.tech_stack.length > 0 && (
                <p className="text-xs text-ink/50 font-sans mt-2">
                  {project.tech_stack.join(" \u2022 ")}
                </p>
              )}

              {/* Description */}
              {project.case_study_description && (
                <p className="font-sans text-[15px] leading-[1.6] text-ink/70 mt-4">
                  {project.case_study_description}
                </p>
              )}

              {/* Platform pills */}
              {project.platforms && project.platforms.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider font-sans font-semibold border bg-terra/15 text-terra border-terra/25"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              )}

              {/* Feature list */}
              {hasFeatures && (
                <ul className="mt-4 flex flex-col gap-2">
                  {project.case_study_features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terra shrink-0" />
                      <span className="font-sans text-sm text-ink/80 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Visit project button */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-terra px-5 py-2.5 text-sm font-sans font-semibold text-canvas mt-6 transition-all hover:shadow-lg hover:shadow-terra/20 w-fit"
                >
                  Visit Project
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
