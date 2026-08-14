import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../../../page.module.css";
import startup from "../../startup-helper.module.css";
import { STARTUP_CASE_STUDIES } from "../../startup-helper-data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STARTUP_CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = STARTUP_CASE_STUDIES.find((item) => item.slug === slug);

  return {
    title: study ? `${study.name} · Company Helper` : "Company Helper",
    description: study?.description,
  };
}

export default async function StartupHelperCaseStudy({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = STARTUP_CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) notFound();

  return (
    <main className={startup.detail}>
      <div className={startup.detailInner}>
        <a href="/work" className={styles.backLink}>← work</a>
        <p className={startup.detailKicker}>COMPANY HELPER / CASE STUDY</p>
        <h1 className={startup.detailTitle}>{study.name}</h1>
        <p className={startup.detailFunding}>{study.raised} · {study.investors}</p>
        <p className={startup.detailDescription}>{study.description}</p>

        <section className={startup.detailSection} aria-labelledby="work-title">
          <h2 id="work-title" className={startup.detailSectionTitle}>THE WORK</h2>
          <ul className={startup.detailList}>
            {study.work.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
