import React, { useState } from "react";
import MapboxGlobe from "./MapboxGlobe";
import InfoPanel from "./InfoPanel.jsx";
import SettingsPanel from "./SettingsPanel.jsx";
import NewsBanner from "./NewsBanner.jsx";
import NavBar from "./NavBar.jsx";
import "./panels.css";
import "./navbar.css";

function App() {
  // State for nav bar dropdowns
  const [activeSetting, setActiveSetting] = useState(null);

  // Banner state (headline from globe)
  const [activeNews, setActiveNews] = useState(null);

  // Debug panels
  const [showStats, setShowStats] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showDebugButtons /*setShowDebugButtons*/] = useState(false);

  // Persistent positions for draggable panels
  const [statsPos, setStatsPos] = useState({ x: 50, y: 80 });
  const [controlsPos, setControlsPos] = useState({ x: 400, y: 80 });

  return (
    <div className="app-layout">
      {/* Top Nav Bar */}
      <NavBar onSelectSetting={(s) => setActiveSetting(s)} />

      <div className="main-content">
        {/* Side panel (opens when a dot is clicked) */}
        {activeNews && (
          <div className="side-panel">
            <h3>{activeNews.title}</h3>
            <p>Category: {activeNews.category}</p>
            <button onClick={() => setActiveNews(null)}>Close</button>
          </div>
        )}

        {/* Globe container */}
        <div className={`globe-container ${activeNews ? "shrink" : ""}`}>
          <MapboxGlobe setActiveNews={setActiveNews} />
        </div>

        {/* Settings panel (right side) */}
        <SettingsPanel
          type={activeSetting}
          onClose={() => setActiveSetting(null)}
        />
      </div>

      {/* News banner at bottom */}
      <NewsBanner data={activeNews} onClose={() => setActiveNews(null)} />

      {/* Debug toggle buttons (hidden unless flag is true) */}
      {showDebugButtons && (
        <>
          <button onClick={() => setShowStats(!showStats)}>Toggle Stats</button>
          <button onClick={() => setShowControls(!showControls)}>
            Toggle Controls
          </button>
        </>
      )}

      {/* Stats Panel */}
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

      {/* Controls Panel */}
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
