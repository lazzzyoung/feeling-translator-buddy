import { useState, useEffect } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TextConverter } from "@/components/TextConverter";
import { AdSlot } from "@/components/AdSlot";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // 구글 애드센스 스크립트 동적 삽입
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3056616618352915";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Ad Slots */}
      <AdSlot id="adsense-slot-left" position="left" slot="1234567890" />
      <AdSlot id="adsense-slot-right" position="right" slot="1234567891" />

      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {!apiKey ? (
            <div className="flex items-center justify-center min-h-[80vh]">
              <ApiKeyInput onApiKeySet={setApiKey} />
            </div>
          ) : (
            <TextConverter apiKey={apiKey} />
          )}

          {/* Bottom Ad Slot */}
          <AdSlot id="adsense-slot-bottom" position="bottom" slot="1234567892" />
        </div>
      </div>
    </>
  );
};

export default Index;