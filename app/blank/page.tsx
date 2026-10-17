import type { Metadata } from "next";
import localFont from "next/font/local";
import styles from "./blank.module.css";

export const metadata: Metadata = {
  title: "blank · Jeremy Ro",
  description: "a blank page",
};

const garamond = localFont({
  src: [
    { path: "../fonts/EBGaramond-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/EBGaramond-Medium.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
});

// Hand-drawn crop marks, one per corner (same spirit as tobintang.com).
const CORNERS = {
  tl: "M3.4 34.6 C2.1 27.2 4.2 20.4 2.9 13 C2.3 9.1 3.1 5.6 2.7 1.2 M0.9 3.4 C8.4 2.2 15.6 4.4 22.9 3 C26.2 2.5 28.7 3.6 31.4 2.9",
  tr: "M6.2 3.3 C13.8 1.9 21.3 4.1 28.6 2.6 C32.1 2.1 35.4 3.4 38.9 2.7 M37.1 0.8 C38.3 8.7 36.4 15.2 37.9 22.4 C38.4 25.2 37.2 27.6 37.7 30.1",
  br: "M37.3 8.1 C38.6 15.4 36.6 22.6 38 29.7 C38.5 32.8 37.1 35.9 37.6 38.8 M39.2 36.9 C31.6 38.1 24.7 36.2 17.3 37.6 C14.1 38.1 11.6 36.9 9.4 37.5",
  bl: "M29.1 36.8 C21.9 38.1 14.6 36.3 7.4 37.7 C4.9 38.2 3 37.3 0.8 37.9 M2.6 39.1 C1.5 31.4 3.7 24.8 2.3 17.3 C1.8 13.9 3 10.8 2.5 7.6",
} as const;

function CornerMarks() {
  return (
    <div className={styles.cornerMarks} aria-hidden="true">
      {Object.entries(CORNERS).map(([pos, d]) => (
        <svg
          key={pos}
          className={`${styles.corner} ${styles[pos as keyof typeof CORNERS]}`}
          viewBox="0 0 40 40"
          focusable="false"
        >
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}

export default function Blank() {
  return (
    <div className={`${styles.page} ${garamond.className}`}>
      <CornerMarks />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.name}>jeremy</h1>
          <p className={styles.intro}>san francisco</p>
        </header>
        <main>
          <ul className={styles.notes}>{/* add entries here */}</ul>
        </main>
      </div>
    </div>
  );
}
