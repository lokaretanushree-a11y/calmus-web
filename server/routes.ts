import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import axios from "axios";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Sentiment Analysis Endpoint
  app.post(api.analyze.path, async (req, res) => {
    try {
      const { text } = api.analyze.input.parse(req.body);

      // Call Google Natural Language API
      // Requires GOOGLE_NLP_API_KEY env var
      const apiKey = process.env.GOOGLE_NLP_API_KEY;
      
      let sentimentData = { score: 0, magnitude: 0 };

      if (apiKey) {
        try {
          const googleResponse = await axios.post(
            `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`,
            {
              document: {
                type: 'PLAIN_TEXT',
                content: text,
              },
              encodingType: 'UTF8',
            }
          );
          sentimentData = googleResponse.data.documentSentiment;
        } catch (error) {
          console.error("Google NLP API Error:", error);
          // Fallback if API fails or quota exceeded
          // Mock simple analysis for demo purposes if API fails
          sentimentData = mockSentimentAnalysis(text);
        }
      } else {
        console.warn("No GOOGLE_NLP_API_KEY provided. Using mock analysis.");
        sentimentData = mockSentimentAnalysis(text);
      }

      const { score, magnitude } = sentimentData;
      
      // Determine emotion category based on score/magnitude
      const emotion = determineEmotion(score, magnitude);
      const suggestion = getSuggestion(emotion);

      res.json({
        score,
        magnitude,
        emotion,
        suggestion
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}

function mockSentimentAnalysis(text: string) {
  // Simple keyword-based mock
  const positiveWords = ['happy', 'good', 'great', 'calm', 'excellent', 'joy'];
  const negativeWords = ['sad', 'bad', 'stressed', 'anxious', 'overwhelmed', 'angry'];
  
  const lowerText = text.toLowerCase();
  let score = 0;
  
  positiveWords.forEach(w => { if (lowerText.includes(w)) score += 0.4; });
  negativeWords.forEach(w => { if (lowerText.includes(w)) score -= 0.4; });
  
  // Clamp between -1 and 1
  score = Math.max(-1, Math.min(1, score));
  
  return { score, magnitude: Math.abs(score) };
}

function determineEmotion(score: number, magnitude: number): string {
  if (score > 0.25) return "Positive";
  if (score < -0.25) return "Negative"; // Could be "Stressed" or "Overwhelmed"
  return "Neutral";
}

function getSuggestion(emotion: string): string {
  if (emotion === "Negative") return "It sounds like things are tough. Consider taking a deep breath or talking to a friend.";
  if (emotion === "Positive") return "That's great! Keep up the good vibes.";
  return "Stay balanced and take care of yourself.";
}
