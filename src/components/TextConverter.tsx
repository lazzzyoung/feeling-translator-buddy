import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextConverterProps {
  apiKey: string;
}

interface ConversionResult {
  original: string;
  converted: string;
}

export function TextConverter({ apiKey }: TextConverterProps) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const convertText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "입력 오류",
        description: "좀 더 구체적인 문장을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `다음 문장을 F 유형 성격을 가진 사람처럼 공감 있고 따뜻하게 바꿔줘. 예의는 지키되 감정을 전달하는 데 집중해줘. 원래 의미는 유지하면서 더 감정적이고 배려 있는 표현으로 바꿔줘.

입력 문장: "${inputText}"`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('API 호출 실패');
      }

      const data = await response.json();
      const convertedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!convertedText) {
        throw new Error('변환 결과를 받을 수 없습니다');
      }

      setResult({
        original: inputText,
        converted: convertedText.trim()
      });

      toast({
        title: "변환 완료! ✨",
        description: "F 스타일로 성공적으로 변환되었습니다.",
      });

    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "변환 실패",
        description: "감정 변환에 실패했어요. 다시 시도해볼래요?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text text-2xl font-bold text-center">
            You can F 💝
          </CardTitle>
          <CardDescription className="text-center text-lg">
            당신의 T식 문장을 F처럼 바꿔보세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text" className="text-base font-medium">
              T 스타일 문장을 입력하세요
            </Label>
            <Textarea
              id="input-text"
              placeholder="예: 이건 비효율적이야. 다시 해."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] text-base"
            />
          </div>
          <Button 
            onClick={convertText} 
            disabled={isLoading || !inputText.trim()}
            className="w-full text-base py-6"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                감성 번역 중...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                F 스타일로 변환하기
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Result Section */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {/* Original T-style */}
          <Card className="t-card border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Brain className="h-5 w-5" />
                🧠 원본 (T 스타일)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed font-medium text-blue-800 dark:text-blue-200">
                "{result.original}"
              </p>
            </CardContent>
          </Card>

          {/* Converted F-style */}
          <Card className="f-card border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-pink-700 dark:text-pink-300">
                <Heart className="h-5 w-5" />
                ❤️ 변환 결과 (F 스타일)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed font-medium text-pink-800 dark:text-pink-200">
                "{result.converted}"
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}