import { cn } from "@/lib/utils";
import { 
  Smile, 
  Meh, 
  Frown, 
  AlertCircle 
} from "lucide-react";

interface EmotionBadgeProps {
  emotion: string;
  className?: string;
}

export function EmotionBadge({ emotion, className }: EmotionBadgeProps) {
  const getStyle = (e: string) => {
    switch (e.toLowerCase()) {
      case "positive":
        return {
          bg: "bg-green-100 text-green-700 border-green-200",
          icon: Smile
        };
      case "negative":
        return {
          bg: "bg-red-100 text-red-700 border-red-200",
          icon: Frown
        };
      case "neutral":
        return {
          bg: "bg-gray-100 text-gray-700 border-gray-200",
          icon: Meh
        };
      case "mixed":
        return {
          bg: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: AlertCircle
        };
      default:
        return {
          bg: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Meh
        };
    }
  };

  const style = getStyle(emotion);
  const Icon = style.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border",
      style.bg,
      className
    )}>
      <Icon className="w-4 h-4" />
      {emotion}
    </span>
  );
}
