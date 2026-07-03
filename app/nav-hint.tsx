"use client";

import { useEffect, useState } from "react";
import styles from "./nav-rail.module.css";

export default function NavHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("navHintSeen")) return;
    if (window.matchMedia("(max-width: 640px)").matches) return;

    setVisible(true);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setVisible(false);
      localStorage.setItem("navHintSeen", "1");
    };
    const onMove = (e: MouseEvent) => {
      if (e.clientX <= 24) finish();
    };

    window.addEventListener("mousemove", onMove);
    const timer = setTimeout(finish, 3000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.notifier} role="status">
      <span className={styles.notifierArrow}>←</span>
      <span>point here</span>
    </div>
  );
}
