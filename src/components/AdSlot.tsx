"use client";

import { useEffect } from "react";

export default function AdSlot() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdsbyGoogle push error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client="ca-pub-8822732191267343"
      data-ad-slot="7404255757"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
