import path from "path";
import { ProjectConfig, FolderNode, GenerationResult } from "../types";
import { TEMPLATES } from "../config/templates.config";
import { ensureDir, writeFile, pathExists } from "../utils/file";
import { templateEngine } from "./template.engine";
import { featureEngine } from "./feature.engine";
import { DEFAULT_ENV_CONTENT } from "../constants";

// ─────────────────────────────────────────────
// Generator — project directory + file creation
// ─────────────────────────────────────────────

export class Generator {
  /**
   * Generate the full project on disk.
   */
  async generate(config: ProjectConfig): Promise<GenerationResult> {
    const result: GenerationResult = {
      success: false,
      projectPath: config.outputDir,
      filesCreated: 0,
      dirsCreated: 0,
      errors: [],
      warnings: [],
    };

    try {
      // Ensure project dir doesn't already exist
      if (await pathExists(config.outputDir)) {
        result.errors.push(`Directory already exists: ${config.outputDir}`);
        return result;
      }

      const template = TEMPLATES[config.template];
      if (!template) {
        result.errors.push(`Unknown template: ${config.template}`);
        return result;
      }

      // 1. Create folder tree from template structure
      await this.createStructure(
        template.structure,
        config.outputDir,
        config,
        result,
        true, // root level — skip the root "dir" node itself
      );

      // 2. Inject feature-specific files
      await featureEngine.injectFeatures(
        config.features,
        config.outputDir,
        config,
        result,
      );

      // 3. Write merged .env.example
      const envPath = config.template.startsWith("nextjs")
        ? path.join(config.outputDir, ".env.local.example")
        : path.join(config.outputDir, ".env.example");

      const envContent = featureEngine.buildEnvContent(
        config.features,
        DEFAULT_ENV_CONTENT,
      );
      await writeFile(envPath, envContent);
      result.filesCreated++;

      result.success = true;
    } catch (err: unknown) {
      result.errors.push(err instanceof Error ? err.message : String(err));
    }

    return result;
  }

  /** Recursively create directories and render files from a FolderNode tree. */
  private async createStructure(
    node: FolderNode,
    currentPath: string,
    config: ProjectConfig,
    result: GenerationResult,
    isRoot = false,
  ): Promise<void> {
    if (node.type === "dir") {
      const dirPath = isRoot ? currentPath : path.join(currentPath, node.name);

      if (!isRoot) {
        await ensureDir(dirPath);
        result.dirsCreated++;
      }

      for (const child of node.children ?? []) {
        await this.createStructure(child, dirPath, config, result, false);
      }
    } else {
      // It's a file
      const filePath = path.join(currentPath, node.name);
      const content = templateEngine.renderByPath(filePath, config);
      await writeFile(filePath, content);
      result.filesCreated++;
    }
  }
}

export const generator = new Generator();
