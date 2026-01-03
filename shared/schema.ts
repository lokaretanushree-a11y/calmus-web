import { z } from "zod";

// Firestore Data Models
// These match the data stored in Firestore
export const moodEntrySchema = z.object({
  id: z.string().optional(), // Firestore generates IDs
  userId: z.string(),
  text: z.string().min(1, "Text is required"),
  sentimentScore: z.number(),
  sentimentMagnitude: z.number(),
  emotionCategory: z.string(),
  createdAt: z.union([z.string(), z.date(), z.any()]), // Timestamp handling
});

export type MoodEntry = z.infer<typeof moodEntrySchema>;

// API Request/Response for Sentiment Analysis
export const analyzeSentimentSchema = z.object({
  text: z.string().min(1, "Text is required for analysis"),
});

export const analyzeSentimentResponseSchema = z.object({
  score: z.number(),
  magnitude: z.number(),
  emotion: z.string(), // e.g. "Positive", "Negative", "Neutral", "Mixed"
  suggestion: z.string().optional(), // Supportive message
});

export type AnalyzeSentimentRequest = z.infer<typeof analyzeSentimentSchema>;
export type AnalyzeSentimentResponse = z.infer<typeof analyzeSentimentResponseSchema>;
