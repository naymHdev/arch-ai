import "dotenv/config";
import Groq from "groq-sdk";
import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import {
  buildSuggestionPrompt,
  buildRegenerateSuggestionPrompt,
} from "./ai.prompts";
import { parseAISuggestion } from "./ai.parser";
import config from "../config/config";

export class AIService {
  private client: Groq;
  private model = "llama-3.3-70b-versatile";

  constructor() {
    this.client = new Groq({
      apiKey: config.groq_api_key,
    });
  }

  // ─── First suggestion ────────────────────────────────────────────────────────
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

  // ─── Regenerate with feedback ─────────────────────────────────────────────
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

  // ─── Internal AI caller ───────────────────────────────────────────────────
  private async _callAI(prompt: string): Promise<AIProjectSuggestion | null> {
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
    return !!config.groq_api_key;
  }
}

export const aiService = new AIService();
