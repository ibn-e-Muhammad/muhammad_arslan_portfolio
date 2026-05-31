/* ── Shared types across the portfolio ─────────── */

export type Highlight = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string | null;
  logo_url: string | null;
  category: string;
  year: string;
  image_url: string | null;
  link: string | null;
  description: string | null;
  tech_stack: string[];
  platforms: string[];
  highlights: Highlight[];
  case_study_description: string | null;
  case_study_features: string[];
  case_study_label: string;
  created_at: string;
};

/* ── Predefined options for admin toggle systems ── */

export const TECH_STACK_OPTIONS = [
  "React", "Next.js", "Vue.js", "Angular", "Svelte",
  "Node.js", "Express", "Django", "Flask", "FastAPI",
  "Spring Boot", "Laravel", "Firebase", "Supabase",
  "MongoDB", "PostgreSQL", "MySQL", "Redis",
  "GraphQL", "REST API", "Docker", "Kubernetes",
  "AWS", "GCP", "Azure", "TensorFlow", "PyTorch",
  "OpenAI API", "LangChain", "Tailwind CSS", "GSAP",
  "Three.js", "Socket.io", "Stripe", "Prisma",
  "Drizzle", "Chat SDK", "Health API", "AI SDK",
  "Image Processing", "Maps API", "Lenis", "Vercel",
  "Heroku", "DigitalOcean",
] as const;

export const PLATFORM_OPTIONS = [
  // Platforms
  "WEB", "IOS", "ANDROID", "DESKTOP", "MOBILE", "API", "CLI", "BROWSER EXTENSION",
  // Languages
  "PYTHON", "JAVASCRIPT", "TYPESCRIPT", "DART", "JAVA",
  "KOTLIN", "SWIFT", "C++", "RUST", "GO", "RUBY", "PHP", "C#",
] as const;
