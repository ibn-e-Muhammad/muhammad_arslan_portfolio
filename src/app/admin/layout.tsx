import "../globals.css" 

export const metadata = {
  title: "Admin — Muhammad Arslan Portfolio",
  description: "Admin dashboard for managing projects and messages.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* ── Admin header ───────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <a
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            ← Back to Site
          </a>
        </div>
      </header>

      {/* ── Main content ───────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
