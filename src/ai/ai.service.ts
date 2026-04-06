import Groq from "groq-sdk";
import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import {
  buildSuggestionPrompt,
  buildRegenerateSuggestionPrompt,
} from "./ai.prompts";
import { parseAISuggestion } from "./ai.parser";

export class AIService {
  private client: Groq | null = null;
  private model = "llama-3.3-70b-versatile";

  // ✅ this time create a client actually only when needed
  private getClient(): Groq {
    if (!this.client) {
      // dotenv again call — confirmed env loaded
      const apiKey = process.env.GROQ_API_KEY;

      if (!apiKey) {
        throw new Error(
          "\n❌ GROQ_API_KEY missing.\n" +
            "Please add it to your .env file:\n\n" +
            "  GROQ_API_KEY=your_key_here\n\n" +
            "Get your key at: https://console.groq.com\n",
        );
      }

      this.client = new Groq({ apiKey });
    }
    return this.client;
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
    return this._callAI(prompt);
  }

  async regenerateSuggestion(
    idea: string,
    availableTemplates: TemplateId[],
    availableFeatures: FeatureId[],
    previousSuggestion: { template: string; features: string[] },
    userFeedback: string,
    attemptNumber: number,
  ): Promise<AIProjectSuggestion | null> {
    const prompt = buildRegenerateSuggestionPrompt(
      idea,
      availableTemplates,
      availableFeatures,
      previousSuggestion,
      userFeedback,
      attemptNumber,
    );
    return this._callAI(prompt);
  }

  private async _callAI(prompt: string): Promise<AIProjectSuggestion | null> {
    try {
      const client = this.getClient(); // ✅ lazy
      const response = await client.chat.completions.create({
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

// ✅ Safe — constructor no more calls Groq
export const aiService = new AIService();
