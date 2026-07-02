import { getSupabaseServer } from "@/lib/supabase/server";

export interface Essay {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  author: string | null;
  content_html: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type EssaySummary = Pick<
  Essay,
  "slug" | "title" | "subtitle" | "author" | "created_at"
>;

export async function getPublishedEssays(): Promise<EssaySummary[]> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("essays")
      .select("slug,title,subtitle,author,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data as EssaySummary[]) ?? [];
  } catch {
    return [];
  }
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) return null;
    return (data as Essay) ?? null;
  } catch {
    return null;
  }
}
