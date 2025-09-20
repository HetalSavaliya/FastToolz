"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdsenseAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Adsense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block", minHeight: "100px" }}
      data-ad-client="ca-pub-3940256099942544" // ✅ TEST ID
      data-ad-slot="1234567890" // ✅ TEST slot
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
