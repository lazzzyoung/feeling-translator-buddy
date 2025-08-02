import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string; // 광고 단위 ID
  className?: string;
  position: "left" | "right" | "bottom";
}

export function AdSlot({ id, className, position }: AdSlotProps) {
  const positionClasses = {
    left: "w-40 h-96 fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block",
    right: "w-40 h-96 fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden xl:block",
    bottom: "w-full h-24 mt-8",
  };

  return (
    <div className={cn(positionClasses[position], className)}>
      <iframe
        title="adfit"
        src={`https://ads-partners.coupang.com/widgets.html?id=${id}`} // 광고단위생성-> 스크립트코드 넣기
        width={position === "bottom" ? "100%" : "160"}
        height={position === "bottom" ? "100" : "600"}
        frameBorder="0"
        scrolling="no"
        style={{ border: "none", overflow: "hidden" }}
      ></iframe>
    </div>
  );
}