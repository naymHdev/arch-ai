import { Command } from "commander";
import { initProject } from "../core/init";

const program = new Command();

program.name("arch-ai").description("AI project generator").version("1.0.0");

program
  .command("init")
  .description("Create new project")
  .action(async () => {
    await initProject();
  });

program.parse();
