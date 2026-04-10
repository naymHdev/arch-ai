import "dotenv/config";
import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import {
  buildSuggestionPrompt,
  buildRegenerateSuggestionPrompt,
} from "./ai.prompts";
import { parseAISuggestion } from "./ai.parser";

// ─── Detect which AI provider is available ────────────────────────
function getAvailableProvider(): {
  name: string;
  key: string;
} | null {
  if (process.env.GROQ_API_KEY) {
    return { name: "groq", key: process.env.GROQ_API_KEY };
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return { name: "anthropic", key: process.env.ANTHROPIC_API_KEY };
  }
  if (process.env.GEMINI_API_KEY) {
    return { name: "gemini", key: process.env.GEMINI_API_KEY };
  }
  return null;
}

export class AIService {
  private model = "llama-3.3-70b-versatile";

  async suggestProjectStructure(
    idea: string,
    availableTemplates: TemplateId[],
    availableFeatures: FeatureId[],
  ): Promise<AIProjectSuggestion | null> {
    const provider = getAvailableProvider();
    if (!provider) return null;

    const prompt = buildSuggestionPrompt(
      idea,
      availableTemplates,
      availableFeatures,
    );
    return this._callAI(prompt, provider);
  }

  async regenerateSuggestion(
    idea: string,
    availableTemplates: TemplateId[],
    availableFeatures: FeatureId[],
    previousSuggestion: { template: string; features: string[] },
    userFeedback: string,
    attemptNumber: number,
  ): Promise<AIProjectSuggestion | null> {
    const provider = getAvailableProvider();
    if (!provider) return null;

    const prompt = buildRegenerateSuggestionPrompt(
      idea,
      availableTemplates,
      availableFeatures,
      previousSuggestion,
      userFeedback,
      attemptNumber,
    );
    return this._callAI(prompt, provider);
  }

  private async _callAI(
    prompt: string,
    provider: { name: string; key: string },
  ): Promise<AIProjectSuggestion | null> {
    try {
      if (provider.name === "groq") {
        const { default: Groq } = await import("groq-sdk");
        const client = new Groq({ apiKey: provider.key });
        const response = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        const text = response.choices[0]?.message?.content;
        if (!text) return null;
        return parseAISuggestion(text);
      }

      if (provider.name === "anthropic") {
        const Anthropic = (await import("@anthropic-ai/sdk")).default;
        const client = new Anthropic({ apiKey: provider.key });
        const message = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        const content = message.content[0];
        if (content.type !== "text") return null;
        return parseAISuggestion(content.text);
      }

      if (provider.name === "gemini") {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const client = new GoogleGenerativeAI(provider.key);
        const model = client.getGenerativeModel({
          model: "gemini-2.0-flash",
          generationConfig: { responseMimeType: "application/json" },
        });
        const result = await model.generateContent(prompt);
        return parseAISuggestion(result.response.text());
      }

      return null;
    } catch (err: any) {
      console.error("❌ AI Error:", err?.message ?? err);
      return null;
    }
  }

  isAvailable(): boolean {
    return getAvailableProvider() !== null;
  }

  getProviderName(): string | null {
    return getAvailableProvider()?.name ?? null;
  }
}

export const aiService = new AIService();
