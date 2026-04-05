#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import gradient from "gradient-string";
import { initCommand } from "./commands/init.command";
import { CLI_NAME, VERSION } from "../constants";

// ─────────────────────────────────────────────
// ArchAI CLI Entry Point
// ─────────────────────────────────────────────

const program = new Command();

function printHeader(): void {
  const art = `
   █████╗ ██████╗  ██████╗██╗  ██╗ █████╗ ██╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██║
  ███████║██████╔╝██║     ███████║███████║██║
  ██╔══██║██╔══██╗██║     ██╔══██║██╔══██║██║
  ██║  ██║██║  ██║╚██████╗██║  ██║██║  ██║██║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
  `;
  console.log(gradient(["#7C3AED", "#06B6D4"])(art));
  console.log(chalk.gray(`  AI-powered project generator  v${VERSION}\n`));
}

program
  .name(CLI_NAME)
  .description("AI-powered project structure generator")
  .version(VERSION, "-v, --version", "Display version number")
  .addHelpText("beforeAll", () => {
    printHeader();
    return "";
  });

// ── arch-ai init ──────────────────────────────────────────────────────────────
program
  .command("init")
  .description("Scaffold a new project with AI-assisted structure generation")
  .action(async () => {
    try {
      await initCommand();
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === "ERR_USE_AFTER_CLOSE") {
        // Inquirer closed (Ctrl+C) — exit gracefully
        process.exit(0);
      }
      console.error(chalk.red("\n  ✖  Unexpected error:"), err);
      process.exit(1);
    }
  });

// ── arch-ai list ─────────────────────────────────────────────────────────────
program
  .command("list")
  .description("List all available templates and features")
  .action(() => {
    printHeader();

    const { TEMPLATES } = require("../config/templates.config");
    const { FEATURE_LABELS, TEMPLATE_LABELS } = require("../constants");

    console.log(chalk.bold.white("  Templates:\n"));
    for (const [id, tpl] of Object.entries(TEMPLATES) as [
      string,
      { category: string },
    ][]) {
      console.log(
        `  ${chalk.cyan(id.padEnd(28))} ${chalk.gray(TEMPLATE_LABELS[id]?.split(" — ")[1] ?? "")}`,
      );
    }

    console.log(chalk.bold.white("\n  Features:\n"));
    for (const [id, label] of Object.entries(FEATURE_LABELS)) {
      const [name, desc] = (label as string).split(" — ");
      console.log(
        `  ${chalk.yellow(id.padEnd(18))} ${chalk.gray(desc ?? name)}`,
      );
    }
    console.log();
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  printHeader();
  program.help();
}
