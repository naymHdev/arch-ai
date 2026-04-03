import Anthropic from "@anthropic-ai/sdk";
import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import { buildSuggestionPrompt } from "./ai.prompts";
import { parseAISuggestion } from "./ai.parser";

// ─────────────────────────────────────────────
// AI Service — Anthropic Claude integration
// ─────────────────────────────────────────────

export class AIService {
  private client: Anthropic;
  private model = "claude-sonnet-4-20250514";

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Suggest the best template and features for a project idea.
   */
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
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });
      console.log("message__ai__", message);

      const content = message.content[0];
      if (content.type !== "text") return null;

      return parseAISuggestion(content.text);
    } catch {
      return null;
    }
  }

  /**
   * Check if the AI service is available (API key is set).
   */
  isAvailable(): boolean {
    return !!process.env.ANTHROPIC_API_KEY;
  }
}

export const aiService = new AIService();
