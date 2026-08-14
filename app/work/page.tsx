import type { Metadata } from "next";
import styles from "../page.module.css";
import work from "./work.module.css";
import startup from "./startup-helper.module.css";
import { STARTUP_CASE_STUDIES } from "./startup-helper-data";

export const metadata: Metadata = {
  title: "Work · Jeremy Ro",
  description: "Jeremy Ro — work and experience",
};

interface Role {
  company: string;
  oneLiner: string;
  meta: string;
  impact: string[];
  date: string;
}

const ROLES: Role[] = [
  {
    company: "Virio",
    oneLiner: "AI-native B2B content agency",
    meta: "Founding Growth Lead · Employee No. 2 · San Francisco",
    impact: [
      "Sourced $1.1M in directly attributable closed-won revenue",
      "Grew annualized revenue from $0 to $XM",
      "Drove 400+ qualified meetings booked and $XXM in pipeline",
    ],
    date: "Jun 2025 – Jun 2026",
  },
  {
    company: "Vecova",
    oneLiner: "Community recreation & aquatics centre",
    meta: "Lifeguard & Swim Instructor · Calgary, Alberta",
    impact: [
      "Taught 80+ kids (ages 6–16) to swim across group and private lessons",
      "20 minutes into my first shift, jumped in to save a 7-year-old from drowning",
    ],
    date: "20XX",
  },
];

export default function WorkPage() {
  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/" className={styles.backLink}>← home</a>
        <p className={styles.subKicker}>WORK</p>

        <section className={startup.section} aria-labelledby="company-helper-title">
          <p className={startup.kicker}>FOUNDER-LED GTM</p>
          <h2 id="company-helper-title" className={startup.title}>Company Helper</h2>
          <p className={startup.intro}>
            Helping companies build their go-direct marketing and sales
            motions.
          </p>

          <div className={startup.carousel} aria-label="Company Helper case studies">
            {STARTUP_CASE_STUDIES.map((study) => (
              <a
                key={study.slug}
                href={`/work/startup-helper/${study.slug}`}
                className={startup.card}
              >
                <span className={startup.funding}>{study.raised} · {study.investors}</span>
                <span className={startup.company}>
                  {study.name} <span className={startup.arrow}>↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className={work.timeline}>
          {ROLES.map((role) => (
            <section key={role.company} className={work.entry}>
              <div className={work.main}>
                <h2 className={work.company}>{role.company}</h2>
                <p className={work.oneLiner}>{role.oneLiner}</p>
                <p className={work.meta}>{role.meta}</p>
                <ul className={work.impact}>
                  {role.impact.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

              </div>
              <div className={work.dateCol}>
                <span className={work.date}>{role.date}</span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
