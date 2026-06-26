const content = {
  English: {
    tagline: "Your Perfect Match",
    badge: "AI Recommendation",
    about: "About the Film",
    why: "Why it's perfect for you",
    again: "🔄 Go Again",
  },
  فارسی: {
    tagline: "بهترین انتخاب برای شما",
    badge: "پیشنهاد هوش مصنوعی",
    about: "درباره فیلم",
    why: "چرا برای شما ایده‌آل است",
    again: "🔄 دوباره امتحان کن",
  },
};

export default function ResultView({ movie, explanation, language, onReset }) {
  const t = content[language] || content["English"];
  const isRTL = language === "فارسی";

  return (
    <div className="view result-view" dir={isRTL ? "rtl" : "ltr"}>
      <div className="brand">
        <span className="brand-icon">🎬</span>
        <h1 className="brand-name">PopChoice</h1>
        <p className="brand-tagline">{t.tagline}</p>
      </div>

      <div className="result-card">
        <div className="result-badge">{t.badge}</div>

        <div className="movie-header">
          <h2 className="movie-title">{movie.title}</h2>
          <span className="movie-year">{movie.release_year}</span>
        </div>

        <div className="divider" />

        <div className="section">
          <p className="section-label">{t.about}</p>
          <p className="movie-description">{movie.content}</p>
        </div>

        <div className="divider" />

        <div className="section explanation-section">
          <p className="section-label">{t.why}</p>
          <blockquote className="explanation">{explanation}</blockquote>
        </div>

        <button className="cta-btn secondary" onClick={onReset}>
          {t.again}
        </button>
      </div>
    </div>
  );
}
