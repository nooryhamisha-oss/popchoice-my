import { useState } from "react";

const content = {
  English: {
    tagline: "Your AI Cinema Advisor",
    title: "Discover Your Perfect Film",
    subtitle: "Answer a few questions and let AI find your next obsession.",
    q1: "What's your all-time favorite movie?",
    q1p: "e.g. Inception, The Dark Knight...",
    q2: "What do you love most about it?",
    q2p: "Tell us what makes it special to you...",
    q3: "Era preference",
    q4: "Mood tonight?",
    error: "Please answer all questions before continuing.",
    btn: "✨ Recommend a Movie",
    loading: "Finding Your Perfect Movie…",
    new: "New", classic: "Classic", fun: "Fun", serious: "Serious",
  },
  فارسی: {
    tagline: "مشاور سینمایی هوش مصنوعی شما",
    title: "فیلم ایده‌آل خود را کشف کنید",
    subtitle: "چند سوال را پاسخ دهید تا هوش مصنوعی فیلم بعدی شما را پیدا کند.",
    q1: "بهترین فیلم مورد علاقه‌ات چیست؟",
    q1p: "مثلاً: جدایی نادر از سیمین، مرد عنکبوتی...",
    q2: "چه چیزی در آن بیشتر دوست داری؟",
    q2p: "بگو چه چیزی آن را برایت خاص می‌کند...",
    q3: "ترجیح دوره",
    q4: "حال و هوای امشب؟",
    error: "لطفاً همه سوال‌ها را قبل از ادامه پاسخ دهید.",
    btn: "✨ پیشنهاد فیلم",
    loading: "در حال یافتن فیلم ایده‌آل شما…",
    new: "جدید", classic: "کلاسیک", fun: "شاد", serious: "جدی",
  },
};

export default function QuestionsView({ onSubmit, loading }) {
  const [language, setLanguage] = useState("English");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [whyMovie, setWhyMovie] = useState("");
  const [era, setEra] = useState("");
  const [tone, setTone] = useState("");
  const [error, setError] = useState("");

  const t = content[language];
  const isRTL = language === "فارسی";

  function handleSubmit(e) {
    e.preventDefault();
    if (!favoriteMovie || !whyMovie || !era || !tone) {
      setError(t.error);
      return;
    }
    setError("");
    onSubmit({ favoriteMovie, whyMovie, era, tone, language });
  } 

  return (
    <div className="view questions-view" dir={isRTL ? "rtl" : "ltr"}>
      <div className="brand">
        <span className="brand-icon">🎬</span>
        <h1 className="brand-name">PopChoice</h1>
        <p className="brand-tagline">{t.tagline}</p>
      </div>

      <div className="lang-switcher">
        {["English", "فارسی"].map((lang) => (
          <button
            key={lang}
            type="button"
            className={`lang-btn ${language === lang ? "active" : ""}`}
            onClick={() => setLanguage(lang)}
          >
            {lang === "English" ? "🇬🇧 English" : "🇮🇷 فارسی"}
          </button>
        ))}
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div className="field">
          <label className="label">
            <span className="label-num">01</span>
            {t.q1}
          </label>
          <input
            className="input"
            type="text"
            placeholder={t.q1p}
            value={favoriteMovie}
            onChange={(e) => setFavoriteMovie(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">
            <span className="label-num">02</span>
            {t.q2}
          </label>
          <textarea
            className="input textarea"
            placeholder={t.q2p}
            value={whyMovie}
            onChange={(e) => setWhyMovie(e.target.value)}
            rows={3}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label className="label">
              <span className="label-num">03</span>
              {t.q3}
            </label>
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-btn ${era === "new" ? "active" : ""}`}
                onClick={() => setEra("new")}
              >
                🆕 {t.new}
              </button>
              <button
                type="button"
                className={`toggle-btn ${era === "classic" ? "active" : ""}`}
                onClick={() => setEra("classic")}
              >
                🎞️ {t.classic}
              </button>
            </div>
          </div>

          <div className="field">
            <label className="label">
              <span className="label-num">04</span>
              {t.q4}
            </label>
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-btn ${tone === "fun" ? "active" : ""}`}
                onClick={() => setTone("fun")}
              >
                😄 {t.fun}
              </button>
              <button
                type="button"
                className={`toggle-btn ${tone === "serious" ? "active" : ""}`}
                onClick={() => setTone("serious")}
              >
                🎭 {t.serious}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="error-msg">⚠️ {error}</p>}

        <button className="cta-btn" type="submit" disabled={loading}>
          {loading ? (
            <span className="loading-inner">
              <span className="spinner" />
              {t.loading}
            </span>
          ) : (
            t.btn
          )}
        </button>
      </form>
    </div>
  );
}