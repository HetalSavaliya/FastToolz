"use client";

import { useEffect } from "react";

// Fix: Extend window type inline
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot() {
  useEffect(() => {
  const timeout = setTimeout(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdsbyGoogle push error:", e);
    }
  }, 100); // Give layout some time to calculate width

  return () => clearTimeout(timeout);
}, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", textAlign: "center" }}
      data-ad-client="ca-pub-8822732191267343"
      data-ad-slot="7404255757"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
