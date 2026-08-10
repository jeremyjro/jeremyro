import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavRail from "./nav-rail";

const spaceMono = localFont({
  src: [
    { path: "./fonts/SpaceMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/SpaceMono-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/SpaceMono-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/SpaceMono-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeremy Ro",
  description: "Growth Lead, Virio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceMono.className}>
      <body>
        <NavRail />
        {children}
      </body>
    </html>
  );
}
