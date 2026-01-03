import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useAnalyzeSentiment, useSaveMood } from "@/hooks/use-moods";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, SendHorizontal, Mic } from "lucide-react";

export default function CheckIn() {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const analyzeMutation = useAnalyzeSentiment();
  const saveMoodMutation = useSaveMood();

  const isPending = analyzeMutation.isPending || saveMoodMutation.isPending;

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;

    try {
      // 1. Analyze Sentiment
      const analysis = await analyzeMutation.mutateAsync({ text });
      
      // 2. Save to Firestore
      await saveMoodMutation.mutateAsync({
        userId: user.uid,
        text,
        sentimentScore: analysis.score,
        sentimentMagnitude: analysis.magnitude,
        emotionCategory: analysis.emotion,
      });

      toast({
        title: "Check-in complete",
        description: `You seem to be feeling ${analysis.emotion.toLowerCase()}.`,
      });

      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your check-in. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-display">Daily Check-In</h1>
        <p className="text-muted-foreground">
          Take a moment to reflect. How are you feeling right now?
        </p>
      </div>

      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I'm feeling..."
              className="min-h-[200px] text-lg border-none bg-transparent resize-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
              disabled={isPending}
            />
          </div>
          
          <div className="bg-slate-50/50 p-4 flex justify-between items-center border-t">
            <Button variant="ghost" size="icon" disabled>
              <Mic className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setLocation("/dashboard")} disabled={isPending}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!text.trim() || isPending}
                className="rounded-full px-6"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <SendHorizontal className="w-4 h-4 mr-2" />
                )}
                {isPending ? "Analyzing..." : "Save Entry"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <PromptCard 
          emoji="🎯" 
          text="What's one goal you accomplished today?" 
          onClick={(t) => setText(t)} 
        />
        <PromptCard 
          emoji="🌟" 
          text="What are you grateful for right now?" 
          onClick={(t) => setText(t)} 
        />
      </div>
    </div>
  );
}

function PromptCard({ emoji, text, onClick }: { emoji: string, text: string, onClick: (t: string) => void }) {
  return (
    <button 
      onClick={() => onClick(text + " ")}
      className="text-left p-4 rounded-xl bg-white border hover:border-primary/50 hover:shadow-md transition-all group"
    >
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{emoji}</div>
      <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
        {text}
      </div>
    </button>
  );
}
