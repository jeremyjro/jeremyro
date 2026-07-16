import type { Metadata } from "next";
import styles from "../page.module.css";
import work from "./work.module.css";

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
  proofHref: string;
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
    proofHref: "https://www.linkedin.com/in/jeremyro/",
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
    proofHref: "https://www.linkedin.com/in/jeremyro/",
  },
];

export default function WorkPage() {
  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/" className={styles.backLink}>← home</a>
        <p className={styles.subKicker}>WORK</p>

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
                <a
                  href={role.proofHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={work.proof}
                >
                  proof of work ↗
                </a>
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
