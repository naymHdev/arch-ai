import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  anthropic_api_key: process.env.ANTHROPIC_API_KEY,
  gemini_api_key: process.env.GEMINI_API_KEY,
  groq_api_key: process.env.GROQ_API_KEY,
};
