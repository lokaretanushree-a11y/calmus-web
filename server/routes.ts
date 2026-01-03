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

      // Enhanced demo sentiment analysis logic
      const sentimentData = simulateSentimentAnalysis(text);

      const { score, magnitude } = sentimentData;
      
      // Determine emotion category based on score/magnitude
      const emotion = determineEmotion(score, magnitude);
      const suggestion = getSuggestion(emotion);

      // Artificial delay to simulate API processing
      await new Promise(resolve => setTimeout(resolve, 800));

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

/**
 * Simulates Google Natural Language API sentiment analysis.
 * Structure matches the actual API for future replacement.
 */
function simulateSentimentAnalysis(text: string) {
  const lowerText = text.toLowerCase();
  
  // Scoring rules
  const positive = ['happy', 'good', 'great', 'calm', 'excellent', 'joy', 'excited', 'peace', 'wonderful', 'better'];
  const negative = ['sad', 'bad', 'stressed', 'anxious', 'overwhelmed', 'angry', 'depressed', 'tired', 'worried', 'struggling'];
  const stress = ['exam', 'deadline', 'test', 'finals', 'grade', 'pressure', 'hard', 'study', 'work'];

  let score = 0;
  let matches = 0;

  positive.forEach(word => {
    if (lowerText.includes(word)) {
      score += 0.3;
      matches++;
    }
  });

  negative.forEach(word => {
    if (lowerText.includes(word)) {
      score -= 0.3;
      matches++;
    }
  });

  stress.forEach(word => {
    if (lowerText.includes(word)) {
      score -= 0.15; // Moderate negative impact
      matches++;
    }
  });

  // Normalize score between -1.0 and 1.0
  score = Math.max(-1, Math.min(1, score));
  
  // Magnitude represents strength of emotion regardless of polarity
  const magnitude = Math.min(5, matches * 0.5);

  return { score, magnitude };
}

function determineEmotion(score: number, magnitude: number): string {
  if (score > 0.2) return "Positive";
  if (score < -0.2) {
    if (magnitude > 1.5) return "Overwhelmed";
    return "Negative";
  }
  return "Neutral";
}

function getSuggestion(emotion: string): string {
  const suggestions = {
    "Positive": "It's wonderful that you're feeling good! Try to carry this positive energy throughout your day and perhaps share a kind word with someone else.",
    "Negative": "It's okay to have tough days. Remember to be kind to yourself. Taking a short walk or practicing five minutes of deep breathing might help clear your mind.",
    "Overwhelmed": "When everything feels like too much, try to focus on just the next small step. Don't hesitate to reach out to campus wellbeing services—they're here to support you.",
    "Neutral": "Finding balance is a great state to be in. Take this calm moment to plan your day or simply enjoy the present."
  };
  return suggestions[emotion as keyof typeof suggestions] || "Thank you for checking in. Remember that your wellbeing is a priority.";
}
