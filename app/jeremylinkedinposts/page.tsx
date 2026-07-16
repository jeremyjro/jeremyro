import type { Metadata } from "next";
import shared from "../page.module.css";
import a16z from "../a16z/a16z.module.css";

export const metadata: Metadata = {
  title: "Jeremy's LinkedIn Posts · Jeremy Ro",
  description: "Selected LinkedIn posts written by Jeremy Ro for the a16z New Media IC portfolio.",
};

interface Post {
  title: string;
  url: string;
}

// Add Jeremy's LinkedIn posts here.
const POSTS: Post[] = [];

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
          <div className={a16z.linkList}>
            {POSTS.map((post) => (
              <a
                key={post.url}
                className={a16z.link}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.title} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
