"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";
import Interactive3DFlipTile from "./Interactive3DFlipTile";
import CaseStudyContent from "./CaseStudyContent";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  /* ── Derived flags ────────────────────────────── */
  const hasCaseStudy =
    !!project.case_study_description ||
    (project.case_study_features && project.case_study_features.length > 0);

  const hasHighlights =
    project.highlights &&
    project.highlights.length > 0 &&
    project.highlights.some((h) => h.value);

  return (
    <Interactive3DFlipTile
      isFlipped={isFlipped}
      onToggleFlip={() => setIsFlipped(!isFlipped)}
      index={index} // We will modify Interactive3DFlipTile to use this for the initial delay
      backContent={
        <CaseStudyContent
          project={project}
          onClose={() => setIsFlipped(false)}
        />
      }
    >
      <div
        className="relative w-full h-full p-6 md:p-8 flex flex-col rounded-2xl bg-white/70 shadow-[0_10px_30px_rgba(59,130,246,0.14),0_6px_24px_rgba(236,72,153,0.12),inset_0_1px_1px_rgba(30,41,59,0.18),inset_0_-2px_4px_rgba(30,41,59,0.12)] transition-all duration-500 group-hover:shadow-[0_18px_55px_rgba(56,189,248,0.38),0_12px_45px_rgba(168,85,247,0.32),0_8px_32px_rgba(244,114,182,0.28),inset_0_1px_2px_rgba(30,41,59,0.3),inset_0_-2px_6px_rgba(30,41,59,0.2)]"
        style={{ transform: "translateZ(0)", outline: "1px solid transparent" }}
      >
        {/* Shine/glare overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-[#f8fbff] via-[#e6f4ff] to-[#fef0ff] opacity-20 transition-opacity duration-500 group-hover:opacity-90" />

        {/* ── Header: Logo + Title ──────────────────── */}
        <div className="relative z-10 flex items-start gap-4">
          {project.logo_url ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={project.logo_url}
                alt={`${project.title} logo`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-terra/20 text-terra font-serif font-bold text-lg">
              {project.title.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-tight">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="font-sans text-sm text-ink/55 mt-1 line-clamp-2">
                {project.tagline}
              </p>
            )}
          </div>
        </div>

        {/* ── Tech stack ────────────────────────────── */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <p className="relative z-10 text-xs text-ink/45 font-sans mt-4 line-clamp-2">
            {project.tech_stack.join(" \u2022 ")}
          </p>
        )}

        {/* ── Platform pills ────────────────────────── */}
        {project.platforms && project.platforms.length > 0 && (
          <div className="relative z-10 mt-3 flex flex-wrap gap-2">
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full px-3 py-1 text-[10px] uppercase tracking-wider font-sans font-semibold border bg-terra/10 text-terra border-terra/20"
              >
                {platform}
              </span>
            ))}
          </div>
        )}

        {/* ── Divider ───────────────────────────────── */}
        {hasHighlights && (
          <div className="relative z-10 my-5 h-[1px] bg-ink/[0.05]" />
        )}

        {/* ── Highlights row ────────────────────────── */}
        {hasHighlights && (
          <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
            {project.highlights.slice(0, 3).map((highlight, i) => (
              <div key={i}>
                <p className="font-serif text-lg md:text-xl font-bold text-terra">
                  {highlight.value}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-ink/35 mt-1">
                  {highlight.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Spacer to push buttons to bottom ──────── */}
        <div className="flex-1" />

        {/* ── Buttons row ───────────────────────────── */}
        <div className="relative z-10 mt-6 flex items-center gap-3">
          {hasCaseStudy && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="pointer-events-auto flex-1 rounded-lg bg-terra/90 px-4 py-2.5 text-sm font-sans font-semibold text-canvas text-center transition-all hover:bg-terra/80 hover:shadow-lg hover:shadow-[0_10px_24px_rgba(56,189,248,0.25)]"
            >
              View Case Study
            </button>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto rounded-lg border border-ink/10 px-4 py-2.5 text-sm font-sans font-medium text-ink/80 text-center transition-all hover:bg-ink/3 hover:border-ink/20 hover:shadow-[0_8px_20px_rgba(168,85,247,0.18)] flex items-center justify-center gap-1.5"
            >
              Open
              <svg
                width="12"
                height="12"
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
    </Interactive3DFlipTile>
  );
}
