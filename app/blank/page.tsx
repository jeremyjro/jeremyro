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

// Four one-of-one hand-drawn arrows. Each has its own path, length, wiggle and head.
const ARROWS = [
  // 1: long lazy wave with a little loop, open "v" head
  { w: 64, h: 18, d: "M1.5 10.2 C7.8 4.1 12.4 15.9 18.6 9.6 C22.1 5.8 27.9 3.2 28.4 8.7 C28.8 13.4 23.1 13.9 24.6 9.1 C26.4 3.9 35.2 12.8 42.3 9.4 C48.1 6.7 53.6 10.8 60.9 9.2 M54.7 4.1 C57.2 6.3 59.4 7.9 61.3 9.1 C58.6 10.7 56.4 12.6 54.1 15.2" },
  // 2: short tight zigzag, chunky lopsided filled-looking head
  { w: 40, h: 20, d: "M1.2 11.8 L5.6 7.1 L8.9 14.2 L12.7 6.4 L16.1 13.6 L19.8 8.3 C23.4 10.9 26.8 10.1 31.7 10.4 M29.4 5.2 L37.6 10.6 L28.6 15.7 C30.1 12.6 30.3 8.9 29.4 5.2" },
  // 3: big double loop that dips below the line, single-sided barb
  { w: 76, h: 26, d: "M1.4 8.3 C9.6 7.1 14.8 20.9 21.3 17.6 C27.4 14.5 18.9 4.2 14.6 10.9 C11.2 16.4 24.1 22.8 33.9 15.4 C40.2 10.6 47.1 3.8 49.6 10.2 C51.4 15.1 44.3 16.8 45.8 11.6 C47.6 5.9 59.2 13.9 72.4 12.3 M64.8 6.1 C67.9 9.1 70.2 11.1 72.8 12.4" },
  // 4: rising swoop that overshoots and curls back, curved arrowhead
  { w: 54, h: 24, d: "M1.6 19.4 C8.2 21.6 13.1 12.7 19.8 14.9 C26.9 17.3 27.4 7.6 34.6 9.8 C40.3 11.6 44.9 6.2 50.4 4.3 M44.2 2.1 C46.8 3.4 48.9 3.9 50.9 4.1 C50.2 6.4 50.6 8.9 51.8 11.2" },
] as const;

function HandArrow({ i }: { i: number }) {
  const a = ARROWS[i];
  return (
    <svg
      className={styles.handArrow}
      viewBox={`0 0 ${a.w} ${a.h}`}
      style={{ width: `${(a.w / 16).toFixed(2)}em`, height: `${(a.h / 16).toFixed(2)}em` }}
      aria-hidden="true"
      focusable="false"
    >
      <path d={a.d} />
    </svg>
  );
}

const EXPERIENCES = [
  { from: "CS, Western University", to: "joined a frat" },
  { from: "Into the valley", to: "i love my friends" },
  { from: "Startup 1", to: "learned how to sell" },
  { from: "", to: "The sunset is beautiful isn't it?" },
];

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
          <ul className={styles.notes}>
            {EXPERIENCES.map((e, i) => (
              <li key={i} className={styles.note}>
                {e.from && <span>{e.from}</span>}
                <HandArrow i={i} />
                <span className={styles.noteTldr}>{e.to}</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
