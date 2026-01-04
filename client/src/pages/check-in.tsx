// import { useState } from "react";
// import { useLocation } from "wouter";
// import { useSaveMood } from "@/hooks/use-moods";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Loader2, SendHorizontal, Mic } from "lucide-react";

// const user = {
//   uid: "demo-user",
// };

// export default function CheckIn() {
//   const [text, setText] = useState("");

//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   const saveMoodMutation = useSaveMood();

//   const [isPending, setIsPending] = useState(false);

//   const handleSubmit = async () => {
//     if (!text.trim() || !user) return;

//     try {
//       setIsPending(true);

//       // --- MOCK AI SENTIMENT ANALYSIS ---
//       let emotion = "Neutral";
//       let sentimentScore = 0.5;
//       let magnitude = 0.7;

//       const lowerText = text.toLowerCase();
//       if (lowerText.includes("stress") || lowerText.includes("tired")) {
//         emotion = "Stressed";
//         sentimentScore = 0.2;
//       } else if (lowerText.includes("happy") || lowerText.includes("good")) {
//         emotion = "Happy";
//         sentimentScore = 0.9;
//       } else if (lowerText.includes("calm") || lowerText.includes("relaxed")) {
//         emotion = "Calm";
//         sentimentScore = 0.8;
//       }

//       // simulate processing delay
//       await new Promise((res) => setTimeout(res, 1000));

//       // // --- SAVE TO FIRESTORE ---
//       // await saveMoodMutation.mutateAsync({
//       //   userId: user.uid,
//       //   text,
//       //   sentimentScore,
//       //   sentimentMagnitude: magnitude,
//       //   emotionCategory: emotion,
//       // });

//       toast({
//         title: "Check-in complete",
//         description: `You seem to be feeling ${emotion.toLowerCase()}.`,
//       });

//       setText(""); // clear input
//       setLocation("/dashboard");
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to process your check-in. Please try again.",
//       });
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-bold font-display">Daily Check-In</h1>
//         <p className="text-muted-foreground">
//           Take a moment to reflect. How are you feeling right now?
//         </p>
//       </div>

//       <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
//         <CardContent className="p-0">
//           <div className="p-6">
//             <Textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="I'm feeling..."
//               className="min-h-[200px] text-lg border-none bg-transparent resize-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
//               disabled={isPending}
//             />
//           </div>

//           <div className="bg-slate-50/50 p-4 flex justify-between items-center border-t">
//             <Button variant="ghost" size="icon" disabled>
//               <Mic className="w-5 h-5 text-muted-foreground" />
//             </Button>

//             <div className="flex gap-3">
//               <Button
//                 variant="ghost"
//                 onClick={() => setLocation("/dashboard")}
//                 disabled={isPending}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 disabled={!text.trim() || isPending}
//                 className="rounded-full px-6"
//               >
//                 {isPending ? (
//                   <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                 ) : (
//                   <SendHorizontal className="w-4 h-4 mr-2" />
//                 )}
//                 {isPending ? "Analyzing..." : "Save Entry"}
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-2 gap-4">
//         <PromptCard
//           emoji="🎯"
//           text="What's one goal you accomplished today?"
//           onClick={(t) => setText(t)}
//         />
//         <PromptCard
//           emoji="🌟"
//           text="What are you grateful for right now?"
//           onClick={(t) => setText(t)}
//         />
//       </div>
//     </div>
//   );
// }

// function PromptCard({
//   emoji,
//   text,
//   onClick,
// }: {
//   emoji: string;
//   text: string;
//   onClick: (t: string) => void;
// }) {
//   return (
//     <button
//       onClick={() => onClick(text + " ")}
//       className="text-left p-4 rounded-xl bg-white border hover:border-primary/50 hover:shadow-md transition-all group"
//     >
//       <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
//         {emoji}
//       </div>
//       <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
//         {text}
//       </div>
//     </button>
//   );
// }

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, SendHorizontal, Mic } from "lucide-react";

export default function CheckIn() {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setIsPending(true);

      // 🧠 SIMPLE EMOTION DETECTION
      let emotion = "Neutral";
      let sentimentScore = 0.5;
      let suggestion = "";

      const lowerText = text.toLowerCase();

      if (
        lowerText.includes("stress") ||
        lowerText.includes("tired") ||
        lowerText.includes("pressure") ||
        lowerText.includes("anxious") ||
        lowerText.includes("exam")
      ) {
        emotion = "Stressed";
        sentimentScore = 0.2;
        suggestion =
          "It sounds like academic pressure is weighing on you. Try taking a short break, practicing deep breathing, or reaching out to a friend or campus counselor for support.";
      } else if (
        lowerText.includes("happy") ||
        lowerText.includes("good") ||
        lowerText.includes("excited") ||
        lowerText.includes("productive") ||
        lowerText.includes("motivated")
      ) {
        emotion = "Happy";
        sentimentScore = 0.9;
        suggestion =
          "That’s wonderful to hear! Keep doing what’s working for you. You might want to write this down or share the positivity with someone.";
      } else if (
        lowerText.includes("calm") ||
        lowerText.includes("relaxed") ||
        lowerText.includes("peaceful")
      ) {
        emotion = "Calm";
        sentimentScore = 0.8;
        suggestion =
          "You seem balanced and grounded. Maintaining routines like light exercise, mindfulness, or proper rest can help you stay this way.";
      } else {
        emotion = "Neutral";
        sentimentScore = 0.5;
        suggestion =
          "Thanks for checking in. Small self-care actions like staying hydrated, resting well, or taking a short walk can positively impact your day.";
      }

      // ⏳ Fake AI delay
      await new Promise((res) => setTimeout(res, 1000));

      // 💾 SAVE RESULT
      localStorage.setItem(
        "latestMood",
        JSON.stringify({
          text,
          emotion,
          sentimentScore,
          suggestion,
          createdAt: new Date().toISOString(),
        }),
      );

      setText("");
      setLocation("/dashboard");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Daily Check-In</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today?"
            className="min-h-[180px]"
            disabled={isPending}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={handleSubmit} disabled={!text.trim() || isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <SendHorizontal className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Analyzing..." : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
