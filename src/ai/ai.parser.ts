import { AIProjectSuggestion, TemplateId, FeatureId } from "../types";
import { TEMPLATES } from "../config/templates.config";
import { FEATURES } from "../config/features.config";

// ─────────────────────────────────────────────
// AI Response Parser
// ─────────────────────────────────────────────

export function parseAISuggestion(raw: string): AIProjectSuggestion | null {
  try {
    // Strip markdown code fences if present
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Validate template id
    const validTemplates = Object.keys(TEMPLATES) as TemplateId[];
    if (!validTemplates.includes(parsed.suggestedTemplate)) {
      return null;
    }

    // Validate and filter features
    const validFeatures = Object.keys(FEATURES) as FeatureId[];
    const filteredFeatures = (parsed.suggestedFeatures ?? []).filter(
      (f: string) => validFeatures.includes(f as FeatureId),
    ) as FeatureId[];

    return {
      suggestedTemplate: parsed.suggestedTemplate,
      suggestedFeatures: filteredFeatures,
      reasoning: parsed.reasoning ?? "",
      structureNotes: parsed.structureNotes,
      additionalRecommendations: parsed.additionalRecommendations ?? [],
    };
  } catch {
    return null;
  }
}
