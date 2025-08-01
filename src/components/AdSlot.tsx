import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface AdSlotProps {
  id: string;
  className?: string;
  position: "left" | "right" | "bottom";
}

export function AdSlot({ id, className, position }: AdSlotProps) {
  const baseClasses =
    "bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm";

  const positionClasses = {
    left: "w-40 h-96 fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:flex",
    right: "w-40 h-96 fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:flex",
    bottom: "w-full h-24 mt-8",
  };

  // ✅ adsbygoogle 다시 push 보장
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div
      id={id}
      className={cn(baseClasses, positionClasses[position], className)}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: position === "bottom" ? "100%" : "160px", // left/right 고정폭, bottom은 full
          height: position === "bottom" ? "100px" : "600px", // bottom은 배너, 양옆은 세로형
        }}
        data-ad-client="ca-pub-3056616618352915"
        data-ad-slot="1234567890" // ✅ 슬롯 ID 교체
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}