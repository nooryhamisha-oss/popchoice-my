import { supabase } from "../lib/config";
import { createEmbedding } from "./createEmbedding";

export async function searchMovies(preferenceText, excludeIds = []) {
  const embedding = await createEmbedding(preferenceText);

  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_count: excludeIds.length + 1,
  });

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("No movie found");

  const filtered = data.filter((m) => !excludeIds.includes(m.id));
  return filtered.length > 0 ? filtered[0] : data[0];
}
