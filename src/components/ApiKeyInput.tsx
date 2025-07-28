import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, Eye, EyeOff } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export function ApiKeyInput({ onApiKeySet }: ApiKeyInputProps) {
  const defaultApiKey = "AIzaSyDxxxxxxx...";
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeySet(savedApiKey);
    } else {
      // Apply default API key automatically
      setApiKey(defaultApiKey);
      onApiKeySet(defaultApiKey);
    }
  }, [onApiKeySet]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini-api-key", apiKey.trim());
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Gemini API 키 설정
        </CardTitle>
        <CardDescription>
          감정적인 변환을 위해 Gemini API 키가 필요합니다
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API 키</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button onClick={handleSaveKey} className="w-full" disabled={!apiKey.trim()}>
          API 키 저장
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          API 키는 로컬에 안전하게 저장됩니다
        </p>
      </CardContent>
    </Card>
  );
}