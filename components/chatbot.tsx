"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Chat() {
  const pathname = usePathname();

  // Only render on homepage ("/") and not on "/widget" or any other route
  if (pathname !== "/") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "3px",
        width: "400px",
        height: "800px",
        zIndex: 1000,
        // borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://botharbor.ai/widget?bot_id=146334d3-9b22-46e9-a4ba-1507ff2b952b"
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="clipboard-write; clipboard-read"
      />
    </div>
  );
}
