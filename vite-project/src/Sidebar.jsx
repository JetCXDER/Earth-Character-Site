import React from "react";

function Sidebar({ show, onClose, onSelectSetting }) {
  return (
    <div className={`sidebar ${show ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>Settings</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <ul className="sidebar-list">
        <li onClick={() => onSelectSetting("news")}>News Settings</li>
        <li onClick={() => onSelectSetting("earth")}>Earth Controls</li>
        <li onClick={() => onSelectSetting("theme")}>Theme Options</li>
      </ul>
    </div>
  );
}

export default Sidebar;
