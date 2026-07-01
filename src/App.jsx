import { useState, useEffect } from "react";
import QuestionsView from "./components/QuestionsView";
import ResultView from "./components/ResultView";
import LoadingState from "./components/LoadingState";
import StartScreen from "./components/StartScreen";
import GroupQuestionsView from "./components/GroupQuestionsView";
import GroupResultView from "./components/GroupResultView";
import { seedMovies } from "./utils/seedMovies";
import { searchMovies } from "./utils/searchMovies";
import { generateExplanation } from "./utils/generateExplanation";
import { fetchPoster } from "./utils/fetchPoster";

export default function App() {
  const [mode, setMode] = useState("solo"); 
  const [screen, setScreen] = useState("questions");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Group mode state
  const [groupInfo, setGroupInfo] = useState(null);
  const [personNumber, setPersonNumber] = useState(1);
  const [groupAnswers, setGroupAnswers] = useState([]);
  const [usedMovieIds, setUsedMovieIds] = useState([]);

  useEffect(() => {
    seedMovies().catch(console.error);
  }, []);

  // ── Solo flow ──
  async function handleSubmit({ favoriteMovie, era, tone }) {
    setLoading(true);
    setError("");
    setScreen("loading");

    try {
      const preferences = `My favorite movie is ${favoriteMovie}. I am looking for something ${era}. I want something ${tone}.`;
      const movie = await searchMovies(preferences);
      const explanation = await generateExplanation(preferences, movie);
      setResult({ movie, explanation });
      setScreen("result");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setScreen("questions");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError("");
    setMode("solo");
    setScreen("questions");
  }

  // ── Group flow ──
  function startGroupMode(info) {
    setGroupInfo(info);
    setMode("group");
    setPersonNumber(1);
    setGroupAnswers([]);
    setScreen("group-questions");
  }

  function handleNextPerson(answers) {
    setGroupAnswers((prev) => [...prev, answers]);
    setPersonNumber((prev) => prev + 1);
  }

  async function handleGetMovie(answers) {
    const allAnswers = [...groupAnswers, answers];
    setLoading(true);
    setError("");
    setScreen("loading");

    try {
      const combined = allAnswers
        .map(
          (a, i) =>
            ` Person ${i + 1}: favorite movie ${a.favoriteMovie}, wants ${a.era}, mood ${a.mood}`,
        )
        .join(". ");

      const movie = await searchMovies(combined, usedMovieIds);
      const explanation = await generateExplanation(combined, movie);
      const poster = await fetchPoster(movie.title);

      setUsedMovieIds([movie.id]);
      setResult({ movie, explanation, poster, combined });
      setScreen("group-result");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setScreen("group-questions");
    } finally {
      setLoading(false);
    }
  }

  async function handleNextMovie() {
    setLoading(true);
    setError("");
    try {
      const newExcludeIds = [...usedMovieIds, result.movie.id];
      const movie = await searchMovies(result.combined, newExcludeIds);
      const explanation = await generateExplanation(result.combined, movie);
      const poster = await fetchPoster(movie.title);

      setUsedMovieIds(newExcludeIds);
      setResult({ movie, explanation, poster, combined: result.combined });
    } catch (err) {
      console.error(err);
      setError("Could not find another movie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      {error && <div className="global-error">⚠️ {error}</div>}
      {/* Solo flow */}
      {screen === "questions" && mode === "solo" && (
        <QuestionsView onSubmit={handleSubmit} loading={loading} />
      )}
      {screen === "result" && result && mode === "solo" && (
        <ResultView
          movie={result.movie}
          explanation={result.explanation}
          onReset={handleReset}
        />
      )}

      {/* Switch to group mode link */}
      {screen === "questions" && mode === "solo" && (
        <button
          onClick={() => setScreen("start")}
          style={{
            marginTop: "1rem",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            textDecoration: "underline",
            cursor: "pointer",
            fontFamily: "Roboto Slab, serif",
          }}
        >
          🎉 Movie Night with Friends?
        </button>
      )}

      {/* Group flow */}
      {screen === "start" && <StartScreen onStart={startGroupMode} />}

      {screen === "group-questions" && (
        <GroupQuestionsView
          personNumber={personNumber}
          totalPeople={groupInfo?.people || 1}
          onNext={handleNextPerson}
          onGetMovie={handleGetMovie}
        />
      )}

      {screen === "group-result" && result && (
        <GroupResultView
          movie={result.movie}
          explanation={result.explanation}
          poster={result.poster}
          onNextMovie={handleNextMovie}
        />
      )}

      {/* Shared loading */}
      {screen === "loading" && <LoadingState />}
    </div>
  );
}
