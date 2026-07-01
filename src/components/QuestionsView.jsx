import { useState } from "react";

export default function QuestionsView({ onSubmit, loading }) {
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [era, setEra] = useState("");
  const [tone, setTone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!favoriteMovie || !era || !tone) {
      setError("Please answer all questions before continuing.");
      return;
    }
    setError("");
    onSubmit({ favoriteMovie, era, tone });
  }

  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div className="brand">
        <img src="/popcorn.png" alt="PopChoice" className="brand-icon" />
        <h1 className="brand-name">PopChoice</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>What's your favorite movie and why?</label>
            <textarea
              className="input textarea"
              placeholder="e.g. The Shawshank Redemption because it taught me to never give up hope no matter how hard life gets"
              value={favoriteMovie}
              onChange={(e) => setFavoriteMovie(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Are you in the mood for something new or a classic?</label>
            <textarea
              className="input textarea"
              placeholder="e.g. I want something classic from the 90s or I'm in the mood for something new"
              value={era}
              onChange={(e) => setEra(e.target.value)}
              rows={2}
            />
          </div>

          <div className="field">
            <label>
              Do you wanna have fun or do you want something serious?
            </label>
            <textarea
              className="input textarea"
              placeholder="e.g. I want something fun and entertaining"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              rows={2}
            />
          </div>

          {error && <p className="error-msg">⚠️ {error}</p>}

          <button className="btn-green" type="submit" disabled={loading}>
            {loading ? (
              <span className="loading-wrap">
                <span className="spinner" />
                Finding Your Perfect Movie...
              </span>
            ) : (
              "Let's Go"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
