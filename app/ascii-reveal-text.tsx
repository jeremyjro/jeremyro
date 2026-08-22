"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiRevealTextProps {
  from: string;
  to: string;
  className?: string;
  duration?: number;
  characters?: string;
}

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\",./<>?\\";

const ZWSP = "\u200B";

function pad(str: string, length: number): string {
  let padded = str;
  while (padded.length < length) {
    padded += ZWSP;
  }
  return padded;
}

function stripTrailingZwsp(str: string): string {
  return str.replace(new RegExp(`${ZWSP}+$`), "");
}

export default function AsciiRevealText({
  from,
  to,
  className,
  duration = 700,
  characters = GLITCH_CHARS,
}: AsciiRevealTextProps) {
  const [display, setDisplay] = useState(from);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const thresholdsRef = useRef<number[] | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(hovering ? to : from);
      return;
    }

    const maxLen = Math.max(from.length, to.length);
    const source = hovering ? pad(from, maxLen) : pad(to, maxLen);
    const target = hovering ? pad(to, maxLen) : pad(from, maxLen);

    thresholdsRef.current = null;
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);

      if (thresholdsRef.current === null) {
        thresholdsRef.current = Array.from({ length: maxLen }, () =>
          Math.random()
        );
      }

      let out = "";
      for (let i = 0; i < maxLen; i++) {
        const threshold = thresholdsRef.current[i] ?? 0;
        if (progress >= threshold) {
          out += target[i] ?? "";
        } else {
          const sourceChar = source[i];
          out +=
            sourceChar !== undefined && sourceChar !== ZWSP
              ? sourceChar
              : characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplay(stripTrailingZwsp(out));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [hovering, from, to, duration, characters]);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
    >
      {display}
    </span>
  );
}
