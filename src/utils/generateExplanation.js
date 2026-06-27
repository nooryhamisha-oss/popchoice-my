import { openai } from "../lib/config";

export async function generateExplanation(preferences, movie, language) {
  const langInstruction = language === "فارسی"
    ? "You MUST respond entirely in Persian (Farsi) language only. Do not use any English words. Write in natural, warm, conversational Persian."
    : "Respond in English.";

  const prompt =`You are a cinematic advisor with deep knowledge of film.

A user described their preferences:
"${preferences}"

The best movie match is "${movie.title}" (${movie.release_year}).

Movie details: ${movie.content}

Write a short, personalized recommendation (2-3 sentences) explaining why this movie perfectly matches their taste.

IMPORTANT: ${langInstruction}`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 180,
  });

  return response.choices[0].message.content;
}