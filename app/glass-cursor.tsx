"use client";

import { useEffect, useRef } from "react";

// Custom cursor: a translucent glass sphere that follows the mouse.
// Only active on devices with a fine pointer (mouse/trackpad).
export default function GlassCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = -100, y = -100, raf = 0;
    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onLeave = () => (el.style.opacity = "0");
    const onDown = () => el.classList.add("glassCursorDown");
    const onUp = () => el.classList.remove("glassCursorDown");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="glassCursor" aria-hidden="true" />;
}
