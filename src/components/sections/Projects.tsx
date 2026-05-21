import Section from "../layout/Section";

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
  return (
    <Section>
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
              <div className="mb-8 w-full aspect-[4/3] md:aspect-[21/9] bg-oatmeal relative overflow-hidden" />
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
