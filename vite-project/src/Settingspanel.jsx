import React from "react";

function SettingsPanel({ type, onClose }) {
  return (
    <div className={`settings-panel ${type ? "open" : ""}`}>
      <div className="settings-header">
        <h3>{type ? `${type} Settings` : "Settings"}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="settings-content">
        {type === "news" && (
          <>
            <p>Filter by region, topics, or sources.</p>
            <button>Enable Breaking News</button>
          </>
        )}
        {type === "earth" && (
          <>
            <p>Control globe rotation, textures, and overlays.</p>
            <button>Toggle Atmosphere</button>
          </>
        )}
        {type === "theme" && (
          <>
            <p>Switch between light, dark, or glass themes.</p>
            <button>Apply Dark Mode</button>
          </>
        )}
        {!type && <p>Select a setting from the sidebar.</p>}
      </div>
    </div>
  );
}

export default SettingsPanel;
