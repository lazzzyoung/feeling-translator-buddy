import { cn } from "@/lib/utils";

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

  return (
    <div
      id={id}
      className={cn(baseClasses, positionClasses[position], className)}
    >
      {/* ✅ 구글 애드센스 광고 삽입 */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3056616618352915"
        data-ad-slot="1234567890"   // ✅ 여기 슬롯 ID는 단위광고 생성 후 교체
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
}