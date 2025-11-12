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
}

export default function AdSlot({ adClient, adSlot, style }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Only push if the ad hasn't been initialized yet
    if ((adRef.current as HTMLModElement).childNodes.length === 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("Adsense error:", err);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block"
      style={{ display: "block", ...style }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      // data-adtest="on"
      data-full-width-responsive="true"
    ></ins>
  );
}
