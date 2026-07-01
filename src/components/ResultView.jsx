export default function ResultView({ movie, explanation, onReset }) {
  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div className="brand">
        <img src="/popcorn.png" alt="PopChoice" className="brand-icon" />
        <h1 className="brand-name">PopChoice</h1>
      </div>

      <div className="card">
        <h2 className="result-title">
          {movie.title} ({movie.release_year})
        </h2>

        <p className="result-description">{movie.content}</p>

        <div className="result-explanation">{explanation}</div>

        <button className="btn-green" onClick={onReset}>
          Go Again
        </button>
      </div>
    </div>
  );
}
