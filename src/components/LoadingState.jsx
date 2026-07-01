export default function LoadingState() {
  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div className="brand">
        <img src="/popcorn.png" alt="PopChoice" className="brand-icon" />
        <h1 className="brand-name">PopChoice</h1>
      </div>
      <div className="loading-screen">
        <div className="big-spinner" />
        <h2>Finding Your Perfect Movie...</h2>
        <p>Analyzing your preferences with AI</p>
      </div>
    </div>
  );
}
