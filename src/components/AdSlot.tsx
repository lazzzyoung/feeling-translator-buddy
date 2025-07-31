import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  className?: string;
  position: "left" | "right" | "bottom";
  slot: string; // 광고 슬롯 ID (애드센스에서 발급받은 값)
}

export function AdSlot({ id, className, position, slot }: AdSlotProps) {
  useEffect(() => {
    try {
      // 광고 채우기
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  const baseClasses =
    "border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center";
  
  const positionClasses = {
    left: "w-40 h-96 fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:flex",
    right: "w-40 h-96 fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:flex",
    bottom: "w-full h-24 mt-8"
  };

  return (
    <div
      id={id}
      className={cn(baseClasses, positionClasses[position], className)}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3056616618352915" // ✅ 행님 애드센스 ID
        data-ad-slot={slot}                      // ✅ 개별 슬롯 ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}