import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string; // 광고 단위 ID (DAN-xxxx)
  className?: string;
  position?: "center" | "bottom"; // 300x250은 중앙/아래용으로 활용
}

export function AdSlot({ id, className, position = "bottom" }: AdSlotProps) {
  const baseClasses =
    "bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center";

  const positionClasses = {
    center: "w-[300px] h-[250px] my-6 mx-auto", // 중앙 배치
    bottom: "w-[300px] h-[250px] mx-auto mt-8", // 페이지 하단 배치
  };

  return (
    <div
      className={cn(baseClasses, positionClasses[position], className)}
    >
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={id}
        data-ad-width="300"
        data-ad-height="250"
      ></ins>
    </div>
  );
}