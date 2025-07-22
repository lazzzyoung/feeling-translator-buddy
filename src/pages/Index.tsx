import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TextConverter } from "@/components/TextConverter";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {!apiKey ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <ApiKeyInput onApiKeySet={setApiKey} />
          </div>
        ) : (
          <TextConverter apiKey={apiKey} />
        )}
      </div>
    </div>
  );
};

export default Index;
