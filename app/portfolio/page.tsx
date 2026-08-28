import type { Metadata } from "next";
import shared from "../page.module.css";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfolio · Jeremy Ro",
  description: "Selected writing and work samples — LinkedIn ghostwriting, B2B demand generation, and proof of work.",
};

const PLATFORM_URL = "https://trevor.jeremyro.com";

export default function PortfolioPage() {
  return (
    <main className={shared.subPage}>
      <div className={shared.subInner}>
        <a href="/" className={shared.backLink}>← home</a>
        <p className={shared.subKicker}>portfolio</p>
        <h1 className={shared.subTitle}>Portfolio</h1>
        <p className={shared.subCopy}>
          A one-pager with samples of my writing and work.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>LinkedIn &amp; X Proposal</h2>
          <hr className={styles.divider} />
          <p className={styles.demoCallout}>
            I run this on a Content Orchestration Platform I built.{" "}
            <a
              className={styles.link}
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              trevor.jeremyro.com ↗
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Previously at Virio</h2>
          <p className={styles.sectionSubtitle}>Downstream pipeline attribution</p>
          <div className={styles.funnelRows}>
            <div className={styles.funnelStageCol}>
              <div className={styles.funnelStageTop}>Top</div>
            </div>
            <p className={styles.funnelDesc}>
              Wrote LinkedIn posts for my account (1.8M impressions) and Eric&apos;s, CEO of Virio (4.5M impressions), driving follower growth on both.
            </p>

            <div className={styles.funnelStageCol}>
              <div className={styles.funnelStageMid}>Middle</div>
            </div>
            <p className={styles.funnelDesc}>
              Turned those impressions into $16M in qualified pipeline — the equivalent of 300+ qualified meetings booked with ICP (VPs and C-suite Marketing &amp; Sales Leaders).
            </p>

            <div className={styles.funnelStageCol}>
              <div className={styles.funnelStageBot}>Bottom</div>
            </div>
            <p className={styles.funnelDesc}>
              Sourced $1.1M in closed-won revenue.
            </p>
          </div>

          <p className={styles.sectionSubtitle}>Offering timeline</p>
          <ul className={styles.timeline}>
            <li>
              <span className={styles.timelineDate}>June 2025 – Aug 2025</span>
              <span className={styles.timelineDesc}>
                <strong>Offering 1</strong> (video content on LinkedIn): $0–$840k ARR, then pivoted back to $0.
              </span>
            </li>
            <li>
              <span className={styles.timelineDate}>Oct 2025 – June 2026</span>
              <span className={styles.timelineDesc}>
                <strong>Offering 2</strong> (text + image content on LinkedIn as a Service): $0–$3M annualized revenue.
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Portfolio</h2>

          <div className={styles.workBlock}>
            <h3 className={styles.workTitle}>LinkedIn &amp; X (best channels)</h3>
            <ul className={styles.caseProfiles}>
              <li>
                <strong>Jeremy Ro</strong> —{" "}
                <a href="https://www.linkedin.com/in/jeremyro/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/jeremyro
                </a>
                <br />
                0 → 8.6k followers, June 2025 – present
              </li>
              <li>
                <strong>Eric Lay (Virio CEO)</strong> —{" "}
                <a href="https://www.linkedin.com/in/ericlay-virio/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/ericlay-virio
                </a>
                <br />
                25k → 42k followers, ghostwritten by Jeremy, July 2025 – April 2026
              </li>
            </ul>
            <p className={styles.caseProfileNote}>
              All content is posted publicly on LinkedIn and X — click through to see the live posts.
            </p>

            <p className={styles.caseProfileSubhead}>Other accounts</p>
            <ul className={styles.caseProfiles}>
              <li>
                <strong>Founder/CTO (anonymized)</strong>, voice AI — $2.7B valuation, $250M raised
              </li>
              <li>
                <strong>Wayne Nelms</strong> —{" "}
                <a href="https://www.linkedin.com/in/wayne-nelms/" target="_blank" rel="noopener noreferrer">LinkedIn</a>{" "} / {" "}
                <a href="https://x.com/OrnnExchange" target="_blank" rel="noopener noreferrer">X</a>
                <br />
                Also managing Ornn&apos;s company {" "}
                <a href="https://www.linkedin.com/company/ornn/home/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and {" "}
                <a href="https://x.com/OrnnExchange" target="_blank" rel="noopener noreferrer">X</a>. Ornn ($33M Series A, a16z), Compute market.
              </li>
            </ul>
            <div className={styles.caseStudy}>
              <h4 className={styles.caseTitle}>Case study post: Services, the new software</h4>
              <p className={styles.caseLink}>
                <a
                  href="https://www.linkedin.com/posts/jeremyro_for-every-1-spent-on-software-6-is-spent-activity-7453898231887065088-2rMM?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAEMriSgBYaTpHjEZtxTCo6Awvm-g3zm7kRc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the post on LinkedIn ↗
                </a>
              </p>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>1. The post</h5>
                <p className={styles.caseStepDesc}>
                  A single post reframing the $1T &ldquo;services as a software&rdquo; opportunity.
                </p>
                <div className={styles.caseImages}>
                  <img src="/portfolio/case-studies/post-1.png" alt="LinkedIn post top half" className={styles.caseImage} />
                  <img src="/portfolio/case-studies/post-2.png" alt="LinkedIn post bottom half" className={styles.caseImage} />
                </div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>2. Engagement from ICPs</h5>
                <p className={styles.caseStepDesc}>
                  Reactions and comments from founders and execs at Crosby, Hanover Park, and others.
                </p>
                <div className={styles.caseImages}>
                  <img src="/portfolio/case-studies/post-reactions.png" alt="Post with impressions and reactions" className={styles.caseImage} />
                  <img src="/portfolio/case-studies/reactions-hanover.png" alt="Engagement from Hanover Park CEO" className={styles.caseImage} />
                  <img src="/portfolio/case-studies/reactions-crosby.png" alt="Engagement from Crosby CEO" className={styles.caseImage} />
                </div>
              </div>

            </div>
          </div>

          <p className={`${styles.caseProfileSubhead} ${styles.mediaSubhead}`}>Other media created</p>

          <div className={styles.workBlock}>
            <h3 className={styles.workTitle}>X</h3>
            <div className={styles.linkList}>
              <a
                className={styles.link}
                href="https://x.com/itsericlay/status/1973779551731020165?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Virio&apos;s launch video — 800k impressions ↗
              </a>
            </div>
          </div>

          <div className={styles.workBlock}>
            <h3 className={styles.workTitle}>Insta / YT</h3>
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
          </div>
        </section>
      </div>
    </main>
  );
}
