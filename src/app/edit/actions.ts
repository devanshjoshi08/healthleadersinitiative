"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveContent, uploadImage, canWrite, type SiteContent } from "@/lib/content";

const COOKIE = "hli_edit";

function password() {
  return process.env.SITE_EDIT_PASSWORD || "";
}

export async function isAuthed() {
  const c = await cookies();
  return Boolean(password()) && c.get(COOKIE)?.value === password();
}

export async function login(formData: FormData) {
  const entered = String(formData.get("password") || "");
  if (entered && entered === password()) {
    const c = await cookies();
    c.set(COOKIE, entered, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/edit");
  }
  redirect("/edit?error=1");
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE);
  redirect("/edit");
}

type Result = { ok: boolean; error?: string };

export async function saveAll(content: SiteContent): Promise<Result> {
  if (!(await isAuthed())) return { ok: false, error: "Not signed in." };
  if (!canWrite) return { ok: false, error: "Saving is not connected yet." };
  try {
    await saveContent(content);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function uploadImageAction(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  if (!(await isAuthed())) return { ok: false, error: "Not signed in." };
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "No file chosen." };
  if (!file.type.startsWith("image/")) return { ok: false, error: "Please choose an image." };
  try {
    const url = await uploadImage(file);
    return { ok: true, url };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
