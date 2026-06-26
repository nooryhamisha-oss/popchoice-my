import { supabase } from "../lib/config";
import { createEmbedding } from "./createEmbedding";

export async function searchMovies(preferenceText) {
  const embedding = await createEmbedding(preferenceText);

  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_count: 1,
  });

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("No movie found");

  return data[0];
}
