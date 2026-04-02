import chalk from "chalk";

// ─────────────────────────────────────────────
// Logger — styled console output
// ─────────────────────────────────────────────

const prefix = {
  info: chalk.cyan("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
  step: chalk.magenta("◆"),
  dim: chalk.gray("·"),
};

export const logger = {
  info: (msg: string) => console.log(`  ${prefix.info}  ${chalk.white(msg)}`),
  success: (msg: string) =>
    console.log(`  ${prefix.success}  ${chalk.green(msg)}`),
  warning: (msg: string) =>
    console.log(`  ${prefix.warning}  ${chalk.yellow(msg)}`),
  error: (msg: string) => console.log(`  ${prefix.error}  ${chalk.red(msg)}`),
  step: (msg: string) => console.log(`  ${prefix.step}  ${chalk.magenta(msg)}`),
  dim: (msg: string) => console.log(`  ${prefix.dim}  ${chalk.gray(msg)}`),
  blank: () => console.log(),
  divider: () => console.log(chalk.gray("  " + "─".repeat(52))),
  label: (label: string, value: string) =>
    console.log(`  ${chalk.gray(label.padEnd(18))} ${chalk.white(value)}`),
};
