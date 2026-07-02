"use client";

import { useCallback, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import Editor from "./editor";
import styles from "./admin.module.css";

interface ListRow {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  created_at: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminDashboard({
  supabase,
  session,
}: {
  supabase: SupabaseClient;
  session: Session;
}) {
  const [rows, setRows] = useState<ListRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("Jeremy Ro");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [html, setHtml] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const loadRows = useCallback(async () => {
    const { data, error } = await supabase
      .from("essays")
      .select("id,slug,title,published,created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setRows(data as ListRow[]);
  }, [supabase]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSubtitle("");
    setAuthor("Jeremy Ro");
    setSlug("");
    setSlugTouched(false);
    setHtml("");
    setStatus("");
    setFormKey((k) => k + 1);
  };

  const selectEssay = async (id: string) => {
    setStatus("");
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) {
      setStatus("Could not load essay.");
      return;
    }
    setEditingId(data.id);
    setTitle(data.title ?? "");
    setSubtitle(data.subtitle ?? "");
    setAuthor(data.author ?? "Jeremy Ro");
    setSlug(data.slug ?? "");
    setSlugTouched(true);
    setHtml(data.content_html ?? "");
    setFormKey((k) => k + 1);
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const save = async (publish: boolean) => {
    if (!title.trim()) {
      setStatus("A title is required.");
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
    if (!finalSlug) {
      setStatus("A valid slug is required.");
      return;
    }
    setBusy(true);
    setStatus("Saving…");

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      author: author.trim() || null,
      slug: finalSlug,
      content_html: DOMPurify.sanitize(html),
      published: publish,
    };

    const query = editingId
      ? supabase.from("essays").update(payload).eq("id", editingId).select().single()
      : supabase.from("essays").insert(payload).select().single();

    const { data, error } = await query;
    setBusy(false);

    if (error) {
      setStatus(
        error.code === "23505"
          ? "That slug is already taken. Change the slug and try again."
          : `Error: ${error.message}`,
      );
      return;
    }

    if (data) {
      setEditingId(data.id);
      setSlug(data.slug);
      setSlugTouched(true);
    }
    setStatus(publish ? "Published — it is live now." : "Draft saved.");
    loadRows();
  };

  const togglePublish = async (row: ListRow) => {
    setBusy(true);
    await supabase
      .from("essays")
      .update({ published: !row.published })
      .eq("id", row.id);
    setBusy(false);
    loadRows();
  };

  const remove = async (row: ListRow) => {
    if (!window.confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    setBusy(true);
    await supabase.from("essays").delete().eq("id", row.id);
    setBusy(false);
    if (editingId === row.id) resetForm();
    loadRows();
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.topBar}>
        <div>
          <p className={styles.kicker}>PRIVATE PORTAL</p>
          <p className={styles.signedIn}>Signed in as {session.user.email}</p>
        </div>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </header>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <button type="button" className={styles.newBtn} onClick={resetForm}>
            + New essay
          </button>
          <div className={styles.rowList}>
            {rows.length === 0 && (
              <p className={styles.emptyNote}>No essays yet.</p>
            )}
            {rows.map((row) => (
              <div
                key={row.id}
                className={`${styles.rowItem} ${
                  editingId === row.id ? styles.rowActive : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.rowSelect}
                  onClick={() => selectEssay(row.id)}
                >
                  <span className={styles.rowTitle}>{row.title}</span>
                  <span
                    className={`${styles.badge} ${
                      row.published ? styles.badgeLive : styles.badgeDraft
                    }`}
                  >
                    {row.published ? "live" : "draft"}
                  </span>
                </button>
                <div className={styles.rowActions}>
                  <button
                    type="button"
                    className={styles.miniBtn}
                    disabled={busy}
                    onClick={() => togglePublish(row)}
                  >
                    {row.published ? "unpublish" : "publish"}
                  </button>
                  <button
                    type="button"
                    className={styles.miniBtnDanger}
                    disabled={busy}
                    onClick={() => remove(row)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.formArea}>
          <input
            className={styles.titleInput}
            placeholder="Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <input
            className={styles.subInput}
            placeholder="Subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <div className={styles.metaRow}>
            <label className={styles.metaField}>
              <span>Author</span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label className={styles.metaField}>
              <span>Slug (URL)</span>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugTouched(true);
                }}
              />
            </label>
          </div>

          <Editor key={formKey} value={html} onChange={setHtml} />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              disabled={busy}
              onClick={() => save(false)}
            >
              Save draft
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              disabled={busy}
              onClick={() => save(true)}
            >
              Publish
            </button>
            {slug && (
              <a
                className={styles.viewLink}
                href={`/essays/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View →
              </a>
            )}
          </div>
          {status && <p className={styles.status}>{status}</p>}
        </section>
      </div>
    </div>
  );
}
