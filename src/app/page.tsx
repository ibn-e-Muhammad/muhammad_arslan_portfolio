import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import { supabaseAdmin } from "@/lib/supabase";
import type { Project } from "@/lib/types";

export default async function Home() {
  /* ── Fetch projects from Supabase ────────────── */
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("id, title, tagline, logo_url, category, year, image_url, link, description, tech_stack, platforms, highlights, case_study_description, case_study_features, case_study_label")
    .order("created_at", { ascending: true });

  const typedProjects = (projects ?? []) as Project[];

  return (
    <main>
      <Hero projects={typedProjects} />
      <About />
      <Projects projects={typedProjects} />
      <Contact />
    </main>
  );
}
