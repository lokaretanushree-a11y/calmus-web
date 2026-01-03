import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";
import type { MoodEntry, AnalyzeSentimentRequest } from "@shared/schema";

// API Hook for Sentiment Analysis
export function useAnalyzeSentiment() {
  return useMutation({
    mutationFn: async (data: AnalyzeSentimentRequest) => {
      const res = await fetch(api.analyze.path, {
        method: api.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to analyze sentiment");
      }
      
      return api.analyze.responses[200].parse(await res.json());
    },
  });
}

// Firestore Hook for Fetching Moods
export function useMoodHistory(userId: string | undefined) {
  return useQuery({
    queryKey: ["moods", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const q = query(
        collection(db, "moods"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to Date for frontend use
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as MoodEntry[];
    },
    enabled: !!userId,
  });
}

// Firestore Hook for Saving Mood
export function useSaveMood() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (moodData: Omit<MoodEntry, "id" | "createdAt">) => {
      const docRef = await addDoc(collection(db, "moods"), {
        ...moodData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["moods", variables.userId] });
    },
  });
}
