import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import { supabaseAdmin } from "@/lib/supabase";

export default async function Home() {
  /* ── Fetch projects from Supabase ────────────── */
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("id, title, category, year, image_url")
    .order("created_at", { ascending: true });

  return (
    <main>
      <Hero />
      <About />
      <Projects projects={projects ?? []} />
      <Contact />
    </main>
  );
}
