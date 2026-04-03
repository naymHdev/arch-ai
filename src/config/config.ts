import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
};
