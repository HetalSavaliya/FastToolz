"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ClientAdWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showAd, setShowAd] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setShowAd(true);
      setPrevPath(pathname);
      const timer = setTimeout(() => setShowAd(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  return (
    <>
      {showAd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "90%", height: "80%" }}
            data-ad-client="ca-pub-8822732191267343"
            data-ad-slot="6286312568"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>

          <Script id="show-ad" strategy="afterInteractive">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>

          <button
            onClick={() => setShowAd(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "#fff",
              color: "#000",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Skip Ad
          </button>
        </div>
      )}

      <div
        style={{
          opacity: showAd ? 0.3 : 1,
          pointerEvents: showAd ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
