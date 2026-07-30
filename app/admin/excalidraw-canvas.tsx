"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./admin.module.css";
import "@excalidraw/excalidraw/index.css";

const STORAGE_KEY = "jeremyro-excalidraw-scene";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod: any) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => <p className={styles.loading}>Loading canvas…</p>,
  },
) as any;

interface SceneData {
  elements?: any[];
  appState?: any;
}

export default function ExcalidrawCanvas() {
  const [data, setData] = useState<SceneData | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setData(raw ? JSON.parse(raw) : {});
    } catch {
      setData({});
    }
  }, []);

  useEffect(
    () => () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    },
    [],
  );

  const handleChange = (elements: readonly any[], appState: any) => {
    if (!hasInteracted.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        const scene: SceneData = {
          elements: elements as any[],
          appState: {
            theme: appState.theme,
            viewBackgroundColor: appState.viewBackgroundColor,
            zoom: appState.zoom,
            scrollX: appState.scrollX,
            scrollY: appState.scrollY,
          },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scene));
      } catch {
        // ignore storage quota errors
      }
    }, 400);
  };

  if (data === null) {
    return <p className={styles.loading}>Loading canvas…</p>;
  }

  return (
    <div className={styles.canvasWrap}>
      <Excalidraw
        initialData={data.elements ? data : undefined}
        onChange={handleChange}
        onPointerDown={() => {
          hasInteracted.current = true;
        }}
        theme="light"
        gridModeEnabled={false}
      />
    </div>
  );
}
