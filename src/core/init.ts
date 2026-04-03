import path from "path";
import chalk from "chalk";
import { ProjectConfig } from "../types";
import { generator } from "./generator";
import { logger } from "../utils/logger";
import { createSpinner, spinnerSuccess, spinnerFail } from "../utils/spinner";
import { featureEngine } from "./feature.engine";
import { TEMPLATES } from "../config/templates.config";
import { FEATURE_LABELS } from "../constants";

// ─────────────────────────────────────────────
// Init — orchestrates project creation
// ─────────────────────────────────────────────

export async function runInit(config: ProjectConfig): Promise<void> {
  logger.blank();
  logger.divider();
  logger.step("Starting project generation...");
  logger.divider();
  logger.blank();

  // Print summary
  const template = TEMPLATES[config.template];
  logger.label("Project:", chalk.bold(config.projectName));
  logger.label("Template:", template?.name ?? config.template);
  logger.label(
    "Features:",
    config.features.length
      ? config.features
          .map((f) => FEATURE_LABELS[f]?.split(" — ")[0] ?? f)
          .join(", ")
      : "None",
  );
  logger.label("Package Manager:", config.packageManager);
  logger.label("Output:", config.outputDir);
  logger.blank();

  const spinner = createSpinner("Generating project structure...");
  spinner.start();

  const result = await generator.generate(config);

  if (!result.success || result.errors.length > 0) {
    spinnerFail(spinner, "Generation failed.");
    for (const err of result.errors) {
      logger.error(err);
    }
    process.exit(1);
  }

  spinnerSuccess(spinner, "Project structure created.");

  // Print install instructions
  logger.blank();
  logger.divider();
  logger.success(`Project "${config.projectName}" ready!`);
  logger.divider();
  logger.blank();

  const relPath =
    path.relative(process.cwd(), config.outputDir) || config.projectName;

  console.log(chalk.white("  Next steps:\n"));
  console.log(chalk.cyan(`  cd ${relPath}`));
  console.log(chalk.cyan(`  cp .env.example .env`));
  console.log(chalk.cyan(`  ${config.packageManager} install`));
  console.log(chalk.cyan(`  ${config.packageManager} run dev`));
  logger.blank();

  if (config.features.length > 0) {
    const { deps, devDeps } = featureEngine.getDependencies(config.features);
    if (deps.length > 0 || devDeps.length > 0) {
      logger.info("Additional packages needed for your selected features:");
      logger.blank();
      if (deps.length > 0) {
        console.log(
          chalk.yellow(`  ${config.packageManager} add ${deps.join(" ")}`),
        );
      }
      if (devDeps.length > 0) {
        console.log(
          chalk.yellow(
            `  ${config.packageManager} add -D ${devDeps.join(" ")}`,
          ),
        );
      }
      logger.blank();
    }
  }

  logger.dim(
    `Files created: ${result.filesCreated}  |  Dirs created: ${result.dirsCreated}`,
  );
  logger.blank();
}
