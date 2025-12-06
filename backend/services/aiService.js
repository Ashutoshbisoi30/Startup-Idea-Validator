// backend/services/aiService.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini"; // or any model from OpenRouter
const SITE_URL = process.env.SITE_URL || "https://startup-idea-validator-seven.vercel.app"; // your app URL
const APP_NAME = "AI Startup Idea Validator"; // will show in OpenRouter logs

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not set in .env");
}

export async function analyzeIdeaWithAI(title, description) {
  const prompt = `
You are an expert startup consultant. Analyze the given startup idea
and return a structured JSON object with the fields: problem,
customer, market, competitor, tech_stack, risk_level,
profitability_score, justification. Rules:
- Keep answers concise and realistic.
- 'competitor' should contain exactly 3 competitors with one-line differentiation each.
- 'tech_stack' should be 4–6 practical technologies for MVP.
- 'profitability_score' must be an integer between 0–100.
Return ONLY JSON.

Input: { "title": "${title}", "description": "${description}" }
  `.trim();

  try {
    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a helpful startup idea evaluation assistant.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          
          "HTTP-Referer": SITE_URL,
          "X-Title": APP_NAME,
        },
      }
    );

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      console.error("OpenRouter response:", data);
      throw new Error("OpenRouter did not return any content");
    }

    
    const jsonString = extractJson(content);
    return JSON.parse(jsonString);
  } catch (err) {
    if (err.response) {
      console.error(
        "OpenRouter API error:",
        err.response.status,
        err.response.data
      );
      const msg =
        err.response.data?.error?.message ||
        `OpenRouter error (status ${err.response.status})`;
      throw new Error(msg);
    }
    console.error("OpenRouter request error:", err.message);
    throw new Error("Failed to analyze idea with AI");
  }
}


function extractJson(text) {
  const trimmed = text.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  console.error("Raw AI content with no JSON found:", text);
  throw new Error("AI returned text that did not contain JSON");
}
