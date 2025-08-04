"use client";

import { useEffect } from 'react';

function AdSlot() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || [{ push: (_: {}) => {} }]).push({}); // This is the CORRECT line
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, []);

  const adClientId = "ca-pub-7640562353408963";

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '300px', height: '250px' }}  // Set default width and height
      data-ad-client={adClientId}
      data-ad-slot={"9458089686"}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

export default AdSlot;
