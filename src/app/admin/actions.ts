"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

/* ── Delete a message ──────────────────────────── */
export async function deleteMessage(id: string) {
  const { error } = await supabaseAdmin.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

/* ── Toggle message read status ────────────────── */
export async function toggleMessageRead(id: string, read: boolean) {
  const { error } = await supabaseAdmin
    .from("messages")
    .update({ read })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

/* ── Helper: extract filename from a Supabase public URL ── */
function extractFileName(url: string): string | null {
  const parts = url.split("/");
  return parts[parts.length - 1] || null;
}

/* ── Helper: upload a file to the 'projects' bucket ── */
async function uploadFile(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("projects")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`File upload failed: ${uploadError.message}`);
  }

  const { data } = supabaseAdmin.storage
    .from("projects")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/* ── Delete a project ──────────────────────────── */
export async function deleteProject(id: string) {
  // Fetch the project to get both image_url and logo_url
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("image_url, logo_url")
    .eq("id", id)
    .single();

  // Delete cover image from storage if it exists
  if (project?.image_url) {
    const fileName = extractFileName(project.image_url);
    if (fileName) {
      await supabaseAdmin.storage.from("projects").remove([fileName]);
    }
  }

  // Delete logo from storage if it exists
  if (project?.logo_url) {
    const fileName = extractFileName(project.logo_url);
    if (fileName) {
      await supabaseAdmin.storage.from("projects").remove([fileName]);
    }
  }

  // Delete the database row
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

/* ── Add a project ─────────────────────────────── */
export async function addProject(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const tagline = (formData.get("tagline") as string)?.trim() || null;
  const category = (formData.get("category") as string)?.trim();
  const year = (formData.get("year") as string)?.trim();
  const link = (formData.get("link") as string)?.trim() || null;
  const description = (formData.get("description") as string)?.trim() || null;
  const imageFile = formData.get("image") as File | null;
  const logoFile = formData.get("logo") as File | null;

  const tech_stack: string[] = JSON.parse(
    (formData.get("tech_stack") as string) || "[]"
  );
  const platforms: string[] = JSON.parse(
    (formData.get("platforms") as string) || "[]"
  );
  const highlights: { value: string; label: string }[] = JSON.parse(
    (formData.get("highlights") as string) || "[]"
  );
  const case_study_description =
    (formData.get("case_study_description") as string)?.trim() || null;
  const case_study_features: string[] = JSON.parse(
    (formData.get("case_study_features") as string) || "[]"
  );
  const case_study_label =
    (formData.get("case_study_label") as string)?.trim() || category;

  if (!title || !category || !year) {
    throw new Error("Title, Category, and Year are required.");
  }

  // Handle cover image upload
  let image_url: string | null = null;
  if (imageFile && imageFile.size > 0) {
    image_url = await uploadFile(imageFile);
  }

  // Handle logo upload
  let logo_url: string | null = null;
  if (logoFile && logoFile.size > 0) {
    logo_url = await uploadFile(logoFile);
  }

  const { error } = await supabaseAdmin.from("projects").insert({
    title,
    tagline,
    category,
    year,
    image_url,
    logo_url,
    link,
    description,
    tech_stack,
    platforms,
    highlights,
    case_study_description,
    case_study_features,
    case_study_label,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

/* ── Update an existing project ────────────────── */
export async function updateProject(formData: FormData) {
  const id = (formData.get("id") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const tagline = (formData.get("tagline") as string)?.trim() || null;
  const category = (formData.get("category") as string)?.trim();
  const year = (formData.get("year") as string)?.trim();
  const link = (formData.get("link") as string)?.trim() || null;
  const description = (formData.get("description") as string)?.trim() || null;
  const imageFile = formData.get("image") as File | null;
  const logoFile = formData.get("logo") as File | null;

  const tech_stack: string[] = JSON.parse(
    (formData.get("tech_stack") as string) || "[]"
  );
  const platforms: string[] = JSON.parse(
    (formData.get("platforms") as string) || "[]"
  );
  const highlights: { value: string; label: string }[] = JSON.parse(
    (formData.get("highlights") as string) || "[]"
  );
  const case_study_description =
    (formData.get("case_study_description") as string)?.trim() || null;
  const case_study_features: string[] = JSON.parse(
    (formData.get("case_study_features") as string) || "[]"
  );
  const case_study_label =
    (formData.get("case_study_label") as string)?.trim() || category;

  if (!id || !title || !category || !year) {
    throw new Error("ID, Title, Category, and Year are required.");
  }

  // Fetch existing project to get current image/logo URLs
  const { data: existing } = await supabaseAdmin
    .from("projects")
    .select("image_url, logo_url")
    .eq("id", id)
    .single();

  // Handle cover image: upload new one if provided, otherwise keep existing
  let image_url: string | null = existing?.image_url ?? null;
  if (imageFile && imageFile.size > 0) {
    // Delete old image from storage if it exists
    if (existing?.image_url) {
      const oldFileName = extractFileName(existing.image_url);
      if (oldFileName) {
        await supabaseAdmin.storage.from("projects").remove([oldFileName]);
      }
    }
    image_url = await uploadFile(imageFile);
  }

  // Handle logo: upload new one if provided, otherwise keep existing
  let logo_url: string | null = existing?.logo_url ?? null;
  if (logoFile && logoFile.size > 0) {
    // Delete old logo from storage if it exists
    if (existing?.logo_url) {
      const oldFileName = extractFileName(existing.logo_url);
      if (oldFileName) {
        await supabaseAdmin.storage.from("projects").remove([oldFileName]);
      }
    }
    logo_url = await uploadFile(logoFile);
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .update({
      title,
      tagline,
      category,
      year,
      image_url,
      logo_url,
      link,
      description,
      tech_stack,
      platforms,
      highlights,
      case_study_description,
      case_study_features,
      case_study_label,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}
