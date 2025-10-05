// AdSlot.tsx
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot() {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    // Only render ad, don't push page-level ads again
    if (!(ad as any).dataset.adsenseInitialized) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (ad as any).dataset.adsenseInitialized = "true";
      } catch (err) {
        console.error("Adsense error:", err);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block"
      style={{ display: "block", minHeight: "100px" }}
      data-ad-client="ca-pub-8822732191267343"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
      // testing
    ></ins>
  );
}
