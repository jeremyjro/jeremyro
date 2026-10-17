"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const onBlank = usePathname() === "/blank";
  return (
    <Link href={onBlank ? "/" : "/blank"} className="topNavLink">
      {onBlank ? "home" : "blank"}
    </Link>
  );
}
