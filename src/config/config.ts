// config/config.ts
import dotenv from "dotenv";
import path from "path";

function loadConfig() {
  dotenv.config({ path: path.join(process.cwd(), ".env") });

  return {
    anthropic_api_key: process.env.ANTHROPIC_API_KEY,
    gemini_api_key: process.env.GEMINI_API_KEY,
    groq_api_key: process.env.GROQ_API_KEY,
  };
}

export default loadConfig();
