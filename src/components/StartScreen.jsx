import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [people, setPeople] = useState("");
  const [time, setTime] = useState("");

  function handleStart() {
    if (!people || !time) return;
    onStart({ people: parseInt(people), time });
  }

  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div className="brand">
        <img src="/popcorn.png" alt="PopChoice" className="brand-icon" />
        <h1 className="brand-name">PopChoice</h1>
      </div>

      <div className="card">
        <div className="field">
          <input
            className="input"
            type="number"
            placeholder="How many people?"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            className="input"
            type="text"
            placeholder="How much time do you have?"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button className="btn-green" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}
