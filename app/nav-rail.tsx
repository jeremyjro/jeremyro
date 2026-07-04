import styles from "./nav-rail.module.css";
import NavHint from "./nav-hint";

const LINKS = [
  { label: "jro", href: "/" },
  { label: "work", href: "/work" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/essays" },
];

export default function NavRail() {
  return (
    <div className={styles.rail}>
      <NavHint />
      <div className={styles.hint} />
      <nav className={styles.panel}>
        <img
          src="/jeremy-face.jpg"
          alt="Jeremy Ro"
          className={styles.face}
          width={60}
          height={60}
        />
        <ul className={styles.list}>
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              ) : (
                <span className={styles.link}>{l.label}</span>
              )}
            </li>
          ))}
        </ul>
        <p className={styles.name}>jeremy ro</p>
      </nav>
    </div>
  );
}
