import type { Metadata } from "next";
import shared from "../page.module.css";
import styles from "./a16z.module.css";

export const metadata: Metadata = {
  title: "a16z gtm team · Jeremy Ro",
  description: "Portfolio for a16z's New Media team — B2B demand generation, LinkedIn ghostwriting, and proof of work.",
};

const LOOM_URL = "#";

export default function A16zPage() {
  return (
    <main className={shared.subPage}>
      <div className={shared.subInner}>
        <img
          src="/a16z-logo.jpg"
          alt="a16z"
          className={styles.logo}
          width={40}
          height={40}
        />
        <a href="/" className={shared.backLink}>← home</a>
        <p className={shared.subKicker}>one-pager</p>
        <h1 className={shared.subTitle}>a16z gtm team</h1>
        <p className={shared.subCopy}>
          Jeremy to join a16z as a Forward Deployed Growth Lead. More specifically on the B2B Demand Generation side (via LinkedIn).
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Proposal</h2>
          <div className={styles.proposal}>
            <h3 className={styles.proposalHead}>Problem</h3>
            <p className={styles.proposalText}>
              Founder, executive, and employee-led LinkedIn content can be a powerful go-direct channel. But standing it up internally usually runs into the same problems: lack of time, lack of people, and lack of deep marketing know-how.
            </p>

            <h3 className={styles.proposalHead}>Solution</h3>
            <p className={styles.proposalText}>
              Forward-deployed growth lead for a16z B2B portcos. I embed, build the LinkedIn demand-generation engine, upskill the internal owner, and transition out once it is self-sustaining.
            </p>

            <h3 className={styles.proposalHead}>Why</h3>
            <p className={styles.proposalText}>
              LinkedIn is a high-leverage go-direct channel for B2B companies — it compounds brand and demand generation at the same time.
            </p>

            <h3 className={styles.proposalHead}>How</h3>
            <p className={styles.proposalText}>
              A modular engine made of five parts:
            </p>
            <ul className={styles.engine}>
              <li>
                <strong>Planning</strong> — Define the ICP, hypothesize a concrete outcome, and set an actionable roadmap.
              </li>
              <li>
                <strong>Content</strong> — Strategize angles, interview executives, produce posts, and manage engagement.
              </li>
              <li>
                <strong>Outbound</strong> — Capture leads, qualify intent, and run targeted campaigns.
              </li>
              <li>
                <strong>Analysis</strong> — Revisit the hypothesis, check whether inputs matched output, ask &ldquo;why?&rdquo; if not, and re-run with adjusted variables.
              </li>
              <li>
                <strong>Enablement / RevOps</strong> — Track data across iterations in the company&apos;s system of record, document the playbook, train the internal owner, and hand off so the engine keeps running.
              </li>
            </ul>
            <p className={styles.caveat}>
              We only install the modules the portco actually needs.
            </p>
            <p className={styles.demoCallout}>
              The engine runs on a Content Orchestration Platform I built.{" "}
              <a
                className={styles.link}
                href={LOOM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch the Loom demo ↗
              </a>{" "}
              to see how it lets one forward-deployed marketer cover 2× or more of the accounts a non-agentic FDM could.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Previously at Virio</h2>
          <p className={styles.sectionSubtitle}>Downstream pipeline attribution</p>
          <div className={styles.funnelRows}>
            <div className={styles.funnelStageCol}>
              <div className={styles.funnelStageTop}>Top</div>
            </div>
            <p className={styles.funnelDesc}>
              Wrote LinkedIn posts for my account (1.8M impressions) and Eric&apos;s, CEO of Virio (2.3M impressions), driving follower growth on both.
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
              Sourced $1.1M in closed-won revenue via the LinkedIn organic content + outbound playbook I created.
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
          <h2 className={styles.sectionTitle}>Examples of Work</h2>

          <div className={styles.workBlock}>
            <h3 className={styles.workTitle}>LinkedIn (best channel)</h3>
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
              All content is posted publicly on our LinkedIn profiles — click through to see the live posts.
            </p>

            <p className={styles.caseProfileSubhead}>Other accounts</p>
            <ul className={styles.caseProfiles}>
              <li>
                <strong>Founder/CTO</strong>, voice AI — $2.7B valuation, $250M raised
              </li>
              <li>
                <strong>CEO</strong>, emotional AI — $450M valuation, $220M raised
              </li>
              <li>
                <strong>Founder/CEO</strong>, AI workflow automation — $8M raised from YC
              </li>
            </ul>
            <p className={styles.caseProfileNote}>
              Written for by Content Engineers Jeremy coached on his content frameworks.
              Names anonymized at clients&apos; request — happy to share more details if needed.
            </p>

            <div className={styles.caseStudy}>
              <h4 className={styles.caseTitle}>Case study: Services, the new software</h4>
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
                  A single post reframing the $1T “services as a software” opportunity.
                </p>
                <div className={styles.caseImages}>
                  <img src="/a16z/case-studies/post-1.png" alt="LinkedIn post top half" className={styles.caseImage} />
                  <img src="/a16z/case-studies/post-2.png" alt="LinkedIn post bottom half" className={styles.caseImage} />
                </div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>2. Engagement from ICPs</h5>
                <p className={styles.caseStepDesc}>
                  Reactions and comments from founders and execs at Crosby, Hanover Park, and others.
                </p>
                <div className={styles.caseImages}>
                  <img src="/a16z/case-studies/post-reactions.png" alt="Post with impressions and reactions" className={styles.caseImage} />
                  <img src="/a16z/case-studies/reactions-hanover.png" alt="Engagement from Hanover Park CEO" className={styles.caseImage} />
                  <img src="/a16z/case-studies/reactions-crosby.png" alt="Engagement from Crosby CEO" className={styles.caseImage} />
                </div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>3. Inbound signal</h5>
                <p className={styles.caseStepDesc}>
                  Connection requests and DMs from ICPs who saw the content.
                </p>
                <div className={styles.caseImages}>
                  <img src="/a16z/case-studies/inbound-kamron.png" alt="Kamron Khodjaev connection request" className={styles.caseImage} />
                  <img src="/a16z/case-studies/inbound-crescendo.png" alt="VP of Marketing at Crescendo inbound message" className={styles.caseImage} />
                </div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>4. Outbound</h5>
                <p className={styles.caseStepDesc}>
                  Direct outreach to prospects who engaged with the content, from both Jeremy and Eric.
                </p>
                <div className={styles.caseImages}>
                  <img src="/a16z/case-studies/outbound-holden.png" alt="Outbound message to Holden Lewis" className={styles.caseImage} />
                  <img src="/a16z/case-studies/outbound-eric-1.png" alt="Eric Lay outbound message to Nick Christensen" className={styles.caseImage} />
                  <img src="/a16z/case-studies/outbound-eric-2.png" alt="Nick Christensen reply" className={styles.caseImage} />
                </div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>5. AE calendar — meeting booked</h5>
                <p className={styles.caseStepDesc}>Placeholder for calendar screenshot showing a meeting booked from this motion.</p>
                <div className={styles.casePlaceholder}>Calendar screenshot coming soon.</div>
              </div>

              <div className={styles.caseStep}>
                <h5 className={styles.caseStepTitle}>6. Closed won — revenue confirmation</h5>
                <p className={styles.caseStepDesc}>Placeholder for closed-won / revenue confirmation message.</p>
                <div className={styles.casePlaceholder}>Closed-won confirmation coming soon.</div>
              </div>
            </div>
          </div>

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
              <a
                className={styles.link}
                href="https://x.com/jjeremyro/status/1969473861935907314?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Personal video — 298k impressions ↗
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
