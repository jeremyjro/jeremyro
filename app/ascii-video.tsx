"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// video2ascii uses WebGL — must be client-only, no SSR
const V2A = dynamic(() => import("video2ascii"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#ffffff" }} />,
});

interface Props {
  // Single src OR a playlist. When a playlist is supplied, videos play one
  // after the other and loop back to the beginning after the last clip.
  src: string | string[];
}

export default function AsciiVideo({ src }: Props) {
  const playlist = Array.isArray(src) ? src : [src];
  const [index, setIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(160);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Fewer columns on narrow screens: larger ASCII pixels render better and
  // ease the WebGL load on mobile devices.
  useEffect(() => {
    const updateColumns = () => setNumColumns(window.innerWidth <= 640 ? 80 : 160);
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Advance clips by swapping the hidden <video>'s src in place rather than
  // remounting the WebGL component. The same canvas stays mounted and keeps the
  // last frame while the next clip loads, so there is no blank gap between clips.
  useEffect(() => {
    if (playlist.length <= 1) return;

    let video: HTMLVideoElement | null = null;
    let attempts = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;

    const handleEnded = () => setIndex((i) => (i + 1) % playlist.length);
    const handleLoaded = () => {
      if (video) {
        video.loop = false;
        video.play().catch(() => {});
      }
    };

    const attach = () => {
      video = wrapRef.current?.querySelector("video") ?? null;
      if (video) {
        video.loop = false;
        video.addEventListener("ended", handleEnded);
        video.addEventListener("loadedmetadata", handleLoaded);
      } else if (attempts < 30) {
        attempts++;
        retry = setTimeout(attach, 200);
      }
    };

    attach();

    return () => {
      if (retry) clearTimeout(retry);
      video?.removeEventListener("ended", handleEnded);
      video?.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [playlist.length]);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <V2A
        src={playlist[index]}
        numColumns={numColumns}
        colored
        brightness={1.05}
        charset="detailed"
        autoPlay
        isPlaying
        enableMouse
        enableRipple
        rippleSpeed={45}
        trailLength={18}
        audioEffect={0}
      />
    </div>
  );
}
