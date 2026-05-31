"use client";

import { useState, useTransition, useRef } from "react";
import { addProject, updateProject } from "./actions";
import { Project, TECH_STACK_OPTIONS, PLATFORM_OPTIONS } from "@/lib/types";

type ProjectFormProps = {
  project?: Project | null;
  onCancel?: () => void;
};

export default function ProjectForm({ project, onCancel }: ProjectFormProps) {
  const isEditing = !!project;
  const [isPending, startTransition] = useTransition();

  /* ── Section 1: Basic Info ───────────────────── */
  const [title, setTitle] = useState(project?.title ?? "");
  const [tagline, setTagline] = useState(project?.tagline ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [year, setYear] = useState(project?.year ?? "");
  const [caseStudyLabel, setCaseStudyLabel] = useState(
    project?.case_study_label ?? ""
  );

  /* ── Section 2: Links & Media ────────────────── */
  const [link, setLink] = useState(project?.link ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  /* ── Section 3: Tech Stack (max 3) ───────────── */
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(
    project?.tech_stack ?? []
  );
  const [techShake, setTechShake] = useState(false);
  const techCounterRef = useRef<HTMLSpanElement>(null);

  /* ── Section 4: Platforms ────────────────────── */
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    project?.platforms ?? []
  );

  /* ── Section 5: Highlights (3 stat blocks) ───── */
  const [highlights, setHighlights] = useState<
    Array<{ value: string; label: string }>
  >(
    project?.highlights?.length === 3
      ? project.highlights
      : [
          { value: project?.highlights?.[0]?.value ?? "", label: project?.highlights?.[0]?.label ?? "" },
          { value: project?.highlights?.[1]?.value ?? "", label: project?.highlights?.[1]?.label ?? "" },
          { value: project?.highlights?.[2]?.value ?? "", label: project?.highlights?.[2]?.label ?? "" },
        ]
  );

  /* ── Section 6: Case Study ───────────────────── */
  const [description, setDescription] = useState(
    project?.case_study_description ?? ""
  );
  const [features, setFeatures] = useState<string[]>(
    project?.case_study_features?.length ? project.case_study_features : [""]
  );

  /* ── Project Description ─────────────────────── */
  const [projectDescription, setProjectDescription] = useState(
    project?.description ?? ""
  );

  /* ── Tech Stack toggle ───────────────────────── */
  function toggleTech(tech: string) {
    if (selectedTechStack.includes(tech)) {
      setSelectedTechStack((prev) => prev.filter((t) => t !== tech));
    } else {
      if (selectedTechStack.length >= 3) {
        setTechShake(true);
        setTimeout(() => setTechShake(false), 500);
        return;
      }
      setSelectedTechStack((prev) => [...prev, tech]);
    }
  }

  /* ── Platform toggle ─────────────────────────── */
  function togglePlatform(platform: string) {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms((prev) => [...prev, platform]);
    }
  }

  /* ── Highlights update ───────────────────────── */
  function updateHighlight(
    index: number,
    field: "value" | "label",
    val: string
  ) {
    setHighlights((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  }

  /* ── Features management ─────────────────────── */
  function updateFeature(index: number, val: string) {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  function addFeature() {
    setFeatures((prev) => [...prev, ""]);
  }

  /* ── Submit handler ──────────────────────────── */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData();

    if (isEditing && project) {
      fd.set("id", project.id);
    }

    fd.set("title", title);
    fd.set("tagline", tagline);
    fd.set("category", category);
    fd.set("year", year);
    fd.set("link", link);
    fd.set("description", projectDescription);
    fd.set("tech_stack", JSON.stringify(selectedTechStack));
    fd.set("platforms", JSON.stringify(selectedPlatforms));
    fd.set(
      "highlights",
      JSON.stringify(highlights.filter((h) => h.value || h.label))
    );
    fd.set("case_study_description", description);
    fd.set(
      "case_study_features",
      JSON.stringify(features.filter(Boolean))
    );
    fd.set("case_study_label", caseStudyLabel || category);

    if (imageFile) fd.set("image", imageFile);
    if (logoFile) fd.set("logo", logoFile);

    startTransition(async () => {
      if (isEditing) {
        await updateProject(fd);
      } else {
        await addProject(fd);
      }

      // Reset form after successful add
      if (!isEditing) {
        setTitle("");
        setTagline("");
        setCategory("");
        setYear("");
        setLink("");
        setProjectDescription("");
        setImageFile(null);
        setLogoFile(null);
        setSelectedTechStack([]);
        setSelectedPlatforms([]);
        setHighlights([
          { value: "", label: "" },
          { value: "", label: "" },
          { value: "", label: "" },
        ]);
        setDescription("");
        setFeatures([""]);
        setCaseStudyLabel("");
      }
    });
  }

  /* ── Shared input styles ─────────────────────── */
  const inputClass =
    "rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-gray-50/80 p-6"
    >
      <h3 className="mb-6 text-sm font-semibold text-gray-700">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h3>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 1: Basic Info                     */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Basic Info
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project name"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Tagline
            </label>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short tagline"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Category *
            </label>
            <input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. AI System"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Year *
            </label>
            <input
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Case Study Label
            </label>
            <input
              value={caseStudyLabel}
              onChange={(e) => setCaseStudyLabel(e.target.value)}
              placeholder={category || "Defaults to category value"}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={2}
              placeholder="Brief description of the project..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 2: Links & Media                  */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Links &amp; Media
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Live Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://project-url.com"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Cover Image
              {isEditing && project?.image_url && (
                <span className="ml-1 text-gray-400">(has existing)</span>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-1 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200 outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Project Logo
              {isEditing && project?.logo_url && (
                <span className="ml-1 text-gray-400">(has existing)</span>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-1 file:text-xs file:font-medium file:text-gray-700 hover:file:bg-gray-200 outline-none focus:border-gray-500"
            />
          </div>
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 3: Tech Stack (max 3)             */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Tech Stack{" "}
          <span
            ref={techCounterRef}
            className={`ml-1 inline-block font-mono text-gray-500 ${
              techShake ? "animate-shake" : ""
            }`}
            style={
              techShake
                ? {
                    animation: "shake 0.4s ease-in-out",
                  }
                : undefined
            }
          >
            ({selectedTechStack.length}/3 selected)
          </span>
        </legend>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-4px); }
            40% { transform: translateX(4px); }
            60% { transform: translateX(-3px); }
            80% { transform: translateX(3px); }
          }
        `}</style>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map((tech) => {
            const selected = selectedTechStack.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 4: Platforms & Languages           */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Platforms &amp; Languages
        </legend>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_OPTIONS.map((platform) => {
            const selected = selectedPlatforms.includes(platform);
            return (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selected
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {platform}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 5: Highlights (3 stat blocks)     */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Highlights
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {highlights.map((hl, idx) => (
            <div
              key={idx}
              className="flex gap-2 rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px] font-medium uppercase text-gray-400">
                  Value
                </label>
                <input
                  value={hl.value}
                  onChange={(e) =>
                    updateHighlight(idx, "value", e.target.value)
                  }
                  placeholder="e.g. 1K+"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px] font-medium uppercase text-gray-400">
                  Label
                </label>
                <input
                  value={hl.label}
                  onChange={(e) =>
                    updateHighlight(idx, "label", e.target.value)
                  }
                  placeholder="e.g. Students"
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 6: Case Study                     */}
      {/* ═══════════════════════════════════════════ */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Case Study
        </legend>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the case study..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500">
              Features
            </label>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={feature}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder={`Feature ${idx + 1}`}
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-sm text-red-500 transition-colors hover:bg-red-100"
                  aria-label="Remove feature"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="self-start rounded-lg border border-dashed border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
            >
              + Add feature
            </button>
          </div>
        </div>
      </fieldset>

      {/* ═══════════════════════════════════════════ */}
      {/*  SUBMIT                                    */}
      {/* ═══════════════════════════════════════════ */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending && (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isPending
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
              ? "Update Project"
              : "Add Project"}
        </button>
      </div>
    </form>
  );
}
