import React, { useState } from "react";
import MapboxGlobe from "./MapboxGlobe";
import Globe from "./Globe";
import InfoPanel from "./InfoPanel.jsx";
import "./panels.css";
import Sidebar from "./Sidebar.jsx";
import SettingsPanel from "./SettingsPanel.jsx";

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Persistent positions
  const [statsPos, setStatsPos] = useState({ x: 50, y: 80 });
  const [controlsPos, setControlsPos] = useState({ x: 400, y: 80 });

  // Sidebar + Settings state
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSetting, setActiveSetting] = useState(null);

  //Debug Flag - On/off state for Toggle buttons
  const [showDebugButtons /*setShowDebugButtons*/] = useState(false);

  return (
    <div>
      <MapboxGlobe />

      {/* Top-left button to open sidebar */}
      <button
        onClick={() => setShowSidebar(true)}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        ☰
      </button>

      {/* Sidebar on the left */}
      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        onSelectSetting={(setting) => setActiveSetting(setting)}
      />

      {/* Right-side settings panel */}
      <SettingsPanel
        type={activeSetting}
        onClose={() => setActiveSetting(null)}
      />

      {/* Existing toggle buttons for draggable panels */}
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
