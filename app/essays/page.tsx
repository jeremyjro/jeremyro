import type { Metadata } from "next";
import styles from "../page.module.css";
import list from "./essays.module.css";
import { getPublishedEssays } from "@/lib/essays";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing · Jeremy Ro",
  description: "Writing by Jeremy Ro",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function EssaysPage() {
  const essays = await getPublishedEssays();

  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/" className={styles.backLink}>← home</a>
        <p className={styles.subKicker}>WRITING</p>
        <h1 className={styles.subTitle}>Essays</h1>

        <a
          href="https://substack.com/@jeremyrooo"
          target="_blank"
          rel="noopener noreferrer"
          className={list.externalRow}
        >
          Substack · live feed of posts ↗
        </a>

        {essays.length === 0 ? (
          <p className={list.empty}>No essays published yet.</p>
        ) : (
          <div className={list.list}>
            {essays.map((e) => (
              <a key={e.slug} href={`/essays/${e.slug}`} className={list.entry}>
                <span className={list.entryTitle}>{e.title}</span>
                {e.subtitle && (
                  <span className={list.entrySubtitle}>{e.subtitle}</span>
                )}
                <span className={list.entryMeta}>{formatDate(e.created_at)}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
