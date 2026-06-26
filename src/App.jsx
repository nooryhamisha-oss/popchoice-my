import { useState, useEffect } from "react";
import QuestionsView from "./components/QuestionsView";
import ResultView from "./components/ResultView";
import { seedMovies } from "./utils/seedMovies";
import { searchMovies } from "./utils/searchMovies";
import { generateExplanation } from "./utils/generateExplanation";

export default function App() {
  const [screen, setScreen] = useState("questions");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    seedMovies().catch(console.error);
  }, []);

  async function handleSubmit({ favoriteMovie, whyMovie, era, tone, language }) {
    setLoading(true);
    setError("");

    try {
      const preferences = `My favorite movie is ${favoriteMovie} because ${whyMovie}. I am looking for something ${era}. I want something ${tone}.`;
      const movie = await searchMovies(preferences);
      const explanation = await generateExplanation(preferences, movie, language);
      setResult({ movie, explanation, language });
      setScreen("result");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError("");
    setScreen("questions");
  }

  return (
    <div className="app">
      {error && screen === "questions" && (
        <div className="global-error">⚠️ {error}</div>
      )}
      {screen === "questions" && (
        <QuestionsView onSubmit={handleSubmit} loading={loading} />
      )}
      {screen === "result" && result && (
        <ResultView
          movie={result.movie}
          explanation={result.explanation}
          language={result.language}
          onReset={handleReset}
        />
      )}
    </div>
  );
}