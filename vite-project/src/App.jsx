import React, { useState } from "react";
import Globe from "./Globe";
import InfoPanel from "./InfoPanel.jsx";
import "./panels.css";

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Persistent positions
  const [statsPos, setStatsPos] = useState({ x: 50, y: 80 });
  const [controlsPos, setControlsPos] = useState({ x: 400, y: 80 });

  return (
    <div>
      <Globe />

      <button onClick={() => setShowStats(!showStats)}>Toggle Stats</button>
      <button onClick={() => setShowControls(!showControls)}>
        Toggle Controls
      </button>

      {showStats && (
        <InfoPanel
          title="Earth Stats"
          onClose={() => setShowStats(false)}
          pos={statsPos}
          setPos={setStatsPos}
        >
          <p>Population: 7.9B</p>
          <p>Surface Area: 510M km²</p>
        </InfoPanel>
      )}

      {showControls && (
        <InfoPanel
          title="Controls"
          onClose={() => setShowControls(false)}
          pos={controlsPos}
          setPos={setControlsPos}
        >
          <button>Zoom In</button>
          <button>Zoom Out</button>
        </InfoPanel>
      )}
    </div>
  );
}

export default App;
