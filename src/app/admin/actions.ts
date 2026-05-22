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

/* ── Delete a project ──────────────────────────── */
export async function deleteProject(id: string) {
  // First, fetch the project to get the image_url
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .single();

  // If there's an image, extract the filename and delete it from storage
  if (project?.image_url) {
    const urlParts = project.image_url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    if (fileName) {
      await supabaseAdmin.storage.from("projects").remove([fileName]);
    }
  }

  // Then delete the database row
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

/* ── Add a project ─────────────────────────────── */
export async function addProject(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const year = (formData.get("year") as string)?.trim();
  const link = (formData.get("link") as string)?.trim() || null;
  const description = (formData.get("description") as string)?.trim() || null;
  const imageFile = formData.get("image") as File | null;

  if (!title || !category || !year) {
    throw new Error("Title, Category, and Year are required.");
  }

  let image_url: string | null = null;

  // Handle image upload if a file was provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("projects")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Image upload failed: ${uploadError.message}`);
    }

    const { data } = supabaseAdmin.storage
      .from("projects")
      .getPublicUrl(fileName);
    image_url = data.publicUrl;
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .insert({ title, category, year, image_url, link, description });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}
