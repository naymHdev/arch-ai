import { TemplateId, FeatureId } from "../types";

export function buildSuggestionPrompt(
  idea: string,
  availableTemplates: TemplateId[],
  availableFeatures: FeatureId[],
): string {
  return `You are ArchAI, a senior software architect with 10+ years of experience.

A developer describes their project idea. Analyze it deeply and recommend the best project template and features.

Available templates:
${availableTemplates.map((t) => `- ${t}`).join("\n")}

Available features:
${availableFeatures.map((f) => `- ${f}`).join("\n")}

Developer's project idea:
"${idea}"

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "suggestedTemplate": "<template-id>",
  "suggestedFeatures": ["<feature-id>"],
  "reasoning": "<2 sentence explanation>",
  "structureNotes": "<specific architecture advice>",
  "additionalRecommendations": ["<tip1>", "<tip2>"]
}`;
}

// ─── NEW — Regenerate prompt with user feedback ───────────────────────────────
export function buildRegenerateSuggestionPrompt(
  idea: string,
  availableTemplates: TemplateId[],
  availableFeatures: FeatureId[],
  previousSuggestion: { template: string; features: string[] },
  userFeedback: string,
  attemptNumber: number,
): string {
  return `You are ArchAI, a senior software architect.

A developer rejected your previous suggestion and gave feedback. Generate a NEW and DIFFERENT suggestion based on their feedback.

Original project idea:
"${idea}"

Your previous suggestion (attempt #${attemptNumber}):
- Template: ${previousSuggestion.template}
- Features: ${previousSuggestion.features.join(", ")}

Developer's feedback on why they rejected it:
"${userFeedback}"

Available templates:
${availableTemplates.map((t) => `- ${t}`).join("\n")}

Available features:
${availableFeatures.map((f) => `- ${f}`).join("\n")}

Rules:
1. Do NOT suggest the same template as before unless the feedback specifically asks for it
2. Carefully consider the developer's feedback
3. Adjust features based on what they said

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "suggestedTemplate": "<template-id>",
  "suggestedFeatures": ["<feature-id>"],
  "reasoning": "<explain how you addressed their feedback>",
  "structureNotes": "<specific architecture advice>",
  "additionalRecommendations": ["<tip1>", "<tip2>", "<tip3>"]
}`;
}
