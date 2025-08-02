import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TextConverter } from "@/components/TextConverter";
import { AdSlot } from "@/components/AdSlot";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <>
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {!apiKey ? (
            <div className="flex items-center justify-center min-h-[80vh]">
              <ApiKeyInput onApiKeySet={setApiKey} />
            </div>
          ) : (
            <>
              {/* ✅ 콘텐츠 시작 부분에 광고 (중간 광고) */}
              <AdSlot id="DAN-2mAOQfyQ27S1Y7yE" position="center" />

              {/* 실제 변환 기능 */}
              <TextConverter apiKey={apiKey} />

              {/* ✅ 변환 결과 끝나고도 광고 하나 넣을 수 있음 */}
              <AdSlot id="DAN-2mAOQfyQ27S1Y7yE" position="center" />
            </>
          )}

          {/* ✅ 페이지 하단 광고 */}
          <AdSlot id="DAN-2mAOQfyQ27S1Y7yE" position="bottom" />
        </div>
      </div>
    </>
  );
};

export default Index;