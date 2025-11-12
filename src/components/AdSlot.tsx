"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  adClient: string;
  adSlot: string;
  style?: React.CSSProperties;
  adTest?: boolean; // optional for testing
  format?: string;
}

export default function AdSlot({
  adClient,
  adSlot,
  style,
  adTest,
  format,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = adRef.current;
    if (!el || (el as any).dataset.adsLoaded) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      (el as any).dataset.adsLoaded = "true";
    } catch (err) {
      console.error("Adsense error:", err);
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "250px", ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format ? format : "auto"}
        data-full-width-responsive="true"
        {...(adTest ? { "data-adtest": "on" } : {})}
      ></ins>
    </div>
  );
}
