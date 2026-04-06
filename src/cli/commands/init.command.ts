import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import { TEMPLATES } from "../../config/templates.config";
import {
  createSpinner,
  spinnerFail,
  spinnerSuccess,
} from "../../utils/spinner";
import { aiService } from "../../ai/ai.service";
import { sanitizeProjectName } from "../../utils/file";
import {
  AIProjectSuggestion,
  PackageManager,
  ProjectConfig,
  TemplateId,
} from "../../types";
import { FeatureId } from "../../types";
import { FEATURES } from "../../config/features.config";
import { logger } from "../../utils/logger";
import { FEATURE_LABELS, TEMPLATE_LABELS } from "../../constants";
import { runInit } from "../../core/init";

// ─────────────────────────────────────────────
// Init Command
// ─────────────────────────────────────────────

export async function initCommand(): Promise<void> {
  printBanner();

  // ── 1. Project name ──────────────────────────────────────────────────────
  const { projectName } = await inquirer.prompt<{ projectName: string }>([
    {
      type: "input",
      name: "projectName",
      message: chalk.cyan("Project name:"),
      default: "my-app",
      validate: (input: string) => {
        const sanitized = sanitizeProjectName(input);
        if (!sanitized) return "Please enter a valid project name.";
        return true;
      },
      filter: (input: string) => sanitizeProjectName(input),
    },
  ]);

  // ── 2. Description (optional) ────────────────────────────────────────────
  const { description } = await inquirer.prompt<{ description: string }>([
    {
      type: "input",
      name: "description",
      message: chalk.cyan("Short description") + chalk.gray(" (optional):"),
      default: "",
    },
  ]);

  // ── 3. AI suggestion? ────────────────────────────────────────────────────
  const { useAI } = await inquirer.prompt<{ useAI: boolean }>([
    {
      type: "confirm",
      name: "useAI",
      message: chalk.cyan(
        "Use AI to suggest best template & features based on your idea?",
      ),
      default: true,
    },
  ]);

  let aiIdea = "";
  if (useAI) {
    const { idea } = await inquirer.prompt<{ idea: string }>([
      {
        type: "input",
        name: "idea",
        message: chalk.cyan("Describe your project idea:"),
        validate: (v: string) =>
          v.trim().length > 5 || "Please provide more detail.",
      },
    ]);
    aiIdea = idea;
  }

  // ── AI suggestion flow with regenerate ──────────────────────────────────────
  async function getAISuggestionWithRegenerate(
    idea: string,
    availableTemplates: TemplateId[],
    availableFeatures: FeatureId[],
  ): Promise<{ template: TemplateId; features: FeatureId[] } | null> {
    const MAX_ATTEMPTS = 3;
    let attempt = 1;
    let lastSuggestion: AIProjectSuggestion | null = null;

    while (attempt <= MAX_ATTEMPTS) {
      // ── Spinner চালু ─────────────────────────────────────────────────────────
      const spinnerText =
        attempt === 1
          ? "Consulting AI for best project structure..."
          : `Regenerating suggestion (attempt ${attempt}/${MAX_ATTEMPTS})...`;

      const spinner = createSpinner(spinnerText);
      spinner.start();

      // ── AI call ───────────────────────────────────────────────────────────────
      const suggestion =
        attempt === 1
          ? await aiService.suggestProjectStructure(
              idea,
              availableTemplates,
              availableFeatures,
            )
          : await aiService.regenerateSuggestion(
              idea,
              availableTemplates,
              availableFeatures,
              {
                template: lastSuggestion!.suggestedTemplate,
                features: lastSuggestion!.suggestedFeatures,
              },
              lastSuggestion!._userFeedback ?? "",
              attempt,
            );

      if (!suggestion) {
        spinnerFail(spinner, "AI unavailable. Falling back to manual.");
        return null;
      }

      spinnerSuccess(
        spinner,
        `AI suggestion ready! (attempt ${attempt}/${MAX_ATTEMPTS})`,
      );
      logger.blank();

      // ── Show suggestion ───────────────────────────────────────────────────────
      logger.info(chalk.bold(`🤖 AI Recommendation:`));
      logger.label(
        "Template:",
        TEMPLATE_LABELS[suggestion.suggestedTemplate] ??
          suggestion.suggestedTemplate,
      );
      logger.label(
        "Features:",
        suggestion.suggestedFeatures.length
          ? suggestion.suggestedFeatures
              .map((f) => FEATURE_LABELS[f]?.split(" — ")[0])
              .join(", ")
          : "None",
      );
      if (suggestion.reasoning) {
        logger.blank();
        logger.dim(`💡 ${suggestion.reasoning}`);
      }
      if (suggestion.structureNotes) {
        logger.dim(`🏗  ${suggestion.structureNotes}`);
      }
      logger.blank();

      // ── Accept or regenerate? ─────────────────────────────────────────────────
      const { decision } = await inquirer.prompt<{
        decision: "accept" | "regenerate" | "manual";
      }>([
        {
          type: "list",
          name: "decision",
          message: chalk.cyan("What would you like to do?"),
          choices: [
            { name: "✅  Accept this suggestion", value: "accept" },
            ...(attempt < MAX_ATTEMPTS
              ? [
                  {
                    name: "🔄  Regenerate — give feedback to AI",
                    value: "regenerate",
                  },
                ]
              : []),
            { name: "🖊️   Choose manually instead", value: "manual" },
          ],
        },
      ]);

      // ── Accept ────────────────────────────────────────────────────────────────
      if (decision === "accept") {
        return {
          template: suggestion.suggestedTemplate,
          features: suggestion.suggestedFeatures,
        };
      }

      // ── Manual ───────────────────────────────────────────────────────────────
      if (decision === "manual") {
        return null;
      }

      // ── Regenerate — ask for feedback ─────────────────────────────────────────
      const { feedback } = await inquirer.prompt<{ feedback: string }>([
        {
          type: "input",
          name: "feedback",
          message: chalk.cyan("What didn't you like? Tell AI what to change:"),
          validate: (v: string) =>
            v.trim().length > 3 || "Please give more detail.",
        },
      ]);

      // next feedback iteration to send to do store
      lastSuggestion = { ...suggestion, _userFeedback: feedback } as any;
      attempt++;
      logger.blank();
    }

    // completed max attempts
    logger.warning(
      `Max attempts (${MAX_ATTEMPTS}) reached. Switching to manual selection.`,
    );
    return null;
  }

  // ── 4. Template + AI suggestion ──────────────────────────────────────────────
  let selectedTemplate: TemplateId;
  let aiSuggestedFeatures: FeatureId[] = [];

  if (useAI && aiIdea) {
    const result = await getAISuggestionWithRegenerate(
      aiIdea,
      Object.keys(TEMPLATES) as TemplateId[],
      Object.keys(FEATURES) as FeatureId[],
    );

    if (result) {
      // AI suggestion accepted
      selectedTemplate = result.template;
      aiSuggestedFeatures = result.features;
    } else {
      // Manual fallback
      logger.blank();
      selectedTemplate = await promptTemplateSelection();
    }
  } else {
    selectedTemplate = await promptTemplateSelection();
  }

  // ── 5. Feature selection ─────────────────────────────────────────────────
  const templateConfig = TEMPLATES[selectedTemplate];
  const compatibleFeatures = templateConfig.compatibleFeatures;

  const featureChoices = compatibleFeatures.map((id) => ({
    name: FEATURE_LABELS[id] ?? id,
    value: id,
    checked:
      aiSuggestedFeatures.includes(id) ||
      templateConfig.defaultFeatures.includes(id),
  }));

  const { selectedFeatures } = await inquirer.prompt<{
    selectedFeatures: FeatureId[];
  }>([
    {
      type: "checkbox",
      name: "selectedFeatures",
      message: chalk.cyan("Select features to include:"),
      choices: featureChoices,
      pageSize: 12,
    },
  ]);

  // ── 6. Package manager ───────────────────────────────────────────────────
  const { packageManager } = await inquirer.prompt<{
    packageManager: PackageManager;
  }>([
    {
      type: "list",
      name: "packageManager",
      message: chalk.cyan("Package manager:"),
      choices: [
        { name: "npm", value: "npm" },
        { name: "pnpm  (recommended)", value: "pnpm" },
        { name: "yarn", value: "yarn" },
        { name: "bun   (fastest)", value: "bun" },
      ],
      default: "npm",
    },
  ]);

  // ── 7. Output directory ──────────────────────────────────────────────────
  const defaultOutput = path.resolve(process.cwd(), projectName);
  const { outputDir } = await inquirer.prompt<{ outputDir: string }>([
    {
      type: "input",
      name: "outputDir",
      message: chalk.cyan("Output directory:"),
      default: defaultOutput,
    },
  ]);

  // ── 8. Structure preview + confirmation ─────────────────────────────────
  logger.blank();
  logger.divider();
  logger.step("Project Structure Preview");
  logger.divider();
  logger.blank();

  printStructurePreview(selectedTemplate, selectedFeatures);
  logger.blank();

  const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>([
    {
      type: "confirm",
      name: "confirmed",
      message: chalk.cyan("Looks good? Generate project?"),
      default: true,
    },
  ]);

  if (!confirmed) {
    logger.warning("Aborted. No files were written.");
    return;
  }

  // ── 9. Run generation ────────────────────────────────────────────────────
  const config: ProjectConfig = {
    projectName,
    description,
    template: selectedTemplate,
    features: selectedFeatures,
    packageManager,
    useAISuggestions: useAI,
    outputDir: path.resolve(outputDir),
    idea: aiIdea,
  };

  await runInit(config);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function promptTemplateSelection(): Promise<TemplateId> {
  // Group templates by category
  const backendTemplates = Object.values(TEMPLATES).filter(
    (t) => t.category === "backend",
  );
  const fullstackTemplates = Object.values(TEMPLATES).filter(
    (t) => t.category === "fullstack",
  );

  const choices = [
    new inquirer.Separator(chalk.gray("── Backend ──────────────────────")),
    ...backendTemplates.map((t) => ({
      name: TEMPLATE_LABELS[t.id] ?? t.name,
      value: t.id,
    })),
    new inquirer.Separator(chalk.gray("── Full-Stack ───────────────────")),
    ...fullstackTemplates.map((t) => ({
      name: TEMPLATE_LABELS[t.id] ?? t.name,
      value: t.id,
    })),
  ];

  const { template } = await inquirer.prompt<{ template: TemplateId }>([
    {
      type: "list",
      name: "template",
      message: chalk.cyan("Select a template:"),
      choices,
      pageSize: 12,
    },
  ]);

  return template;
}

function printStructurePreview(
  template: TemplateId,
  features: FeatureId[],
): void {
  const templateConfig = TEMPLATES[template];
  if (!templateConfig) return;

  console.log(chalk.white(`  ${templateConfig.name}/`));
  printNode(templateConfig.structure, 1, features);
}

function printNode(
  node: import("../../types").FolderNode,
  depth: number,
  features: FeatureId[],
): void {
  const indent = "  " + "  ".repeat(depth);
  const connector = depth === 1 ? "├── " : "│   ".repeat(depth - 1) + "├── ";

  if (node.type === "dir" && node.name !== "root") {
    console.log(
      chalk.cyan(`  ${connector}${node.name}/`) +
        (node.description ? chalk.gray(`  # ${node.description}`) : ""),
    );
    for (const child of node.children ?? []) {
      printNode(child, depth + 1, features);
    }
  } else if (node.type === "file") {
    console.log(chalk.white(`  ${connector}${node.name}`));
  } else {
    // root node — print children directly
    for (const child of node.children ?? []) {
      printNode(child, depth, features);
    }
  }
}

function printBanner(): void {
  logger.blank();
  console.log(chalk.magentaBright("  ╔═══════════════════════════════════╗"));
  console.log(
    chalk.magentaBright("  ║") +
      chalk.bold.white("      🏗  ArchAI — Project Init      ") +
      chalk.magentaBright("║"),
  );
  console.log(chalk.magentaBright("  ╚═══════════════════════════════════╝"));
  logger.blank();
  logger.dim("AI-powered project structure generator");
  logger.blank();
}
