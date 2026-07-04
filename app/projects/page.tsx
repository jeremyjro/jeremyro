import type { Metadata } from "next";
import styles from "../page.module.css";
import list from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects · Jeremy Ro",
  description: "Projects by Jeremy Ro",
};

interface Project {
  name: string;
  oneLiner: string;
  date: string;
  github?: string;
}

// Add projects here. Newest first.
const PROJECTS: Project[] = [
  {
    name: "Buddy",
    oneLiner:
      "An AI companion that lives beside your cursor and sees what you see, thinking alongside you as you work.",
    date: "June 2026",
  },
  {
    name: "Personal Relationship Management AI",
    oneLiner:
      "A personal relationship manager that helps you remember and nurture the people who matter.",
    date: "June 2026",
    github: "https://github.com/jeremyjro/PRM",
  },
];

export default function ProjectsPage() {
  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/" className={styles.backLink}>← home</a>
        <p className={styles.subKicker}>PROJECTS</p>
        <h1 className={styles.subTitle}>Projects</h1>

        {PROJECTS.length === 0 ? (
          <p className={list.empty}>No projects yet.</p>
        ) : (
          <div className={list.list}>
            {PROJECTS.map((p) => (
              <div key={p.name} className={list.entry}>
                <div className={list.entryHead}>
                  <span className={list.entryTitle}>{p.name}</span>
                  <span className={list.entryDate}>{p.date}</span>
                </div>
                <span className={list.entrySubtitle}>{p.oneLiner}</span>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={list.entryLink}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
