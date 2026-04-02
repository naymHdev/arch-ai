import fs from "fs-extra";
import path from "path";

// ─────────────────────────────────────────────
// File Utilities
// ─────────────────────────────────────────────

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * Write a file with content, creating parent directories if needed.
 */
export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, "utf8");
}

/**
 * Copy a directory recursively.
 */
export async function copyDir(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest, { overwrite: false, errorOnExist: false });
}

/**
 * Check if a path exists.
 */
export async function pathExists(targetPath: string): Promise<boolean> {
  return fs.pathExists(targetPath);
}

/**
 * Read a file as a string.
 */
export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8");
}

/**
 * Replace template variables in a string.
 * Variables are in the form {{VARIABLE_NAME}}
 */
export function interpolate(
  content: string,
  vars: Record<string, string>,
): string {
  return content.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => vars[key] ?? `{{${key}}}`,
  );
}

/**
 * Count files in a directory recursively.
 */
export async function countFiles(dirPath: string): Promise<number> {
  let count = 0;
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      count += await countFiles(path.join(dirPath, item.name));
    } else {
      count++;
    }
  }
  return count;
}

/**
 * Sanitize a project name to be a valid directory name.
 */
export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/^-+|-+$/g, "");
}
