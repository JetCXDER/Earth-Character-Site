// src/components/InfoPanel.jsx
import React from "react";

function InfoPanel({ title, children, onClose }) {
  return (
    <div className="info-panel">
      <div className="info-header">
        <h3>{title}</h3>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="info-content">{children}</div>
    </div>
  );
}

export default InfoPanel;
