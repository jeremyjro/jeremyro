import type { Metadata } from "next";
import shared from "../page.module.css";
import styles from "./a16z.module.css";

export const metadata: Metadata = {
  title: "A16Z Forward Deployed Marketer · Jeremy Ro",
  description: "Portfolio for a16z's New Media team — B2B demand generation, LinkedIn ghostwriting, and proof of work.",
};

export default function A16zPage() {
  return (
    <main className={shared.subPage}>
      <div className={shared.subInner}>
        <a href="/" className={shared.backLink}>← home</a>
        <p className={shared.subKicker}>one-pager</p>
        <h1 className={shared.subTitle}>A16Z Forward Deployed Marketer</h1>
        <p className={shared.subCopy}>
          Looking to join as a New Media IC. More specifically on the B2B Demand Generation side (via LinkedIn), ghostwriting for Founders and Executives.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Product Demo</h2>
          <a
            className={styles.link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Loom product demo (link to be added)"
          >
            Loom demo ↗
          </a>
          <p className={styles.note}>Add the Loom demo link here.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Previously at Virio</h2>
          <p className={styles.sectionSubtitle}>Downstream pipeline attribution</p>
          <ul className={styles.funnel}>
            <li>
              Wrote / ghostwrote LinkedIn posts for both my account and Eric&apos;s (CEO of Virio), driving follower growth and 2M+ impressions each
            </li>
            <li>
              Turned those impressions into $16M in qualified pipeline — the equivalent of 400+ qualified meetings booked with ICP (VPs and C-suite Marketing &amp; Sales Leaders)
            </li>
            <li>
              Sourced $1.1M in closed-won revenue via the LinkedIn organic content + outbound playbook I created
            </li>
          </ul>

          <p className={styles.sectionSubtitle}>Product timeline</p>
          <ul className={styles.products}>
            <li>
              Product 1 (video content on LinkedIn): $0–$840k ARR, June 2025 – August 2025 (3 months), pivot back to $0
            </li>
            <li>
              Product 2 (text + image content on LinkedIn as a Service): $0–$3M annualized revenue, October 2025 – June 2026 (8 months)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>LinkedIn (best channel)</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p className={styles.cardName}>Jeremy Ro&apos;s Account</p>
              <p className={styles.metric}>0 → 8.6k followers</p>
              <p className={styles.metric}>2M impressions</p>
              <p className={styles.metric}>
                Examples of Posts Written:{" "}
                <a className={styles.link} href="/jeremylinkedinposts">
                  jeremyro.com/jeremylinkedinposts
                </a>
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardName}>CEO of Virio</p>
              <p className={styles.metric}>32k → 41k followers</p>
              <p className={styles.metric}>2M impressions</p>
              <p className={styles.metric}>
                Examples of Posts Written:{" "}
                <a className={styles.link} href="/ericlinkedinposts">
                  jeremyro.com/ericlinkedinposts
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>X</h2>
          <div className={styles.linkList}>
            <a
              className={styles.link}
              href="https://x.com/jjeremyro/status/1969473861935907314?s=20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Personal video — 298k impressions ↗
            </a>
            <a
              className={styles.link}
              href="https://x.com/itsericlay/status/1973779551731020165?s=20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Virio&apos;s launch video — 800k impressions ↗
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Insta / YT</h2>
          <div className={styles.linkList}>
            <a
              className={styles.link}
              href="https://www.instagram.com/reel/DKXIlPBNrZH/?utm_source=ig_web_copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              100 Days of Rejection-maxxing ↗
            </a>
            <a
              className={styles.link}
              href="https://www.youtube.com/watch?v=7l9MlpcVNck&t=12s"
              target="_blank"
              rel="noopener noreferrer"
            >
              Running a Marathon Without Training <strong>(filmed at 17 years old)</strong> ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
