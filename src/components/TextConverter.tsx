import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Brain, Sparkles, Loader2, MessageCircleHeart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ShareButtons } from "@/components/ShareButtons";

interface ConversionResult {
  original: string;
  converted: string;
}

interface TextConverterProps {
  apiKey: string;
}

export function TextConverter({ apiKey }: TextConverterProps) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fQuestion, setFQuestion] = useState(""); 
  const [fAnswer, setFAnswer] = useState("");     
  const [isAnswering, setIsAnswering] = useState(false);

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

    if (inputText.length > 50) {
      toast({
        title: "길이 제한 초과",
        description: "문장은 50자 이내로 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/f-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "감정 변환 실패");
      }

      const convertedText = data.result;

      setResult({
        original: inputText,
        converted: convertedText.trim(),
      });

      toast({
        title: "변환 완료! ✨",
        description: "F 스타일로 성공적으로 변환되었습니다.",
      });
    } catch (error: any) {
      console.error("Conversion error:", error);
      toast({
        title: "변환 실패",
        description: error.message || "다시 시도해볼래요?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recommendFAnswer = async () => {
    if (!fQuestion.trim()) {
      toast({
        title: "입력 오류",
        description: "F가 한 질문을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsAnswering(true);

    try {
      const response = await fetch("http://localhost:8080/api/f-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: fQuestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "답변 생성 실패");
      }

      setFAnswer(data.answer.trim());
    } catch (error: any) {
      toast({
        title: "추천 실패",
        description: error.message || "다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* F 질문 → F 답변 추천 (핑크 톤 유지) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-pink-500">
            You can F ❤️
          </CardTitle>
          <CardDescription className="text-center text-lg text-pink-500">
            이제 당신도 얼마든지 F처럼 다정하게 말할 수 있어요!
          </CardDescription>
          <div className="h-4" />
          <CardTitle className="text-xl font-bold text-pink-400">
            F의 질문에 다정하게 대답해보기
          </CardTitle>
          <CardDescription className="text-base text-pink-600">
            F가 한 질문을 입력하면, F처럼 다정한 답변을 추천해줘요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="f-question" className="text-base font-medium text-pink-600">
              F가 보낸 질문을 입력하세요
            </Label>
            <Textarea
              id="f-question"
              placeholder="예: 왜 그렇게 행동했어?"
              value={fQuestion}
              onChange={(e) => setFQuestion(e.target.value)}
              className="min-h-[100px] text-base border-pink-400 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <Button
            onClick={recommendFAnswer}
            disabled={isAnswering || !fQuestion.trim()}
            className="w-full text-base py-5 bg-pink-500 hover:bg-pink-600 text-white"
            size="lg"
          >
            {isAnswering ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                F답변 추천 중...
              </>
            ) : (
              <>
                <MessageCircleHeart className="mr-2 h-5 w-5" />
                다정한 F 답변 추천받기
              </>
            )}
          </Button>

          {fAnswer && (
            <div className="mt-4 border rounded-lg p-4 bg-pink-50 text-pink-800 text-base leading-relaxed">
              <strong>💗 추천 F 스타일 답변:</strong> <br />
              {fAnswer}
              <div className="mt-2">
                <ShareButtons
                  originalText={fQuestion}
                  convertedText={fAnswer}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* T → F 변환 (블루 톤) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-400 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            내가 한 T식 답변을 F답변으로 바꿔보기
          </CardTitle>
          <CardDescription className="text-base text-blue-700">
            내가 떠올린 직설적인 T 답변을, 다정한 F답변으로 다시 표현해줘요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text" className="text-base font-medium text-blue-600">
              T 스타일 문장을 입력하세요
            </Label>
            <Textarea
              id="input-text"
              placeholder="예: 이건 비효율적이야. 다시 해."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] text-base border-blue-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            onClick={convertText}
            disabled={isLoading || !inputText.trim()}
            className="w-full text-base py-6 bg-blue-500 hover:bg-blue-600 text-white"
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
                다정한 F 스타일로 변환하기
              </>
            )}
          </Button>

          {result && (
            <div className="mt-4 border rounded-lg p-4 bg-blue-50 text-blue-800 text-base leading-relaxed">
              <strong>🔄 변환된 F 스타일 문장:</strong> <br />
              {result.converted}
              <div className="mt-2">
                <ShareButtons
                  originalText={result.original}
                  convertedText={result.converted}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}