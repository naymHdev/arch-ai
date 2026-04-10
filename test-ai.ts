// npx ts-node test-ai.ts

import "dotenv/config";
import Groq from "groq-sdk";

async function test() {
  console.log(
    "🔑 Groq API Key:",
    process.env.GROQ_API_KEY ? "✅ Loaded" : "❌ Missing",
  );

  if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY not found in .env");
    process.exit(1);
  }

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    console.log("⏳ Calling Groq API...");

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 100,
      messages: [{ role: "user", content: "Say hello in one word." }],
    });

    const text = response.choices[0]?.message?.content;
    console.log("✅ Groq Works!");
    console.log("Response:", text);
  } catch (err: any) {
    console.error("❌ Groq Error:", err?.message ?? err);
  }
}

test();
