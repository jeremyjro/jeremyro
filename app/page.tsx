import styles from "./page.module.css";
import AsciiVideo from "./ascii-video";
import AsciiRevealText from "./ascii-reveal-text";
import SocialLinks from "./social-links";

// Playlist: plays each clip in order, then loops back to the first.
// Add, remove, or reorder entries here to change what plays on the hero.
const VIDEO_SRC = [
  "/ascii-hero.mp4",
  "/hero-1.mp4",
  "/hero-2.mp4",
  "/hero-3.mp4",
];

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.videoWrap}>
        <AsciiVideo src={VIDEO_SRC} />
      </div>

      <div className={styles.heroCenter}>
        <AsciiRevealText
          from="AVDE·SEMEL"
          to="DARE ONCE"
          className={styles.heroSaying}
        />
      </div>

      <SocialLinks />
    </section>
  );
}
