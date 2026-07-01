export async function fetchPoster(title) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=1b48d8cf&t=${encodeURIComponent(title)}`,
    );
    const data = await res.json();
    return data.Poster && data.Poster !== "N/A" ? data.Poster : null;
  } catch {
    return null;
  }
}
