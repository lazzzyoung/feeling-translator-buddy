import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TextConverter } from "@/components/TextConverter";
import { AdSlot } from "@/components/AdSlot";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <>
      {/* Ad Slots */}
      <AdSlot id="adsense-slot-left" position="left" />
      <AdSlot id="adsense-slot-right" position="right" />
      
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
          <AdSlot id="adsense-slot-bottom" position="bottom" />
        </div>
      </div>
    </>
  );
};

export default Index;
