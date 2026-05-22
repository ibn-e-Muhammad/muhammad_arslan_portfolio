"use server";

import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { ratelimit } from "@/lib/ratelimit";

export type ContactState = {
  success: boolean;
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /* ── Extract fields ──────────────────────────── */
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const message = formData.get("message") as string | null;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, message: "All fields are required." };
  }

  /* ── Rate limit by IP ────────────────────────── */
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "127.0.0.1";

  const { success: allowed } = await ratelimit.limit(ip);
  if (!allowed) {
    return {
      success: false,
      message: "Rate limit exceeded. Please try again later.",
    };
  }

  /* ── Insert into Supabase ────────────────────── */
  const { error } = await supabaseAdmin.from("messages").insert({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return { success: true, message: "Message sent successfully!" };
}
