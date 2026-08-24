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
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:\",./<>?\\";

const ZWSP = "\u200B";
const MIN_GLITCH = 0.25;

function centerPad(str: string, length: number): string {
  if (str.length >= length) return str;
  const total = length - str.length;
  const left = Math.floor(total / 2);
  const right = Math.ceil(total / 2);
  return ZWSP.repeat(left) + str + ZWSP.repeat(right);
}

function stripTrailingZwsp(str: string): string {
  return str.replace(new RegExp(`${ZWSP}+$`), "");
}

function stripAllZwsp(str: string): string {
  return str.replace(new RegExp(`${ZWSP}`, "g"), "");
}

export default function AsciiRevealText({
  from,
  to,
  className,
  duration = 300,
  characters = GLITCH_CHARS,
}: AsciiRevealTextProps) {
  const [display, setDisplay] = useState(from);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const thresholdsRef = useRef<number[] | null>(null);
  const displayRef = useRef(from);

  const setDisplayValue = (value: string) => {
    displayRef.current = value;
    setDisplay(value);
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplayValue(hovering ? to : from);
      return;
    }

    const fromLen = from.length;
    const toLen = to.length;
    const maxLen = Math.max(fromLen, toLen);

    const fromCentered = centerPad(from, maxLen);
    const toCentered = centerPad(to, maxLen);

    const fromStart = Math.floor((maxLen - fromLen) / 2);
    const fromEnd = fromStart + fromLen - 1;
    const toStart = Math.floor((maxLen - toLen) / 2);
    const toEnd = toStart + toLen - 1;

    const source = hovering ? fromCentered : toCentered;
    const target = hovering ? toCentered : fromCentered;
    const sourceStart = hovering ? fromStart : toStart;
    const sourceEnd = hovering ? fromEnd : toEnd;
    const targetStart = hovering ? toStart : fromStart;
    const targetEnd = hovering ? toEnd : fromEnd;

    const targetDisplay = stripTrailingZwsp(target);

    if (stripAllZwsp(displayRef.current) === stripAllZwsp(targetDisplay)) {
      setDisplayValue(targetDisplay);
      return;
    }

    thresholdsRef.current = null;
    startRef.current = null;

    const center = (maxLen - 1) / 2;
    const maxRadius = Math.max(center, maxLen - 1 - center);

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      // Ease-in: the visible phrase accelerates outward from the center,
      // rather than expanding at a constant linear speed. Use cubic for
      // a stronger acceleration.
      const reveal = progress * progress * progress;

      if (thresholdsRef.current === null) {
        thresholdsRef.current = Array.from({ length: maxLen }, (_, i) => {
          if (target[i] === ZWSP) {
            // Positions that should be empty in the final phrase keep
            // glitching until the active window passes over them.
            return 1;
          }

          const dist = Math.abs(i - center);
          const tReveal = maxRadius === 0 ? 0 : dist / maxRadius;
          return Math.min(
            tReveal + (1 - tReveal) * (MIN_GLITCH + (1 - MIN_GLITCH) * Math.random()),
            1
          );
        });
      }

      const activeStart = Math.round(
        sourceStart + reveal * (targetStart - sourceStart)
      );
      const activeEnd = Math.round(
        sourceEnd + reveal * (targetEnd - sourceEnd)
      );

      let out = "";
      for (let i = 0; i < maxLen; i++) {
        if (i < activeStart || i > activeEnd) {
          out += ZWSP;
          continue;
        }

        const threshold = thresholdsRef.current[i] ?? 1;
        if (progress >= threshold) {
          out += target[i] ?? "";
        } else if (progress <= 0) {
          out += source[i] ?? "";
        } else {
          out += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplayValue(stripTrailingZwsp(out));

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
      style={{
        cursor: "pointer",
        pointerEvents: "auto",
        display: "inline-block",
      }}
    >
      {display}
    </span>
  );
}
