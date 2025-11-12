"use client";
import { useEffect, useRef } from "react";

export default function ManualAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-ef+6k-30-ac+ty"
        data-ad-client="ca-pub-8822732191267343"
        data-ad-slot="3582034276"
      ></ins>
    </div>
  );
}
