import { supabaseAdmin } from "@/lib/supabase";
import { deleteMessage, deleteProject, addProject } from "./actions";

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

  return (
    <div className="flex flex-col gap-12">
      {/* ══════════════════════════════════════════ */}
      {/*  MESSAGES TABLE                           */}
      {/* ══════════════════════════════════════════ */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Messages{" "}
          <span className="text-sm font-normal text-gray-400">
            ({messages?.length ?? 0})
          </span>
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium">{msg.name}</td>
                    <td className="px-4 py-3 text-gray-600">{msg.email}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-600">
                      {msg.message}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteMessage(msg.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  PROJECTS TABLE                           */}
      {/* ══════════════════════════════════════════ */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Projects{" "}
          <span className="text-sm font-normal text-gray-400">
            ({projects?.length ?? 0})
          </span>
        </h2>

        {/* ── Add project form ─────────────────────── */}
        <form
          action={async (formData) => {
            "use server";
            await addProject(formData);
          }}
          className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Title</label>
            <input
              name="title"
              required
              placeholder="Project name"
              className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Category
            </label>
            <input
              name="category"
              required
              placeholder="e.g. Brand System"
              className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Year</label>
            <input
              name="year"
              required
              placeholder="2024"
              className="w-20 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Project Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-1 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200 outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Add Project
          </button>
        </form>

        {/* ── Projects table ───────────────────────── */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Image URL</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{project.title}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {project.category}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{project.year}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-400">
                      {project.image_url || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteProject(project.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
