import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Link, MessageCircle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface ShareButtonsProps {
  originalText: string;
  convertedText: string;
}

export function ShareButtons({ originalText, convertedText }: ShareButtonsProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "복사 완료! ✨",
        description: message,
      });
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleCopyResult = () => {
    copyToClipboard(convertedText, "변환 결과가 클립보드에 복사되었습니다.");
  };

  const handleCopyLink = () => {
    copyToClipboard(window.location.href, "링크가 클립보드에 복사되었습니다.");
  };

  const handleKakaoShare = () => {
    if ((window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'text',
        text: `You can F 결과 공유! 💬\n\n원본(T): "${originalText}"\n변환(F): "${convertedText}"`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      });
    } else {
      // Fallback - copy to clipboard
      const shareText = `You can F 결과 공유! 💬\n\n원본(T): "${originalText}"\n변환(F): "${convertedText}"\n\n${window.location.href}`;
      copyToClipboard(shareText, "공유 텍스트가 클립보드에 복사되었습니다.");
    }
  };

  const handleScreenshot = async () => {
    setIsCapturing(true);
    try {
      const resultElement = document.querySelector('.result-section');
      if (resultElement) {
        const canvas = await html2canvas(resultElement as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'you-can-f-result.png';
        link.href = canvas.toDataURL();
        link.click();
        
        toast({
          title: "스크린샷 저장 완료! 📸",
          description: "이미지가 다운로드되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "스크린샷 실패",
        description: "이미지 생성에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6 p-4 bg-background/50 rounded-lg">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyResult}
        className="flex items-center gap-2"
      >
        <Copy className="h-4 w-4" />
        복사하기
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2"
      >
        <Link className="h-4 w-4" />
        링크 복사
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleKakaoShare}
        className="flex items-center gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        카카오톡 공유
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleScreenshot}
        disabled={isCapturing}
        className="flex items-center gap-2"
      >
        <Camera className="h-4 w-4" />
        {isCapturing ? "캡처 중..." : "스크린샷 저장"}
      </Button>
    </div>
  );
}