import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import content from "../essays.module.css";
import { getEssayBySlug } from "@/lib/essays";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  return {
    title: essay ? `${essay.title} · Jeremy Ro` : "Essay · Jeremy Ro",
    description: essay?.subtitle ?? undefined,
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  if (!essay) notFound();

  const meta = [formatDate(essay.created_at), essay.author]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/essays" className={styles.backLink}>← writing</a>
        <p className={styles.subKicker}>{meta}</p>
        <h1 className={styles.subTitle}>{essay.title}</h1>
        {essay.subtitle && <p className={styles.subCopy}>{essay.subtitle}</p>}
        <article
          className={content.content}
          dangerouslySetInnerHTML={{ __html: essay.content_html }}
        />
      </div>
    </main>
  );
}
