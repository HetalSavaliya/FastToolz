"use client";
import AdSlot from "./AdSlot";

interface ManualAdProps {
  adSlot: string; // allow passing slot dynamically
  style?: React.CSSProperties;
  format?: string;
}

export default function ManualAd({
  adSlot,
  style,
  format = "fluid",
}: ManualAdProps) {
  return (
    <AdSlot
      adClient="ca-pub-8822732191267343"
      adSlot={adSlot}
      style={{ minHeight: "250px", ...style }}
      format={format}
    />
  );
}
