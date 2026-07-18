"use client";

import { useEffect, useState } from "react";
import styles from "./nav-rail.module.css";
import NavHint from "./nav-hint";

const LINKS = [
  { label: "manifesto", href: "/manifesto" },
  { label: "work", href: "/work" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/essays" },
];

export default function NavRail() {
  const [open, setOpen] = useState(false);

  // Close on navigation / escape / outside tap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDocClick = (e: MouseEvent) => {
      const rail = document.getElementById("nav-rail");
      if (rail && !rail.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, [open]);

  return (
    <div
      id="nav-rail"
      className={`${styles.rail}${open ? ` ${styles.railOpen}` : ""}`}
      onClick={() => setOpen((v) => !v)}
    >
      <NavHint />
      <div className={styles.hint} />
      <nav className={styles.panel}>
        <img
          src="/jeremy-face.jpg"
          alt="Jeremy Ro"
          className={styles.face}
          width={60}
          height={60}
        />
        <ul className={styles.list}>
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              ) : (
                <span className={styles.link}>{l.label}</span>
              )}
            </li>
          ))}
        </ul>
        <p className={styles.name}>jeremy ro</p>
      </nav>
    </div>
  );
}
