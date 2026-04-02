// ─────────────────────────────────────────────
// Global Types for ArchAI
// ─────────────────────────────────────────────

export type TemplateId =
  | "backend-mvp"
  | "backend-clean"
  | "backend-microservice"
  | "nextjs-basic"
  | "nextjs-ddd"
  | "nextjs-saas";

export type FeatureId =
  | "auth"
  | "ai"
  | "billing"
  | "email"
  | "storage"
  | "cache"
  | "queue"
  | "websocket"
  | "testing"
  | "docker"
  | "ci-cd";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export interface ProjectConfig {
  projectName: string;
  template: TemplateId;
  features: FeatureId[];
  packageManager: PackageManager;
  useAISuggestions: boolean;
  outputDir: string;
  description?: string;
  idea?: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  category: "backend" | "fullstack" | "frontend";
  tags: string[];
  defaultFeatures: FeatureId[];
  compatibleFeatures: FeatureId[];
  structure: FolderNode;
}

export interface FolderNode {
  name: string;
  type: "dir" | "file";
  children?: FolderNode[];
  description?: string;
}

export interface FeatureConfig {
  id: FeatureId;
  name: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  files: FeatureFile[];
  envVars: EnvVar[];
}

export interface FeatureFile {
  path: string;
  template: string;
}

export interface EnvVar {
  key: string;
  value: string;
  comment?: string;
}

export interface AIProjectSuggestion {
  suggestedTemplate: TemplateId;
  suggestedFeatures: FeatureId[];
  reasoning: string;
  structureNotes?: string;
  additionalRecommendations?: string[];
}

export interface GenerationResult {
  success: boolean;
  projectPath: string;
  filesCreated: number;
  dirsCreated: number;
  errors: string[];
  warnings: string[];
}

export interface SpinnerOptions {
  text: string;
  color?: "cyan" | "green" | "yellow" | "red" | "blue" | "magenta";
}
