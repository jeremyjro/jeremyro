import type { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Manifesto · Jeremy Ro",
  description: "How I view living life",
};

export default function ManifestoPage() {
  return (
    <main className={styles.subPage}>
      <div className={styles.subInner}>
        <a href="/" className={styles.backLink}>← home</a>
        <p className={styles.subKicker}>MANIFESTO</p>
        <h1 className={styles.subTitle}>Manifesto</h1>
      </div>
    </main>
  );
}
