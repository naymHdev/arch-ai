import ora, { Ora } from "ora";
import chalk from "chalk";

// ─────────────────────────────────────────────
// Spinner — ORA-based loading indicators
// ─────────────────────────────────────────────

export function createSpinner(text: string): Ora {
  return ora({
    text: chalk.cyan(text),
    spinner: "dots2",
    color: "cyan",
  });
}

export function spinnerSuccess(spinner: Ora, text: string): void {
  spinner.succeed(chalk.green(text));
}

export function spinnerFail(spinner: Ora, text: string): void {
  spinner.fail(chalk.red(text));
}

export function spinnerInfo(spinner: Ora, text: string): void {
  spinner.info(chalk.cyan(text));
}
