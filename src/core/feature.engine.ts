import path from "path";
import { ProjectConfig, FeatureId, GenerationResult } from "../types";
import { FEATURES } from "../config/features.config";
import { writeFile } from "../utils/file";
import { templateEngine } from "./template.engine";

// ─────────────────────────────────────────────
// Feature Engine — injects feature modules
// ─────────────────────────────────────────────

export class FeatureEngine {
  /**
   * Inject all selected feature files into the project directory.
   */
  async injectFeatures(
    features: FeatureId[],
    projectPath: string,
    config: ProjectConfig,
    result: GenerationResult,
  ): Promise<void> {
    for (const featureId of features) {
      const feature = FEATURES[featureId];
      if (!feature) continue;

      for (const featureFile of feature.files) {
        const filePath = path.join(projectPath, featureFile.path);
        const content = templateEngine.render(featureFile.template, config);
        await writeFile(filePath, content);
        result.filesCreated++;
      }
    }
  }

  /**
   * Build a combined .env.example with all selected feature env vars.
   */
  buildEnvContent(features: FeatureId[], baseEnv: string): string {
    const lines: string[] = [baseEnv.trim()];

    for (const featureId of features) {
      const feature = FEATURES[featureId];
      if (!feature || feature.envVars.length === 0) continue;

      lines.push("");
      lines.push(`# ${feature.name}`);
      for (const envVar of feature.envVars) {
        if (envVar.comment) lines.push(`# ${envVar.comment}`);
        lines.push(`${envVar.key}=${envVar.value}`);
      }
    }

    return lines.join("\n") + "\n";
  }

  /**
   * Collect all npm dependencies needed for selected features.
   */
  getDependencies(features: FeatureId[]): {
    deps: string[];
    devDeps: string[];
  } {
    const deps = new Set<string>();
    const devDeps = new Set<string>();

    for (const featureId of features) {
      const feature = FEATURES[featureId];
      if (!feature) continue;
      feature.dependencies.forEach((d) => deps.add(d));
      feature.devDependencies.forEach((d) => devDeps.add(d));
    }

    return { deps: [...deps], devDeps: [...devDeps] };
  }
}

export const featureEngine = new FeatureEngine();
