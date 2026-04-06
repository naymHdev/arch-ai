import { TemplateId, FeatureId } from "../types";

// ─────────────────────────────────────────────
// AI Prompts
// ─────────────────────────────────────────────

export function buildSuggestionPrompt(
  idea: string,
  availableTemplates: TemplateId[],
  availableFeatures: FeatureId[],
): string {
  return `You are ArchAI, a senior software architect with 10+ years of experience. A developer describes their project idea. Analyze it deeply and recommend the best project template and features.

Available templates:
${availableTemplates.map((t) => `- ${t}`).join("\n")}

Available features:
${availableFeatures.map((f) => `- ${f}`).join("\n")}

Template selection rules:
- "backend-modular" → production app with many features, role-based access, real users
- "backend-microservice" → distributed system, multiple services, high scale
- "backend-clean" → enterprise app, team project, complex business logic
- "backend-mvp" → simple REST API, quick prototype, solo developer
- "nextjs-saas" → SaaS product with subscriptions and billing
- "nextjs-basic" → simple website, landing page, portfolio
- "nextjs-ddd" → complex web app with rich domain logic

Developer's project idea:
"${idea}"

Analyze:
1. Scale (small/medium/large)
2. Users (solo/team/public)
3. Features needed
4. Complexity

Respond ONLY with a valid JSON object (no markdown, no explanation) matching this exact shape:
{
  "suggestedTemplate": "<template-id>",
  "suggestedFeatures": ["<feature-id>"],
  "reasoning": "<2 sentence explanation>",
  "structureNotes": "<specific architecture advice>",
  "additionalRecommendations": ["<tip1>", "<tip2>"]
}`;
}

export function buildStructureNotePrompt(
  template: TemplateId,
  features: FeatureId[],
): string {
  return `You are ArchAI, an expert software architect. Give a short note (2-3 sentences max) about best practices for using the "${template}" template with these features: ${features.join(", ")}.

Respond in plain text only, no markdown.`;
}
