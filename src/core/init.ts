import inquirer from "inquirer";
import { Answers } from "../types/answers.type";

export const initProject = async () => {
  const answers = await inquirer.prompt<Answers>([
    {
      type: "input",
      name: "projectName",
      message: "Project name?",
    },
    {
      type: "list",
      name: "template",
      message: "Select template:",
      choices: ["nextjs-basic", "nextjs-ddd", "backend-mvp"],
    },
    {
      type: "checkbox",
      name: "features",
      message: "Select features:",
      choices: ["auth", "ai", "billing"],
    },
  ]);

  console.log("User answers:", answers);
};
