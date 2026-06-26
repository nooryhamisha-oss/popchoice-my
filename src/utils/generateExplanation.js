import { openai } from "../lib/config";

export async function generateExplanation(preferences, movie) {
  const prompt = `You are a cinematic advisor with deep knowledge of film.

A user described their preferences:
"${preferences}"

Based on semantic analysis, the best movie match is "${movie.title}" (${movie.release_year}).

Movie details: ${movie.content}

Write a short, natural, and personalized recommendation (2-3 sentences) explaining why this movie perfectly matches their taste. Be specific, warm, and insightful. Do not start with "I" or "We".`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 180,
  });

  return response.choices[0].message.content;
}