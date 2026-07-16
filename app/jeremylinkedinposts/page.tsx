import type { Metadata } from "next";
import shared from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Jeremy's LinkedIn Posts · Jeremy Ro",
  description: "Selected LinkedIn posts written by Jeremy Ro for the a16z New Media IC portfolio.",
};

interface Post {
  title: string;
  url: string;
  image: string;
}

const POSTS: Post[] = [
  {
    title: "The 1-Person $1M GTM Funnel",
    url: "https://www.linkedin.com/posts/jeremyro_218-demos-booked-in-january-1m-in-pipeline-activity-7455355878930677760-9n7A?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEMriSgBYaTpHjEZtxTCo6Awvm-g3zm7kRc",
    image: "/jeremy-linkedin-posts/1-person-1m-gtm-funnel.png",
  },
];

export default function JeremyLinkedInPosts() {
  return (
    <main className={shared.subPage}>
      <div className={shared.subInner}>
        <a href="/a16z" className={shared.backLink}>← a16z</a>
        <p className={shared.subKicker}>LINKEDIN</p>
        <h1 className={shared.subTitle}>Jeremy&apos;s LinkedIn Posts</h1>
        <p className={shared.subCopy}>
          Examples of posts written for the a16z New Media IC portfolio.
        </p>

        {POSTS.length === 0 ? (
          <p className={shared.subMeta}>Posts to be added.</p>
        ) : (
          <div className={styles.postList}>
            {POSTS.map((post) => (
              <article key={post.url} className={styles.post}>
                <div className={styles.postText}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <a
                    className={styles.postLink}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.url} ↗
                  </a>
                </div>
                <img
                  className={styles.postImage}
                  src={post.image}
                  alt={post.title}
                />
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
