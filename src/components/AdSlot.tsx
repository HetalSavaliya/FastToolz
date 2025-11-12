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
  format?: string;
}

export default function AdSlot({
  adClient,
  adSlot,
  style,
  format = "auto",
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    const el = adRef.current;
    if (!el || (el as any).dataset.adsLoaded) return;

    // Wait until the ad container has width before initializing
    const checkWidth = setInterval(() => {
      if (el.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          (el as any).dataset.adsLoaded = "true";
        } catch (err) {
          console.error("Adsense error:", err);
        }
        clearInterval(checkWidth);
      }
    }, 500);

    return () => clearInterval(checkWidth);
  }, []);

  return (
    <div
      ref={adRef}
      style={{ width: "100%", display: "block", textAlign: "center" }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "250px",
          ...style,
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(isLocalhost ? { "data-adtest": "on" } : {})}
      ></ins>
    </div>
  );
}
