import { useState } from "react";

export default function GroupQuestionsView({
  personNumber,
  totalPeople,
  onNext,
  onGetMovie,
}) {
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [era, setEra] = useState("");
  const [mood, setMood] = useState("");
  const [islandPerson, setIslandPerson] = useState("");

  const isLast = personNumber === totalPeople;

  function handleSubmit() {
    const answers = { favoriteMovie, era, mood, islandPerson };
    if (isLast) {
      onGetMovie(answers);
    } else {
      onNext(answers);
    }
    setFavoriteMovie("");
    setEra("");
    setMood("");
    setIslandPerson("");
  }

  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div className="brand">
        <img src="/popcorn.png" alt="PopChoice" className="brand-icon" />
        <span
          style={{
            display: "block",
            fontFamily: "Carter One, cursive",
            fontSize: "1.4rem",
            color: "var(--green)",
            marginBottom: "0.25rem",
          }}
        >
          {personNumber}
        </span>
      </div>

      <div className="card">
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
          <div className="toggle-group">
            {["New", "Classic"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`toggle-btn ${era === opt ? "active" : ""}`}
                onClick={() => setEra(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>What are you in the mood for?</label>
          <div className="toggle-group">
            {["Fun", "Serious", "Inspiring", "Scary"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`toggle-btn small ${mood === opt ? "active" : ""}`}
                onClick={() => setMood(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>
            Which famous film person would you love to be stranded on an island
            with and why?
          </label>
          <textarea
            className="input textarea"
            placeholder="e.g. Tom Hanks because he is really funny and can do the voice of Woody"
            value={islandPerson}
            onChange={(e) => setIslandPerson(e.target.value)}
            rows={2}
          />
        </div>

        <button className="btn-green" onClick={handleSubmit}>
          {isLast ? "Get Movie" : "Next Person"}
        </button>
      </div>
    </div>
  );
}
