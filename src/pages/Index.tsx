import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TextConverter } from "@/components/TextConverter";
import { AdSlot } from "@/components/AdSlot";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <>
      {/* 양옆 광고 (Adfit으로 변경됨) */}
      <AdSlot id="애드핏_광고단위ID_LEFT" position="left" />
      <AdSlot id="애드핏_광고단위ID_RIGHT" position="right" />

      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {!apiKey ? (
            <div className="flex items-center justify-center min-h-[80vh]">
              <ApiKeyInput onApiKeySet={setApiKey} />
            </div>
          ) : (
            <TextConverter apiKey={apiKey} />
          )}

          {/* 하단 광고 */}
          <AdSlot id="애드핏_광고단위ID_BOTTOM" position="bottom" />
        </div>
      </div>
    </>
  );
};

export default Index;