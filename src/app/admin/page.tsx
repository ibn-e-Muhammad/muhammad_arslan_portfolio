import { supabaseAdmin } from "@/lib/supabase";
import {
  deleteMessage,
  deleteProject,
  addProject,
  toggleMessageRead,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  /* ── Fetch data ──────────────────────────────── */
  const { data: messages } = await supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  const unreadCount =
    messages?.filter((m) => !m.read).length ?? 0;
  const totalMessages = messages?.length ?? 0;
  const totalProjects = projects?.length ?? 0;

  return (
    <div className="flex flex-col gap-10">
      {/* ══════════════════════════════════════════ */}
      {/*  STATS BAR                                */}
      {/* ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Total Messages
          </p>
          <p className="mt-1 text-3xl font-semibold">{totalMessages}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Unread Messages
          </p>
          <p className="mt-1 text-3xl font-semibold text-amber-600">
            {unreadCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Total Projects
          </p>
          <p className="mt-1 text-3xl font-semibold">{totalProjects}</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/*  MESSAGES                                 */}
      {/* ══════════════════════════════════════════ */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Messages{" "}
          <span className="text-sm font-normal text-gray-400">
            ({totalMessages})
          </span>
        </h2>

        <div className="flex flex-col gap-3">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl border p-5 transition-colors ${
                  msg.read
                    ? "border-gray-100 bg-white"
                    : "border-amber-200 bg-amber-50/50"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar circle */}
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold uppercase text-white">
                      {msg.name?.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {msg.name}
                      </p>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      ·{" "}
                      {new Date(msg.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!msg.read && (
                      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Message body */}
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                  {msg.message}
                </p>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your message on my portfolio&body=%0A%0A---%0AOriginal message:%0A${encodeURIComponent(msg.message)}`}
                    className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    Reply
                  </a>
                  <form
                    action={async () => {
                      "use server";
                      await toggleMessageRead(msg.id, !msg.read);
                    }}
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      {msg.read ? "Mark unread" : "Mark read"}
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await deleteMessage(msg.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 px-4 py-12 text-center text-gray-400">
              No messages yet.
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  PROJECTS                                 */}
      {/* ══════════════════════════════════════════ */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Projects{" "}
          <span className="text-sm font-normal text-gray-400">
            ({totalProjects})
          </span>
        </h2>

        {/* ── Add project form ─────────────────────── */}
        <form
          action={async (formData) => {
            "use server";
            await addProject(formData);
          }}
          className="mb-8 rounded-xl border border-gray-200 bg-gray-50/80 p-6"
        >
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Add New Project
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Title *
              </label>
              <input
                name="title"
                required
                placeholder="Project name"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Category *
              </label>
              <input
                name="category"
                required
                placeholder="e.g. Brand System"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Year *
              </label>
              <input
                name="year"
                required
                placeholder="2024"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Live Link
              </label>
              <input
                name="link"
                type="url"
                placeholder="https://project-url.com"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief description of the project..."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors resize-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Cover Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-1 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200 outline-none focus:border-gray-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Add Project
            </button>
          </div>
        </form>

        {/* ── Projects list (card layout) ──────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                {/* Image preview */}
                {project.image_url && (
                  <div className="relative h-40 w-full bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {project.category} · {project.year}
                      </p>
                    </div>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProject(project.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-lg border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
                    >
                      {project.link} ↗
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-gray-200 px-4 py-12 text-center text-gray-400">
              No projects yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
