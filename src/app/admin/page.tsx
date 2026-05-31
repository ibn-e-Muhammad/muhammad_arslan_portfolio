import { supabaseAdmin } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import {
  deleteMessage,
  deleteProject,
  toggleMessageRead,
} from "./actions";
import ProjectForm from "./ProjectForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  /* ── Fetch data ──────────────────────────────── */
  const { data: messages } = await supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("id, title, tagline, logo_url, category, year, image_url, link, description, tech_stack, platforms, highlights, case_study_description, case_study_features, case_study_label, created_at")
    .order("created_at", { ascending: true });

  const typedProjects = (projects ?? []) as Project[];

  const unreadCount =
    messages?.filter((m) => !m.read).length ?? 0;
  const totalMessages = messages?.length ?? 0;
  const totalProjects = typedProjects.length;

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
        <div className="mb-8">
          <ProjectForm />
        </div>

        {/* ── Projects list (expanded card layout) ─── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {typedProjects.length > 0 ? (
            typedProjects.map((project) => (
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
                  {/* Title + Logo + Delete */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Logo or initial */}
                      {project.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.logo_url}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-500">
                          {project.title.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {project.category} · {project.year}
                          {project.case_study_label && project.case_study_label !== "PROJECT" && (
                            <> · {project.case_study_label}</>
                          )}
                        </p>
                      </div>
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

                  {/* Tagline */}
                  {project.tagline && (
                    <p className="mt-2 text-sm text-gray-500 italic">
                      {project.tagline}
                    </p>
                  )}

                  {/* Description */}
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Tech Stack */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <p className="mt-2 text-xs text-gray-400">
                      {project.tech_stack.join(" · ")}
                    </p>
                  )}

                  {/* Platform tags */}
                  {project.platforms && project.platforms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.platforms.map((p) => (
                        <span
                          key={p}
                          className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-700 border border-teal-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-3 flex gap-4">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="text-center">
                          <p className="text-sm font-bold text-gray-700">{h.value}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{h.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link */}
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
