export default function GroupResultView({
  movie,
  explanation,
  poster,
  onNextMovie,
}) {
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

        {poster && (
          <img
            src={poster}
            alt={movie.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "1rem",
              display: "block",
            }}
          />
        )}

        <p className="result-description">{explanation}</p>

        <button className="btn-green" onClick={onNextMovie}>
          Next Movie
        </button>
      </div>
    </div>
  );
}
