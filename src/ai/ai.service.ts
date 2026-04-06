import "dotenv/config";
import Groq from "groq-sdk";
import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import { buildSuggestionPrompt } from "./ai.prompts";
import { parseAISuggestion } from "./ai.parser";

export class AIService {
  private client: Groq;
  private model = "llama-3.3-70b-versatile";

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async suggestProjectStructure(
    idea: string,
    availableTemplates: TemplateId[],
    availableFeatures: FeatureId[],
  ): Promise<AIProjectSuggestion | null> {
    const prompt = buildSuggestionPrompt(
      idea,
      availableTemplates,
      availableFeatures,
    );

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.choices[0]?.message?.content;
      if (!text) return null;

      return parseAISuggestion(text);
    } catch (err: any) {
      console.error("❌ Groq Error:", err?.message ?? err);
      return null;
    }
  }

  isAvailable(): boolean {
    return !!process.env.GROQ_API_KEY;
  }
}

export const aiService = new AIService();