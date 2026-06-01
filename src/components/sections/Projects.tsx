"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Container from "../layout/Container";
import ProjectCard from "./ProjectCard";
import projectsBg from "../../assets/images/background_projects.png";
import type { Project } from "@/lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section
      className="relative overflow-hidden bg-oatmeal/[0.8]"
      data-section="projects"
    >
      {/* ── Background image ──────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={projectsBg}
          alt=""
          fill
          className="object-cover opacity-[0.18]"
          placeholder="blur"
        />
      </div>

      <Container>
        <div className="flex flex-col gap-12 md:gap-16">
          {/* ── Section heading ───────────────────── */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="projects-heading text-center"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink leading-[0.95] tracking-[-0.02em]">
              Systems I <span className="text-terra">built</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm md:text-base text-ink/60">
              Production-ready systems built with precision engineering and
              modern architecture.
            </p>
          </motion.div>

          {/* ── Card grid ─────────────────────────── */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink/40 py-20 font-sans">
              Projects coming soon.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
