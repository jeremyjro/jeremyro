"use client";

import { useEffect, useState } from "react";
import styles from "./nav-rail.module.css";

export default function NavHint() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    setIsMobile(mobile);

    if (sessionStorage.getItem("navHintSeen")) return;

    if (mobile) {
      // On mobile, always show the "click here" hint until first tap.
      setVisible(true);
      const finish = () => {
        setVisible(false);
        sessionStorage.setItem("navHintSeen", "1");
      };
      const onFirstTap = () => {
        finish();
        window.removeEventListener("click", onFirstTap);
      };
      window.addEventListener("click", onFirstTap, { once: true });
      return;
    }

    setVisible(true);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setVisible(false);
      sessionStorage.setItem("navHintSeen", "1");
    };
    const onMove = (e: MouseEvent) => {
      if (e.clientX <= 24) finish();
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.notifier} role="status">
      <span className={styles.notifierArrow}>←</span>
      <span>{isMobile ? "click here" : "here"}</span>
    </div>
  );
}
