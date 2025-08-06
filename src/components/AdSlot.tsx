"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot() {
  const adRef = useRef<HTMLModElement>(null); // Change the type here
  const hasInitialized = useRef(false); // ✅ track if pushed

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      adRef.current &&
      !hasInitialized.current
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasInitialized.current = true; // ✅ only push once
      } catch (e) {
        console.error("AdsbyGoogle push error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: 100 }}
      data-ad-client="ca-pub-8822732191267343"
      data-ad-slot="7404255757"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="on"
    ></ins>
  );
}
