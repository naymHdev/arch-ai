import { TemplateId, FeatureId } from "../types";

// ─────────────────────────────────────────────
// AI Prompts
// ─────────────────────────────────────────────

export function buildSuggestionPrompt(
  idea: string,
  availableTemplates: TemplateId[],
  availableFeatures: FeatureId[],
): string {
  return `You are ArchAI, an expert software architect. A developer describes their project idea and you recommend the best project template and features.

Available templates:
${availableTemplates.map((t) => `- ${t}`).join("\n")}

Available features:
${availableFeatures.map((f) => `- ${f}`).join("\n")}

Developer's project idea:
"${idea}"

Respond ONLY with a valid JSON object (no markdown, no explanation) matching this exact shape:
{
  "suggestedTemplate": "<one of the available template ids>",
  "suggestedFeatures": ["<feature-id>", ...],
  "reasoning": "<1-2 sentence explanation of why this template fits>",
  "structureNotes": "<optional: any structural advice specific to this project>",
  "additionalRecommendations": ["<optional extra tips>"]
}`;
}

export function buildStructureNotePrompt(
  template: TemplateId,
  features: FeatureId[],
): string {
  return `You are ArchAI, an expert software architect. Give a short note (2-3 sentences max) about best practices for using the "${template}" template with these features: ${features.join(", ")}.

Respond in plain text only, no markdown.`;
}