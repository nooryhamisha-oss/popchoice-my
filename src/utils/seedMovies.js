import { supabase } from "../lib/config";
import { createEmbedding } from "./createEmbedding";
import movies from "../data/content";

export async function seedMovies() {
  const { data: existing } = await supabase
    .from("movies")
    .select("id")
    .limit(1);
  if (existing && existing.length > 0) return;

  for (const movie of movies) {
    const embedding = await createEmbedding(movie.content);
    await supabase.from("movies").insert({
      title: movie.title,
      release_year: movie.releaseYear,
      content: movie.content,
      embedding,
    });
  }
}
