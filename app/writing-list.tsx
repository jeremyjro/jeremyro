import styles from "./writing-list.module.css";

interface Entry {
  title: string;
  href: string;
  subtitle?: string;
  icon?: string;
}

// Add entries here to populate the scrollable writing list.
const ENTRIES: Entry[] = [
  {
    title: "Substack",
    href: "https://substack.com/@jeremyrooo",
    subtitle: "Live feed of posts",
    icon: "/pluto.png",
  },
  {
    title: "Essays",
    href: "/essays",
    subtitle: "Longer notes and ideas",
  },
];

export default function WritingList() {
  return (
    <div className={styles.scroll}>
      {ENTRIES.map((e) => (
        <a key={e.href} href={e.href} className={styles.item}>
          {e.icon ? (
            <img src={e.icon} alt="" className={styles.icon} width={30} height={30} />
          ) : (
            <div className={styles.iconSlot} />
          )}
          <div className={styles.text}>
            <span className={styles.title}>{e.title}</span>
            {e.subtitle && <span className={styles.subtitle}>{e.subtitle}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}
